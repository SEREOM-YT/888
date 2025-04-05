'use client';

import { useEffect, useRef } from 'react';
import io from 'socket.io-client';

// تهيئة Socket.io
const initSocket = async () => {
  // تأكد من أن الخادم جاهز لاستقبال اتصالات Socket.io
  await fetch('/api/socketio');
  
  // إنشاء اتصال Socket.io
  const socket = io('/', {
    path: '/api/socketio',
    addTrailingSlash: false,
  });
  
  return socket;
};

// مكون لتهيئة Socket.io
const SocketInitializer = () => {
  const socketInitialized = useRef(false);
  
  useEffect(() => {
    // تهيئة Socket.io مرة واحدة فقط
    if (!socketInitialized.current) {
      initSocket().then(() => {
        console.log('Socket.io initialized');
        socketInitialized.current = true;
      }).catch(err => {
        console.error('Failed to initialize Socket.io:', err);
      });
    }
    
    // تنظيف عند إلغاء تحميل المكون
    return () => {
      // لا نقوم بإغلاق الاتصال هنا لأننا نريد الاحتفاظ به طوال فترة وجود التطبيق
    };
  }, []);
  
  return null;
};

export default SocketInitializer;
