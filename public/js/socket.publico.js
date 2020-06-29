var socket = io();

var lblsTickets = [$('#lblTicket1'), $('#lblTicket2'), $('#lblTicket3'), $('#lblTicket4')];
var lblsEscritorios = [$('#lblEscritorio1'), $('#lblEscritorio2'), $('#lblEscritorio3'), $('#lblEscritorio4')];

socket.on('estadoActual', function(data) {
    actualizarHTML(data.ultimosCuatro);
    
});
socket.on('actualizarUltimosCuatro', function(data){
    actualizarHTML(data.ultimosCuatro);
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
});

function actualizarHTML(ultimosCuatro) {
    if(ultimosCuatro) {
        var i = 0;
        ultimosCuatro.forEach( t => {
            lblsTickets[i].text( 'Ticket ' + t.numero );
            lblsEscritorios[i].text( 'Escritorio ' + t.escritorio );
            ++i;
        });
    }
}