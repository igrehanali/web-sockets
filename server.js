import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (socket, request) => {
  const clientIP = request.socket.remoteAddress;

  socket.on("message", (message) => {
    const rawData = message.toString();
    socket.send(`Echo: ${rawData}`);

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN)
        client.send(`New client connected: ${clientIP} ${rawData}`);
    });
  });

  socket.on("error", (error) => {
    console.error(`Error from client ${clientIP}:`, error);
  });

  socket.on("close", () => {
    console.log(`Client disconnected: ${clientIP}`);
  });
});
