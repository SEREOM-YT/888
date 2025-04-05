'use client';

import { useState, useEffect } from 'react';
import HexagonalChessBoard from '../../components/HexagonalChessBoard';
import useChessGame from '../../hooks/useChessGame';
import useMultiplayer from '../../hooks/useMultiplayer';

export default function GamePage() {
  const [gameId, setGameId] = useState(null);
  const [playerName, setPlayerName] = useState('');
  const [playerColor, setPlayerColor] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  
  // استخدام منطق اللعبة
  const chessGame = useChessGame();
  
  // استخدام منطق اللعب المتعدد
  const {
    connected,
    players,
    messages,
    error,
    sendMove,
    sendChatMessage,
    joinGame,
    leaveGame
  } = useMultiplayer(gameId, playerName, playerColor);
  
  // إنشاء لعبة جديدة
  const createNewGame = () => {
    if (!playerName.trim()) {
      alert('الرجاء إدخال اسمك');
      return;
    }
    
    const newGameId = Math.random().toString(36).substring(2, 8).toUpperCase();
    setGameId(newGameId);
    setPlayerColor('red'); // اللاعب الأول دائمًا أحمر
    
    // إعادة تعيين اللعبة
    chessGame.resetGame();
  };
  
  // الانضمام إلى لعبة موجودة
  const handleJoinGame = () => {
    if (!playerName.trim()) {
      alert('الرجاء إدخال اسمك');
      return;
    }
    
    if (!gameId || gameId.trim().length < 4) {
      alert('الرجاء إدخال رمز لعبة صالح');
      return;
    }
    
    if (!playerColor) {
      alert('الرجاء اختيار لون');
      return;
    }
    
    joinGame();
  };
  
  // مغادرة اللعبة
  const handleLeaveGame = () => {
    leaveGame();
    setGameId(null);
    setPlayerColor('');
  };
  
  // إرسال رسالة دردشة
  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (chatMessage.trim()) {
      sendChatMessage(chatMessage);
      setChatMessage('');
    }
  };
  
  // معالجة حركة القطعة
  useEffect(() => {
    if (chessGame.moveHistory.length > 0) {
      const lastMove = chessGame.moveHistory[chessGame.moveHistory.length - 1];
      sendMove(lastMove);
    }
  }, [chessGame.moveHistory]);
  
  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-8">شطرنج ثلاثي اللاعبين</h1>
      
      {!gameId ? (
        <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">إنشاء لعبة جديدة</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">اسمك</label>
              <input 
                type="text" 
                className="w-full p-2 bg-gray-700 rounded text-white" 
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
              />
            </div>
            <button 
              className="w-full bg-player-red hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
              onClick={createNewGame}
            >
              إنشاء لعبة جديدة
            </button>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">الانضمام إلى لعبة</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">اسمك</label>
              <input 
                type="text" 
                className="w-full p-2 bg-gray-700 rounded text-white" 
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">رمز اللعبة</label>
              <input 
                type="text" 
                className="w-full p-2 bg-gray-700 rounded text-white" 
                placeholder="مثال: ABC123"
                onChange={(e) => setGameId(e.target.value.toUpperCase())}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">اللون</label>
              <select 
                className="w-full p-2 bg-gray-700 rounded text-white"
                value={playerColor}
                onChange={(e) => setPlayerColor(e.target.value)}
              >
                <option value="">اختر لونًا</option>
                <option value="white">أبيض</option>
                <option value="black">أسود</option>
              </select>
            </div>
            <button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
              onClick={handleJoinGame}
            >
              انضمام إلى اللعبة
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-5xl">
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-6">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-gray-400">رمز اللعبة: </span>
                <span className="font-mono font-bold">{gameId}</span>
                <span className="mr-4 text-sm">
                  {connected ? 
                    <span className="text-green-500">● متصل</span> : 
                    <span className="text-red-500">● غير متصل</span>
                  }
                </span>
              </div>
              <div>
                <span className="text-gray-400 ml-2">اللاعب: </span>
                <span className={`font-bold ${
                  playerColor === 'red' ? 'text-player-red' : 
                  playerColor === 'white' ? 'text-player-white' : 
                  'text-player-black'
                }`}>
                  {playerName || 'أنت'} ({playerColor === 'red' ? 'أحمر' : playerColor === 'white' ? 'أبيض' : 'أسود'})
                </span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <HexagonalChessBoard 
                boardState={chessGame.boardState}
                hexCoordinates={chessGame.hexCoordinates}
                currentPlayer={chessGame.currentPlayer}
                selectedPiece={chessGame.selectedPiece}
                handlePieceClick={chessGame.handlePieceClick}
                handleSquareClick={chessGame.handleSquareClick}
                gameStatus={chessGame.gameStatus}
              />
            </div>
            
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">اللاعبون</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-player-red mr-2"></div>
                  <span>
                    {players.find(p => p.color === 'red')?.name || 'في انتظار اللاعب...'}
                    {playerColor === 'red' && ' (أنت)'}
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-player-white mr-2"></div>
                  <span>
                    {players.find(p => p.color === 'white')?.name || 'في انتظار اللاعب...'}
                    {playerColor === 'white' && ' (أنت)'}
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-player-black mr-2"></div>
                  <span>
                    {players.find(p => p.color === 'black')?.name || 'في انتظار اللاعب...'}
                    {playerColor === 'black' && ' (أنت)'}
                  </span>
                </div>
              </div>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">الدردشة</h2>
              <div className="h-48 overflow-y-auto bg-gray-900 p-2 rounded mb-2">
                {messages.length === 0 ? (
                  <div className="text-sm text-gray-400">لا توجد رسائل بعد</div>
                ) : (
                  <div className="space-y-2">
                    {messages.map((msg, index) => (
                      <div key={index} className={`text-sm ${
                        msg.type === 'system' ? 'text-gray-400' : 
                        msg.playerColor === 'red' ? 'text-player-red' : 
                        msg.playerColor === 'white' ? 'text-player-white' : 
                        'text-player-black'
                      }`}>
                        {msg.type === 'system' ? (
                          <span>{msg.text}</span>
                        ) : (
                          <span><strong>{msg.player}:</strong> {msg.text}</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <form onSubmit={handleSendMessage} className="flex">
                <input 
                  type="text" 
                  className="flex-1 p-2 bg-gray-700 rounded-r-none rounded-l text-white" 
                  placeholder="اكتب رسالة..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                />
                <button 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l-none rounded-r"
                >
                  إرسال
                </button>
              </form>
              
              <div className="mt-8">
                <button 
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
                  onClick={handleLeaveGame}
                >
                  مغادرة اللعبة
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {error && (
        <div className="mt-4 p-3 bg-red-600 text-white rounded">
          {error}
        </div>
      )}
    </main>
  );
}
