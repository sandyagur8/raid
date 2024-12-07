// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import {CSAMM} from "./CSAMM.sol";
import {ICSAMM} from "./ICSAMM.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IERC20} from "./IERC20.sol";
contract CommoToken is ERC20 {
    constructor(address reciever,string memory Name,string memory Symbol) ERC20(Name, Symbol) {
        _mint(reciever, 1000000000 * 10 ** 18);
    }
}

contract Factory {
    address[] public  deployed_tokens;
    address public immutable USDC_ADDRESS ;
    function CreateToken(string memory Name,string memory Symbol) public returns(address[] memory){
            CommoToken newToken = new CommoToken(address(this), Name,Symbol);
            deployed_tokens.push(address(newToken));
            CSAMM pool = new CSAMM(address(newToken),USDC_ADDRESS);
            address[] memory returnArray;
            returnArray[0] = address(newToken);
            returnArray[1] = address(pool);
            return returnArray ;
    }
    constructor(address _usdc){
            USDC_ADDRESS=_usdc;
    }
}