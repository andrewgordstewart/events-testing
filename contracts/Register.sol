pragma solidity ^0.5.11;

contract Registration {
  function register(uint32 idx) public  {
    emit Registered(idx);
  }

  event Registered(uint indexed idx);
}