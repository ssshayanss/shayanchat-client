import { ENDPOINT } from '../../services';
import { FaStar } from 'react-icons/fa';

const Member = ({ member }) => {
    return (
        <div className="member-container">
            <div className="picture-container">
                <img 
                    className="picture"
                    src={ member.profilePicture ? `${ENDPOINT}/profilePictures/${member.profilePicture}` : '/images/user.png' }
                    alt={ member.name }
                />
                <span className={ member.isOnline ? "online-badge bg-success" : "online-badge bg-secondary"}></span>
            </div>
            <div className="d-flex flex-column">
                <span>{member.name} { member.isOwner && <FaStar /> }</span>
                <span className="text-muted small">{ member.isOnline ? 'Online' : member.lastSeen }</span>
            </div>
        </div>
    );
}

export default Member;