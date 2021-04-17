import { Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { setShowModal } from '../../redux';
import './modal.css';
import CreateNewRoom from'./createRoom';
import EditProfile from './editProfile';
import ChangePassword from './changePassword';
import RoomInfo from '../roomInfo';
import EditGroup from './editGroup';

export const MyModal = () => {
    
    const { showModal, modalContent } = useSelector(state => {
        return { showModal: state.setting.showModal, modalContent: state.setting.modalContent };
    });
    const dispatch = useDispatch();

    return (
        <Modal show={showModal} onHide={() => dispatch(setShowModal(false))} centered>
            <div className="p-3">
                { modalContent === 'createNewRoom' && <CreateNewRoom /> }
                { modalContent === 'editProfile' && <EditProfile /> }
                { modalContent === 'changePassword' && <ChangePassword /> }
                { modalContent === 'roomInfo' && <RoomInfo /> }
                { modalContent === 'editGroup' && <EditGroup /> }
            </div>
        </Modal>
    );
};