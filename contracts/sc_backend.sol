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
    mapping (uint => Booking) bookings;
    uint[] public bookingsIDs;
    uint bookingIDincr = 1;
     
    event bookingConfirm(address indexed _client, uint id);
    
    constructor() public {
        backend = msg.sender;
        //oracle = oracleAddress;
    }
    
    function book(address add, uint256 startDate, uint256 endDate, string city, uint payment) public restricted {
        bool confirm = true;
        uint id = 0;
        //AGGIUNGI PRENOTAZIONE ALLA BLOCKCHAIN
        if(confirm) {
            setBooking(add,startDate,endDate,city,payment);
            id = bookingIDincr;
            bookingIDincr = bookingIDincr + 1;
        }
        emit bookingConfirm(add, id);
    }
    
    function setBooking(address add, uint256 startDate, uint256 endDate, string city, uint payment) public {
        
        
        var booking = bookings[bookingIDincr];
        booking.add = add;
        booking.startDate = startDate;
        booking.endDate = endDate;
        booking.city = city;
        booking.payment = payment;
        
        bookingsIDs.push(bookingIDincr) -1;
    }
    
    function getBookingsAll() public view returns (uint[]) {
        return bookingsIDs;
    }
    
    function getBookingByID(uint ins) public view returns (address,uint256,uint256,string,uint) {
        return (bookings[ins].add, bookings[ins].startDate, bookings[ins].endDate, bookings[ins].city, bookings[ins].payment);
    }

    function getBookingNumber() public view returns (uint256) {
        return bookingsIDs.length;
    }
    
    modifier restricted() {
        require(msg.sender == backend);
        _;
    }
}