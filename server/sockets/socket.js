const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {
    console.log('Usuario conectado...');

    client.on('disconnect', () => {
        console.log('Usuario desconectado...');
    });

    // Emit to clients
    client.emit('estadoActual', {
        ultimoTicket : ticketControl.getUltimoTicket(),
        ultimosCuatro : ticketControl.getUltimosCuatroTickets()
    });

    // Listen from client
    client.on('generarTicket', (data, callback) => {

        callback({
            numeroTicket : ticketControl.siguiente()
        });

    });

    client.on('atenderTicket', (data, callback) => {
        if( !data.escritorio ) {
            return {
                error : true,
                msg: 'Es necesario enviar el escritorio'
            };
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        callback(atenderTicket);

        client.broadcast.emit('actualizarUltimosCuatro', {
            ultimosCuatro: ticketControl.getUltimosCuatroTickets()
        });
    });
});