import PDFDocument from "pdfkit";
import * as fs from "fs";
import { Fechas } from "./Fechas";

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

doc.pipe(fs.createWriteStream("doc-solicitud.pdf"));

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

// Logo del documento
const col1Width = colWidth * 1;
const logoPath = "src/logo-usach.png"; // Ruta a tu logo
doc.image(logoPath, margin, margin, {
  fit: [col1Width, 50], // Ajustar el tamaño del logo
});

// cabecera del documento

const col2Width = colWidth * 4;

  let texts = ["REPUBLICA DE CHILE","UNIVERSIDAD DE SANTIAGO DE CHILE","FACULTAD DE ADMINISTRACIÓN Y ECONOMÍA","DECANATO"];
  doc.font("Open-Sans-Condensed").fontSize(10);
  
  texts.forEach((text) => {
  
    doc.text(text, margin + colWidth, doc.y, { paragraphGap: 0, lineGap: 0, align: "center",width:colWidth*4 });

  });



texts = ["MAT"];
doc.font("Open-Sans").fontSize(11);

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

const fecha = Fechas.obtenerFechaActualEnEspanol("DD de MMMM de YYYY");
doc.moveDown(1);
doc.font("Open-Sans-Bold");
doc.text("Santiago, " + fecha, margin, doc.y);
doc.moveDown(1);

doc.moveDown(1);
let posY= doc.y; 
doc.text("De:", margin, posY);
doc.text("DECANO FACULTAD DE ADMINISTRACIÓN Y ECONOMÍA", colWidth+margin, posY );
doc.moveDown(1);

posY = doc.y;
doc.text("A:", margin, posY);
doc.text("RECTOR UNIVERSIDAD DE SANTIAGO DE CHILE", colWidth + margin, posY);
doc.moveDown(2);

doc.font("Open-Sans-Bold").text("SR. RECTOR:",margin);
doc.moveDown(2);
doc.font("Open-Sans");
doc.text(
    "Me permito solicitar a Ud., se conceda el título de xxxxxx a ",
    margin
  );
doc.moveDown(1);
doc.text(
    "El (la) interesado(a), ha cumplido satisfacoriamente con las exigencias fijadas en el Plan de Estudio, Resolución(es) N° xxxx xxxx xxxxx",
    margin
  );
doc.moveDown(1);
doc.text(
    "Los antecedentes han sido debidamente verificados por el suscrito, quien se responsabiliza de la corrección de la documentación que se acompaña.",
    margin
  );
doc.moveDown(1);
doc.text(
    "De acuerdo a los antecedentes, completó sus requesitos para obtener el xxxxxxx con fecha de xx x  x x x x x x",
    margin
  );
doc.moveDown(3);
doc.font("Open-Sans");
doc.text("Saluda atentamente a Ud.,", margin, doc.y);

doc.moveDown(5);

let text = "RAÚL BERRIOS ESPINOZA";
let textWidth = doc.widthOfString(text);
doc.text(text, margin + colWidth * 8, doc.y, {
  width: colWidth * 4,
  align: "center",
});
doc
  .moveTo(margin + colWidth * 8 + (colWidth * 4 - textWidth) / 2, doc.y)
  .lineTo(pageWidth - margin - (colWidth * 4 - textWidth) / 2, doc.y)
  .strokeColor("black")
  .stroke();
doc.fontSize(10).text("DECANO", margin + colWidth * 8, doc.y, {
  width: colWidth * 4,
  align: "center",
});

doc.end();
