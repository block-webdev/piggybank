import Link from 'next/link';

const Footer = () => {
  return (
    <>
      <footer className='footer-area'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-lg-4 col-sm-6 col-md-6'>
              <div className='single-footer-widget'>
                <a href='index.html' className='d-inline-block logo'>
                  <img src='/images/logo.png' alt='logo' />
                </a>
                <div className='newsletter-form'>
                  <p>SUBSCRIBE TO OUR NEWSLETTER</p>
                  <form data-toggle='validator'>
                    <input
                      type='email'
                      className='input-newsletter'
                      placeholder='Enter your email'
                      name='EMAIL'
                      required
                      autoComplete='off'
                    />
                    <button type='submit'>
                      Subscribe Now <i className='bx bx-paper-plane'></i>
                    </button>
                    <div id='validator-newsletter' className='form-result'></div>
                  </form>
                </div>
                <ul className='social-links'>
                  <li>
                    <a href='#' target='_blank' className='facebook'>
                      <i className='bx bxl-facebook'></i>
                    </a>
                  </li>
                  <li>
                    <a href='#' target='_blank' className='twitter'>
                      <i className='bx bxl-twitter'></i>
                    </a>
                  </li>
                  <li>
                    <a href='#' target='_blank' className='linkedin'>
                      <i className='bx bxl-linkedin'></i>
                    </a>
                  </li>
                  <li>
                    <a href='#' target='_blank' className='instagram'>
                      <i className='bx bxl-instagram'></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className='col-lg-3 col-sm-6 col-md-6'>
              <div className='single-footer-widget pl-5'>
                <h3>Resources</h3>
                <ul className='quick-links'>
                  <li>
                    <Link href='/legal_disclaimer'>Legal Disclaimer</Link>
                  </li>
                  <li>
                    <Link href='/privacy-policy'>Privacy Policy</Link>
                  </li>
                  <li>
                    <Link href='/wallet'>Blog</Link>
                  </li>
                  <li>
                    <Link href='/support_cause'>Support a cause</Link>
                  </li>
                  <li>
                    <Link href='/affiliate'>Affiliate</Link>
                  </li>
                  <li>
                    <Link href='/business_enquiry'>Business Enquiry</Link>
                  </li>
                  <li>
                    <Link href='/contact'>Site map</Link>
                  </li>
                  <li>
                    <Link href='/terms_conditions'>Terms and Conditions</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className='col-lg-3 col-sm-6 col-md-6'>
              <div className='single-footer-widget'>
                <h3>Contact Info</h3>
                <ul className='footer-contact-info'>
                  <li>Address: 2750, Quadra Street Victoria, Canada</li>
                  <li>
                    Email: <a href='mailto:hello@Novis.com'>hello@novis.com</a>
                  </li>
                  <li>
                    Phone: <a href='tel:+44587154756'>+44 587 154756</a>
                  </li>
                  <li>
                    Fax: <a href='tel:+44587154756'>+55 58715 4756</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className='copyright-area'>
          <div className='container'>
            <p>
              Copyright 2022 <strong>Novis</strong>. All Rights Reserved by{' '}
              <Link href='https://envytheme.com/' target='_blank'>
                EnvyTheme
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
