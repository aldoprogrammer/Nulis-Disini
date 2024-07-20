// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

interface IUserAuthentication {
    /**
     * @dev Verifies the login credentials of a user.
     * @param _pA The first parameter of the proof (zk-SNARKs or similar cryptographic proof).
     * @param _pB The second parameter of the proof.
     * @param _pC The third parameter of the proof.
     * @param _pubSignals Public signals used in the verification.
     * @param _userName The username of the user attempting to log in.
     */
    function verifyLogin(
        uint[2] calldata _pA,
        uint[2][2] calldata _pB,
        uint[2] calldata _pC,
        uint[1] calldata _pubSignals,
        string calldata _userName
    ) external;

    /**
     * @dev Registers a new user with a hashed password and optional additional data.
     * @param _pHash The hashed password.
     * @param _bHash Optional additional hashed data (e.g., for additional security).
     * @param _userName The username for the new user.
     */
    function registerUser(
        bytes32 _pHash,
        bytes32 _bHash,
        string memory _userName
    ) external;
}
