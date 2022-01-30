import PageBanner from '../components/Common/PageBanner';

const Contact = () => {
  return (
    <>
      <PageBanner
        pageTitle='Contact US'
        pageSubTitle='Contact us with your details & ready to start with us.'
      />

      <div className='contact-area ptb-100'>
        <div className='container'>
          <div className='contact-form'>
            <div className='section-title'>
              <h2>Get In Touch!</h2>
              <p style={{ textAlign: 'left' }}>
                Let us know what you’re looking for one of our client service specialists will personally review and respond to your email.
              </p>
              <p>
                support@cryptopiggybank.pro
              </p>
              <p style={{ textAlign: 'left' }}>
                Please note:
              </p>
              <h5>
                Our Customer Care team will never ask you to:
              </h5>
              <p style={{ textAlign: 'left' }}>
                1. Share your password. You should never share this information with anyone!
              </p>
              <p style={{ textAlign: 'left' }}>
                2. Transfer coins to an unknown wallet.
              </p>
              <p style={{ textAlign: 'left' }}>
                3. Install any remote sign-in software on your computer or send you links with any kind of
                software to install.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
