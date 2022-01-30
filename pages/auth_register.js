import Link from 'next/link';
import RegisterForm from '../components/Authentication/RegisterForm';

const Authentication = () => {
    return (
        <>
            <div className='profile-authentication-area'>
                <div className='d-table'>
                    <div className='d-table-cell'>
                        <div className='container'>
                            <RegisterForm />
                        </div>
                    </div>
                </div>
                <Link href='/'>
                    <a className='back-icon'>
                        <i className='bx bx-x'></i>
                    </a>
                </Link>
            </div>
        </>
    );
};

export default Authentication;
