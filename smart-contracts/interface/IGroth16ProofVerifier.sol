// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

interface IGroth16ProofVerifier {
    /**
     * @dev Verifies a Groth16 cryptographic proof.
     * @param _pA The first parameter of the proof.
     * @param _pB The second parameter of the proof.
     * @param _pC The third parameter of the proof.
     * @param _pubSignals Public signals used in the verification.
     * @return Returns true if the proof is valid, false otherwise.
     */
    function verifyProof(
        uint[2] calldata _pA, 
        uint[2][2] calldata _pB, 
        uint[2] calldata _pC, 
        uint[1] calldata _pubSignals
    ) external view returns (bool);
}
