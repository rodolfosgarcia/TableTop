const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();

app.use(express.static(`${__dirname}/../client`));

const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (sock) => {
    sock.on('addHero', () => io.emit('addHero'));
    sock.on('addMonster', () => io.emit('addMonster'));
    sock.on('leftClick', ({ele, isCtrlPress}) => io.emit('leftClick', {ele, isCtrlPress}));

    sock.on('mouseDown', ({ ele, oriX, oriY}) => io.emit('mouseDown', {ele, oriX, oriY}));
    sock.on('mouseMove', ({ele:ele, oriX:oriX, oriY:oriY, destX:destX, destY:destY}) => io.emit('mouseMove', {ele, oriX, oriY, destX, destY}));
    sock.on('mouseUp', () => io.emit('mouseUp'));
});

server.on('error', (err) => {
    console.error(err);
});

server.listen(8080, () => {
    console.log('server is ready');
});