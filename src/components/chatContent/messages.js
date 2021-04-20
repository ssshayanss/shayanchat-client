import Message from './message';

const Messages = ({ date, messages }) => (
    <div>
        <div className="text-center text-muted my-2"><span className="date-span">{date}</span></div>
        {
            messages.map(message => <Message key={message.id} message={message} />)
        }
    </div>
);

export default Messages;