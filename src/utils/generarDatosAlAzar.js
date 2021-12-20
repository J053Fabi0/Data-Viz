const { estados } = require("./constantes");
const azar = require("./númerosAleatorios");

/**
 * Generar un intervalo al azar de años, en un rango dado y con una longitud determinada.
 */
const generarIntervaloDeAñosAleatorio = (
  númeroDeAños = 22,
  añoMínimo = 2000,
  añoMayor = new Date().getFullYear()
) => {
  const añoMayorAzar = azar(añoMínimo + númeroDeAños - 1, añoMayor);
  return { añoMínimo: añoMayorAzar - númeroDeAños + 1, añoMayor: añoMayorAzar };
};

/**
 * Generar los datos al azar que alimentarán la gráfica.
 */
const generarDatosAlAzar = () => {
  const datos = {};
  // Genero el intervalo al azar de años.
  const { añoMínimo, añoMayor } = generarIntervaloDeAñosAleatorio();
  // Itero en cada año.
  for (let año = añoMínimo; año <= añoMayor; año++) {
    datos[año] = [];
    // Itero en cada estado.
    for (let i = 0; i < 32; i++) {
      // Genero los IDH al azar.
      const IDHPromedio = azar(10, 100);
      const IDHMenor = azar(10, IDHPromedio);
      const IDHMayor = azar(IDHPromedio, 100);
      // Integro los datos.
      datos[año].push({
        índiceDelEstado: i,
        datos: { IDHMenor: IDHMenor / 100, IDHPromedio: IDHPromedio / 100, IDHMayor: IDHMayor / 100 },
      });
    }
  }
  return datos;
};

module.exports = generarDatosAlAzar;
