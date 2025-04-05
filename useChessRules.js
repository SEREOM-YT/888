'use client';

import { useState, useEffect } from 'react';

// منطق قواعد الشطرنج ثلاثي اللاعبين
const useChessRules = () => {
  // التحقق من صحة حركة القطعة
  const isValidMove = (piece, fromPosition, toPosition, boardState, hexCoordinates) => {
    // الحصول على إحداثيات المربعات
    const fromSquare = hexCoordinates.find(coord => coord.position === fromPosition);
    const toSquare = hexCoordinates.find(coord => coord.position === toPosition);
    
    if (!fromSquare || !toSquare) return false;
    
    // التحقق من وجود قطعة في المربع الهدف
    const pieceAtDestination = boardState.find(p => p.position === toPosition);
    
    // لا يمكن أخذ قطعة من نفس اللاعب
    if (pieceAtDestination && pieceAtDestination.player === piece.player) {
      return false;
    }
    
    // حساب المسافة بين المربعين
    const dx = toSquare.x - fromSquare.x;
    const dy = toSquare.y - fromSquare.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // قواعد حركة القطع المختلفة
    switch (piece.type) {
      case 'pawn':
        return isValidPawnMove(piece, fromSquare, toSquare, pieceAtDestination, boardState);
      case 'rook':
        return isValidRookMove(fromSquare, toSquare, boardState, hexCoordinates);
      case 'knight':
        // الحصان يتحرك على شكل حرف L
        // في الشطرنج السداسي، هذا يعني تقريبًا مسافة معينة
        return distance >= 100 && distance <= 150;
      case 'bishop':
        return isValidBishopMove(fromSquare, toSquare, boardState, hexCoordinates);
      case 'queen':
        // الملكة يمكنها التحرك مثل الرخ أو الفيل
        return isValidRookMove(fromSquare, toSquare, boardState, hexCoordinates) || 
               isValidBishopMove(fromSquare, toSquare, boardState, hexCoordinates);
      case 'king':
        // الملك يتحرك مربع واحد في أي اتجاه
        return distance <= 80;
      default:
        return false;
    }
  };
  
  // التحقق من صحة حركة البيدق
  const isValidPawnMove = (piece, fromSquare, toSquare, pieceAtDestination, boardState) => {
    // تحديد اتجاه حركة البيدق بناءً على اللاعب
    let forwardDirection;
    
    switch (piece.player) {
      case 'red':
        // البيدق الأحمر يتحرك للأعلى
        forwardDirection = { x: 0, y: -1 };
        break;
      case 'white':
        // البيدق الأبيض يتحرك للأسفل واليسار
        forwardDirection = { x: -1, y: 1 };
        break;
      case 'black':
        // البيدق الأسود يتحرك للأسفل واليمين
        forwardDirection = { x: 1, y: 1 };
        break;
      default:
        return false;
    }
    
    // حساب المسافة والاتجاه
    const dx = toSquare.x - fromSquare.x;
    const dy = toSquare.y - fromSquare.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // التحرك للأمام (بدون أكل)
    if (!pieceAtDestination) {
      // التحرك مربع واحد للأمام
      if (Math.sign(dx) === Math.sign(forwardDirection.x) && 
          Math.sign(dy) === Math.sign(forwardDirection.y) && 
          distance <= 80) {
        return true;
      }
      
      // التحرك مربعين للأمام في الحركة الأولى
      const isFirstMove = (piece.player === 'red' && fromSquare.position[1] === '2') ||
                          (piece.player === 'white' && fromSquare.position[1] === '2') ||
                          (piece.player === 'black' && fromSquare.position[1] === '2');
      
      if (isFirstMove && 
          Math.sign(dx) === Math.sign(forwardDirection.x) && 
          Math.sign(dy) === Math.sign(forwardDirection.y) && 
          distance <= 160) {
        return true;
      }
    }
    
    // الأكل (قطري)
    if (pieceAtDestination && pieceAtDestination.player !== piece.player) {
      // الأكل يكون في اتجاه قطري
      if (Math.abs(Math.sign(dx) - Math.sign(forwardDirection.x)) <= 1 && 
          Math.abs(Math.sign(dy) - Math.sign(forwardDirection.y)) <= 1 && 
          distance <= 100) {
        return true;
      }
    }
    
    return false;
  };
  
  // التحقق من صحة حركة الرخ
  const isValidRookMove = (fromSquare, toSquare, boardState, hexCoordinates) => {
    // في الشطرنج السداسي، الرخ يتحرك في خطوط مستقيمة
    // هذا تبسيط للتحقق من الحركة المستقيمة
    const dx = toSquare.x - fromSquare.x;
    const dy = toSquare.y - fromSquare.y;
    
    // التحرك أفقيًا أو عموديًا
    if (Math.abs(dx) < 10 || Math.abs(dy) < 10 || Math.abs(dx) === Math.abs(dy)) {
      // التحقق من عدم وجود قطع في الطريق
      // هذا تبسيط، وسيتم تحسينه في التنفيذ الكامل
      return true;
    }
    
    return false;
  };
  
  // التحقق من صحة حركة الفيل
  const isValidBishopMove = (fromSquare, toSquare, boardState, hexCoordinates) => {
    // في الشطرنج السداسي، الفيل يتحرك في خطوط قطرية
    // هذا تبسيط للتحقق من الحركة القطرية
    const dx = toSquare.x - fromSquare.x;
    const dy = toSquare.y - fromSquare.y;
    
    // التحرك قطريًا
    if (Math.abs(dx) === Math.abs(dy)) {
      // التحقق من عدم وجود قطع في الطريق
      // هذا تبسيط، وسيتم تحسينه في التنفيذ الكامل
      return true;
    }
    
    return false;
  };
  
  // التحقق من حالة الكش
  const isInCheck = (player, boardState, hexCoordinates) => {
    // العثور على ملك اللاعب
    const king = boardState.find(piece => piece.type === 'king' && piece.player === player);
    
    if (!king) return false;
    
    // التحقق مما إذا كان أي من قطع الخصم يمكنها أخذ الملك
    return boardState.some(piece => {
      if (piece.player === player) return false;
      
      return isValidMove(piece, piece.position, king.position, boardState, hexCoordinates);
    });
  };
  
  // التحقق من حالة الكش مات
  const isCheckmate = (player, boardState, hexCoordinates) => {
    // التحقق أولاً مما إذا كان اللاعب في حالة كش
    if (!isInCheck(player, boardState, hexCoordinates)) return false;
    
    // العثور على جميع قطع اللاعب
    const playerPieces = boardState.filter(piece => piece.player === player);
    
    // التحقق مما إذا كان أي من قطع اللاعب يمكنها الخروج من الكش
    for (const piece of playerPieces) {
      // البحث عن جميع الحركات الممكنة لهذه القطعة
      for (const toSquare of hexCoordinates) {
        if (isValidMove(piece, piece.position, toSquare.position, boardState, hexCoordinates)) {
          // تجربة الحركة
          const newBoardState = boardState.map(p => {
            if (p.id === piece.id) {
              return { ...p, position: toSquare.position };
            }
            // إزالة القطعة المأكولة إن وجدت
            if (p.position === toSquare.position && p.player !== player) {
              return { ...p, position: 'captured' };
            }
            return p;
          });
          
          // التحقق مما إذا كان اللاعب لا يزال في حالة كش بعد هذه الحركة
          if (!isInCheck(player, newBoardState, hexCoordinates)) {
            return false; // وجدنا حركة تخرج من الكش
          }
        }
      }
    }
    
    // لم نجد أي حركة تخرج من الكش
    return true;
  };
  
  return {
    isValidMove,
    isInCheck,
    isCheckmate
  };
};

export default useChessRules;
