import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { FaEllipsisV, FaRegEdit, FaRegTrashAlt, FaSignOutAlt } from 'react-icons/fa';
import { getRoomMembers, removeRoom, setLoadingPage } from '../../redux';
import { ENDPOINT, makeToast } from '../../services';

import './roomInfo.css';
import Member from './member';
import { setModalContent, setShowModal, resetRoom } from '../../redux';

const RoomInfo = () => {

    const [show, setShow] = useState(false);
    const { socket, room, members } = useSelector(state => {
        return { socket: state.setting.socket, room: state.room, members: state.members };
    });
    const dispatch = useDispatch();

    useEffect(() => {
        if(socket) dispatch(getRoomMembers(socket, room.data.id));
        // eslint-disable-next-line
    }, []);

    const showEditGroup = () => {
        dispatch(setModalContent('editGroup'));
        dispatch(setShowModal(true));
    };

    const leaveGroup = () => {
        socket.emit('leave room', ({ id: room.data.id }), ({ success, message }) => {
            if(!success) makeToast('error', message);
            else {
                makeToast("success", message);
                dispatch(removeRoom(room.data));
                dispatch(setShowModal(false));
                dispatch(resetRoom());
            }
        });
    };

    const removeGroup = () => {
        const isConfirm = window.confirm('آیا از حذف گروه اطمینان دارید؟');
        if(isConfirm) {
            dispatch(setShowModal(false));
            dispatch(setLoadingPage(true));
            socket.emit('delete room', ({ id: room.data.id }), ({ success, message }) => {
                if(!success) makeToast('error', message);
                else {
                    dispatch(removeRoom(room.data));
                    dispatch(resetRoom({}));
                    makeToast('success', message);
                }
                dispatch(setLoadingPage(false));
            });
        }
    };

    return (
        <div className="room-info-modal">
            <div className="header">
                <img 
                    className="room-picture"
                    src={ room.data.roomPicture ? `${ENDPOINT}/roomPictures/${room.data.roomPicture}` : '/images/room.jpg' }
                    alt={ room.data.name }
                />
                <div className="d-flex flex-column text-right">
                    <span className="font-weight-bold">{room.data.name}</span>
                    <span className="text-muted small">{room.data.id}</span>
                </div>
                {
                    room.data.isJoined &&
                    <div className="actions-container">
                        <FaEllipsisV className="action-icon" onClick={() => setShow(!show)} />
                        <div className={ show ? "actions-popover" : "d-none" }>
                            { room.data.isOwner && <span className="action" onClick={showEditGroup}><FaRegEdit className="ml-2" />ویرایش گروه</span>}
                            { room.data.isOwner && <span className="action" onClick={removeGroup}><FaRegTrashAlt className="ml-2" />حذف گروه</span>}
                            { !room.data.isOwner && <span className="action" onClick={leaveGroup}><FaSignOutAlt className="ml-2" />خروج از گروه</span>}
                        </div>
                    </div>
                }
            </div>
            <div>
                <h6 className="px-3 py-2">اعضای گروه</h6>
                <div className="scroller">
                    {
                        members.loading
                            ?
                            <div className="d-flex justify-content-center align-items-center w-100 h-100">
                                <Spinner animation="border" variant="secondary" />
                            </div>
                            :
                            members.data.map((member, index) => {
                                return <Member key={index} member={member} />
                            })
                    }
                </div>
            </div>
        </div>
    );
};

export default RoomInfo;