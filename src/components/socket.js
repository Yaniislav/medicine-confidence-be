const SocketIO = require('socket.io');

const sessions = new Map();
const usersSessions = new Map();
const onConnectListeners = [];

const onConnect = (socket) => {
  const socketId = socket.id;

  const disconnect = () => {
    const userId = sessions.get(socketId);

    sessions.delete(socketId);
    usersSessions.delete(userId);
  };

  socket.on('setUserId', (ethAddress) => {
    console.log('New user connected', ethAddress);

    sessions.set(socketId, ethAddress);
    usersSessions.set(ethAddress, socketId);

    onConnectListeners.forEach((listener) => {
      listener(ethAddress);
    });
  });

  socket.on('disconnect', disconnect);
  socket.on('error', disconnect);
};

class Socket {
  listen(SOCKET_PORT) {
    this.io = SocketIO(SOCKET_PORT);

    console.log(`Socket server started on port: ${SOCKET_PORT}`);

    this.io.on('connection', onConnect);
  }

  on(event, listener) {
    this.io.on(event, listener);
  }

  onUserConnect(listener) {
    onConnectListeners.push(listener);

    const id = onConnectListeners.length - 1;

    return { id, remove: () => this.removeConnectListener(id) };
  }

  removeConnectListener(id) {
    onConnectListeners.splice(id, 1);
  }

  sendToUser(event, userId, data) {
    const socketId = usersSessions.get(userId);

    this.io.to(socketId).emit(event, data);
  }

  isOnline(userId) {
    return !!usersSessions.get(userId);
  }
}

export default new Socket();
