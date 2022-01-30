import PageBanner from '../components/Common/PageBanner';

const SupportCause = () => {
    return (
        <>
            <PageBanner
                pageTitle='Support a cause'
                pageSubTitle=''
            />

            <div className='contact-area'>
                <div className='container'>
                    <div className='contact-form'>
                        <div className='section-title'>
                            <h5>
                                We contribute a portion of our revenue towards the holistic development and education of Tribal children in 3rd world countries,
                            </h5>
                            <p>
                                Feel free to send your contribution via Bitcoin to the below address:
                            </p>
                            <p>
                                bc1q4zv06g0ffeaawzwr85v3l5dsw2zl6je8mhpl6x
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SupportCause;
