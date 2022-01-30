import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { fetchInvestList, updateInvestList, setBankingActionFlag } from "../my_store/actions/thunks";
import * as selectors from '../my_store/selectors';
import { doWithdraw, getAllCoins } from "../core/web3";
import { NotificationManager } from 'react-notifications'
import moment from 'moment';
import constants from "../core/constants"


const TransactionHistory = () => {

    const dispatch = useDispatch();
    const investListState = useSelector(selectors.investListsState);
    const investList = investListState.data ? investListState.data : null;
    const investListUpdatedState = useSelector(selectors.investListsUpdatedState);
    const lockDayList = [7, 14, 30, 60, 90];
    const signState = useSelector(selectors.signin);
    const coinList = getAllCoins();
    const [nowTimeSvr, setNowTimeSvr] = useState(0);
    const bankingActionFlagState = useSelector(selectors.bankingActionFlagState);

    // timer
    useEffect(() => {
        const id = setInterval(() => setNowTimeSvr(nowTimeSvr + 1000), 1000); // ✅ This doesn't depend on `count` variable outside
        return () => clearInterval(id);
    });

    //paginate
    const [pageNumber, setpageNumber] = useState(1);
    const [rowsInPage, setRowsPerPage] = useState(5);
    const [pageCount, setPageCount] = useState(1);

    useEffect(() => {
        if (investList) {
            setNowTimeSvr((new Date(investList.curDate)).getTime());
        }
        if (rowsInPage === 0 || !investList) {
            setPageCount(1);
        } else {
            let pgCnt = Math.ceil(investList.totalCount / rowsInPage);
            if (pgCnt <= 0) {
                pgCnt = 1;
            }
            setPageCount(pgCnt);
            if (pageNumber > pgCnt) {
                setpageNumber(1);
            }
        }
    }, [rowsInPage, investList, investListUpdatedState]);

    useEffect(() => {
        const startNum = (pageNumber - 1) * rowsInPage;
        dispatch(fetchInvestList(startNum, rowsInPage));
    }, [dispatch, pageNumber, rowsInPage, investListUpdatedState]);

    const changePage = ({ selected }) => {
        setpageNumber(selected + 1);
    };

    const onOptionChanged = (event) => {
        setpageNumber(1);
        setRowsPerPage(Number(event.target.value));
    };

    const getLockedTimes = (oneInvest) => {
        // const lockMS = lockDayList[oneInvest.deposit_period - 1] * 3600 * 24 * 1000;
        const lockMS = lockDayList[oneInvest.deposit_period - 1] * 10 * 1000;
        return lockMS;
    }

    const widrawStatusList = {
        otherUser: 0,
        lockedPeroid: 1,
        withdrawed: 2,
        notWithdrawed: 3,
    }

    const getWithdrawStatus = (oneInvest) => {
        if (signState.data && signState.data.user_info && signState.data.user_info.id != oneInvest.user_id) {
            return widrawStatusList.otherUser;
        }
        const investDateObj = new Date(oneInvest.deposit_time);
        // for test
        const lockMS = getLockedTimes(oneInvest);//lockDayList[oneInvest.deposit_period - 1] * 10 * 1000;

        if (investDateObj.getTime() + lockMS < nowTimeSvr) {
            return widrawStatusList.lockedPeroid;
        }
        if (oneInvest.withdraw_time) {
            return widrawStatusList.withdrawed;
        }

        return widrawStatusList.notWithdrawed;
    }

    const withdrawResultCallback = async (result) => {
        if (result) {
            NotificationManager.error('withdraw failed.', "Failed");
        } else {
            dispatch(updateInvestList(investListUpdatedState.data));
            NotificationManager.success('withdraw succeeded.', "Success");
        }

        dispatch(setBankingActionFlag(true));
    }

    const withdrawButtonPressed = async (investItem) => {
        dispatch(setBankingActionFlag(false));

        // calc reward
        const coinItem = coinList.find(element => element.id === investItem.coin_id);
        // fee 0.1%
        // reward - fee
        const rewardRatio = investItem.deposit_period * coinItem.annualRewardRatio / 90;
        let amount = investItem.amount * (1 + (rewardRatio / 100));
        amount = amount * (1 - constants.TxFee / 100);

        NotificationManager.info('Withdraw starting...');
        doWithdraw(investItem, amount, withdrawResultCallback);
    };

    const coinNameFromID = (coinID) => {
        const coinItem = coinList.find(element => element.id === coinID);
        if (coinItem) {
            return coinItem.name;
        } else {
            return "Non";
        }
    }

    let wdStatus = 0;

    const getRestTime = (investItem) => {
        const startTime = new Date(investItem.deposit_time);
        const curTime = new Date(nowTimeSvr);
        let pastTime = curTime.getTime() - startTime.getTime();
        // pastTime = Math.floor(pastTime / 1000);
        // pastTime = 59 * 1000;

        let restTimeStr = lockDayList[investItem.deposit_period - 1].toString();
        const lockedTimes = getLockedTimes(investItem);
        if (lockedTimes - (60 * 1000) < pastTime && pastTime < lockedTimes) {
            const restTime = Math.floor((lockedTimes - pastTime) / 1000);
            restTimeStr += " (" + restTime + " s)";
        }

        return restTimeStr;
    }

    return (
        <div>
            <section className='container'>
                <div className="d-flex" style={{ justifyContent: 'space-between' }}>
                    <h3>Transaction History</h3>

                    <div className='price-filter'>
                        <div className='col-md-2 price-select'>
                            <span>Show</span>
                            <select className='form-select price-form-select' style={{ width: '100px' }} value={rowsInPage} onChange={onOptionChanged}>
                                <option value='5'>5</option>
                                <option value='10'>10</option>
                                <option value='15'>15</option>
                                <option value='20'>20</option>
                            </select>{' '}
                            <span>Entries</span>
                        </div>
                    </div>
                </div>

                <div className='cryptocurrency-table table-responsive' style={{ marginTop: '20px' }}>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th scope='col' style={{ textAlign: 'center' }}>User</th>
                                <th scope='col' style={{ textAlign: 'center' }}>Date</th>
                                <th scope='col' style={{ textAlign: 'center' }}>Amount</th>
                                <th scope='col' style={{ textAlign: 'center' }}>LockDays</th>
                                <th scope='col' style={{ textAlign: 'center' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {investList && investList.data && investList.data.map((oneInvest, index) => (
                                <tr key={index}>
                                    <td style={{ textAlign: 'center' }}>{oneInvest.name}</td>
                                    <td style={{ textAlign: 'center' }}>{moment(oneInvest.deposit_time).format('YYYY-MM-DD')}</td>
                                    <td style={{ textAlign: 'center' }}>{oneInvest.amount + " " + coinNameFromID(oneInvest.coin_id)}</td>
                                    <td style={{ textAlign: 'center' }}>{getRestTime(oneInvest)}</td>
                                    <td style={{ textAlign: 'center' }}>
                                        {(wdStatus = getWithdrawStatus(oneInvest)) === widrawStatusList.lockedPeroid ? (
                                            <i className="fa fa-lock" aria-hidden="true"></i>
                                        ) : wdStatus === widrawStatusList.withdrawed ? (
                                            <i className="fa fa-times" aria-hidden="true"></i>
                                        ) : wdStatus === widrawStatusList.otherUser ? (
                                            <i className="fa fa-user-times" aria-hidden="true"></i>
                                        ) : (
                                            <button className="btn-normal" style={{ padding: "4px 16px 4px 16px" }} disabled={!bankingActionFlagState.data} onClick={(e) => withdrawButtonPressed(oneInvest)}>
                                                Withdraw
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className='count-pagination justify-content-center'>
                        {/* <p className='price-count'>
                            Showing 1 to {rowsInPage} of {investList ? investList.totalCount : 1} entries
                        </p> */}

                        <div className='pagination'>
                            <ReactPaginate
                                previousLabel={'<'}
                                nextLabel={'>'}
                                pageCount={pageCount}
                                onPageChange={changePage}
                                activeClassName='current'
                            />
                        </div>
                    </div>
                </div>

            </section>
        </div>
    );
};

export default TransactionHistory;
