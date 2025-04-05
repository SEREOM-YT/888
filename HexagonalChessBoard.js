'use client';

import { useState, useEffect } from 'react';
import ChessPiece from './ChessPiece';

const HexagonalChessBoard = () => {
  // حالة اللوحة والقطع
  const [boardState, setBoardState] = useState([]);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState('red'); // اللاعب الحالي (أحمر، أبيض، أسود)
  
  // إحداثيات المربعات السداسية
  const [hexCoordinates, setHexCoordinates] = useState([]);
  
  // تهيئة لوحة الشطرنج
  useEffect(() => {
    generateHexCoordinates();
    initializeBoard();
  }, []);

  // إنشاء إحداثيات المربعات السداسية
  const generateHexCoordinates = () => {
    const coordinates = [];
    const centerX = 500;
    const centerY = 500;
    const hexSize = 40; // حجم المربع السداسي
    
    // إنشاء شبكة سداسية من المربعات
    // هذه مجرد طريقة مبسطة لإنشاء الشبكة السداسية
    
    // منطقة اللاعب الأحمر (الجزء السفلي)
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 8; col++) {
        const x = centerX - 280 + col * hexSize * 1.5;
        const y = centerY + 200 + row * hexSize * 1.8;
        const position = String.fromCharCode(65 + col) + (row + 1);
        
        coordinates.push({
          x, y, position,
          player: 'red',
          color: (row + col) % 2 === 0 ? 'light' : 'dark'
        });
      }
    }
    
    // منطقة اللاعب الأبيض (الجزء العلوي الأيمن)
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 8; col++) {
        const x = centerX + 100 + row * hexSize * 1.5;
        const y = centerY - 200 - col * hexSize * 1.8;
        const position = String.fromCharCode(73 + col) + (row + 1);
        
        coordinates.push({
          x, y, position,
          player: 'white',
          color: (row + col) % 2 === 0 ? 'light' : 'dark'
        });
      }
    }
    
    // منطقة اللاعب الأسود (الجزء العلوي الأيسر)
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 8; col++) {
        const x = centerX - 380 - row * hexSize * 1.5;
        const y = centerY - 200 - col * hexSize * 1.8;
        const position = String.fromCharCode(81 + col) + (row + 1);
        
        coordinates.push({
          x, y, position,
          player: 'black',
          color: (row + col) % 2 === 0 ? 'light' : 'dark'
        });
      }
    }
    
    // منطقة الوردة المركزية
    for (let i = 0; i < 6; i++) {
      const angle = (i * 60) * Math.PI / 180;
      const x = centerX + Math.cos(angle) * hexSize * 2;
      const y = centerY + Math.sin(angle) * hexSize * 2;
      const position = 'C' + (i + 1); // C للمركز
      
      coordinates.push({
        x, y, position,
        player: 'center',
        color: i % 2 === 0 ? 'light' : 'dark'
      });
    }
    
    setHexCoordinates(coordinates);
  };

  // إنشاء لوحة الشطرنج السداسية
  const initializeBoard = () => {
    // إنشاء مصفوفة فارغة للوحة
    const newBoard = [];
    
    // إضافة قطع اللاعب الأحمر
    const redPieces = [
      { id: 'r_r1', type: 'rook', player: 'red', position: 'A1' },
      { id: 'r_n1', type: 'knight', player: 'red', position: 'B1' },
      { id: 'r_b1', type: 'bishop', player: 'red', position: 'C1' },
      { id: 'r_q', type: 'queen', player: 'red', position: 'D1' },
      { id: 'r_k', type: 'king', player: 'red', position: 'E1' },
      { id: 'r_b2', type: 'bishop', player: 'red', position: 'F1' },
      { id: 'r_n2', type: 'knight', player: 'red', position: 'G1' },
      { id: 'r_r2', type: 'rook', player: 'red', position: 'H1' },
      { id: 'r_p1', type: 'pawn', player: 'red', position: 'A2' },
      { id: 'r_p2', type: 'pawn', player: 'red', position: 'B2' },
      { id: 'r_p3', type: 'pawn', player: 'red', position: 'C2' },
      { id: 'r_p4', type: 'pawn', player: 'red', position: 'D2' },
      { id: 'r_p5', type: 'pawn', player: 'red', position: 'E2' },
      { id: 'r_p6', type: 'pawn', player: 'red', position: 'F2' },
      { id: 'r_p7', type: 'pawn', player: 'red', position: 'G2' },
      { id: 'r_p8', type: 'pawn', player: 'red', position: 'H2' },
    ];
    
    // إضافة قطع اللاعب الأبيض
    const whitePieces = [
      { id: 'w_r1', type: 'rook', player: 'white', position: 'I1' },
      { id: 'w_n1', type: 'knight', player: 'white', position: 'J1' },
      { id: 'w_b1', type: 'bishop', player: 'white', position: 'K1' },
      { id: 'w_q', type: 'queen', player: 'white', position: 'L1' },
      { id: 'w_k', type: 'king', player: 'white', position: 'M1' },
      { id: 'w_b2', type: 'bishop', player: 'white', position: 'N1' },
      { id: 'w_n2', type: 'knight', player: 'white', position: 'O1' },
      { id: 'w_r2', type: 'rook', player: 'white', position: 'P1' },
      { id: 'w_p1', type: 'pawn', player: 'white', position: 'I2' },
      { id: 'w_p2', type: 'pawn', player: 'white', position: 'J2' },
      { id: 'w_p3', type: 'pawn', player: 'white', position: 'K2' },
      { id: 'w_p4', type: 'pawn', player: 'white', position: 'L2' },
      { id: 'w_p5', type: 'pawn', player: 'white', position: 'M2' },
      { id: 'w_p6', type: 'pawn', player: 'white', position: 'N2' },
      { id: 'w_p7', type: 'pawn', player: 'white', position: 'O2' },
      { id: 'w_p8', type: 'pawn', player: 'white', position: 'P2' },
    ];
    
    // إضافة قطع اللاعب الأسود
    const blackPieces = [
      { id: 'b_r1', type: 'rook', player: 'black', position: 'Q1' },
      { id: 'b_n1', type: 'knight', player: 'black', position: 'R1' },
      { id: 'b_b1', type: 'bishop', player: 'black', position: 'S1' },
      { id: 'b_q', type: 'queen', player: 'black', position: 'T1' },
      { id: 'b_k', type: 'king', player: 'black', position: 'U1' },
      { id: 'b_b2', type: 'bishop', player: 'black', position: 'V1' },
      { id: 'b_n2', type: 'knight', player: 'black', position: 'W1' },
      { id: 'b_r2', type: 'rook', player: 'black', position: 'X1' },
      { id: 'b_p1', type: 'pawn', player: 'black', position: 'Q2' },
      { id: 'b_p2', type: 'pawn', player: 'black', position: 'R2' },
      { id: 'b_p3', type: 'pawn', player: 'black', position: 'S2' },
      { id: 'b_p4', type: 'pawn', player: 'black', position: 'T2' },
      { id: 'b_p5', type: 'pawn', player: 'black', position: 'U2' },
      { id: 'b_p6', type: 'pawn', player: 'black', position: 'V2' },
      { id: 'b_p7', type: 'pawn', player: 'black', position: 'W2' },
      { id: 'b_p8', type: 'pawn', player: 'black', position: 'X2' },
    ];
    
    // دمج جميع القطع في لوحة واحدة
    setBoardState([...redPieces, ...whitePieces, ...blackPieces]);
  };

  // تحديد القطعة المختارة
  const handlePieceClick = (piece) => {
    // يمكن تحديد القطع الخاصة باللاعب الحالي فقط
    if (piece.player === currentPlayer) {
      setSelectedPiece(piece);
    }
  };

  // تحريك القطعة إلى موقع جديد
  const handleSquareClick = (position) => {
    if (selectedPiece) {
      // تحقق من صحة الحركة (سيتم تنفيذه في الخطوة التالية)
      
      // تحديث موقع القطعة
      const updatedBoard = boardState.map(piece => {
        if (piece.id === selectedPiece.id) {
          return { ...piece, position };
        }
        return piece;
      });
      
      setBoardState(updatedBoard);
      setSelectedPiece(null);
      
      // تغيير دور اللاعب
      setCurrentPlayer(getNextPlayer(currentPlayer));
    }
  };
  
  // الحصول على اللاعب التالي
  const getNextPlayer = (player) => {
    switch (player) {
      case 'red': return 'white';
      case 'white': return 'black';
      case 'black': return 'red';
      default: return 'red';
    }
  };

  // الحصول على إحداثيات المربع بناءً على الموقع
  const getSquareCoordinates = (position) => {
    const square = hexCoordinates.find(coord => coord.position === position);
    return square || { x: 0, y: 0 };
  };

  // رسم لوحة الشطرنج السداسية
  const renderBoard = () => {
    const hexSize = 40; // حجم المربع السداسي
    
    return (
      <div className="relative w-full h-full">
        <svg viewBox="0 0 1000 1000" className="w-full h-full">
          {/* رسم الشكل السداسي الخارجي للوحة */}
          <polygon 
            points="250,50 750,50 950,500 750,950 250,950 50,500" 
            fill="#333" 
            stroke="#666" 
            strokeWidth="2"
          />
          
          {/* رسم المربعات السداسية */}
          {hexCoordinates.map((coord, index) => {
            const { x, y, position, color, player } = coord;
            
            // إنشاء شكل سداسي
            const hexPoints = [];
            for (let i = 0; i < 6; i++) {
              const angle = (i * 60) * Math.PI / 180;
              const hx = x + Math.cos(angle) * hexSize;
              const hy = y + Math.sin(angle) * hexSize;
              hexPoints.push(`${hx},${hy}`);
            }
            
            return (
              <g key={`hex-${index}`} onClick={() => handleSquareClick(position)}>
                <polygon 
                  points={hexPoints.join(' ')} 
                  fill={color === 'light' ? '#f0d9b5' : '#b58863'} 
                  stroke="#333" 
                  strokeWidth="1"
                  className="hover:opacity-80"
                />
                <text 
                  x={x} 
                  y={y + hexSize + 10} 
                  textAnchor="middle" 
                  fontSize="10" 
                  fill="#999"
                >
                  {position}
                </text>
              </g>
            );
          })}
          
          {/* رسم قطع الشطرنج */}
          {boardState.map((piece) => {
            const coords = getSquareCoordinates(piece.position);
            
            return (
              <ChessPiece 
                key={piece.id}
                piece={piece}
                position={coords}
                onClick={() => handlePieceClick(piece)}
                isSelected={selectedPiece && selectedPiece.id === piece.id}
              />
            );
          })}
        </svg>
      </div>
    );
  };

  return (
    <div className="chess-board">
      <div className="mb-4 text-center">
        <h2 className="text-xl font-bold">
          دور اللاعب: 
          <span className={`mr-2 ${
            currentPlayer === 'red' ? 'text-player-red' : 
            currentPlayer === 'white' ? 'text-player-white' : 
            'text-player-black'
          }`}>
            {currentPlayer === 'red' ? 'الأحمر' : 
             currentPlayer === 'white' ? 'الأبيض' : 
             'الأسود'}
          </span>
        </h2>
      </div>
      {renderBoard()}
    </div>
  );
};

export default HexagonalChessBoard;
