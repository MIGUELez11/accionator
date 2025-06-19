import { getFinancialmodelingprepClient, ScreeningParams } from "./clients/getFinancialmodelingprepClient";


const limit = 20;

const screeners = {
  // 1. **Acciones con Alto Volumen y Movimiento (Ganadoras/Perdedoras Potenciales)**
  //    Ideal para day-trading, buscando liquidez y acciones que ya están activas.
  highVolumeMovers: {
    priceMoreThan: 5,           // Evitar acciones 'penny stocks' o de muy bajo precio, más riesgosas
    marketCapMoreThan: 300000000, // Mínimo 300M para asegurar liquidez y tamaño decente (small-mid cap)
    volumeMoreThan: 2000000,    // Alto volumen para asegurar liquidez para day-trading (ajustar)
    limit                       // Limitar resultados para no sobrecargar
  },

  // 2. **Acciones con Volatilidad Reciente (para estrategias de impulso o reversión)**
  //    Busca acciones que están mostrando grandes swings, pero con un mínimo de liquidez.
  highVolatilityPotential: {
    betaMoreThan: 1.2,          // Beta > 1.2 indica que es más volátil que el mercado (ajustar)
    priceMoreThan: 10,          // Evitar acciones muy baratas/iliquidas
    marketCapMoreThan: 500000000, // Mínimo 500M para asegurar un tamaño relevante
    volumeMoreThan: 1500000,    // Buen volumen para operativa
    limit
  },

  // 3. **Acciones de Crecimiento con Precios Atractivos (potencial a corto-medio plazo)**
  //    No es puramente day-trading, pero puede capturar acciones con buen momentum.
  //    Aquí podríamos inferir "potencial de subida" si tienen buen fundamental y no están carísimas.
  //    (Los parámetros de ScreeningParams son limitados para esto, pero podemos aproximar)
  valueGrowthCandidates: {
    priceMoreThan: 10,
    priceLowerThan: 150,        // No demasiado caras, más accesibles
    marketCapMoreThan: 1000000000, // Mid-cap a large-cap
    volumeMoreThan: 500000,     // Volumen decente
    dividendLowerThan: 0.01,    // Asumimos que empresas de crecimiento no pagan altos dividendos
    limit
  },

  // 4. **Acciones "de valor" con alta liquidez (potencial para un rebote o momentum sostenido)**
  //    Esto es más inferencial ya que no tenemos P/E directamente.
  //    Podríamos buscar empresas de gran capitalización con volumen, asumiendo que el mercado
  //    las ha "corregido" y pueden rebotar.
  largeCapLiquidity: {
    marketCapMoreThan: 10000000000, // Grande capitalización (más estables, menos volátiles a veces)
    volumeMoreThan: 3000000,        // Muy alto volumen, alta liquidez
    priceMoreThan: 50,              // Precios más altos
    limit
  }
} as const satisfies Record<string, ScreeningParams>;

export async function getScreening(screener: keyof typeof screeners) {
  const client = await getFinancialmodelingprepClient();

  return client.stockScreener(screeners[screener]);
}