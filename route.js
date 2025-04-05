import { Server } from 'socket.io';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const ioHandler = (req, res) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server, {
      path: '/api/socketio',
      addTrailingSlash: false,
    });
    
    // تخزين حالة اللعبة
    const games = new Map();
    
    io.on('connection', (socket) => {
      const { gameId, playerName, playerColor } = socket.handshake.query;
      
      console.log(`Player connected: ${playerName} (${playerColor}) to game ${gameId}`);
      
      // إنشاء غرفة للعبة إذا لم تكن موجودة
      if (!games.has(gameId)) {
        games.set(gameId, {
          players: [],
          moves: [],
          currentPlayer: 'red',
          boardState: [],
        });
      }
      
      // الانضمام إلى غرفة اللعبة
      socket.join(gameId);
      
      // إضافة اللاعب إلى اللعبة
      const game = games.get(gameId);
      const existingPlayer = game.players.find(p => p.color === playerColor);
      
      if (!existingPlayer) {
        game.players.push({
          id: socket.id,
          name: playerName,
          color: playerColor,
        });
      } else {
        existingPlayer.id = socket.id;
        existingPlayer.name = playerName;
      }
      
      // إرسال قائمة اللاعبين المحدثة إلى جميع اللاعبين في الغرفة
      io.to(gameId).emit('players', game.players);
      
      // إرسال رسالة ترحيب
      io.to(gameId).emit('message', {
        type: 'system',
        text: `${playerName} انضم إلى اللعبة كلاعب ${playerColor === 'red' ? 'أحمر' : playerColor === 'white' ? 'أبيض' : 'أسود'}`,
      });
      
      // الاستماع لحركات اللاعبين
      socket.on('move', (data) => {
        const { move } = data;
        const game = games.get(gameId);
        
        // التحقق من أن اللاعب هو اللاعب الحالي
        if (game.currentPlayer === playerColor) {
          // إضافة الحركة إلى سجل الحركات
          game.moves.push({
            player: playerColor,
            move,
            timestamp: Date.now(),
          });
          
          // تحديث حالة اللوحة (سيتم تنفيذه بشكل كامل لاحقًا)
          // game.boardState = updatedBoardState;
          
          // تغيير دور اللاعب
          game.currentPlayer = getNextPlayer(game.currentPlayer);
          
          // إرسال الحركة إلى جميع اللاعبين في الغرفة
          io.to(gameId).emit('move', {
            player: playerColor,
            move,
            currentPlayer: game.currentPlayer,
          });
          
          // إرسال رسالة بالحركة
          io.to(gameId).emit('message', {
            type: 'move',
            player: playerName,
            playerColor,
            text: `${playerName} حرك ${move}`,
          });
        }
      });
      
      // الاستماع لرسائل الدردشة
      socket.on('chat', (data) => {
        const { text } = data;
        
        // إرسال الرسالة إلى جميع اللاعبين في الغرفة
        io.to(gameId).emit('message', {
          type: 'chat',
          player: playerName,
          playerColor,
          text,
        });
      });
      
      // الاستماع لأحداث المغادرة
      socket.on('leave', () => {
        handlePlayerLeave(socket, gameId, playerColor);
      });
      
      // الاستماع لأحداث قطع الاتصال
      socket.on('disconnect', () => {
        handlePlayerLeave(socket, gameId, playerColor);
      });
    });
    
    // معالجة مغادرة اللاعب
    const handlePlayerLeave = (socket, gameId, playerColor) => {
      if (!games.has(gameId)) return;
      
      const game = games.get(gameId);
      const playerIndex = game.players.findIndex(p => p.color === playerColor);
      
      if (playerIndex !== -1) {
        const player = game.players[playerIndex];
        
        // إرسال رسالة بمغادرة اللاعب
        io.to(gameId).emit('message', {
          type: 'system',
          text: `${player.name} غادر اللعبة`,
        });
        
        // إزالة اللاعب من اللعبة
        game.players.splice(playerIndex, 1);
        
        // إذا لم يتبق أي لاعبين، قم بإزالة اللعبة
        if (game.players.length === 0) {
          games.delete(gameId);
        } else {
          // إرسال قائمة اللاعبين المحدثة إلى جميع اللاعبين في الغرفة
          io.to(gameId).emit('players', game.players);
        }
      }
      
      // مغادرة الغرفة
      socket.leave(gameId);
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
    
    res.socket.server.io = io;
  }
  
  res.end();
};

export default ioHandler;
