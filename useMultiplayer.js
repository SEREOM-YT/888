'use client';

import { useState, useEffect } from 'react';
import io from 'socket.io-client';

// منطق اللعب متعدد اللاعبين
const useMultiplayer = (gameId, playerName, playerColor) => {
  const [socket, setSocket] = useState(null);
  const [players, setPlayers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState(null);

  // إنشاء اتصال Socket.io عند تحميل المكون
  useEffect(() => {
    if (!gameId) return;

    // إنشاء اتصال Socket.io
    const newSocket = io('/', {
      path: '/api/socketio',
      query: {
        gameId,
        playerName,
        playerColor
      }
    });

    // الاستماع لأحداث الاتصال
    newSocket.on('connect', () => {
      console.log('Connected to server');
      setConnected(true);
      setError(null);
    });

    // الاستماع لأحداث قطع الاتصال
    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
      setConnected(false);
    });

    // الاستماع لأحداث الخطأ
    newSocket.on('error', (err) => {
      console.error('Socket error:', err);
      setError('حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.');
    });

    // الاستماع لتحديثات اللاعبين
    newSocket.on('players', (updatedPlayers) => {
      setPlayers(updatedPlayers);
    });

    // الاستماع للرسائل
    newSocket.on('message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    // تخزين الاتصال في الحالة
    setSocket(newSocket);

    // تنظيف الاتصال عند إلغاء تحميل المكون
    return () => {
      newSocket.disconnect();
    };
  }, [gameId, playerName, playerColor]);

  // إرسال حركة إلى الخادم
  const sendMove = (move) => {
    if (socket && connected) {
      socket.emit('move', {
        gameId,
        playerColor,
        move
      });
    }
  };

  // إرسال رسالة دردشة
  const sendChatMessage = (text) => {
    if (socket && connected) {
      socket.emit('chat', {
        gameId,
        playerName,
        playerColor,
        text
      });
    }
  };

  // الانضمام إلى لعبة
  const joinGame = () => {
    if (socket && connected) {
      socket.emit('join', {
        gameId,
        playerName,
        playerColor
      });
    }
  };

  // مغادرة اللعبة
  const leaveGame = () => {
    if (socket && connected) {
      socket.emit('leave', {
        gameId,
        playerColor
      });
      socket.disconnect();
    }
  };

  return {
    connected,
    players,
    messages,
    error,
    sendMove,
    sendChatMessage,
    joinGame,
    leaveGame
  };
};

export default useMultiplayer;
