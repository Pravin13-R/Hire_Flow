import React, { useState } from 'react'
import MessageList from '../components/messages/MessageList'

const Messages = () => {

    const [messages, setMessages] = useState([
           {
      id: 1,
      name: "Priya Menon",
      role: "HR Manager",
      lastMessage: "Can you review the shortlisted candidates?",
      time: "10:30 AM",
      unread: 2,
      avatar: "P",
      conversation: [
        {
          sender: "Priya Menon",
          text: "Can you review the shortlisted candidates?",
          time: "10:28 AM",
          mine: false,
        },
        {
          sender: "You",
          text: "Sure, I will review them.",
          time: "10:29 AM",
          mine: true,
        },
        {
          sender: "Priya Menon",
          text: "Please complete it before the interview.",
          time: "10:30 AM",
          mine: false,
        },
      ],
    },

    {
      id: 2,
      name: "John Smith",
      role: "Technical Interviewer",
      lastMessage: "The interview is scheduled for tomorrow.",
      time: "09:45 AM",
      unread: 1,
      avatar: "J",
      conversation: [
        {
          sender: "John Smith",
          text: "The interview is scheduled for tomorrow.",
          time: "09:45 AM",
          mine: false,
        },
        {
          sender: "You",
          text: "Okay, thank you.",
          time: "09:50 AM",
          mine: true,
        },
      ],
    },

    {
      id: 3,
      name: "Anitha Raj",
      role: "Recruiter",
      lastMessage: "The candidate accepted the offer.",
      time: "Yesterday",
      unread: 0,
      avatar: "A",
      conversation: [
        {
          sender: "Anitha Raj",
          text: "The candidate accepted the offer.",
          time: "Yesterday",
          mine: false,
        },
      ],
    },

    {
      id: 4,
      name: "David Kumar",
      role: "Hiring Manager",
      lastMessage: "Let's discuss the new job opening.",
      time: "Yesterday",
      unread: 0,
      avatar: "D",
      conversation: [
        {
          sender: "David Kumar",
          text: "Let's discuss the new job opening.",
          time: "Yesterday",
          mine: false,
        },
      ],
    },
    ]);

    const [selectedMessage, setSelectedMessage] = useState(messages[0]);

    const [search, setSearch] = useState("");

    const [newMessage, setNewMessage] = useState("");

    const filteredMessages = messages.filter(
        (message) =>
            message.name.toLowerCase().includes(search.toLowerCase()) ||
            message.lastMessage.toLowerCase().includes(search.toLowerCase())
    );

    const handleSelect = (message) => {
        setSelectedMessage(message);

        setMessages((previousMessages) =>
            previousMessages.map((item) =>
                item.id === message.id
                    ? {
                        ...item,
                        unread: 0,
                    }
                    : item
            )
        );
    };

    const handleSendMessage = () => {
        if (!newMessage.trim()){
            return;
        }

        const updatedMessage = {
             sender: "You",
      text: newMessage,
      time: "Just now",
      mine: true,
        };

        const updatedConversation = [
            ...selectedMessage.conversation,
            updatedMessage,
        ];

        const updatedSelectedMessage = {
            ...selectedMessage,
            conversation: updatedConversation,
            lastMessage: newMessage,
            time: "Just now",
        };

        setSelectedMessage(updatedSelectedMessage);

        setMessages((previousMessage) =>
            previousMessage.map((message) =>
                message.id === selectedMessage.id 
        ? updatedSelectedMessage
        : message
            ) 
        );

        setNewMessage("");
    };




  return (
    <div className='container-fluid p-4'>
        <div className='mb-4'>
            <h2 className='fw-bold mb-1'>Messages</h2>
            <p className='text-muted mb-0'>Communicate with your recruitment team</p>

        </div>
        <div className='card border-0 shadow-sm '>
            <div className='row g-0'>

                {/* coversation */}

                <div className='col-md-4 border-end' style={{ minHeight: "650px" }}>
                    <div className='p-3 border-bottom'>
                        <div className='input-group'>
                            <span className='input-group-text bg-white'>
                                <i className='bi bi-search'></i>

                            </span>
                            <input type="text" className='form-control'
                            placeholder='Search message...' value={search}
                            onChange={(e) => setSearch(e.target.value)} />
                        </div>
                    </div>
                    <MessageList messages={filteredMessages} selectedMessage={selectedMessage} onSelect={handleSelect} />
                </div>
                {/* chat area */}

                <div className='col-md-8'>
                    {selectedMessage ? (
                        <>
                        <div className='d-flex align-items-center p-3 border-bottom'>
                            <div className='message-avatar me-3'>
                              {selectedMessage.name.charAt(0)}
                            </div>
                            <div>
                            <h6 className='fw-bold mb-1'>{selectedMessage.name}</h6>
                            <small className='text-muted'>{selectedMessage.role}</small>
                        </div>
                         </div>

                         {/* message */}
                         <div className='p-4' style={{ height: "480px", overflowY: "auto",}}>
                            {selectedMessage.conversation.map(
                                (message, index) => (
                                    <div key={index} className={`d-flex mb-3 ${
                                        message.mine 
                                        ? "justify-content-end"
                                        : "justify-content-start"
                                    }`}>
                                        <div className={`message-bubble ${
                                            message.mine 
                                            ? "bg-primary text-white"
                                            : "bg-light"
                                        }`}>
                                            <p className='mb-1'>{message.text}</p>
                                            <small className={message.mine
                                                ? "text-white-50"
                                                : "text-muted"
                                            }>
                                                {message.time}

                                            </small>

                                        </div>

                                    </div>
                                )
                            )}

                         </div>

                         {/* message input */}

                         <div className='p-3 border-top'>
                            <div className='input-group'>
                                <input type="text" className='form-control' placeholder='Type a message...'
                                value={newMessage} onChange={(e) => setNewMessage(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleSendMessage();
                                    }
                                }} />

                                <button className='btn btn-primary' onClick={handleSendMessage}>
                                    <i className='bi bi-send-fill'></i>
                                </button>

                            </div>

                         </div>
                        </>
                        
                    ):(
                        <div className='text-center p-5'>
                            <i className='bi bi-chat-left-text fs-1 text-muted'></i>
                            <h5 className='mt-3'>Select a conversation</h5>

                        </div>
                    )
                
                }

                </div>

            </div>

        </div>

    </div>
  )
}

export default Messages