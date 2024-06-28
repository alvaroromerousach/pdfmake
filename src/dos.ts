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

doc.pipe(fs.createWriteStream("mi-documento.pdf"));

doc.registerFont("Open-Sans-Bold", "src/fonts/OpenSans-SemiBold.ttf");
doc.registerFont(
  "Open-Sans-Condensed",
  "src/fonts/OpenSans_Condensed-Medium.ttf"
);
doc.registerFont("Open-Sans", "src/fonts/OpenSans-Regular.ttf");

// Dibujar el marco gris de 1 px alrededor del documento
const margin = 28.35; // 1 cm en puntos
const pageWidth = doc.page.width;
const pageHeight = doc.page.height;

doc
  .lineWidth(1)
  .rect(margin, margin, pageWidth - margin * 2, pageHeight - margin * 2)
  .strokeColor("#dddddd")
  .stroke();

// Configurar las columnas
const colWidth = (pageWidth - 2 * margin) / 12;

//const columnMargin = 0;
for (let i = 0; i <= 12; i++) {
  doc
    .lineWidth(1)
    .rect(margin, margin, colWidth * i, pageHeight - margin * 2)
    .strokeColor("#dddddd")
    .stroke();
}

// Columna 1: col-2 (2/12 del ancho)
const col1Width = colWidth * 1;
const logoPath = "src/logo-usach.png"; // Ruta a tu logo
doc.image(logoPath, margin, margin, {
  fit: [col1Width, 50], // Ajustar el tamaño del logo
});

// Columna 2: col-4 (4/12 del ancho)
const col2Width = colWidth * 4;
const textLines =
  "UNIVERSIDAD DE SANTIAGO DE CHILE\nREGISTRO ACADÉMICO\nTÍTULOS Y GRADOS";
doc
  .font("Open-Sans-Condensed")
  .fontSize(10)
  /*  .scale(0.8, 1)*/
  .text(textLines, margin + col1Width, margin, {
    width: col2Width,
    align: "center",
  });

const texts = ["ROL ", "APROBADO ", "RESOLUCIÓN ", "DEL "];
doc.font("Open-Sans").fontSize(11);
doc.y = margin;

texts.forEach((text) => {
  let textWidth = doc.widthOfString(text);

  doc.text(text, margin + colWidth * 7, doc.y, { paragraphGap: 0, lineGap: 0 });

  // Dibujar la línea justo después del texto
  doc
    .moveTo(doc.x + textWidth, doc.y)
    .lineTo(pageWidth - margin, doc.y)
    .strokeColor("black")
    .stroke();
});

//doc.save();
//doc.moveDown(1);

// Seccion Dos: Titulo
doc.moveDown(1); // Añadir espacio entre filas
const title = "EXPEDIENTE DE MINOR";
const titleWidth = doc.widthOfString(title);
const titleX = (pageWidth - titleWidth) / 2;
doc.font("Open-Sans-Bold").fontSize(18).text(title, margin, doc.y, {
  paragraphGap: 10,
  align: "center",
});

// Seccion Dos: Cuadro
const boxHeight = 113.39; // 4 cm en puntos
doc
  .rect(margin + colWidth * 7, doc.y, colWidth * 5, boxHeight)
  .strokeColor("black")
  .stroke();

const box1Start = doc.y + boxHeight;

doc
  .font("Open-Sans-Bold")
  .fontSize(13)
  .text("APELLIDO1 APELLIDO2, NOMBRES", margin, doc.y + boxHeight + margin, {
    paragraphGap: 0,
    align: "center",
  });

// linea bajo el nombre
doc
  .moveTo(margin * 1.5, doc.y)
  .lineTo(pageWidth - margin * 1.5, doc.y)
  .stroke();

doc
  .font("Open-Sans")
  .fontSize(11)
  .text("Apellidos y Nombres Completos", margin, doc.y, {
    paragraphGap: 5,
    align: "center",
  });

doc
  .font("Open-Sans")
  .fontSize(13)
  .text("Dirección de la casa, número y villa", margin, doc.y, {
    paragraphGap: 0,
    align: "center",
  });

// linea bajo dirección
doc
  .moveTo(margin * 1.5, doc.y)
  .lineTo(pageWidth - margin * 1.5, doc.y)
  .stroke();

doc.font("Open-Sans").fontSize(11).text("Domicilio", margin, doc.y, {
  paragraphGap: 5,
  align: "center",
});

doc
  .font("Open-Sans")
  .fontSize(13)
  .text("CÉDULA:", margin * 1.5, doc.y, { paragraphGap: 5 });
doc.fontSize(13).text("TELÉFONO:", { paragraphGap: 5 });
doc.fontSize(13).text("E-MAIL:", margin * 1.5, doc.y, { paragraphGap: 5 });
doc.fontSize(13).text("SOLICITA:", margin * 1.5, doc.y, { paragraphGap: 5 });
doc
  .fontSize(13)
  .text("ESPECIALIDAD:", margin * 1.5, doc.y, { paragraphGap: 5 });
doc
  .fontSize(13)
  .text("FACULTAD DE ADMINISTRACIÓN Y ECONOMÍA:", margin * 1.5, doc.y, {
    paragraphGap: 5,
  });

doc
  .rect(margin, box1Start + margin / 2, colWidth * 12, doc.y - box1Start)
  .strokeColor("black")
  .stroke();

/*
 // guia de color rojo
 doc
  .lineWidth(1)
  .rect( margin + col1Width , margin, 2, 2)
  .strokeColor("red")
  .stroke();
*/

console.log("pageWidth:" + pageWidth);
console.log("pageHeight:" + pageHeight);
console.log("colWidth:" + colWidth);
console.log("margin:" + margin);
const suma = margin + col1Width;
console.log("margin + col1Width" + suma);
/*console.log("doc.x:" + doc.x);
console.log("doc.y:" + doc.y);*/
// Finalizar el documento
doc.end();
