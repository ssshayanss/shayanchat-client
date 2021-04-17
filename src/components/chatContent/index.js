import './chatContent.css';
import ChatContentHeader from './header';
import ChatContentBody from './body';
import ChatContentFooter from './footer';

export const ChatContent = () => {
    return (
        <div className="chat-content-container">
            <ChatContentHeader />
            <ChatContentBody />
            <ChatContentFooter />
        </div>
    );
};