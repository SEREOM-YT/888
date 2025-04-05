'use client';

import { useState, useEffect } from 'react';
import SocketInitializer from '../components/SocketInitializer';

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <SocketInitializer />
        {children}
      </body>
    </html>
  );
}
