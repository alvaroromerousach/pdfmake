export class Fechas {
  private static meses = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  private static diasDeLaSemana = [
    "domingo",
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado",
  ];

  public static obtenerFechaActualEnEspanol(formato: string): string {
    const fecha = new Date();
    const dia = fecha.getDate();
    const mes = Fechas.meses[fecha.getMonth()]; // Los meses en JavaScript son 0-indexados
    const año = fecha.getFullYear();
    const diaSemana = Fechas.diasDeLaSemana[fecha.getDay()]; // Los días en JavaScript son 0-indexados, donde 0 es domingo

    switch (formato) {
      case "DD de MMMM de YYYY":
        return `${dia} de ${mes} de ${año}`;
      case "dddd DD de MMMM de YYYY":
        return `${diaSemana} ${dia} de ${mes} de ${año}`;
      case "dddd DD de MMMM":
        return `${diaSemana} ${dia} de ${mes}`;
      case "DD/MM/YY":
        const diaStr = dia.toString().padStart(2, "0");
        const mesStr = (fecha.getMonth() + 1).toString().padStart(2, "0"); // Los meses en JavaScript son 0-indexados
        const añoStr = año.toString().slice(-2);
        return `${diaStr}/${mesStr}/${añoStr}`;
      case "DD MMMM YYYY":
        return `${dia} ${mes} ${año}`;
      default:
        throw new Error("Formato de fecha no soportado");
    }
  }
}
