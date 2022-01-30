import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Link from '../../utils/ActiveLink';
import { signOut } from '../../my_store/actions/thunks/signin_up';
import * as selectors from '../../my_store/selectors';
import { NotificationManager } from 'react-notifications';
import { getCurrentWallet } from '../../core/web3'


const NavbarTwo = () => {
  const [showMenu, setshowMenu] = useState(false);

  const toggleMenu = () => {
    setshowMenu(!showMenu);
  };

  const router = useRouter();

  // useEffect(() => {
  //   let elementId = document.getElementById('navbar');
  //   document.addEventListener('scroll', () => {
  //     if (window.scrollY > 170) {
  //       elementId.classList.add('is-sticky');
  //     } else {
  //       elementId.classList.remove('is-sticky');
  //     }
  //   });
  //   window.scrollTo(0, 0);
  // }, []);

  const signState = useSelector(selectors.signin);
  const dispatch = useDispatch();
  const onSignOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    dispatch(signOut());
    router.push("/");
  }

  const onBankClicked = async (e) => {
    // e.preventDefault();

    // const data = await getCurrentWallet();
    // if (data.success === false) {
    //   e.preventDefault();
    //   NotificationManager.error('Please connect to wallet.', "Disconnected");
    // } else {
    //   router.push('/bank');
    // }
  }

  return (
    <>
      <div id='navbar' className='navbar-area navbar-style-two'>
        <div className='raimo-responsive-nav'>
          <div className='container'>
            <div className='raimo-responsive-menu'>
              <div onClick={() => toggleMenu()} className='hamburger-menu'>
                {showMenu ? (
                  <i className='bx bx-x'></i>
                ) : (
                  <i className='bx bx-menu'></i>
                )}
              </div>
              <div className='logo'>
                <Link href='/'>
                  <a>
                    <img src='/images/logo.png' alt='logo' />
                  </a>
                </Link>
              </div>
              <div className='responsive-others-option'>
                <div className='d-flex align-items-center'>
                  <div className='option-item'>
                    <Link href='/authentication' activeClassName='active'>
                      <a className='login-btn'>
                        <i className='bx bx-log-in'></i>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <nav className={showMenu ? 'show navbar navbar-expand-md navbar-light' : 'navbar navbar-expand-md navbar-light hide-menu'}>
          <div className='container'>
            <Link href='/'>
              <a className='navbar-brand'>
                <img src='/images/logo.png' alt='logo' />
              </a>
            </Link>
            <div className='collapse navbar-collapse mean-menu'>
              <ul className='navbar-nav'>
                <li className='nav-item'>
                  <Link href='/' activeClassName='active'>
                    <a className='nav-link'>Home</a>
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link href='/bank' activeClassName='active'>
                    <a className='nav-link' onClick={onBankClicked}>Bank</a>
                  </Link>
                </li>
                {(signState.data && signState.data.code == 0 && signState.data.user_info.isAdmin) && (
                  <li className='nav-item'>
                    <Link href='/chat' activeClassName='active'>
                      <a className='nav-link' onClick={onBankClicked}>Chat</a>
                    </Link>
                  </li>
                )}
                <li className='nav-item'>
                  <Link href='/about' activeClassName='active'>
                    <a className='nav-link'>
                      About Us
                    </a>
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link href='/faq1' activeClassName='active'>
                    <a className='nav-link'>
                      FAQ
                    </a>
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link href='/contact' activeClassName='active'>
                    <a className='nav-link'>
                      Contact Us
                    </a>
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link href='/passive_income' activeClassName='active'>
                    <a className='nav-link'>Earn Passive Income</a>
                  </Link>
                </li>
              </ul>
              <div className='others-option'>
                {(signState.data && signState.data.code == 0) ? (
                  <div className='d-flex align-items-center'>
                    <div className='option-item'>
                      <Link
                        href='/'
                        activeClassName='active'
                      >
                        <a className='login-btn' onClick={onSignOut}>
                          <i className='bx bx-log-out'></i> Logout
                        </a>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className='d-flex align-items-center'>
                    <div className='option-item'>
                      <Link
                        href='/authentication'
                        activeClassName='active'
                      >
                        <a className='login-btn'>
                          <i className='bx bx-log-in'></i> Login
                        </a>
                      </Link>
                    </div>
                    <div className='option-item'>
                      <Link
                        href='/auth_register'
                        className='register-btn'
                        activeClassName='active'
                      >
                        <a className='register-btn'>
                          <i className='bx bxs-user'></i> Register
                        </a>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default NavbarTwo;
