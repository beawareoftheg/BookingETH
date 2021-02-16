pragma solidity ^0.4.25;
pragma experimental ABIEncoderV2;

contract sc_backend {
    address public backend;
    address public oracle;
    struct Booking {
        address add;
        uint256 startDate;
        uint256 endDate;
        string city;
        uint payment;
    }
    mapping (address => Booking) bookings;
    address[] public bookingsAddr;
    
    event bookingConfirm(bool res);
    
    constructor() public {
        backend = msg.sender;
        //oracle = oracleAddress;
    }
    
    function book(address add, uint256 startDate, uint256 endDate, string city, uint payment) public restricted {
        bool confirm = true;
        //AGGIUNGI PRENOTAZIONE ALLA BLOCKCHAIN
        if(confirm) {
            setBooking(add,startDate,endDate,city,payment);
        }
        emit bookingConfirm(confirm);
    }
    
    function setBooking(address add, uint256 startDate, uint256 endDate, string city, uint payment) public {
        var booking = bookings[add];

        booking.add = add;
        booking.startDate = startDate;
        booking.endDate = endDate;
        booking.city = city;
        booking.payment = payment;
        
        bookingsAddr.push(add) -1;

    }
    
    function getBookingsAll() public view returns (address[]) {
        return bookingsAddr;
    }
    
    function getLatestBook(address ins) public view returns (address,uint256,uint256,string,uint) {
        return (bookings[ins].add, bookings[ins].startDate, bookings[ins].endDate, bookings[ins].city, bookings[ins].payment);
    }
    
    modifier restricted() {
        require(msg.sender == backend);
        _;
    }
}