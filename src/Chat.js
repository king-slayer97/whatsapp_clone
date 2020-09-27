import React, { useState, useEffect } from 'react';
import './Chat.css';
import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, MoreVert, SearchOutlined, InsertEmoticon } from '@material-ui/icons';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from 'react-router-dom';
import db from './firebase';
import firebase from 'firebase';
import {useSelector} from 'react-redux';

function Chat() {
    const user = useSelector((store)=>{return store.user});
    const { roomId } = useParams();
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId]);

    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot =>
                setRoomName(snapshot.data().name)
            )

            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot => (
                setMessages(snapshot.docs.map((doc) => doc.data()))
            ))
        }
    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();

        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput("");
    }
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>
                        Last seen {}
                        {new Date(
                            messages[messages.length - 1]?.timestamp?.toDate()
                        ).toUTCString()}
                    </p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
                {messages.map((message) => (
                    <p key={roomId} className={`chat__message ${message.name === user && "chat__reciever"}`}>
                        <span className="chat__name">
                            {message.name}
                        </span>
                        {message.message}
                        <span className="chat__timestamp">
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                    </p>
                ))}
            </div>

            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form>
                    <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message" />
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
