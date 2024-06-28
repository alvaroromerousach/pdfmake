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
