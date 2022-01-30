import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { getAllCoins } from "../../core/web3";
import constants from '../../core/constants';




const Banner = () => {

  const [name, setName] = useState('Eth');

  //converter hook
  const [cryptoQuantity, setcryptoQuantity] = useState(0);

  const coinList = getAllCoins();
  const [total_earnings, setTotalEarnings] = useState(0);
  const calcTotalEarnings = () => {
    // calc reward
    const coinItem = coinList.find(element => element.id === coinList[clicked].id);
    // fee 0.1%
    // reward - fee
    const rewardRatio = lockDays * coinItem.annualRewardRatio / 90;
    let amount = cryptoQuantity * (1 + (rewardRatio / 100));
    amount = amount * (1 - constants.TxFee / 100);

    setTotalEarnings(amount);
  }


  const [image, setImage] = useState(
    '/images/cryptocurrency/ethereum.png'
  );

  const [clicked, setClicked] = useState(0);
  const [toggleState, setToggleState] = useState(false);

  const toggleTabOne = () => {
    setToggleState(!toggleState);
  };

  const toggleSelected = (cat, index) => {
    if (clicked === index) {
      return setClicked(0);
    }
    setClicked(index);
    setName(cat.name);
    setImage(cat.image);
  };

  const [lockDays, setLockDays] = useState(7);
  const handleLockDaysChange = (event) => {
    setLockDays(event.target.value);
  };

  const handleDepositAmountChange = (event) => {
    setcryptoQuantity(event.target.value);
  };

  useEffect(() => {
    calcTotalEarnings();
  }, [lockDays, clicked, cryptoQuantity]);

  return (
    <>
      <div className='main-banner-area'>
        <div className='container'>
          <div className='main-banner-box'>
            <div className='currency-selection'>
              <label>Deposit Amount</label>
              <input
                type='text'
                value={cryptoQuantity}
                onChange={handleDepositAmountChange}
              // onChange={(e) => setcryptoQuantity(e.target.value)}
              />
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
                  <img src={image} alt='image' />
                  {name}

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
                    coinList.map((data, index) => (
                      <li
                        key={index}
                        onClick={(e) => toggleSelected(data, index)}
                        value='watch'
                        className={
                          clicked === index ? 'option selected focus' : 'option'
                        }
                      >
                        <div className='coin-wrapper'>
                          <img src={data.image} alt='image' />
                          <span className='coin-name'> {data.name} </span>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </div>

            <FormControl className='home-lock-duration-box'>
              <FormLabel id="demo-row-radio-buttons-group-label" style={{ marginLeft: '8px', marginTop: '5px', color: '#666666' }}>Lock Duration (Days)</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={lockDays}
                onChange={handleLockDaysChange}
                style={{ justifyContent: 'space-around' }}
              >
                <FormControlLabel value={7} control={<Radio />} label="7" />
                <FormControlLabel value={14} control={<Radio />} label="14" />
                <FormControlLabel value={30} control={<Radio />} label="30" />
                <FormControlLabel value={60} control={<Radio />} label="60" />
                <FormControlLabel value={90} control={<Radio />} label="90" />
              </RadioGroup>
            </FormControl>

            <div className='home-earning-area'>
              <h6>Total Crypto Earnnigs</h6>
              <div className='d-flex' style={{ alignItems: 'center' }}>
                <img src={image} alt='image' style={{ width: '35px', height: '35px' }} />
                <span className='earning-value' > {total_earnings} </span>
              </div>
            </div>
          </div>


          <div className='row align-items-center m-0'>
            <div className='col-xl-6 col-lg-6 col-md-12 p-0'>
              <div className='main-banner-content'>
                <h1>Crypto Piggy Bank</h1>
                <p>

                </p>
                {/* <Link href='/'>
                  <a className='default-btn' onClick={() => onConnectWallet() }>
                    <i className='bx bxs-user'></i> Connect Wallet
                  </a>
                </Link> */}
              </div>
            </div>
            <div className='col-xl-4 col-lg-12 col-md-12 p-0'>
              <div className='main-banner-image'>
                <img src='/images/banner/banner-img1.png' alt='image' />
              </div>
            </div>
          </div>
        </div>
        <div className='shape1'>
          <img src='/images/shape/shape1.png' alt='image' />
        </div>
        <div className='shape2'>
          <img src='/images/shape/shape2.png' alt='image' />
        </div>
        <div className='shape3'>
          <img src='/images/shape/shape3.png' alt='image' />
        </div>
        <div className='shape5'>
          <img src='/images/shape/shape5.png' alt='image' />
        </div>
        <div className='shape9'>
          <img src='/images/shape/shape9.png' alt='image' />
        </div>
      </div>
    </>
  );
};

export default Banner;
