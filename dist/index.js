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
const doc = new pdfkit_1.default({
    size: 'LETTER', // Tamaño de la hoja carta
    margins: {
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
doc.fontSize(20).text("¡Hola mundo desde Node.js, pdfkit y pdfmake!", {
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
