// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title AuthRegistry
 * @dev A registry for storing and retrieving content proofs with IPFS references
 */
contract AuthRegistry {
    struct Proof {
        bytes32 contentHash;
        uint8 score;
        address uploader;
        uint256 timestamp;
        string ipfs;
    }

    // Storage
    Proof[] private proofs;
    
    // Events
    event ProofPublished(
        uint256 indexed id,
        bytes32 indexed contentHash,
        address indexed uploader,
        uint8 score,
        string ipfs,
        uint256 timestamp
    );

    /**
     * @dev Publishes a new proof to the registry
     * @param contentHash The hash of the content
     * @param score The authenticity score (0-100)
     * @param ipfs The IPFS reference string
     * @return The ID of the newly created proof
     */
    function publishProof(
        bytes32 contentHash,
        uint8 score,
        string memory ipfs
    ) public returns (uint256) {
        require(score <= 100, "Score must be between 0 and 100");
        require(bytes(ipfs).length > 0, "IPFS reference cannot be empty");
        
        uint256 proofId = proofs.length;
        
        Proof memory newProof = Proof({
            contentHash: contentHash,
            score: score,
            uploader: msg.sender,
            timestamp: block.timestamp,
            ipfs: ipfs
        });
        
        proofs.push(newProof);
        
        emit ProofPublished(
            proofId,
            contentHash,
            msg.sender,
            score,
            ipfs,
            block.timestamp
        );
        
        return proofId;
    }

    /**
     * @dev Retrieves a proof by its ID
     * @param id The ID of the proof to retrieve
     * @return The Proof struct
     */
    function getProof(uint256 id) public view returns (Proof memory) {
        require(id < proofs.length, "Proof does not exist");
        return proofs[id];
    }

    /**
     * @dev Returns the total number of proofs
     * @return The count of proofs
     */
    function getProofCount() public view returns (uint256) {
        return proofs.length;
    }

    /**
     * @dev Get all proofs uploaded by a specific address
     * @param uploader The address to query
     * @return An array of proof IDs
     */
    function getProofsByUploader(address uploader) public view returns (uint256[] memory) {
        uint256 count = 0;
        
        // Count proofs by uploader
        for (uint256 i = 0; i < proofs.length; i++) {
            if (proofs[i].uploader == uploader) {
                count++;
            }
        }
        
        // Create result array
        uint256[] memory result = new uint256[](count);
        uint256 index = 0;
        
        // Populate result array
        for (uint256 i = 0; i < proofs.length; i++) {
            if (proofs[i].uploader == uploader) {
                result[index] = i;
                index++;
            }
        }
        
        return result;
    }
}
