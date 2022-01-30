import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as selectors from '../my_store/selectors';
import { doInvest, getCoinList, getConnectedNetworkId } from '../core/web3'
import constants from '../core/constants'
import { updateInvestList, setBankingActionFlag } from "../my_store/actions/thunks";
import { NotificationManager } from 'react-notifications'
import { StyledEngineProvider } from '@mui/material/styles';


import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';

const options = [
    'None',
    'Atria',
    'Callisto',
    'Dione',
    'Ganymede',
    'Hangouts Call',
    'Luna',
    'Oberon',
    'Phobos',
    'Pyxis',
    'Sedna',
    'Titania',
    'Triton',
    'Umbriel',
];


function ConfirmationDialogRaw(props) {
    const { onClose, open, ...other } = props;

    const handleCancel = () => {
        onClose();
    };

    const handleOk = () => {
        onClose(1);
    };

    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
            maxWidth="xs"
            open={open}
            {...other}
        >
            <DialogTitle>Invest Approve</DialogTitle>
            <DialogContent dividers>
                <h6>Are you sure you want to approve to transfer tokens from your wallet?</h6>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCancel}>
                    Cancel
                </Button>
                <Button onClick={handleOk}>Confirm</Button>
            </DialogActions>
        </Dialog>
    );
}


const Invest = () => {

    const [lockToggleState, setLockToggleState] = useState(1);

    const toggleLockTab = (index) => {
        setLockToggleState(index);
    };

    const [_amount, setAmount] = useState(0.01);

    const [clicked, setClicked] = useState(0);
    const [toggleState, setToggleState] = useState(false);

    // const coinList = getCoinList();
    const [coinList, setCoinList] = useState([]);
    const [coinName, setCoinName] = useState("");
    const [coinImage, setCoinImage] = useState("");

    useEffect(async () => {
        const tmpList = await getCoinList();
        setCoinList(tmpList);

        if (tmpList.length > 0) {
            setCoinName(tmpList[0].name);
            setCoinImage(tmpList[0].image);
        }
    });

    const toggleTabOne = () => {
        setToggleState(!toggleState);
    };

    const toggleSelected = (cat, index) => {
        if (clicked === index) {
            return;// setClicked(null);
        }
        setClicked(index);
        setCoinName(cat.name);
        setCoinImage(cat.image);
    };

    const [openConfirmDlg, setOpenConfirmDlg] = useState(false);
    const handleCloseConfirmDlg = (isOk) => {
        setOpenConfirmDlg(false);

        if (isOk) { // ok
            onInvestPressed();
        }
    };

    const bankingActionFlagState = useSelector(selectors.bankingActionFlagState);

    const dispatch = useDispatch();
    const investListUpdatedState = useSelector(selectors.investListsUpdatedState);
    const signState = useSelector(selectors.signin);
    const onInvestedResultCallback = async (status) => {
        if (status != constants.TxSuccess) {
            if (status === constants.TxPending) {
                NotificationManager.info("Transaction is on pending. Wait for a minute.");
            } else if (status === constants.TxRejected) {
                NotificationManager.info('Transaction Rejected.');
                dispatch(setBankingActionFlag(true));
            } else {
                NotificationManager.error('Invest failed.');
                dispatch(setBankingActionFlag(true));
            }
        } else {
            dispatch(setBankingActionFlag(true));
            dispatch(updateInvestList(investListUpdatedState.data));
            NotificationManager.success('invest succeeded.');
        }
    }
    const checkInvestableCurCoin = async (coin_idx) => {
        const chainId = await getConnectedNetworkId();
        if (coinList.length === 0) {
            NotificationManager.error("", "Please check connected network");
            return false;
        }
        if (coinList[coin_idx].chainId && coinList[coin_idx].chainId.find(element => element === chainId)) {
            return true;
        } else {
            NotificationManager.error("Can't be invest current coins. please other coin");
            return false;
        }
    }
    const onInvestPressed = async () => {
        const isPossible = await checkInvestableCurCoin(clicked);
        if (isPossible) {
            dispatch(setBankingActionFlag(false));
            doInvest(signState.data.user_info.id, _amount, coinList[clicked].id, lockToggleState, onInvestedResultCallback);
        }
    };

    return (
        <div>
            <section className='container'>
                <div className="row">
                    {/* <div className="col-lg-6" style={{ whiteSpace: 'nowrap' }}> */}
                    <div className="col-lg-6">
                        <h3 style={{ marginTop: '20px' }}>Lock Duration</h3>

                        <div className='faq-accordion' style={{ marginTop: '20px' }}>
                            <ul className='nav nav-tabs' id='myTab' role='tablist' style={{ marginBottom: '20px', whiteSpace: 'nowrap' }}>
                                <li className='nav-item' role='presentation'>
                                    <button
                                        className={lockToggleState === 1 ? 'nav-link active' : 'nav-link'}
                                        onClick={() => toggleLockTab(1)}
                                        type='button'
                                        role='tab'
                                        aria-controls='novis-direct'
                                        aria-selected='true'
                                    >
                                        7 Days
                                    </button>
                                </li>
                                <li className='nav-item' role='presentation'>
                                    <button
                                        className={lockToggleState === 2 ? 'nav-link active' : 'nav-link'}
                                        onClick={() => toggleLockTab(2)}
                                        type='button'
                                        role='tab'
                                        aria-controls='account'
                                        aria-selected='false'
                                    >
                                        14 Days
                                    </button>
                                </li>
                                <li className='nav-item' role='presentation'>
                                    <button
                                        className={lockToggleState === 3 ? 'nav-link active' : 'nav-link'}
                                        onClick={() => toggleLockTab(3)}
                                        type='button'
                                        role='tab'
                                        aria-controls='orders'
                                        aria-selected='false'
                                    >
                                        30 Days
                                    </button>
                                </li>
                                <li className='nav-item' role='presentation'>
                                    <button
                                        className={lockToggleState === 4 ? 'nav-link active' : 'nav-link'}
                                        onClick={() => toggleLockTab(4)}
                                        type='button'
                                        role='tab'
                                        aria-controls='usage-guides'
                                        aria-selected='false'
                                    >
                                        60 Days
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div className='faq-accordion'>
                            <ul className='nav nav-tabs' id='myTab' role='tablist' style={{ marginBottom: '10px' }}>
                                <li className='nav-item' role='presentation' style={{ width: '96%' }}>
                                    <button
                                        style={{ width: '100%' }}
                                        className={lockToggleState === 5 ? 'nav-link active' : 'nav-link'}
                                        onClick={() => toggleLockTab(5)}
                                        type='button'
                                        role='tab'
                                        aria-controls='novis-direct'
                                        aria-selected='true'
                                    >
                                        90 Days
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='col-lg-6'>
                        <h3 style={{ marginLeft: '40px', marginTop: '20px' }}>Invest</h3>
                        <div className='trade-cryptocurrency-box' style={{ paddingTop: '6px' }}>
                            <div className='currency-selection'>
                                <label>Amount</label>
                                <input type='number' value={_amount} onChange={(event) => setAmount(event.target.value)} />

                                <div
                                    className={toggleState ? 'dropdown show' : 'dropdown'}
                                    onClick={() => toggleTabOne()}
                                >
                                    <button
                                        className='dropdown-toggle'
                                        type='button'
                                        data-bs-toggle='dropdown'
                                        aria-expanded='false'
                                    >
                                        <img src={coinImage} alt='image' />
                                        {coinName}

                                        <span>
                                            {toggleState ? (
                                                <i className='bx bx-chevron-up'></i>
                                            ) : (
                                                <i className='bx bx-chevron-down'></i>
                                            )}
                                        </span>
                                    </button>

                                    <ul
                                        className={
                                            toggleState ? 'dropdown-menu show' : 'dropdown-menu'
                                        }
                                        style={{ height: 'auto' }}
                                    >
                                        {coinList.length > 0 &&
                                            coinList.map((cat, index) => (
                                                <li
                                                    key={index}
                                                    onClick={(e) => toggleSelected(cat, index)}
                                                    value='watch'
                                                    className={
                                                        clicked === index
                                                            ? 'option selected focus'
                                                            : 'option'
                                                    }
                                                    style={{ 'cursor': 'pointer' }}
                                                >
                                                    <img src={cat.image} alt='image' />
                                                    {cat.name}
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            </div>
                            <button disabled={!bankingActionFlagState.data}  onClick={(e) => { setOpenConfirmDlg(true) }}>
                                <i className='bx bxs-hand-right'></i> Deposit
                            </button>
                        </div>
                    </div>
                </div>

                <StyledEngineProvider injectFirst>
                    <ConfirmationDialogRaw
                        id="ringtone-menu"
                        keepMounted
                        open={openConfirmDlg}
                        onClose={handleCloseConfirmDlg}
                    />
                </StyledEngineProvider>

            </section>
        </div>
    );
};

export default Invest;
