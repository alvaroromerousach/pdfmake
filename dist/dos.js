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
doc.pipe(fs.createWriteStream("mi-documento.pdf"));
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
const columnMargin = 0;
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
    fit: [col1Width - 2 * columnMargin, 50], // Ajustar el tamaño del logo
});
doc.save();
// Columna 2: col-4 (4/12 del ancho)
const col2Width = colWidth * 5;
const textLines = "UNIVERSIDAD DE SANTIAGO DE CHILE\nREGISTRO ACADÉMICO\nTÍTULOS Y GRADOS";
doc
    .fontSize(10)
    /*  .scale(0.8, 1)*/
    .text(textLines, margin + col1Width + columnMargin, margin + columnMargin, {
    width: col2Width - 2 * columnMargin,
    align: "center",
});
// Columna 3: col-6 (6/12 del ancho)
const col3Width = colWidth * 5;
doc.restore();
const loremIpsum = "ROL\nAPROBAD\nRESOLUCION\nDEL";
doc
    .fontSize(10)
    .text(loremIpsum, margin + col1Width + col2Width + colWidth + columnMargin, margin + columnMargin, {
    width: col3Width - 2 * columnMargin,
    align: "justify",
});
//doc.moveDown(1);
// Centrar el título respecto al ancho total del documento
doc.moveDown(2); // Añadir espacio entre filas
const title = "EXPEDIENTE DE MINOR";
const titleWidth = doc.widthOfString(title);
const titleX = (pageWidth - titleWidth) / 2;
doc.fontSize(20).text(title, margin, doc.y, {
    paragraphGap: 20,
    align: "center",
});
// Tercera fila: Cuadro
const boxHeight = 113.39; // 4 cm en puntos
const halfPageWidth = pageWidth / 2;
doc
    .rect(halfPageWidth + margin, doc.y, halfPageWidth - margin * 2, boxHeight).strokeColor("black")
    .stroke();
doc
    .fontSize(20)
    .text("1 Expe diente de Minor 2 ", margin, doc.y + boxHeight, {
    align: "center",
    paragraphGap: 20,
});
/*
// guia de color rojo
doc
 .lineWidth(1)
 .rect( margin + col1Width + columnMargin, margin + columnMargin, 2, 2)
 .strokeColor("red")
 .stroke();
*/
console.log("pageWidth:" + pageWidth);
console.log("pageHeight:" + pageHeight);
console.log("colWidth:" + colWidth);
console.log("margin:" + margin);
const suma = margin + col1Width + columnMargin;
console.log("margin + col1Width + columnMargin" + suma);
/*console.log("doc.x:" + doc.x);
console.log("doc.y:" + doc.y);*/
// Finalizar el documento
doc.end();
