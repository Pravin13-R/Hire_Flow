import React from 'react'

const MessageList = ({messages, selectedMessage, onSelect,}) => {
  return (
    <div className='list-group list-group-flush'>
        {messages.map((message) => (
            <button key={message.id} type='button' className={`list-group-item list-group-item-action border-0 p-3  ${
                selectedMessage?.id === message.id
                ? "bg-primary bg-opacity-10"
                : ""
            }`}  onClick={() => onSelect(message)}> 
            <div className='d-flex align-items-center'>
                <div className='message-avatar me-3'>
                    {message.name.charAt(0)}

                </div>
                <div className='fw-semibold mb-1'>
                    <h6 className='fw-semibold mb-1'>{message.name}</h6>
                    <small className='text-muted'>{message.time}</small>

                </div>
                <p className='small test-muted mb-0 text-truncate'>{message.lastMessage}</p>

            </div>
            {message.unread > 0 && (
                <span className='badge bg-primary rounded-pill ms-2'>{message.unread}</span>
            )}

            </button>
        ))}

    </div>
  );
}

export default MessageList