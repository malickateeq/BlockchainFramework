// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Lottery 
{
    address public manager;
    address payable [] public players;

    constructor()
    {
        manager = msg.sender;
    }

    function enter() public payable
    {
        require(msg.value > 0.01 ether);
        players.push( payable(msg.sender) );
    }

    function random() private pure returns (uint)
    {
        return 124124;
        // return uint(keccak256(block.difficulty, now, players));
    }
    
    function pickWinner() public restricted
    {
        uint index = random() % players.length;
        players[index].transfer( address(this).balance );
        players = new address payable [] (0);
    }

    modifier restricted()
    {
        require(msg.sender == manager);
        _;
    }

    function getPlayers() public view returns(address payable [] memory)
    {
        require(msg.sender == manager);
        return players;
    }
}