import { Server } from 'socket.io';

let io; 

const initializeSocket = (server) => {
    io = new Server(server);

    io.on('connection', (socket) => {
        console.log('A user connected');

        // Event listeners can be added here
        socket.on('joinMarketChannel', (marketId) => {
            socket.join(marketId);
        });

        socket.on('sendReservation', (data) => {
            const { marketId, reservation } = data;
            io.to(marketId).emit('newReservation', reservation);
        });
    });
};

// Export the initialize function and io instance
export { initializeSocket, io };
