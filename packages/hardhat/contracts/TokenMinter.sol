// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./TokenContract.sol";
import "./CSAMM.sol";

contract Factory {
    address public USDC_ADDRESS;
    address[] public deployed_tokens;
    mapping(address => bool) public isTokenDeployed;

    constructor(address _usdc) {
        USDC_ADDRESS = _usdc;
    }

    function CreateToken(string memory Name, string memory Symbol) public returns (address[] memory) {
        // Deploy new token
        TokenContract newToken = new TokenContract(Name, Symbol);
        address tokenAddress = address(newToken);
        
        // Deploy CSAMM pool
        CSAMM newPool = new CSAMM(USDC_ADDRESS, tokenAddress);
        address poolAddress = address(newPool);

        // Store token address
        deployed_tokens.push(tokenAddress);
        isTokenDeployed[tokenAddress] = true;

        // Return addresses array
        address[] memory addresses = new address[](2);
        addresses[0] = tokenAddress;
        addresses[1] = poolAddress;
        return addresses;
    }
}