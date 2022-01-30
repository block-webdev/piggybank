import React, { useState } from 'react';
import PageBanner from '../components/Common/PageBanner';

const Faq = ({ data }) => {
  const [clicked, setClicked] = useState(false);
  const [toggleState, setToggleState] = useState(1);

  const toggle = (index) => {
    if (clicked === index) {
      return setClicked(null);
    }
    setClicked(index);
  };

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <>
      <PageBanner
        pageTitle='Frequently Asked Question'
        pageSubTitle='How can we help you today?'
      />

      <div className='faq-area ptb-100'>
        <div className='container'>
          <div className='faq-accordion'>
            {/* <ul className='nav nav-tabs' id='myTab' role='tablist'>
              <li className='nav-item' role='presentation'>
                <button
                  className={toggleState === 1 ? 'nav-link active' : 'nav-link'}
                  onClick={() => toggleTab(1)}
                  id='novis-direct-tab'
                  data-bs-toggle='tab'
                  data-bs-target='#novis-direct'
                  type='button'
                  role='tab'
                  aria-controls='novis-direct'
                  aria-selected='true'
                >
                  <i className='bx bx-flag'></i>
                  Novis Direct
                </button>
              </li>
              <li className='nav-item' role='presentation'>
                <button
                  className={toggleState === 2 ? 'nav-link active' : 'nav-link'}
                  onClick={() => toggleTab(2)}
                  id='account-tab'
                  data-bs-toggle='tab'
                  data-bs-target='#account'
                  type='button'
                  role='tab'
                  aria-controls='account'
                  aria-selected='false'
                >
                  <i className='bx bx-info-circle'></i>
                  Account
                </button>
              </li>
              <li className='nav-item' role='presentation'>
                <button
                  className={toggleState === 3 ? 'nav-link active' : 'nav-link'}
                  onClick={() => toggleTab(3)}
                  id='orders-tab'
                  data-bs-toggle='tab'
                  data-bs-target='#orders'
                  type='button'
                  role='tab'
                  aria-controls='orders'
                  aria-selected='false'
                >
                  <i className='bx bxs-badge-dollar'></i>
                  Orders
                </button>
              </li>
              <li className='nav-item' role='presentation'>
                <button
                  className={toggleState === 4 ? 'nav-link active' : 'nav-link'}
                  onClick={() => toggleTab(4)}
                  id='usage-guides-tab'
                  data-bs-toggle='tab'
                  data-bs-target='#usage-guides'
                  type='button'
                  role='tab'
                  aria-controls='usage-guides'
                  aria-selected='false'
                >
                  <i className='bx bx-book-open'></i>
                  Usage Guides
                </button>
              </li>
            </ul> */}
            <div className='tab-content' id='myTabContent'>
              <div
                className={
                  toggleState === 1
                    ? 'active show tab-pane fade'
                    : 'tab-pane fade'
                }
                id='novis-direct'
                role='tabpanel'
              >
                <div className='accordion' id='accordionFaq'>
                  {data.map((data, index) => (
                    <div
                      key={index}
                      className='accordion-item'
                      onClick={() => toggle(index)}
                    >
                      <button
                        className='accordion-button'
                        type='button'
                        data-bs-toggle='collapse'
                        data-bs-target='#collapse1'
                        aria-expanded='true'
                        aria-controls='collapse1'
                      >

                        {data.question}
                        <span>
                          {clicked === index ? (
                            <i className='bx bx-chevron-up'></i>
                          ) : (
                            
                            <i className='bx bx-chevron-down'></i>
                          )}
                        </span>
                      </button>
                      <div
                        id='collapse1'
                        className='accordion-collapse collapse show'
                        data-bs-parent='#accordionFaq'
                      >
                        {clicked === index ? (
                          <div className='accordion-body'>
                            <p>{data.answer}</p>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className={
                  toggleState === 2
                    ? 'active show tab-pane fade'
                    : 'tab-pane fade'
                }
                id='account'
                role='tabpanel'
              >
                <div className='accordion' id='accordionFaq2'>
                  {data.map((data, index) => (
                    <div
                      key={index}
                      className='accordion-item'
                      onClick={() => toggle(index)}
                    >
                      <button
                        className='accordion-button'
                        type='button'
                        data-bs-toggle='collapse'
                        data-bs-target='#collapse7'
                        aria-expanded='true'
                        aria-controls='collapseOne'
                      >
                        How can I create an account?
                        <span>
                          {clicked === index ? (
                            <i className='bx bx-chevron-up'></i>
                          ) : (
                            
                            <i className='bx bx-chevron-down'></i>
                          )}
                        </span>
                        
                      </button>
                      <div
                        id='collapse7'
                        className='accordion-collapse collapse show'
                        data-bs-parent='#accordionFaq2'
                      >
                        {clicked === index ? (
                          <div className='accordion-body'>
                            <p>
                              <strong>novis</strong> is always looking for
                              talented <a href='#'>information</a> security and
                              IT risk management professionals who are
                              dedicated, hard working and looking for a
                              challenge. If you are interested in employment
                              with <strong>novis</strong>, a company who values
                              you and your family, visit our careers page.
                            </p>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className={
                  toggleState === 3
                    ? 'active show tab-pane fade'
                    : 'tab-pane fade'
                }
                id='orders'
                role='tabpanel'
              >
                <div className='accordion' id='accordionFaq3'>
                  {data.map((data, index) => (
                    <div
                      key={index}
                      className='accordion-item'
                      onClick={() => toggle(index)}
                    >
                      <button
                        className='accordion-button'
                        type='button'
                        data-bs-toggle='collapse'
                        data-bs-target='#collapse13'
                        aria-expanded='true'
                        aria-controls='collapse13'
                      >
                        What is an order ID and where can I find it?
                        <span>
                          {clicked === index ? (
                            <i className='bx bx-chevron-up'></i>
                          ) : (
                            
                            <i className='bx bx-chevron-down'></i>
                          )}
                        </span>
                      </button>
                      <div
                        id='collapse13'
                        className='accordion-collapse collapse show'
                        data-bs-parent='#accordionFaq3'
                      >
                        {clicked === index ? (
                          <div className='accordion-body'>
                            <p>
                              <strong>novis</strong> is always looking for
                              talented <a href='#'>information</a> security and
                              IT risk management professionals who are
                              dedicated, hard working and looking for a
                              challenge. If you are interested in employment
                              with <strong>novis</strong>, a company who values
                              you and your family, visit our careers page.
                            </p>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className={
                  toggleState === 4
                    ? 'active show tab-pane fade'
                    : 'tab-pane fade'
                }
                id='usage-guides'
                role='tabpanel'
              >
                <div className='accordion' id='accordionFaq4'>
                  {data.map((data, index) => (
                    <div
                      key={index}
                      className='accordion-item'
                      onClick={() => toggle(index)}
                    >
                      <button
                        className='accordion-button'
                        type='button'
                        data-bs-toggle='collapse'
                        data-bs-target='#collapse19'
                        aria-expanded='true'
                        aria-controls='collapse19'
                      >
                        What is an order ID and where can I find it?
                        <span>
                          {clicked === index ? (
                            <i className='bx bx-chevron-up'></i>
                          ) : (
                            
                            <i className='bx bx-chevron-down'></i>
                          )}
                        </span>
                      </button>
                      <div
                        id='collapse19'
                        className='accordion-collapse collapse show'
                        data-bs-parent='#accordionFaq4'
                      >
                        {clicked === index ? (
                          <div className='accordion-body'>
                            <p>
                              <strong>novis</strong> is always looking for
                              talented <a href='#'>information</a> security and
                              IT risk management professionals who are
                              dedicated, hard working and looking for a
                              challenge. If you are interested in employment
                              with <strong>novis</strong>, a company who values
                              you and your family, visit our careers page.
                            </p>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Faq.defaultProps = {
  data: [
    {
      question: 'What is Crypto piggy bank?',
      answer:
        'Crypto piggy bank as the name suggests is just like your traditional piggy bank, here you can save your crypto coins and use our lock feature to lock your coins for however long you like! In Crypto piggy bank you cannot your withdraw your coins before your lock period ends. What more, you can also enjoy staking rewards while HODLing your coins. ',
    },
    {
      question: 'What is locked staking?',
      answer:
        'Locked staking is a very special mechanism where you choose which coins you want to lock, you choose the “lock in” period and click the lock & Stake button. During locked staked period you will not be able to withdraw your coins until the locked period is over. Please note: Only when you lock in your coins for minimum you will be eligible to receive rewards.',
    },
    {
      question: 'When will I earn my rewards?',
      answer:
        'The minimum stake period is for one year, once you stake for one year, your interest rewards will be available at the end of your staking period, during which time your coins will be ready for withdrawal.',
    },
    {
      question:
        'Can I withdraw my coins during staking?',
      answer:
        'No, during lock in period your coins will not be available for withdrawal. You will have to wait until the lock in period is over to withdraw your coins.',
    },
    {
      question: 'When can I withdraw my coins?',
      answer:
        'After the lock in period is over you will be able to withdraw your coins along with the interest rewards.',
    },
    {
      question: 'What is the minimum and maximum staking amount?',
      answer:
        'The minimum staking amount should be $100 worth of cryptocurrency, there is no maximum, Sky is the limit.',
    },
    {
      question: 'How can I earn passive income form Crypto piggy bank?',
      answer:
        'You can earn passive income by staking stable coins like USDC, BUSD, USDT. Our staking rewards are highest in the industry.',
    },
    {
      question: 'Does crypto piggy bank have a native token?',
      answer:
        'Not yet, We do not have a native right now, our team is working on it.',
    },
    {
      question: 'How to open an piggy account?',
      answer:
        'Opening an account with us is very simple, click on the open a new account button, give your name and basic information, verify your email and you are in.',
    },
    {
      question: 'Why can’t I withdraw my coin during staking?',
      answer:
        'Crypto Piggy Bank is founded on the principle of HODLing! Our lock in feature is our USP, many times when we want to trade crypto emotionally based on market volatility we end losing, the house always wins, the ones who actually survive the volatile crypto jungle are the ones who HODL. In a nut shell, We help you HODLing and also help you earn high interest rewards while you are at it, We are your diamond hands.',
    },
    {
      question: 'What are your fees?',
      answer:
        'There is 0.1% transaction fees for deposit and withdrawal.',
    },
    {
      question: 'Is crypto piggy bank audited?',
      answer:
        'Yes, Crypto piggy bank is audited by an external auditing agency, please find the audited report here',
    },
    {
      question: 'Is crypto piggy bank safe?',
      answer:
        'Yes, we take our security very seriously. We use Secure Sockets Layer that encrypts information sent to the server. We also use Sitelock on our website for additional security.',
    },
    {
      question: 'What are the staking rewards you offer?',
      answer:
        'Staking rewards offered by crypto piggy bank are as follows:',
    },
    {
      question: 'What is stable coin staking?',
      answer:
        'By definition, A stable coin is a digital currency that is pegged to a “stable” reserve asset like the U.S. dollar or gold. Stable coins are designed to reduce volatility relative to unpegged cryptocurrencies like Bitcoin. Crypto piggy bank offers the best stable coin staking rewards in the entire crypto space. ',
    },
    {
      question: 'What coins has the highest staking interest rate?',
      answer:
        'Stable coins like BUSD, USDT, USDC, offers the highest staking rewards.',
    },
    {
      question: 'What are the benefits of using Crypto piggy bank?',
      answer:
        'Two main benefits of Crypto piggy bank are:HODL your coins in a secure crypto bank while also earning rewards, Earning passive income on your stable coin deposits.',
    },
    {
      question: 'How does Crypto piggy bank differ from other staking platforms?',
      answer:
        'Cryptopiggybank remains one of the few retail focused platforms that offer a HODL locked investment strategy as we do, as well as offer high stable coins staking rewards. One other platform in the crypto space offers as high interest rates as we do. ',
    },
    {
      question: 'What is HODLing?',
      answer:
        '“HODL” is a term that is often used in the Bitcoin investment community. “Hodling” refers to the buy-and-hold strategy. Buy-and-hold investors tend to hold their assets for an extended period of time to profit from the long-term value appreciation. The “hodling” strategy helps investors avoid realizing loss from the short-term volatility of cryptocurrencies and gain returns from long-term value appreciation.',
    },
    {
      question: 'Do you offer affiliation?',
      answer:
        'Since starting the public program, an Affiliation program to reward our members has been a feature. After registering with cryptopiggybank.pro you will get a Referral/Affiliate Link that pays you 5% of whatever your referrals deposit.',
    },
    {
      question: 'Can I partner with you ?',
      answer:
        'If you are a business who are looking for collaboration with us or if you want us to list your coin please email us at info@cryptopiggybank.pro',
    },
    {
      question: 'Why Trust Crypto piggy bank ?',
      answer:
        'We believe every in finical freedom for everyone and we think it is possible in crypto, our business model depends on your success, ours is a more retail focused approach by combining defi and cefi and bringing you the best interest rates in the market to grow your investment. Despite our headline INTREST rates, we are not trying to be a get-rich-quick scheme. Rather, we are a community of crypto enthusiasts looking to grow together. Become part of the family. Join Now!',
    },
    {
      question: 'How can I transfer coins to Crypto piggy bank?',
      answer:
        'Just click the coins you want to deposit in your dash board, you will see the deposits address, use the deposit address to deposit crypto into your account.',
    },
    {
      question: 'How can I withdraw coins form my piggy bank account?',
      answer:
        'Once the lock period is over, your coins will be ready for withdrawal, click on the withdraw button in your dash board, paste the deposit address and withdraw your coin.',
    },
    {
      question: 'Is there a piggy bank app I can download on my Android/IOS phone ?',
      answer:
        'As of now we do not have a mobile app, our team is working on it.',
    },
    {
      question: 'What are the risk and contingencies?',
      answer:
        'We strive for optimal security and trustworthiness and handle your deposits alongside our own with the same level of security. Our investment strategy is straightforward and proven. but attacks can happen and hackers are always trying to intrude in weak points. We are well equipped to withstand such threats but the danger is there and should be communicated.Some cryptocurrencies can loose value quicker than new coins are generated. we are very selective and with experience you learn what coins are worth holding and which are not. Lastly since this has never been done in the history there could be unforeseen circumstances happening and laws made that would prevent us from doing what we do (Force majeure).',
    },
    {
      question: 'How does compounding work?',
      answer:
        'Also known as "eighth wonder of the world" by Albert Einstein, compound interest is not always understood, but crucially important. Nowhere less so than in the protection of your hard-earned money. When comparing investment returns of stocks, bonds, bank deposits, real estate, gold, or cryptocurrency, you must compare them not by the gross return, but by the compound return. Compounding allows your deposit to grow very fast. In cryptopiggybank Each Deposit is locked for 12 months minimum (This applies also for every compounded amount as it’s counted as a deposit in itself).You can choose how much you like to compound with locked staking. It is entirely up to you. Some like to withdraw all earnings, some compound upwards for a while and withdraw then, Its your money so you decide!',
    },
    {
      question: 'How is crypto piggy bank able to pay interest on crypto held on the platform?',
      answer:
        'As part of our diversified investment strategy, we invest in regulated equities and predominately CFTC- regulated futures, as well as crypto master nodes to earn yield.',
    },
    {
      question: 'What does the timer in the dashboard indicate?',
      answer:
        'The timer indicates the Lock in period, it shows you up to what time your crypto will be locked, once your timer is complete you can withdraw your funds.',
    },
    {
      question: 'Are you regulated?',
      answer:
        'No, we are not regulated yet, we are working on it. As cryptocurrencies get slowly accepted and recognized around the world we soon hope to be regulated organization.',
    },
  ],
};

export default Faq;
