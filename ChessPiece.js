'use client';

import { useState, useEffect } from 'react';

const ChessPiece = ({ piece, position, onClick, isSelected }) => {
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
    <g 
      transform={`translate(${position.x}, ${position.y})`}
      onClick={onClick}
      className={`chess-piece ${isSelected ? 'scale-110' : ''}`}
      style={{ cursor: 'pointer' }}
    >
      <circle 
        r="20" 
        fill={piece.player === 'red' ? '#e74c3c' : piece.player === 'white' ? '#f5f5f5' : '#2c3e50'} 
        stroke={isSelected ? "#ffcc00" : "#000"} 
        strokeWidth={isSelected ? "3" : "1"}
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
};

export default ChessPiece;
