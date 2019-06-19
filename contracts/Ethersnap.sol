pragma solidity ^0.5.0;

contract Ethersnap {
    address owner;
    
    constructor(){
        owner = msg.sender;
    }
}