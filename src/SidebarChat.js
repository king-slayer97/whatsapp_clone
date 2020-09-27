import React, { useState, useEffect } from 'react'
import { Avatar } from '@material-ui/core';
import './SidebarChat.css';
import db from './firebase';
import { Link } from 'react-router-dom';

function SidebarChat({ id, addNewChat, name, timestamp }) {
    const [seed, setSeed] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (id) {
            db.collection('rooms').doc(id).collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => (
                setMessage(snapshot.docs.map((doc) => doc.data())
                )));
        }
    }, [id]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);

    const handleClick = () => {
        const roomName = prompt("Please enter the name for the chat");

        if (roomName) {
            db.collection('rooms').add({
                name: roomName,
            });
        }

    }

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <div className="sidebarChatLeft">
                    <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                    <div className="sidebarChatLeft__details">
                        <h2>{name}</h2>
                        <p>{message[0]?.message}</p>
                    </div>
                </div>

                <div className="sidebarChatRight">
                    <p>{timestamp}</p>
                </div>

            </div>
        </Link>
    ) : (
            <div onClick={handleClick} className="sidebarChat">
                <h2>Add new chat</h2>
            </div>
        )
}

export default SidebarChat
