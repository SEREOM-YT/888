'use client';

import { useState, useEffect } from 'react';

const ChessBoard = () => {
  // لوحة الشطرنج السداسية - 96 مربع (32 لكل لاعب)
  const [boardState, setBoardState] = useState([]);
  const [selectedPiece, setSelectedPiece] = useState(null);
  
  // تهيئة لوحة الشطرنج
  useEffect(() => {
    initializeBoard();
  }, []);

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
      { id: 'w_r1', type: 'rook', player: 'white', position: 'A8' },
      { id: 'w_n1', type: 'knight', player: 'white', position: 'B8' },
      { id: 'w_b1', type: 'bishop', player: 'white', position: 'C8' },
      { id: 'w_q', type: 'queen', player: 'white', position: 'D8' },
      { id: 'w_k', type: 'king', player: 'white', position: 'E8' },
      { id: 'w_b2', type: 'bishop', player: 'white', position: 'F8' },
      { id: 'w_n2', type: 'knight', player: 'white', position: 'G8' },
      { id: 'w_r2', type: 'rook', player: 'white', position: 'H8' },
      { id: 'w_p1', type: 'pawn', player: 'white', position: 'A7' },
      { id: 'w_p2', type: 'pawn', player: 'white', position: 'B7' },
      { id: 'w_p3', type: 'pawn', player: 'white', position: 'C7' },
      { id: 'w_p4', type: 'pawn', player: 'white', position: 'D7' },
      { id: 'w_p5', type: 'pawn', player: 'white', position: 'E7' },
      { id: 'w_p6', type: 'pawn', player: 'white', position: 'F7' },
      { id: 'w_p7', type: 'pawn', player: 'white', position: 'G7' },
      { id: 'w_p8', type: 'pawn', player: 'white', position: 'H7' },
    ];
    
    // إضافة قطع اللاعب الأسود
    const blackPieces = [
      { id: 'b_r1', type: 'rook', player: 'black', position: 'I1' },
      { id: 'b_n1', type: 'knight', player: 'black', position: 'J1' },
      { id: 'b_b1', type: 'bishop', player: 'black', position: 'K1' },
      { id: 'b_q', type: 'queen', player: 'black', position: 'L1' },
      { id: 'b_k', type: 'king', player: 'black', position: 'M1' },
      { id: 'b_b2', type: 'bishop', player: 'black', position: 'N1' },
      { id: 'b_n2', type: 'knight', player: 'black', position: 'O1' },
      { id: 'b_r2', type: 'rook', player: 'black', position: 'P1' },
      { id: 'b_p1', type: 'pawn', player: 'black', position: 'I2' },
      { id: 'b_p2', type: 'pawn', player: 'black', position: 'J2' },
      { id: 'b_p3', type: 'pawn', player: 'black', position: 'K2' },
      { id: 'b_p4', type: 'pawn', player: 'black', position: 'L2' },
      { id: 'b_p5', type: 'pawn', player: 'black', position: 'M2' },
      { id: 'b_p6', type: 'pawn', player: 'black', position: 'N2' },
      { id: 'b_p7', type: 'pawn', player: 'black', position: 'O2' },
      { id: 'b_p8', type: 'pawn', player: 'black', position: 'P2' },
    ];
    
    // دمج جميع القطع في لوحة واحدة
    setBoardState([...redPieces, ...whitePieces, ...blackPieces]);
  };

  // تحديد القطعة المختارة
  const handlePieceClick = (piece) => {
    setSelectedPiece(piece);
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
    }
  };

  // رسم لوحة الشطرنج السداسية
  const renderBoard = () => {
    // هذا مجرد تمثيل مبسط للوحة السداسية
    // سيتم تحسينه في الخطوة التالية
    
    return (
      <div className="relative w-full h-full">
        <svg viewBox="0 0 1000 1000" className="w-full h-full">
          <defs>
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="gray" strokeWidth="1" />
            </pattern>
          </defs>
          
          {/* رسم الشكل السداسي الخارجي للوحة */}
          <polygon 
            points="250,50 750,50 950,500 750,950 250,950 50,500" 
            fill="#333" 
            stroke="#666" 
            strokeWidth="2"
          />
          
          {/* هنا سيتم رسم المربعات الفردية للوحة */}
          
          {/* تمثيل مبسط للقطع */}
          {boardState.map((piece, index) => {
            // حساب الإحداثيات بناءً على الموقع (سيتم تحسينه لاحقًا)
            const x = 500; // مركز اللوحة
            const y = 500; // مركز اللوحة
            
            return (
              <g 
                key={piece.id} 
                transform={`translate(${x}, ${y})`}
                onClick={() => handlePieceClick(piece)}
                className="chess-piece"
              >
                <circle 
                  r="20" 
                  fill={piece.player === 'red' ? '#e74c3c' : piece.player === 'white' ? '#f5f5f5' : '#2c3e50'} 
                  stroke="#000" 
                  strokeWidth="1"
                />
                <text 
                  textAnchor="middle" 
                  dy="6" 
                  fontSize="20" 
                  fill={piece.player === 'white' ? '#000' : '#fff'}
                >
                  {getPieceSymbol(piece.type)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  };

  // الحصول على رمز القطعة
  const getPieceSymbol = (type) => {
    switch (type) {
      case 'king': return '♚';
      case 'queen': return '♛';
      case 'rook': return '♜';
      case 'bishop': return '♝';
      case 'knight': return '♞';
      case 'pawn': return '♟';
      default: return '';
    }
  };

  return (
    <div className="chess-board">
      {renderBoard()}
    </div>
  );
};

export default ChessBoard;
