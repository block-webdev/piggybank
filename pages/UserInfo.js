import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as selectors from '../my_store/selectors';
import { connectWallet, getCurrentWallet, getWalletAssets } from '../core/web3'


const UserInfo = () => {
    const [walletAddress, setWallet] = useState("");
    const signState = useSelector(selectors.signin);
    const bankingActionFlagState = useSelector(selectors.bankingActionFlagState);

    useEffect(() => {
        connectWallet().then((result) => {
            setWallet(result.address);
        });
        addWalletListener();
    }, [bankingActionFlagState]);

    const [walletAssets, setWalletAssets] = useState({eth: 0, bnb: 0});
    useEffect(() => {
        if (walletAddress && walletAddress.length > 0) {
            getWalletAssets(walletAddress).then((result) => {
                setWalletAssets(result);
            });
        }
    });

    function addWalletListener() {
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", (accounts) => {
                if (accounts.length > 0) {
                    setWallet(accounts[0]);
                } else {
                    setWallet("");
                }
            });

            window.ethereum.on('chainChanged', function (chainId) {

            });
        } else {
            console.log('You must install Metamask, a virtual Ethereum wallet, in your browser.');
        }
    }

    return (
        <div className="userinfo-area">
            <section className='container invest-withdraw-back'>
                <div className="profile_avatar justify-content-center">
                    <i className="fas fa-user" style={{ fontSize: '60px', color: '#82c91e' }}></i>
                    {/* <img src="/images/user/user1.jpg" alt="" /> */}
                </div>
                {/* <div className="profile_name justify-content-center" style={{ marginTop: '14px' }}>
                    <span id="wallet" className="profile_wallet">Your Balance</span>
                </div> */}
                <h2 style={{ textAlign: 'center', marginTop: '12px' }}>
                    {(signState.data && signState.data.user_info) ? signState.data.user_info.name : ""}
                </h2>
                <br /> <br />
                <div className='container'>
                    <h4 style={{ textAlign: 'center' }}>Wallet Address</h4>
                    <div style={{ textAlign: 'center' }}>{walletAddress.slice(0, 10) + "..." + walletAddress.slice(33)}</div>
                    <br />
                    {/* <div style={{ textAlign: 'center' }}>0x12456789123456789123456789</div> */}
                    <div className="asset-area">
                        <div className='single-cryptocurrency-item'>
                            <div className='d-flex align-items-center'>
                                <img src='/images/cryptocurrency/ethereum.png' alt='image' />
                                <div className='title'>
                                    <h3>Ethereum</h3>
                                </div>
                                <div className='title'>
                                    <span className='sub-title'>
                                        ETH - <span>{walletAssets.eth}</span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className='single-cryptocurrency-item'>
                            <div className='d-flex align-items-center'>
                                <img src='/images/cryptocurrency/binance.png' alt='image' />
                                <div className='title'>
                                    <h3>Binance</h3>
                                </div>
                                <div className='title'>
                                    <span className='sub-title'>
                                        BNB - <span>{walletAssets.bnb}</span>
                                    </span>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </section>
        </div>
    );
};

export default UserInfo;
