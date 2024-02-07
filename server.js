const express = require('express');

const app = express();
const port = process.env.PORT || 5500;
app.use(express.static('public'));
const http = require('http').Server(app);
//const server = app.listen(port);
const io = require('socket.io')(http, {
    cors: {
      origin: '*',
    }
});

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

http.listen(port, function (){
    console.log(`listener on ${port}`);
});

let clientNo = 0;

io.on('connection', (socket) => {
    
    clientNo++;
    // join - создает комнату
    socket.join(Math.round(clientNo / 2));
    socket.emit('serverMsg', Math.round(clientNo / 2));

    socket.on('buttonPressed', clientRoom => {
        io.to(clientRoom).emit('switchFromServer');
    });


});

//.....Способы отправки клиентам
//socket.emit('functionName','data-element'); //..Сервер отправит только клиенту отправителю.
//socket.broadcast.emit('functionName','data-element'); //..Сервер отправит всем клиентам, кроме отправителя, которому принадлежит запрос.
//io.emit('functionName', 'data-element'); //..Сервер отправит всем клиентам.