import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MyForm from '../form';
import { validateCreateRoomReq, makeToast } from '../../services';
import { setLoadingForm, setShowModal, updateRooms } from '../../redux';

const CreateNewRoom = () => {
    
    const socket = useSelector(state => state.setting.socket);
    const dispatch = useDispatch();

    const roomNameRef = useRef('');
    const roomPictureRef = useRef('');

    const createNewRoom = e => {
        e.preventDefault();
        const data = { 
            roomName: roomNameRef.current.value.trim(), 
            roomPicture: {
                data: roomPictureRef.current.files[0],
                name: roomPictureRef.current.files[0] ? roomPictureRef.current.files[0].name : null,
                mimetype: roomPictureRef.current.files[0] ? roomPictureRef.current.files[0].type : null,
                size: roomPictureRef.current.files[0] ? roomPictureRef.current.files[0].size : null
            } 
        };
        const { success, message } = validateCreateRoomReq(data);
        if(!success) makeToast('error', message);
        else {
            dispatch(setLoadingForm(true));
            socket.emit('create new room', data, ({ success, message, roomData }) => {
                if(success) {
                    dispatch(setShowModal(false));
                    dispatch(updateRooms(roomData));
                    makeToast('success', message);
                }
                else makeToast('error', message);
                dispatch(setLoadingForm(false));
            });
        }
    };

    return (
        <div className="modal-form">
            <h6 className="header">ایجاد گروه جدید</h6>
            <MyForm 
                name='ایجاد گروه جدید'
                items={[
                    { name: 'roomName', type: 'text', title: 'نام گروه', placeholder: 'نام گروه را وارد کنید', fieldRef: roomNameRef },
                    { name: 'roomPicture', type: 'file', title: 'تصویر گروه', fieldRef: roomPictureRef }
                ]}
                submitHandler={createNewRoom}
            />
        </div>
    );
};

export default CreateNewRoom;