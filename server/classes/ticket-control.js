const fs = require('fs');

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}


class TicketControl {
    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.ticketsPendientes = [];
        this.ultimosCuatroTickets = [];

        let data = require('../data/data.json');
        
        if( data.hoy === this.hoy ) {
            this.ultimo = data.ultimo;
            this.ticketsPendientes = data.ticketsPendientes ? data.ticketsPendientes : [];
            this.ultimosCuatroTickets = data.ultimosCuatroTickets ? data.ultimosCuatroTickets : [];
        } else {
            this.reiniciarConteo();
        }
    }

    siguiente() {
        this.ultimo++;

        let ticket = new Ticket(this.ultimo, null);
        this.ticketsPendientes.push(ticket);

        this.grabarArchivo();

        return this.getUltimoTicket();
    }

    getUltimoTicket() {
        return `Ticket número : ${this.ultimo}`;
    }
    getUltimosCuatroTickets() {
        return this.ultimosCuatroTickets;
    }

    atenderTicket( escritorio ) {
        if( this.ticketsPendientes.length === 0 ) {
            return {
                hayTickets: false,
                msg: 'No hay más tickets'
            };
        }

        let numeroTicket = this.ticketsPendientes[0].numero;
        this.ticketsPendientes.shift();

        let atenderTicket = new Ticket(numeroTicket, escritorio);

        this.ultimosCuatroTickets.unshift(atenderTicket);

        if(this.ultimosCuatroTickets.length > 4) {
            this.ultimosCuatroTickets.splice(-1, 1); // borra el último elemento
        }
        console.log('Últimos cuatro : ', this.ultimosCuatroTickets);

        this.grabarArchivo();

        return {
            hayTickets: true,
            atenderTicket
        };
    }

    reiniciarConteo() {
        this.ultimo = 0;
        this.ticketsPendientes = [];
        this.ultimosCuatroTickets = [];
        this.grabarArchivo();
    }

    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            ticketsPendientes:this.ticketsPendientes,
            ultimosCuatroTickets: this.ultimosCuatroTickets
        };

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
}

module.exports = {
    TicketControl
}