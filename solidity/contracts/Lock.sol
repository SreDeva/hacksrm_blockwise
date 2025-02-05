// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract BasicVerifierContract {
    address public immutable owner;

    struct FileInfo {
        address holder;
        string fileHash;
        string fileName;
    }

    struct PermissionRequest {
        string fileHash;
        address requester;
        bool granted;
    }

    mapping(string => FileInfo) private files;
    mapping(address => PermissionRequest[]) private requests;

    event FileUploaded(string fileHash, address holder);
    event PermissionRequested(string fileHash, address requester);
    event PermissionGranted(string fileHash, address requester);

    error NotOwner();
    error FileExists();
    error FileMissing();

    modifier onlyOwner() {
        if (msg.sender != owner) revert NotOwner();
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function uploadFile(string calldata fileHash, string calldata fileName) external {
        if (bytes(files[fileHash].fileHash).length != 0) revert FileExists();
        files[fileHash] = FileInfo(msg.sender, fileHash, fileName);
        emit FileUploaded(fileHash, msg.sender);
    }

    function requestPermission(string calldata fileHash) external {
        if (bytes(files[fileHash].fileHash).length == 0) revert FileMissing();
        requests[files[fileHash].holder].push(PermissionRequest(fileHash, msg.sender, false));
        emit PermissionRequested(fileHash, msg.sender);
    }

    function grantPermission(string calldata fileHash, address requester) external {
        PermissionRequest[] storage userRequests = requests[msg.sender];
        for (uint256 i = 0; i < userRequests.length; i++) {
            if (keccak256(bytes(userRequests[i].fileHash)) == keccak256(bytes(fileHash)) && userRequests[i].requester == requester) {
                userRequests[i].granted = true;
                emit PermissionGranted(fileHash, requester);
                return;
            }
        }
    }
}
