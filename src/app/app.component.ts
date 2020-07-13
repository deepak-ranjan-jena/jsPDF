import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'jsPDF';

  /**
   * export any HTML contnet to multi page PDF
   */
  exportHTMLToPDF() {
    // get element and set basic pdf options
    const element = $('.pdf-container');
    // use jsPDF doc to extend this options
    const options = {
      background: 'white',
      scale: 1
    };
    // set canvas options(HTML container)
    const elementOptions = {
      width: element.width(),
      height: element.height(),
      topMargin: 15
    }
    // set PDF container options
    const PDFOptions = {
      width: elementOptions.width + (elementOptions.topMargin * 2),
      height: ( elementOptions.width * 1.5) + (elementOptions.topMargin * 2)
    }
		const canvasImageWidth = elementOptions.width;
		const canvasImageHeight = elementOptions.height;
    
    // calculate the total num of pages to be exported
		const totalPDFPages = Math.ceil(elementOptions.height/PDFOptions.height) - 1;
		

		html2canvas(element[0], options).then((canvas) => {
			canvas.getContext('2d');
			const imgData = canvas.toDataURL("image/jpeg", 1.0);
			const doc = new jsPDF('p', 'pt',  [PDFOptions.width, PDFOptions.height]);
		  doc.addImage(imgData, 'JPG', elementOptions.topMargin, elementOptions.topMargin, canvasImageWidth, canvasImageHeight);
			
			
			for (let i = 1; i <= totalPDFPages; i++) { 
				doc.addPage(PDFOptions.width, PDFOptions.height);
				doc.addImage(imgData, 'JPG', elementOptions.topMargin, -(PDFOptions.height*i)+(elementOptions.topMargin*4), canvasImageWidth, canvasImageHeight);
			}
		  return doc;
    }).then((doc) => {
      doc.save(`multi-page-sample-${Math.random()}.pdf`);
    });
  }
  
}
