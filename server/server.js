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

    sock.on('mouseDown', ({ ele, oriX, oriY}) => io.emit('mouseDown', {ele, oriX, oriY}));
    //sock.on('mouseDown', ({ ele, oriX, oriY}) => console.log({ele, oriX, oriY}));
    sock.on('mouseMove', ({ele:ele, oriX:oriX, oriY:oriY, destX:destX, destY:destY}) => {
        console.log(ele);
        if (ele != null) {
            io.emit('mouseMove', {ele, oriX, oriY, destX, destY});
        }
    });
    //sock.on('mouseMove', ({ele, oriX, oriY, destX, destY}) => console.log({ele, oriX, oriY, destX, destY}));
    sock.on('mouseUp', () => io.emit('mouseUp'));
    //sock.on('mouseUp', () => console.log('UPPPPP'));
});

server.on('error', (err) => {
    console.error(err);
});

server.listen(8080, () => {
    console.log('server is ready');
});