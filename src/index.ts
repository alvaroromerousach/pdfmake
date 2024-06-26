import PDFDocument = require("pdfkit");
import * as fs from "fs";

const doc = new PDFDocument();

doc.pipe(fs.createWriteStream("mi-documento.pdf"));

doc.fontSize(20).text("¡Hola mundo desde Node.js, pdfkit y pdfmake!");

doc.fontSize(13);

// Agregar cinco párrafos de Lorem Ipsum
const loremIpsum =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

for (let i = 0; i < 5; i++) {
  doc.text(loremIpsum, {
    paragraphGap: 10, // Espacio entre párrafos
    indent: 20, // Sangría del párrafo
    align: "justify", // Alineación del texto
  });
}

doc.end();
