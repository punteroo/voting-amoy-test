// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Votacion {
    // Mapping to track if an address has voted
    mapping(address => bool) public haVotado;
    
    // Mapping to store vote counts for each candidate
    mapping(string => uint) public votos;

    // Function to cast a vote for a candidate
    function votar(string memory candidato) public {
        // Ensure the sender hasn't voted before
        require(!haVotado[msg.sender], "Ya has votado");
        
        // Increment the vote count for the candidate
        votos[candidato]++;
        
        // Mark the sender as having voted
        haVotado[msg.sender] = true;
    }
}
