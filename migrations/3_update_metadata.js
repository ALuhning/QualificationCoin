const Metadata = artifacts.require('./Metadata.sol')
const QualificationCoin = artifacts.require('./QualificationCoin.sol')
const MyCoin = artifacts.require('./MyCoin.sol')

const gatewayAddress = '0xe754d9518bf4a9c63476891ef9AA7d91C8236A5D'

module.exports = function (deployer, network, accounts) {
  if (network === 'rinkeby') {
    return
  }

  deployer.then(async () => {
    await deployer.deploy(Metadata, {replace: true})
    const metadataInstance = await Metadata.deployed()

    //await deployer.deploy(QualificationCoin, gatewayAddress, 'Qualification Coin', 'QCOIN', metadataInstance.address)
    const qualificationCoinInstance = await QualificationCoin.deployed()

    await qualificationCoinInstance.updateMetadata(metadataInstance.address)
    console.log('Token metadata updated to ' + metadataInstance.address)

    await deployer.deploy(MyCoin, gatewayAddress)
    const myCoinInstance = await MyCoin.deployed()
        
    console.log('\n*************************************************************************\n')
    console.log(`New Metadata Contract Address: ${metadataInstance.address}`)
    console.log(`QualificationCoin Contract Address: ${qualificationCoinInstance.address}`)
    console.log(`MyCoin Contract Address: ${myCoinInstance.address}`)
    console.log('\n*************************************************************************\n')
  })
}
