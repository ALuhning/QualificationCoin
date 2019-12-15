pragma solidity ^0.5.0;

import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";
import "./Metadata.sol";

contract QualificationCoin is ERC721Full, Ownable {
    // Transfer Gateway contract address
    address public gateway;
    Metadata metadata;

    constructor (address _gateway, string memory _name, string memory _symbol, Metadata _metadata) ERC721Full(_name, _symbol) public {
        gateway = _gateway;
        metadata = _metadata;

    }

    // Used by the DAppChain Gateway to mint tokens that have been deposited to the Ethereum Gateway
    function mintToGateway (uint256 _uid) public
    {
        require(msg.sender == gateway, "only the gateway is allowed to mint");
        _mint(gateway, _uid);
    }

    // Allow owner to mint coins
    function mint(address _recipient) public onlyOwner {
        _mint(_recipient, totalSupply() + 1);
    }
    // Function to allow owner to update metadata contract address
    function updateMetadata(Metadata _metadata) public onlyOwner {
        metadata = _metadata;
    }
    // Handle call to metadata contract (upgradeable)
    function tokenURI(uint _tokenId) external view returns (string memory _infoUrl) {
        return metadata.tokenURI(_tokenId);
    }

}
