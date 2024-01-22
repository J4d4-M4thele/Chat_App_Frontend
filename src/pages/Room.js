import React, { useEffect } from 'react';
import { useParams, useOutletContext } from "react-router-dom";
import ChatWindow from '../components/ChatWindow';

export default function Room() {
    const params = useParams();
    const { socket } = useOutletContext();

    useEffect(() => {
        if (!socket) return;
        socket.emit('join-room', { roomId: params.roomId });
        console.log(params);
    }, [socket]);

    return (
        <ChatWindow />
    )
}
