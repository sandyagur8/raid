// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

interface ICSAMM {
     function swap(address _tokenIn, uint256 _amountIn)
        external
        returns (uint256 amountOut);
        function addLiquidity(uint256 _amount0, uint256 _amount1)
        external
        returns (uint256 shares);
        function removeLiquidity(uint256 _shares)
        external
        returns (uint256 d0, uint256 d1);

}