// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

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
        players.push(msg.sender);
    }

    function random() private pure returns (uint)
    {
        return 124124;
        // return uint(keccak256(block.difficulty, now, players));
    }
    
    function pickWinner() public
    {
        // Validate manager
        require(msg.sender == manager);

        uint index = random() % players.length;
        players[index].transfer( address(this).balance );
        players = new address[](0);
    }
}