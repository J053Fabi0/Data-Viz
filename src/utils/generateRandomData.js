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
  const data = {};
  // Genero el intervalo al azar de años.
  const { olderYear, earlierYear } = generateRandomYearInterval();
  // Itero en cada año.
  for (let year = olderYear; year <= earlierYear; year++) {
    data[year] = [];
    // Itero en cada estado.
    for (let i = 0; i < 32; i++) {
      // Genero los IDH al azar.
      const averageIDH = random(10, 99);
      const minIDH = random(10, averageIDH - 1);
      const maxIDH = random(averageIDH + 1, 100);
      // Integro los datos.
      data[year].push({
        stateIndex: i,
        data: { minIDH: minIDH / 100, averageIDH: averageIDH / 100, maxIDH: maxIDH / 100 },
      });
    }
  }
  return data;
};

module.exports = generateRandomData;
