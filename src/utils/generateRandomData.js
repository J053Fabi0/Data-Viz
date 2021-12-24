const random = require("./randomNumbers");

/**
 * Generar un intervalo al azar de años, en un rango dado y con una longitud determinada.
 */
const generateRandomYearInterval = (numberOfYears = 22, minYear = 2000, maxYear = new Date().getFullYear()) => {
  const randomEarlierYear = random(minYear + numberOfYears - 1, maxYear);
  return { olderYear: randomEarlierYear - numberOfYears + 1, earlierYear: randomEarlierYear };
};

/**
 * Generar los datos al azar que alimentarán la gráfica.
 */
const generateRandomData = () => {
  const minIDHPosible = 0.05 * 100,
    maxIDHPosible = 1 * 100;
  const data = {};
  // Genero el intervalo al azar de años.
  const { olderYear, earlierYear } = generateRandomYearInterval();

  // Itero en cada año.
  for (let year = olderYear; year <= earlierYear; year++) {
    // Preparo el arreglo que contendrá los datos de este año.
    data[year] = [];

    // Itero en cada estado.
    for (let i = 0; i < 32; i++) {
      // Genero los IDH al azar.
      const averageIDH = random(minIDHPosible + 1, maxIDHPosible - 1);
      const minIDH = random(minIDHPosible, averageIDH - 1);
      const maxIDH = random(averageIDH + 1, maxIDHPosible);
      // Integro los datos en el arreglo.
      data[year].push({
        stateIndex: i,
        data: { minIDH: minIDH / 100, averageIDH: averageIDH / 100, maxIDH: maxIDH / 100 },
      });
    }
  }
  return data;
};

module.exports = generateRandomData;
