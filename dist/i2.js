"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pdfkit_1 = __importDefault(require("pdfkit"));
const fs = __importStar(require("fs"));
const Fechas_1 = require("./Fechas");
//import { width } from "pdfkit/js/page";
// Crear el documento PDF
const doc = new pdfkit_1.default({
    size: "LETTER",
    margins: {
        top: 28.35, // 1 cm
        bottom: 28.35,
        left: 28.35,
        right: 28.35,
    },
});
doc.pipe(fs.createWriteStream("doc-i2.pdf"));
doc.registerFont("Open-Sans-Bold", "src/fonts/OpenSans-SemiBold.ttf");
doc.registerFont("Open-Sans-Condensed", "src/fonts/OpenSans_Condensed-Medium.ttf");
doc.registerFont("Open-Sans", "src/fonts/OpenSans-Regular.ttf");
let text;
let textWidth;
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
// Logo USACH
//const col1Width = colWidth * 1;
const logoPath = "src/logo-usach.png"; // Ruta a tu logo
doc.image(logoPath, margin, margin, {
    fit: [colWidth, colWidth], // Ajustar el tamaño del logo
});
// Columna 2: col-4 (4/12 del ancho)
//const col2Width = colWidth * 4;
let texts = [
    "REPUBLICA DE CHILE",
    "UNIVERSIDAD DE SANTIAGO DE CHILE",
    "FACULTAD DE ADMINISTRACIÓN Y ECONOMÍA",
    "REGISTRO CURRICULAR",
];
doc.font("Open-Sans-Condensed").fontSize(10);
texts.forEach((text) => {
    doc.text(text, margin + colWidth, doc.y, {
        paragraphGap: 0,
        lineGap: 0,
        align: "center",
        width: colWidth * 4,
    });
});
doc.font("Open-Sans").fontSize(12);
doc.text("N° xxxxxx", margin + colWidth * 11, doc.y, { paragraphGap: 0, lineGap: 0 });
doc;
doc.moveDown(1); // Añadir espacio entre filas
const title = "INFORME DE CALIFICACIONES";
let titleWidth = doc.widthOfString(title);
const titleX = (pageWidth - titleWidth) / 2;
doc.font("Open-Sans-Bold").fontSize(15).text(title, margin, doc.y, {
    paragraphGap: 10,
    align: "center",
});
// Fecha
let posY = doc.y;
doc.font("Open-Sans").fontSize(10);
//text="Céd. Identidad:";
//textWidth = doc.widthOfString(title);
doc.text("Céd. Identidad:", margin, posY);
doc.text("12121212-1", margin + colWidth * 2, posY);
doc.text("Nombre:", margin + colWidth * 4, posY);
doc.text("JUANIN JUAN JARRI 31 MINUTOS", margin + colWidth * 6, posY);
doc.moveDown(1);
doc.text("NOMBRE DEL PROGRAMA QUE ESTUDIA JUANIN", margin);
doc.moveDown(1);
posY = doc.y;
doc.text("Fecha de Ingreso:", margin, posY);
doc.text("xxxx xxxxx xx 9999", margin + colWidth * 2, posY);
doc.moveDown(1);
posY = doc.y;
doc.text("Plan de Estudios:", margin, posY);
doc.text("resolucion x", margin + colWidth * 2, posY);
doc.text("n° equis", margin + colWidth * 4, posY);
doc.moveDown(2);
doc.font("Open-Sans");
doc.text("Remito a usted Expediente de Título, Carta de Solicitud al Sr. Rector del egresado de esta Facultad que solicita le conceda el Título que se indica a continuación:", margin);
doc.moveDown(2);
posY = doc.y;
doc.text("NOMBRE:", margin, posY);
doc.font("Open-Sans-Bold");
doc.text("APELLIDO1 APELLIDO2, NOMBRES", margin + colWidth * 2, posY);
doc.moveDown(1);
posY = doc.y;
doc.font("Open-Sans");
doc.text("CARRERA:", margin, posY);
doc.font("Open-Sans-Bold");
doc.text("NOMBRE DEL MINOR", margin + colWidth * 2, posY);
doc.moveDown(1);
posY = doc.y;
doc.font("Open-Sans");
doc.text("FECHA:", margin, posY);
doc.font("Open-Sans-Bold");
doc.text("xx de xxxxx de xxxxx", margin + colWidth * 2, posY);
doc.moveDown(2);
doc
    .moveTo(margin, doc.y)
    .lineTo(pageWidth - margin, doc.y)
    .strokeColor("black")
    .stroke();
doc.font("Open-Sans-Condensed");
doc.fontSize(6).text("Notas: 0 a 100, nota mínima 50 (hasta 2/90) y 1 a 7, nota mínima 4 (desde 1/91); Idioma: A=Aprobado con Distinción, B=Suficiente; Culturales y Coprogramáticos: AD=Aprobado con Distinción, A=Aprobado; CONV=Convalidado", margin, doc.y, { width: pageWidth - margin * 2, align: "center", });
const fecha = Fechas_1.Fechas.obtenerFechaActualEnEspanol("DD de MMMM de YYYY");
doc.moveDown(1);
doc.fontSize(12);
doc.font("Open-Sans-Bold");
doc.text("Santiago, " + fecha, margin, doc.y);
doc.moveDown(1);
doc.font("Open-Sans");
doc.moveDown(3);
text = "IVÁN JORQUERA HIDALGO";
textWidth = doc.widthOfString(text);
doc.text(text, margin + colWidth * 8, doc.y, {
    width: colWidth * 4,
    align: "center",
});
doc
    .moveTo(margin + colWidth * 8 + (colWidth * 4 - textWidth) / 2, doc.y)
    .lineTo(pageWidth - margin - (colWidth * 4 - textWidth) / 2, doc.y)
    .strokeColor("black")
    .stroke();
doc.fontSize(10).text("REGISTRADOR CURRICULAR", margin + colWidth * 8, doc.y, {
    width: colWidth * 4,
    align: "center",
});
doc.moveDown(2);
doc.font("Open-Sans");
doc.fontSize(12).text("Distribución:", margin, doc.y);
doc.end();
