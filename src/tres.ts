import PDFDocument from "pdfkit";
import * as fs from "fs";

// Crear el documento PDF
const doc = new PDFDocument({
  size: "LETTER",
  margins: {
    top: 28.35, // 1 cm
    bottom: 28.35,
    left: 28.35,
    right: 28.35,
  },
});

// Pipe the document to a blob
doc.pipe(fs.createWriteStream("mi-documento.pdf"));

const margin = 28.35; // 1 cm en puntos
const colWidth = 50; // Ancho de columna de ejemplo, ajústalo según tus necesidades
const pageWidth = doc.page.width;

// Texto
const text = "ROL:";
const fontSize = 11;

// Establecer la fuente y el tamaño antes de medir
doc.font("Helvetica").fontSize(fontSize);

// Obtener el ancho del texto
const textWidth = doc.widthOfString(text);

// Imprimir el texto
doc.text(text, margin + colWidth * 7, margin, { paragraphGap: 0, lineGap: 0 });

// Dibujar la línea justo después del texto
const startX = margin + colWidth * 7 + textWidth;
const startY = doc.y; // La misma altura que el texto

doc
  .moveTo(startX, startY)
  .lineTo(pageWidth - margin, startY)
  .strokeColor("black")
  .stroke();

// Finalizar el documento
doc.end();
