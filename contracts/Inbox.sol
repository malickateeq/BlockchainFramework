// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.4.17 <0.9.0;

contract Inbox 
{
    string public message;
    
    function initMessage( string memory initialMessage ) public 
    {
        message = initialMessage;
    }

    function setMessage( string memory newMessage ) public
    {
        message = newMessage;
    }

    function getMessage() public view returns (string memory)
    {
        return message;
    }
}