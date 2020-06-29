var socket = io();

var searchParams = new URLSearchParams( window.location.search );

if(!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get( 'escritorio' );
var label = $('small');

$('h1').text('Escritorio ' + escritorio);

$('button').click(function(e){
    e.preventDefault();
    console.log('escritorio : ', escritorio);
    socket.emit('atenderTicket', {escritorio : escritorio}, function(resp){
        if(!resp.hayTickets)
            alert(resp.msg);
        else 
            label.html('Ticket : ' + resp.atenderTicket.numero);
    });
});

socket.on('connect', function(){
    console.log('conectado al servidor...');
});

socket.on('disconnect', function() {
    console.log('desconectado del servidor');
});