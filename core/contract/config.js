
const usdtAbi = require('./abis/usdtAbi.json');
const busdAbi = require('./abis/busdAbi.json');
const ethAbi = require('./abis/ethAbi.json');
const bnbAbi = require('./abis/bnbAbi.json');


var config = { // on BSC network
    usdtContractAddr : "0x55d398326f99059fF775485246999027B3197955",
    usdtAbi: usdtAbi,
    busdContractAddr : "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
    busdAbi: busdAbi,

    ethContractAddr: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    ethAbi: ethAbi,
    bnbContractAddr: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    bnbAbi: bnbAbi,

    rpcURL_bsc: "https://speedy-nodes-nyc.moralis.io/7784d8edf9ba80a1d01a9c6c/bsc/mainnet",
    rpcURL_bsctest: "https://speedy-nodes-nyc.moralis.io/cfe9228e4c2f75a9e06337c7/bsc/testnet",
    rpcURL_eth: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    rpcURL_avax: "https://api.avax.network/ext/bc/C/rpc",// "https://api.avax-test.network/ext/bc/C/rpc",
    rpcURL_ropsten: "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    rpcURL_rinkeby: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",

    adminWalletAddr: "",
    adminPrivateKey: ""
}


export default config;