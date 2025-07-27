// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./zora/interfaces/IZoraFactory.sol";

/**
 * @title ZoraCoinCreator
 * @dev Allows creators to deploy their own ERC-20 token using Zora's protocol (via IZoraFactory)
 *      and links the created token to the creator's address. Modular for future expansion.
 */
contract ZoraCoinCreator {
    address public zoraFactory;
    mapping(address => address) public creatorToCoin;

    event CoinCreated(address indexed creator, address coin);

    constructor(address _zoraFactory) {
        zoraFactory = _zoraFactory;
    }

    /**
     * @notice Deploy a new ERC-20 coin using Zora's factory
     * @param payoutRecipient The address to receive creator payouts
     * @param owners Array of owner addresses (can include the creator)
     * @param uri The metadata URI for the coin
     * @param name The name of the coin
     * @param symbol The symbol of the coin
     * @param poolConfig The pool configuration bytes
     * @param platformReferrer The address of the platform referrer (can be address(0))
     * @param coinSalt The salt used for deterministic deployment
     * @return coin The address of the created coin
     */
    function createCoin(
        address payoutRecipient,
        address[] memory owners,
        string memory uri,
        string memory name,
        string memory symbol,
        bytes memory poolConfig,
        address platformReferrer,
        bytes32 coinSalt
    ) external returns (address coin) {
        // Call Zora's factory to deploy the creator coin
        coin = IZoraFactory(zoraFactory).deployCreatorCoin(
            payoutRecipient,
            owners,
            uri,
            name,
            symbol,
            poolConfig,
            platformReferrer,
            coinSalt
        );
        creatorToCoin[msg.sender] = coin;
        emit CoinCreated(msg.sender, coin);
    }

    /**
     * @notice Get the coin created by the caller
     */
    function getMyCoin() external view returns (address) {
        return creatorToCoin[msg.sender];
    }
}
