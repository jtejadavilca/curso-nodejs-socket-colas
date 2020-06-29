var socket = io();


socket.on('estadoActual', function(data) {
    console.log('data : ', data);
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    if(data.ultimosCuatro) {
        var i = 0;
        data.ultimosCuatro.forEach( t => {
            ++i;
            $( '#lblTicket' + i ).text( 'Ticket ' + t.numero );
            $( '#lblEscritorio' + i ).text( 'Escritorio ' + t.escritorio );
        });
    }
});