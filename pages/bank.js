import UserInfo from './UserInfo'
import Invest from './Invest'
import TransactionHistory from './TransactionHistory'

const Bank = () => {

    return (
        <>
            <div className='d-flex bank-area'>
                <div className='col-lg-4'>
                    <UserInfo />
                </div>
                <div className='col-lg-8'>
                    <Invest />
                    <TransactionHistory />
                </div>
            </div>
        </>
    );
};

export default Bank;
