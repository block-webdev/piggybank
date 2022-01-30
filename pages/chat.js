import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as selectors from '../my_store/selectors';
import axios from 'axios';
import api from '../core/api';
import moment from 'moment';
import InputEmoji from "react-input-emoji";
import { io } from 'socket.io-client';


const Chat = () => {
    const [channelList, setChannelList] = useState(null);
    const [selChannelIndex, setSelChannelIndex] = useState(-1);
    const [socket, setSocket] = useState(null);
    useEffect(() => {
        const getChannelList = async () => {
            const { data } = await axios.post(`${api.baseUrl}${api.channelList}`);
            setChannelList(data);
        };
        getChannelList();

        const my_socket = io(`${api.baseUrl}`);
        setSocket(my_socket);
        my_socket.on('hello', data => {
            setReceivedData(data);
        })
    }, []);

    const [receivedData, setReceivedData] = useState(null);
    useEffect(() => {
        if (receivedData === null) {
            return;
        }
        if (selChannelIndex !== -1 && channelList[selChannelIndex].from_user_id === receivedData.from_user_id &&
            receivedData.from_user_id != channelContent.admin_user_id) {
            getChannelContent(selChannelIndex);
        } else {
            const existChannel = channelList ? channelList.find((ele) => ele.from_user_id === receivedData.from_user_id) : null;
            if (!existChannel) {
                const getOneChannel = async (new_user_id) => {
                    const { data } = await axios.post(`${api.baseUrl}${api.getChannel}`, {
                        user_id: new_user_id,
                    });
                    if (channelList) {
                        let tmpList = [data, ...channelList];
                        setChannelList(tmpList);
                    } else {
                        setChannelList([data]);
                    }
                    if (selChannelIndex != -1) {
                        setSelChannelIndex(selChannelIndex + 1);
                    }
                }
                getOneChannel(receivedData.from_user_id);
            }
        }
    }, [receivedData]);

    const [channelContent, setChannelContent] = useState(null);
    const getChannelContent = async (index) => {
        const { data } = await axios.post(`${api.baseUrl}${api.channelContent}`, {
            user_id: channelList[index].from_user_id,
        });
        setChannelContent(data);

        var objDiv = document.getElementById("pgchat_msglist");
        objDiv.scrollTop = objDiv.scrollHeight;
    }

    const onClickChannelItem = (index) => {
        setSelChannelIndex(index);
        getChannelContent(index);
    }

    const isLeftMsg = (msgItem) => {
        if (msgItem.from_user_id === channelContent.admin_user_id) {
            return false;
        }
        return true;
    }

    const [newMsgText, setNewMsgText] = useState("");
    const handleOnEnter = (text) => {
        try {
            axios.post(`${api.baseUrl}${api.messageSend}`, {
                text: text,
                from_user_id: channelContent.admin_user_id,
                to_user_id: channelList[selChannelIndex].from_user_id,
            }).then((res) => {
                if (res.data.code === 0) {
                    socket.emit("hello", { from_user_id: channelContent.admin_user_id, to_user_id: channelList[selChannelIndex].from_user_id, msg: text });
                    getChannelContent(selChannelIndex);
                }
            });
        } catch (err) {

        }
    }

    return (
        <>
            <div className='d-flex bank-area'>
                <div className='col-lg-3 chatchannels-area'>
                    {channelList && channelList.map((channelItem, index) => (
                        <div key={index} className={selChannelIndex === index ? 'channel-item active' : 'channel-item'} onClick={() => { onClickChannelItem(index) }} >
                            <div className='channel-subitem'>
                                <h4 className='channel-name'>{channelItem.name}:({channelItem.from_user_id})</h4>
                                <span className='channel-time'>{moment(channelItem.create_time).format('HH:mm')}</span>
                            </div>
                            <div style={{ flex: 1 }}></div>
                            <div className='channel-subitem' style={{ marginTop: '8px' }}>
                                <div className='channel-msg'>
                                    {channelItem.content}
                                </div>
                                {/* <span className='align-bottom channel-time' >{moment(channelItem.create_time).format('HH:mm')}</span> */}
                            </div>
                        </div>
                    ))}
                </div>
                <div className='col-lg-9 channelcontent-area'>
                    <div id='pgchat_msglist' className='msglist-area'>
                        {channelContent && channelContent.data.map((msgItem, index) => (
                            <div key={index} className={isLeftMsg(msgItem) ? 'col-lg-5 msg-left' : 'col-lg-5 msg-right'}>
                                <div>
                                    {msgItem.content}
                                </div>
                                <div className='msg-time'>{moment(msgItem.create_time).format('MM-DD HH:mm')}</div>
                            </div>
                        ))}

                        <div style={{ height: '30%' }}></div>
                    </div>
                    <div>
                        {channelContent && (
                            <InputEmoji
                                value={newMsgText}
                                onChange={setNewMsgText}
                                cleanOnEnter
                                onEnter={handleOnEnter}
                                placeholder="Type a message"
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Chat;
