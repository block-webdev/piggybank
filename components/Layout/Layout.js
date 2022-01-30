import Head from 'next/head';
import { useRouter } from 'next/router';

//top header
import TopHeader from './TopHeader';

//navbar
import Navbar from './Navbar';
import NavbarTwo from './NavbarTwo';

//footer
import Footer from './Footer';
import { useState, useEffect, useCallback } from 'react';

import axios from 'axios';
import api from '../../core/api';
import * as actions from '../../my_store/actions';
import { useSelector, useDispatch } from 'react-redux';
import { NotificationManager } from 'react-notifications'
import * as selectors from '../../my_store/selectors';
import { io } from 'socket.io-client';
import moment from 'moment';


import dynamic from 'next/dynamic'
import 'react-chat-widget/lib/styles.css';

let addResponseMessage = null;
let addUserMessage = null;
let renderCustomComponent = null;
let dropMessages = null;
const DynamicChatComponent = dynamic(() => import("react-chat-widget").then((mod) => mod.Widget), {
  /* code omitted for clarity, see the source file for details */
  ssr: false,
});


const Layout = ({ children }) => {

  const router = useRouter();
  const { pathname } = router;
  const dispatch = useDispatch();
  const signState = useSelector(selectors.signin);

  const isLeftMsg = (msgItem) => {
    if (msgItem.from_user_id === signState.data.user_info.id) {
      return false;
    }
    return true;
  }

  const CustomTimeStampFragment = ({ leftMsg, date }) => {
    // return new Date().getDate() !== new Date(date).getDate()
    //   ? new moment(date).format('LT')
    //   : new moment(date).format('ddd LT');
    return (
      <div className={leftMsg ? "" : "react-chat-time-custom"}>
        <div style={{ fontSize: 12 }}>
          {new moment(date).format('ddd LT')}
        </div>
      </div>
    )
  };

  const [channelContent, setChannelContent] = useState(null);
  const getChannelContent = async () => {
    if (signState.data && signState.data.user_info) {
      const { data } = await axios.post(`${api.baseUrl}${api.channelContent}`, {
        user_id: signState.data.user_info.id,
      });
      setChannelContent(data);

      if (dropMessages) {
        dropMessages();
      }

      if (addUserMessage && addResponseMessage) {
        data.data.map((msgItem, index) => {
          if (isLeftMsg(msgItem)) {
            addResponseMessage(msgItem.content);
            renderCustomComponent(CustomTimeStampFragment, { leftMsg: true, date: msgItem.create_time });
          } else {
            addUserMessage(msgItem.content);
            renderCustomComponent(CustomTimeStampFragment, { leftMsg: false, date: msgItem.create_time });
          }
        });
      }
    }
  }

  useEffect(() => {
    (import('react-chat-widget')).then((mod) => {
      addResponseMessage = mod.addResponseMessage;
      addUserMessage = mod.addUserMessage;
      renderCustomComponent = mod.renderCustomComponent;
      dropMessages = mod.dropMessages;
      getChannelContent();
    });
  }, []);

  const [receivedData, setReceivedData] = useState(null);
  useEffect(() => {
    if (signState.data && signState.data.user_info && receivedData &&
      receivedData.from_user_id != signState.data.user_info.id && receivedData.to_user_id === signState.data.user_info.id) {
      if (addResponseMessage && renderCustomComponent) {
        addResponseMessage(receivedData.msg);
        renderCustomComponent(CustomTimeStampFragment, { leftMsg: true, date: receivedData.msg_time });
      }
    }
  }, [receivedData]);

  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const my_socket = io(`${api.baseUrl}`);
    setSocket(my_socket);
    my_socket.on('hello', data => {
      console.log('client received: ', data);
      setReceivedData(data);
    })
  }, []);

  useEffect(() => {
    getChannelContent();
  }, [signState]);

  const handleNewUserMessage = (newMessage) => {
    try {
      axios.post(`${api.baseUrl}${api.messageSend}`, {
        text: newMessage,
        from_user_id: signState.data.user_info.id,
        to_user_id: -1,
      }).then((res) => {
        if (res.data.code === 0) {
          renderCustomComponent(CustomTimeStampFragment, { leftMsg: false, date: res.data.msg_time });
          socket.emit("hello", { from_user_id: signState.data.user_info.id, to_user_id: -1, msg: newMessage });
        }
      });
    } catch (err) {

    }
  };

  const forceReDirect = (pathname) => {
    if (pathname == '/bank' || pathname == '/withdraw') {
      localStorage.removeItem('token');
      NotificationManager.error("Please Sign In first!", "Error");
      router.push('/');
    }
  }

  useEffect(() => {
    var token = localStorage.getItem("token");
    var curTime = (new Date()).getTime();

    if (token) {
      token = JSON.parse(token);
      if (token.lastTime + 1000 * 60 * 60 * 3 < curTime) {
        if (pathname === '/bank' || pathname === '/withdraw') {
          forceReDirect(pathname);
        }
      }
      axios.post(`${api.baseUrl}${api.checkSign}`, { token: token }, {}).then((data) => {
        console.log("location changed!:", data);
        if (data.data.code === 100) {
          forceReDirect(pathname);
        } else if (data.data.code === 0) {
          token.lastTime = (new Date()).getTime();
          localStorage.setItem('token', JSON.stringify(token));
          dispatch(actions.actionSignIn.success(data.data));
        }
      });
    } else {
      if (pathname === '/bank' || pathname === '/withdraw') {
        forceReDirect(pathname);
      }
    }
  }, [pathname]);

  return (
    <>
      <Head>
        <title>CryptoPiggyBank</title>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, shrink-to-fit=no'
        />
        <meta
          name='description'
          content='Ribnic - Muli-Niche eCommerce React Template'
        />
        <meta
          name='og:title'
          property='og:title'
          content='Ribnic - Muli-Niche eCommerce React Template'
        ></meta>
        <meta
          name='twitter:card'
          content='Ribnic - Muli-Niche eCommerce React Template'
        ></meta>
        <link rel='canonical' href='https://novis-react.envytheme.com'></link>
        <link rel="icon" href="/images/favicon.png" />
      </Head>

      {pathname === '/' ? <TopHeader /> :''}
      {pathname === '/index-2' ? <NavbarTwo /> : <NavbarTwo />}

      {children}

      {pathname === '/bank' || pathname === '/chat' ? <div /> : <Footer />}

      {pathname != '/chat' && signState.data && signState.data.user_info && !signState.data.user_info.isAdmin &&
        <DynamicChatComponent
          handleNewUserMessage={handleNewUserMessage}
          title="PiggyChat"
          subtitle="Welcome to PiggyBank"
          emojis={true}
          showTimeStamp={false}
        />
      }

    </>
  );
};

export default Layout;
