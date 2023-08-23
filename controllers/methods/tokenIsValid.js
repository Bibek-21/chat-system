"use strict";
(()=>{
    module.exports= 
    function tokenIsValid () {
    let socketConnected = new Set();
    
    function onconnection(socket) {
        console.log(socket.id);
    
        socketConnected.add(socket.id)
    
        io.emit('clients-total', socketConnected.size)
    
        socket.on('disconnect', () => {     //perform for logout 
            console.log('socket disconnected ', socket.id);
            socketConnected.delete(socket.id);
            io.emit('clients-total', socketConnected.size);
    
        })
    
        socket.on('message', (data) => {                    //it broadcasts the data in the network all users except himself
            socket.broadcast.emit('chatMessage', data);
            console.log(data);
        })
    
        // socket.on('feedback', (data) => {
        //     socket.broadcast.emit('feedback', data);
        //     // console.log(data);
        // })
    }
    
    
    
    io.on('connection', onconnection);
    }
})();