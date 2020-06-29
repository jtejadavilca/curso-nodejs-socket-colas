var socket = io();
console.log('socket', socket);
socket.on('connect', function(){
    console.log('conectado al servidor...');
});
socket.on('disconnect', function(){
    console.log('desconectado del servidor...');
});
socket.on('estadoActual', function(data){
    console.log('data', data);
    lblNuevoTicket.html(`${data.ultimoTicket}`);
});

var lblNuevoTicket = $('#lblNuevoTicket');
$(document).ready(function(){
    $('#btnGenerarTicket').click(function(e){
        e.preventDefault();
        generarTicket();
    });
});

function generarTicket() {
    socket.emit('generarTicket', {}, function( resp ){
        console.log('Generacion de ticket desde el servidor : ', resp);
        lblNuevoTicket.html(`${resp.numeroTicket}`);
    });
}