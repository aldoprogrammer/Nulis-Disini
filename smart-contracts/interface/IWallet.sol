// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

interface IWallet {
    /**
     * @dev Transfers a specific amount of tokens to a specified address.
     * @param _tokenAddress The address of the token contract.
     * @param _to The recipient address.
     * @param _amount The amount of tokens to transfer.
     */
    function transferToken(
        address _tokenAddress,
        address _to,
        uint256 _amount
    ) external;

    /**
     * @dev Returns the balance of a specific token for the caller.
     * @param tokenAddress The address of the token contract.
     * @return The balance of the token.
     */
    function balanceOfToken(
        address tokenAddress
    ) external view returns (uint256);
}
