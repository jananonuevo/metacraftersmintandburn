// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

//import "hardhat/console.sol";

contract Assessment {
    address payable public owner;
    uint256 public tokenSupply;

    event Mint(uint256 tokens);
    event Burn(uint256 tokens);
    
    constructor(uint initBalance) payable {
        owner = payable(msg.sender);
        tokenSupply = initBalance;
    }

    function getTokenSupply() public view returns(uint256){
        return tokenSupply;
    }

    function mintToken(uint256 _amountMint) public payable {
        uint _previousTokenSupply = tokenSupply;
        require(msg.sender == owner, "Only the owner can mint tokens!");
        tokenSupply += _amountMint;
        assert(tokenSupply == _previousTokenSupply + _amountMint);
        emit Mint(_amountMint);
    }

    error InsufficientBalance(uint256 tokenSupply, uint256 amountBurn);

    function burnToken(uint256 _amountBurn) public {
        require(msg.sender == owner, "Only the owner can burn tokens!");
        uint _previousBalance = tokenSupply;
        if (tokenSupply < _amountBurn) {
            revert InsufficientBalance({
                tokenSupply: tokenSupply,
                amountBurn: _amountBurn
            });
        }
        tokenSupply -= _amountBurn;
        assert(tokenSupply == (_previousBalance - _amountBurn));
        emit Burn(_amountBurn);
    }
}
