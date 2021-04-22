import { Fragment, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { FaAngleRight } from 'react-icons/fa';
import io from 'socket.io-client';

import { MenuBar, ChatList, Profile, ChatContent, Loading } from '../components';
import { verifyUser } from '../services';
import { setLoadingPage, setSocket, setUserData, setInnerWidth, setShowChats, updateRoom, updateRooms, getRooms } from '../redux';

export const ChatPage = ({ history }) => {

    const { loadingPage, selectedMenuItem, showChats, room, windowInnerWidth, socket } = useSelector(state => {
        return { 
            loadingPage: state.setting.loadingPage,
            selectedMenuItem: state.setting.selectedMenuItem,
            showChats: state.setting.showChats,
            room: state.room,
            windowInnerWidth: state.setting.windowInnerWidth,
            socket: state.setting.socket 
        };
    });
    const dispatch = useDispatch();
    
    const handleWindowSize = () => {
        dispatch(setInnerWidth());
    };

    useEffect(() => {
        verifyUser()
            .then(({ success, user }) => {
                if(!success) history.push('/auth'); 
                else {
                    dispatch(setUserData(user));
                    if(!socket) dispatch(setSocket(io({query: {token: localStorage.getItem('SCA_TOKEN')}})));
                    setTimeout(() => {
                        dispatch(setLoadingPage(false));
                    }, 1000);
                    window.addEventListener('resize', handleWindowSize);
                }
            });

        return () => {
            dispatch(setLoadingPage(true));
            window.removeEventListener('resize', handleWindowSize);
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if(socket) {
            dispatch(getRooms(socket));
            socket.emit('join to rooms');
            socket.on('change room data', ({ room }) => {
                dispatch(updateRoom(room));
                dispatch(updateRooms(room));
            }); 
        }
        
        return () => {
            if(socket) socket.off('change room data');
        };
        // eslint-disable-next-line
    }, [socket]);

    return (
        <div className="d-flex h-100">
            {
                loadingPage
                    ?
                        <Loading />
                    :
                        <Fragment>
                            {
                                windowInnerWidth>768
                                    ? <MenuBar history={history} />
                                    : !showChats &&  <MenuBar history={history} />
                            }
                            <Row className="h-100 w-100 m-0">
                                <Col className={ (showChats && windowInnerWidth<768) ? "d-none" : "p-0" } lg={4} md={5}>
                                    <div className="chat-right-side-bar">
                                        { selectedMenuItem === 'profile' && <Profile history={history} /> }
                                        { selectedMenuItem === 'chats' && <ChatList /> }
                                    </div>
                                </Col>
                                <Col className={windowInnerWidth>768 ? "p-0 bg-light" : showChats ? "p-0 bg-light" : "d-none"} lg={8} md={7}>
                                    {
                                        room.loading
                                            ?
                                                <Loading />
                                            :
                                                !room.data.name 
                                                    ?
                                                        <div className="empty-chat-box">
                                                            { windowInnerWidth<768 && <FaAngleRight className="back-icon" onClick={() => dispatch(setShowChats(false))} /> }
                                                            { room.error ? room.error : "ShayanChat" }
                                                        </div>
                                                    : <ChatContent />
                                    }
                                </Col>
                            </Row>
                        </Fragment>
            }
        </div>
    );
};