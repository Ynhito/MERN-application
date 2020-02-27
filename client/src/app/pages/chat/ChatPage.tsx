import React, { useContext, useEffect, useState } from 'react';
import classes from './styles.module.scss';
import { Button, TextField, Typography } from '@material-ui/core';
import { AuthContext } from '../../../context/AuthContext';
import {NavLink} from 'react-router-dom';
import socketIOClient from "socket.io-client";
// import { socket } from '../../api/socket';

const ChatPage = () => {

    const auth = useContext(AuthContext);
    const logout = () => {
        auth.logout();
    }

    const [messages, setMessages] = useState<any>([]);
    const [message, setMessage] = useState('');
    useEffect(() => {
        // const socket = socketIOClient("http://localhost:5000");
        // socket
        // socket.emit('change_username', {username: auth.userId})
        // socket.on("FromAPI", (data: any) => setData(data))
        // socket.on("new_message", (data: any) => {
        //     console.log(data)
        //     setMessages((m:any) => m.concat(data))
        // })
    }, []) 
    const sendMessage = () => {
        // socket.emit("new_message", {message: message})
    }
    console.log(messages)
    return (
        <div>
            <div className={classes.header}>
                <NavLink to={`/detail/${auth.userId}`}>
                    Detail
                </NavLink>
                <Button onClick={logout}>
                    Выйти
                </Button>
            </div>
            <div className="flex w-full fixed bottom-0">
                <TextField
                className="w-10/12"
                variant="outlined"
                onChange={(e:any) => setMessage(e.target.value)}
                />
                <Button
                className="w-2/12"
                onClick={sendMessage}
                >
                    Отправить
                </Button>
            </div>
            {messages.map((e:any) => (
                    <div className="flex w-full justify-center">
                    <p className="mr-12">
                    {e.username}
                    </p>
                    <p>
                    {e.message}
                    </p>
                    </div>
                ))}
        </div>
    );
}

export default ChatPage;