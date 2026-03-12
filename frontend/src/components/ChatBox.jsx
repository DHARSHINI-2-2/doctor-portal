import { useState, useEffect } from 'react';
import io from 'socket.io-client';

// Connect to the backend server
const socket = io.connect("http://localhost:5000");

function ChatBox({ appointmentId, username }) {
    const [currentMessage, setCurrentMessage] = useState('');
    const [messageList, setMessageList] = useState([]);

    useEffect(() => {
        // When the component loads, join the secure room based on the appointment ID
        socket.emit("join_room", appointmentId);

        // Listen for incoming messages
        const handleReceiveMessage = (data) => {
            setMessageList((list) => [...list, data]);
        };

        socket.on("receive_message", handleReceiveMessage);

        // Cleanup listener when component unmounts to prevent duplicate messages
        return () => {
            socket.off("receive_message", handleReceiveMessage);
        };
    }, [appointmentId]);

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: appointmentId,
                author: username,
                message: currentMessage,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };

            await socket.emit("send_message", messageData);
            // Add our own message to the UI instantly
            setMessageList((list) => [...list, messageData]); 
            setCurrentMessage("");
        }
    };

    return (
        <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto', border: '1px solid #ccc', borderRadius: '8px', display: 'flex', flexDirection: 'column', height: '400px', backgroundColor: '#fff' }}>
            {/* Chat Header */}
            <div style={{ backgroundColor: '#007bff', color: 'white', padding: '15px', borderRadius: '8px 8px 0 0', textAlign: 'center', fontWeight: 'bold' }}>
                Live Consultation Chat
            </div>

            {/* Chat Body (Messages) */}
            <div style={{ flex: '1', padding: '15px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: '#f9f9f9' }}>
                {messageList.map((msg, index) => {
                    const isMe = msg.author === username;
                    return (
                        <div key={index} style={{ alignSelf: isMe ? 'flex-end' : 'flex-start', maxWidth: '70%' }}>
                            <div style={{ backgroundColor: isMe ? '#28a745' : '#007bff', color: 'white', padding: '10px 15px', borderRadius: isMe ? '15px 15px 0 15px' : '15px 15px 15px 0', wordWrap: 'break-word' }}>
                                {msg.message}
                            </div>
                            <div style={{ fontSize: '12px', color: '#888', marginTop: '5px', textAlign: isMe ? 'right' : 'left' }}>
                                {msg.time} • {msg.author}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Chat Input */}
            <div style={{ display: 'flex', borderTop: '1px solid #ccc' }}>
                <input 
                    type="text" 
                    value={currentMessage}
                    placeholder="Type your message..."
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={(e) => { e.key === "Enter" && sendMessage(); }}
                    style={{ flex: '1', padding: '15px', border: 'none', borderRadius: '0 0 0 8px', outline: 'none' }}
                />
                <button onClick={sendMessage} style={{ padding: '0 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '0 0 8px 0', cursor: 'pointer', fontWeight: 'bold' }}>
                    Send
                </button>
            </div>
        </div>
    );
}

export default ChatBox;