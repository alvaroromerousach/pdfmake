import PDFDocument from "pdfkit";
import * as fs from "fs";

const doc = new PDFDocument({
  size: 'LETTER', // Tamaño de la hoja carta
  margins: { // Margen de 1 cm
    top: 28.35, // 1 cm ~ 28.35 puntos (pt)
    bottom: 28.35,
    left: 28.35,
    right: 28.35
  }
});

doc.pipe(fs.createWriteStream("mi-documento.pdf"));

// Dibujar el marco negro de 1 px alrededor del documento
const margin = 28.35; // 1 cm en puntos
const pageWidth = doc.page.width;
const pageHeight = doc.page.height;

doc.lineWidth(1)
   .rect(margin / 2, margin / 2, pageWidth - margin, pageHeight - margin)
   .strokeColor('black')
   .stroke();

// Título del documento
doc.fontSize(20).text("Universidad de Santiago de Chile", {
  align: 'center',
  paragraphGap: 20,
});

// Configurar el tamaño de fuente para los párrafos
doc.fontSize(13);

// Contenido de Lorem Ipsum
const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

// Añadir cinco párrafos de Lorem Ipsum
for (let i = 0; i < 5; i++) {
  doc.text(loremIpsum, {
    paragraphGap: 10, // Espacio entre párrafos
    indent: 20, // Sangría del párrafo
    align: "justify", // Alineación del texto
  });
}

// Finalizar el documento
doc.end();
