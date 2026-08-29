import { Component } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-tickit',
  imports: [],
  templateUrl: './tickit.html',
  styleUrl: './tickit.css',
})
export class Tickit {

  downloadPDF() {
    const DATA: any = document.getElementById('ticket');

    html2canvas(DATA).then(canvas => {

      const imgWidth = 210;
      const pageHeight = 295;

      const imgHeight = canvas.height * imgWidth / canvas.width;

      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'mm', 'a4');

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

      pdf.save('RailYatra-Ticket.pdf');

    });
  }

  printTicket() {
    window.print();
  }
}
