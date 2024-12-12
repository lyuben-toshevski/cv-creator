import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({ providedIn: 'root' })
export class PdfService {
  exportToPDF(element: HTMLElement, fileName: string): void {
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      // Calculate the PDF dimensions based on the content size
      const pdf = new jsPDF({
        orientation: imgHeight > imgWidth ? 'p' : 'l',
        unit: 'px',
        format: [imgWidth, imgHeight],
      });

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

      pdf.save(`${fileName}.pdf`);
    });
  }
}
