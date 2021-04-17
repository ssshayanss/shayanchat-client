import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MyForm from '../form';
import { validateEditGroupReq, makeToast } from '../../services';
import { setShowModal, setLoadingForm, getRooms, getRoom } from '../../redux';

const EditGroup = () => {
    
    const { socket, room } = useSelector(state => {
        return { socket: state.setting.socket, room: state.room.data };
    });
    const dispatch = useDispatch();

    const nameRef = useRef('');
    const roomPictureRef = useRef();

    const editGroup = e => {
        e.preventDefault();
        const data = {
            id: room.id,
            roomName: nameRef.current.value.trim(),
            roomPicture: {
                data: roomPictureRef.current.files[0],
                name: roomPictureRef.current.files[0] ? roomPictureRef.current.files[0].name : null,
                mimetype: roomPictureRef.current.files[0] ? roomPictureRef.current.files[0].type : null,
                size: roomPictureRef.current.files[0] ? roomPictureRef.current.files[0].size : null
            }
        };
        const { success, message } = validateEditGroupReq(data);
        if(!success) makeToast('error', message);
        else if(data.roomName || data.roomPicture.data){
            dispatch(setLoadingForm(true));
            socket.emit('edit room', data, ({ success, message }) => {
                if(!success) makeToast('error', message);
                else {
                    dispatch(getRoom(socket, room.id));
                    dispatch(getRooms(socket));
                    makeToast('success', message);
                    dispatch(setShowModal(false));
                }
                dispatch(setLoadingForm(false));
            });
        }
    };

    return (
        <div className="modal-form">
            <h6 className="header">ویرایش گروه</h6>
            <MyForm 
                name="ویرایش"
                items={[
                    { name: 'roomName', type: 'text', title: 'نام‌ گروه', placeholder: 'نام‌ گروه را وارد کنید', fieldRef: nameRef },
                    { name: 'roomPicture', type: 'file', title: 'تصویر گروه', fieldRef: roomPictureRef }
                ]}
                submitHandler={editGroup}
            />
        </div>
    );
};

export default EditGroup;