import PDFDocument from "pdfkit";
import * as fs from "fs";

const doc = new PDFDocument({
  size: 'LETTER',
  margins: {
    top: 28.35, // 1 cm
    bottom: 28.35,
    left: 28.35,
    right: 28.35
  }
});

doc.pipe(fs.createWriteStream("mi-documento.pdf"));

// Agregar una imagen PNG
doc.image("src/logo.png", {
  fit: [100, 63], // Ajustar tamaño
  align: 'center'
});

// Añadir un marco negro de 1px alrededor del documento
const margin = 28.35;
const pageWidth = doc.page.width;
const pageHeight = doc.page.height;

doc.lineWidth(1)
   .rect(margin / 2, margin / 2, pageWidth - margin, pageHeight - margin)
   .strokeColor('black')
   .stroke();

// Añadir texto y párrafos como antes
doc.fontSize(13).text("Universidad de Santiago de Chile\nRegistro Académico\nTítulos y Grados", {
  align: 'left',
  paragraphGap: 5,
});

doc.fontSize(13);

const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

for (let i = 0; i < 5; i++) {
  doc.text(loremIpsum, {
    paragraphGap: 10,
    indent: 20,
    align: "justify",
  });
}

doc.end();
