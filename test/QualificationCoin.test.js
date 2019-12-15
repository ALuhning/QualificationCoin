const Metadata = artifacts.require('Metadata')
const QualificationCoin = artifacts.require('QualificationCoin')

contract('QualificationCoin', async (accounts) => {
  let qualificationCoin
  let metadata
  const gatewayAddress = '0xe754d9518bf4a9c63476891ef9AA7d91C8236A5D'

  beforeEach(async () => {
    metadata = await Metadata.new()
    qualificationCoin = await QualificationCoin.new(gatewayAddress, "Qualification Coin", "QCOIN", metadata.address)
  });

  it('Should have an address for QualificationCoin', async () => {
    assert(qualificationCoin.address, "QualificationCoin contract is not deployed")
  });

  it('Should have an address for Metadata', async () => {
    assert(metadata.address, "Metadata contract is not deployed")
  });

  it('Should return metadata uints as strings', async () => {
    const URI = 'https://vitalpoint.ai/metadata/'

    let tokenURI_uint = 12
    let tokenURI_result = await qualificationCoin.tokenURI(tokenURI_uint)
    assert(
      URI + tokenURI_uint.toString() === tokenURI_result,
      'incorrect value "' + tokenURI_result + '" returned'
    )

    tokenURI_uint = 2345
    tokenURI_result = await qualificationCoin.tokenURI(tokenURI_uint)
    assert(
      URI + tokenURI_uint.toString() === tokenURI_result,
      'incorrect value "' + tokenURI_result + '" returned'
    )

    tokenURI_uint = 23452345
    tokenURI_result = await qualificationCoin.tokenURI(tokenURI_uint)
    assert(
      URI + tokenURI_uint.toString() === tokenURI_result,
      'incorrect value "' + tokenURI_result + '" returned'
    )

    tokenURI_uint = 134452
    tokenURI_result = await qualificationCoin.tokenURI(tokenURI_uint)
    assert(
      URI + tokenURI_uint.toString() === tokenURI_result,
      'incorrect value "' + tokenURI_result + '" returned'
    )
  });

  it('should mint a token from the owner account', async () => {
    //begin with zero balance
    let zeroBalance = await qualificationCoin.totalSupply()
    assert(
      zeroBalance.toString(10) === '0',
      "Contract should have no tokens at this point"
    )

    // try minting a new token and checking the totalSupply
    try {
      await qualificationCoin.mint(accounts[0])
    } catch (error) {
      console.log(error)
      assert(false, error)
    }
    let totalSupply = await qualificationCoin.totalSupply()
    assert(
      totalSupply.toString(10) === '1',
      "Contract should have balance of 1 instead it has " + totalSupply.toString(10)
    )

    //check that the balance increased to 1
    let ownerBalance = await qualificationCoin.balanceOf(accounts[0])
    assert(
      ownerBalance.toString(10) === '1',
      "Owner account should have 1 token, instead it has " + ownerBalance.toString(10)
    )

    // make sure the token at index 0 has id 1
    let tokenId = await qualificationCoin.tokenOfOwnerByIndex(accounts[0], "0")
    assert(
      tokenId.toString(10) === '1',
      "Token at index 0 is " + tokenId.toString(10)
    )
  });

})
