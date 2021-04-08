const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();

app.use(express.static(`${__dirname}/client`));
console.log(`${__dirname}/../client`);

const server = http.createServer(app);
const io = socketio(server);
var board = [];

io.on('connection', (sock) => {
    




    sock.emit('board', board);

    function updatePiecesLocation({ele, eleLeft, eleTop}) {
        console.log(ele);
        tokIndex = board.findIndex(tok => tok.id === ele);
        board[tokIndex].top = eleTop;
        board[tokIndex].left = eleLeft;
    }

    function addBoardPieces({id, top, left}) {
        board.push({id:id, top:top, left:left, isDead:false});
        //console.log(board);
    }

    function killorReviveToken ({ele , isCtrlPress}) {
        tokIndex = board.findIndex(tok => tok.id === ele);
        //console.log(board[tokIndex].isDead);
        if (isCtrlPress) board[tokIndex].isDead ? board[tokIndex].isDead = false : board[tokIndex].isDead = true;
        //console.log(board[tokIndex]);
    }





    sock.on('addHero', ({id, top, left}) => {
        addBoardPieces({id, top, left});
        io.emit('addHero', {id, top, left});
    });
    sock.on('addMonster', ({id, top, left}) => {
        addBoardPieces({id, top, left});
        io.emit('addMonster', {id, top, left});
    });
    sock.on('leftClick', ({ele, isCtrlPress}) => {
        killorReviveToken({ele , isCtrlPress});
        io.emit('leftClick', {ele, isCtrlPress});
    });

    sock.on('mouseUp', ({ele, eleLeft, eleTop}) => {
        console.log({ele, eleLeft, eleTop});
        updatePiecesLocation ({ele, eleLeft, eleTop});
        io.emit('mouseUp', {ele, eleLeft, eleTop});
    });
});

server.on('error', (err) => {
    console.error(err);
});

var port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log('server is ready!!!!');
    board = [
        {id:'Rhord', top:'700', left:'650', isDead:false},
        {id:'Iroh', top:'600', left:'775', isDead:false},
        {id:'Leroy', top:'500', left:'900', isDead:false},
        {id:'Cernunnos', top:'600', left:'1025', isDead:false},
        {id:'Fhrost', top:'700', left:'1150', isDead:false}
    ];
});