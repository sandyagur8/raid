// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract Leaderboard {

    event LeaderboardUpdated(address[] newLeaderboard, address updater);

    address[] public leaderboard;

    function setLeaderboard(address[] memory new_leaderboard) public {
        leaderboard = new_leaderboard;

        emit LeaderboardUpdated(new_leaderboard, msg.sender);
    }

    function getLeaderboard() public view returns (address[] memory) {
        return leaderboard;
    }
}