import Web3 from 'web3';
// import Web3EthContract from "web3-eth-contract";
import api from './api';
import constants from './constants';
import { Axios, Canceler } from './axios';
import { NotificationManager } from 'react-notifications';
import config from './contract/config';

export const loadWeb3 = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    window.web3.eth.handleRevert = true;
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
    window.web3.eth.handleRevert = true
  } else {
    window.alert(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    );
    return;
  }
  window.ethereum.on('chainChanged', function (chainId) {

  });
};

export const getConnectedNetworkId = async () => {
  if (window.web3 && window.web3.eth) {
    return await window.web3.eth.getChainId();
  }

  return 0;
}

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "Metamask successfuly connected.",
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        status: "Something went wrong: " + err.message,
      };
    }
  }
  else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" rel="noreferrer" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual BSC wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "Fill in the text-field above.",
        };
      } else {
        return {
          address: "",
          status: "🦊 Connect to Metamask using the top right button.",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: "Something went wrong: " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" rel="noreferrer" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual BSC wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const getTokenBalance = async (web3, abi, tokenAddr, walletAddress) => {
  if (walletAddress.length === 0) {
    console.log('wallet addr is empty');
    return null;
  }

  try {
    const contract = new web3.eth.Contract(abi, tokenAddr, { from: walletAddress });
    let balance = await contract.methods.balanceOf(walletAddress).call();
    balance = web3.utils.fromWei(balance);
    return balance;

  } catch (error) {

    return null;
  }
}


export const getNativeTokenBalanceFromRPC = async (rpcURL, walletAddress) => {
  try {
    const provider = new Web3.providers.HttpProvider(rpcURL);
    const web3 = new Web3(provider);
    let balance = await web3.eth.getBalance(walletAddress);
    balance = web3.utils.fromWei(balance);

    balance = parseFloat(balance).toFixed(3)

    return balance;

  } catch (error) {
    return null;
  }
}

export const getWalletAssets = async (walletAddress) => {
  let result = { eth: 0, bnb: 0 };
  let balance = await getNativeTokenBalanceFromRPC(config.rpcURL_ropsten, walletAddress);
  if (balance) {
    result.eth = balance;
  }
  balance = await getNativeTokenBalanceFromRPC(config.rpcURL_bsctest, walletAddress);
  if (balance) {
    result.bnb = balance;
  }

  // balance = await getNativeTokenBalanceFromRPC(config.rpcURL_bsc, walletAddress);
  // if (balance) {
  //   result.bnb = balance;
  // }
  // balanceRes = await getNativeTokenBalanceFromRPC(config.rpcURL_avax, walletAddress);
  // if (balanceRes.success) {
  //   result.avax = balanceRes.balance;
  // }

  return result;
}


export const getCurrentWallet = async () => {
  const web3 = window.web3;
  try {
    let accounts = await web3.eth.getAccounts();
    let accountBalance = await web3.eth.getBalance(accounts[0]);
    accountBalance = web3.utils.fromWei(accountBalance);
    return {
      success: true,
      account: accounts[0],
      balance: accountBalance
    }
  } catch (error) {
    return {
      success: false,
      result: "Something went wrong: " + error.message
    }
  }
}

const waitForReceipt = async (txHash, investTxResultCallback, params) => {
  let counter = 0;
  while (1) {
    const receipt = await window.web3.eth.getTransaction(txHash);
    if (!receipt) {
      // failed, canceled
      investTxResultCallback(constants.TxFailed, params);
      return;
    } else {
      if (!receipt.accessList && !receipt.blockHash && !receipt.blockNumber && !receipt.transactionIndex) {
        // pending
      } else {
        // "chainId": current chain id
        investTxResultCallback(constants.TxSuccess, params);
        return;
      }
    }

    if (counter++ > 3600) {
      break;
    }
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
    await delay(500);
  }
}

export const sendTokensToAdmin = async (to, investTxResultCallback, params) => {

  if (window.ethereum && window.web3) {

    const walletInfo = await getCurrentWallet();
    const gasPrice = window.web3.utils.numberToHex(window.web3.utils.toWei('1000', "gwei"));
    const gasLimit = window.web3.utils.numberToHex('21000');
    const amount = Number(params.amount).toFixed(8);
    const value = window.web3.utils.numberToHex(window.web3.utils.toWei(amount.toString()));

    window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: walletInfo.account,
          to: to,
          value: value,
          gasPrice: gasPrice,
          gas: gasLimit,
        },
      ],
    })
      .then((txHash) => {
        waitForReceipt(txHash, investTxResultCallback, params);
        params.resultCallback(constants.TxPending); // notify waiting status for pending.
      })
      .catch((error) => {
        console.log('transaction is rejected', error);
        params.resultCallback(constants.TxRejected);
      });
  }
}

const investTxResultCallback = async (status, params) => {

  if (status === constants.TxSuccess) {
    // fee
    params.amount = params.amount - (params.amount * 0.001);
    // success
    let counter = 0;
    while (1) {
      const { data } = await Axios.post(`${api.baseUrl}${api.invest}`, params);

      if (!data.code) {
        // success
        params.resultCallback(constants.TxSuccess);
        return;
      }

      if (counter++ > 3600) {
        break;
      }
      const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
      await delay(500);
    }

    params.resultCallback(constants.TxSuccessButDBFailed); // transaction success but not store to mysql.
  } else {
    // failed
    params.resultCallback(status);
  }
}

export const doInvest = async (user_id, amount, coin_id, deposit_period, resultCallback) => {
  const params = {
    user_id: user_id,
    amount: amount,
    coin_id: coin_id,
    deposit_period: deposit_period,
    resultCallback: resultCallback
  };
  sendTokensToAdmin(config.adminWalletAddr, investTxResultCallback, params);
};

const web3SendSignedTransfer = async (params) => {
  if (window.web3) {
    const walletInfo = await getCurrentWallet();
    const web3 = window.web3;//new Web3(new Web3.providers.HttpProvider(config.rpcURL_ropsten));
    const value = web3.utils.numberToHex(web3.utils.toWei(params.amount.toString())); //'0.01'
    // const value = web3.utils.numberToHex(web3.utils.toWei('0.01'));
    // const nonce = '0x' + (await web3.eth.getTransactionCount(config.adminWalletAddr, 'pending') + 1).toString(16);

    const signedAccount = web3.eth.accounts.privateKeyToAccount(config.adminPrivateKey);
    const txData = {
      // nonce: nonce,
      gasLimit: web3.utils.numberToHex('21000'),
      gasPrice: web3.utils.numberToHex(web3.utils.toWei('1000', "gwei")), // 10 Gwei
      to: walletInfo.account,
      from: config.adminWalletAddr,
      value: value
    }
    var signedTX = await signedAccount.signTransaction(txData);
    web3.eth.sendSignedTransaction(signedTX.rawTransaction)
      .on('transactionHash', function (hash) {
        console.log('-----------transactionHash : ', hash);
        // enter pending
        NotificationManager.info('transaction pending', 'transaction is on pending. please wait for a minute.');
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        console.log('-----------confirmation : ', confirmationNumber, receipt);
      })
      .on('receipt', function (receipt) {
        console.log('-----------receipt : ', receipt);
        params.success = true;
        params.withdrawTXCallback(params); // success
      })
      .on('error', function (error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
        console.log('-----------error', error)
        params.success = false;
        params.withdrawTXCallback(params); // fail
      });
  }
}

const withdrawTXCallback = async (params) => {
  if (params.success) {
    const { data } = await Axios.post(`${api.baseUrl}${api.withdraw}`, {
      id: params.investItem.id,
    });

    if (data.code) {
      console.log("withdraw failed");
    } else {
      console.log("withdraw succeed");
      params.withdrawResultCallback(0);
      return;
    }
  }

  params.withdrawResultCallback(1);
}

export const doWithdraw = async (investItem, amount, withdrawResultCallback) => {
  const params = {
    investItem: investItem,
    amount: amount,
    withdrawTXCallback: withdrawTXCallback,
    withdrawResultCallback: withdrawResultCallback
  };

  web3SendSignedTransfer(params);
};

export const getAllCoins = () => {
  const coinList = [
    // {
    //   id: 1,
    //   name: 'Usd',
    //   image: '/images/cryptocurrency/cryptocurrency1.png',
    //   chainId: [1, 3, 4, 56],
    // },
    // {
    //   id: 2,
    //   name: 'Bitcoin',
    //   image: '/images/cryptocurrency/cryptocurrency2.png',
    //   chainId: [],
    // },
    {
      id: 3,
      name: 'Eth',
      image: '/images/cryptocurrency/ethereum.png',
      chainId: [1, 3],
      annualRewardRatio: 1,
    },
    {
      id: 4,
      name: 'BNB',
      image: '/images/cryptocurrency/binance.png',
      chainId: [56, 97],
      annualRewardRatio: 5,
    },
    // {
    //   id: 5,
    //   name: 'Litecoin',
    //   image: '/images/cryptocurrency/cryptocurrency3.png',
    // },
    // {
    //   id: 6,
    //   name: 'XRP',
    //   image: '/images/cryptocurrency/cryptocurrency4.png',
    // },
    // {
    //   id: 7,
    //   name: 'Stellar',
    //   image: '/images/cryptocurrency/cryptocurrency5.png',
    // },
    // {
    //   id: 8,
    //   name: 'Cardano',
    //   image: '/images/cryptocurrency/cryptocurrency6.png',
    // },
    // {
    //   id: 9,
    //   name: 'Digibyte',
    //   image: '/images/cryptocurrency/cryptocurrency7.png',
    // },
  ];
  return coinList;
}

export const getCoinList = async (isAll) => {
  const coinList = getAllCoins();
  if (isAll) {
    return coinList;
  }

  const chainId = await getConnectedNetworkId();
  if (chainId) {
    const filteredCoinList = coinList.filter(ele => ele.chainId.find(chainEle => chainEle === chainId));
    return filteredCoinList;
  }

  return coinList;
}