// Configuración para Football-Data.org
export const API_KEY = import.meta.env.PUBLIC_FOOTBALL_DATA_KEY || '';
export const API_BASE_URL = 'https://api.football-data.org/v4';

console.log('🔑 API Key configurada:', API_KEY ? 'Disponible' : 'No disponible');

export const API_ENDPOINTS = {
  MATCHES: '/matches',
  TEAMS: '/teams',
  COMPETITIONS: '/competitions',
  STANDINGS: '/standings',
  PLAYERS: '/persons',
};

// IDs de competiciones populares
export const COMPETITIONS = {
  LA_LIGA: 2014,
  PREMIER_LEAGUE: 2021,
  BUNDESLIGA: 2002,
  SERIE_A: 2019,
  LIGUE_1: 2015,
  CHAMPIONS_LEAGUE: 2001,
};