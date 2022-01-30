import AdvisorArea from '../components/Common/AdvisorArea';
import AccountCreate from '../components/Common/AccountCreate';
import RegisterArea from '../components/Common/RegisterArea';

const About = () => {
  return (
    <>
      <div className='about-area pb-100'>
        <div className='container'>
          <div >
            <div className='content' style={{ marginTop: '20px' }}>
              <h1>About US</h1>
              <p>
                We are a community of crypto enthusiasts looking to grow together.
                Crypto piggy bank is a web 3.0 millennial startup company, with the goal to achieve financial freedom through cryptocurrency.
                Crypto piggy bank main objective is to help you HODL your coins and earn rewards while doing it.
              </p>
              <p>
                Crypto piggy bank works like a traditional piggy bank where you can lock up your coins till a time of your choosing, what is special about us is our lock-HODL-stake feature where you can lock your coins for how much ever long you want to and earn rewards.
              </p>
              <p>
                We are a retail focused company We offer the highest stable coins stalking rewards in the industry, Our main focus has always been and always will be to help you achieve financial freedom. We believe the only successful time-tested crypto investment strategy is HODLing! Dimond hands always win… What are you waiting for? Become part of the family. Join Now!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* <AdvisorArea bgColor="bg-f9f9f9" /> */}
      {/* <AccountCreate title='Our Values' /> */}
      {/* <RegisterArea ctaImage='/images/man.png' /> */}
    </>
  );
};

export default About;
