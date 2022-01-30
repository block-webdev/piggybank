import { Provider } from 'react-redux';
import { useStore } from '../store';

import '../public/css/animate.min.css';
import '../public/css/bootstrap.min.css';


import '../public/css/boxicons.min.css';

import '../public/css/fontawesome.min.css';
import '../public/css/meanmenu.min.css';
import '../public/css/style.css';
import '../public/css/responsive.css';

import Layout from '../components/Layout/Layout';
import GoTop from '../components/Shared/GoTop';

import { NotificationManager, NotificationContainer } from 'react-notifications'
import 'react-notifications/lib/notifications.css';
import store from '../my_store';
import { loadWeb3 } from '../core/web3';
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    loadWeb3();
  });

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />

        {/* Go Top Button */}
        {/* <GoTop scrollStepInPx='100' delayInMs='10.50' /> */}
      </Layout>
      <NotificationContainer />
    </Provider>
  );
}
