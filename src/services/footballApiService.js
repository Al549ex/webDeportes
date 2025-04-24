import { API_KEY, API_BASE_URL, API_ENDPOINTS, COMPETITIONS } from './apiConfig';

// Función para debugging
const logRequest = (url, headers) => {
  console.log('🔄 Realizando petición a:', url);
  console.log('🔑 Headers:', JSON.stringify(headers, null, 2));
};

// Función genérica para realizar peticiones
async function fetchFromAPI(endpoint, params = {}) {
  let url = new URL(`${API_BASE_URL}${endpoint}`);
  
  // Añadir parámetros a la URL si existen
  Object.keys(params).forEach(key => 
    url.searchParams.append(key, params[key])
  );
  
  const headers = getHeaders();
  
  // Debug de petición
  logRequest(url.toString(), headers);
  
  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: headers
    });
    
    if (!response.ok) {
      // Intentar obtener más información sobre el error
      const errorText = await response.text();
      console.error(`Error de API (${response.status}):`, errorText);
      throw new Error(`Error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('📊 Respuesta de la API (resumida):', 
      JSON.stringify({
        count: data.count || 'N/A',
        resultType: Array.isArray(data) ? 'Array' : typeof data,
        firstItem: data.matches ? 'Tiene matches' : (data[0] ? 'Tiene elementos' : 'Sin elementos')
      }, null, 2)
    );
    return data;
  } catch (error) {
    console.error('Error en la petición a la API:', error);
    throw error;
  }
}

// Obtener cabeceras con la API key correcta
const getHeaders = () => ({
  'X-Auth-Token': API_KEY
});

// Obtener próximos partidos
export async function getUpcomingMatches(limit = 5, competitionId = COMPETITIONS.LA_LIGA) {
  try {
    // Football-Data permite obtener directamente los próximos partidos
    const response = await fetchFromAPI(`/competitions/${competitionId}/matches`, {
      status: 'SCHEDULED',
      limit: limit
    });
    
    // Asegurarse de que response.matches existe
    if (!response || !response.matches) {
      console.warn('La respuesta de la API no tiene el formato esperado:', response);
      return { response: [] };
    }
    
    return { 
      response: formatMatches(response.matches.slice(0, limit)) 
    };
  } catch (error) {
    console.error('Error al obtener próximos partidos:', error);
    return { response: [] }; // Devolver array vacío en lugar de lanzar excepción
  }
}

// Obtener partidos recientes
export async function getRecentMatches(limit = 5, competitionId = COMPETITIONS.LA_LIGA) {
  try {
    // Partidos ya jugados (finalizados)
    const response = await fetchFromAPI(`/competitions/${competitionId}/matches`, {
      status: 'FINISHED',
      limit: limit * 2 // Pedimos más para después filtrar los más recientes
    });
    
    // Asegurarse de que response.matches existe
    if (!response || !response.matches) {
      console.warn('La respuesta de la API no tiene el formato esperado:', response);
      return { response: [] };
    }
    
    // Ordenar por fecha más reciente y limitar
    const sortedMatches = response.matches
      .sort((a, b) => new Date(b.utcDate) - new Date(a.utcDate))
      .slice(0, limit);
      
    return { 
      response: formatMatches(sortedMatches) 
    };
  } catch (error) {
    console.error('Error al obtener partidos recientes:', error);
    return { response: [] }; // Devolver array vacío en lugar de lanzar excepción
  }
}

// Obtener datos de un equipo
export async function getTeamDetails(teamId) {
  try {
    const response = await fetchFromAPI(`${API_ENDPOINTS.TEAMS}/${teamId}`);
    return { 
      response: [formatTeam(response)] 
    };
  } catch (error) {
    console.error('Error al obtener detalles del equipo:', error);
    throw error;
  }
}

// Obtener jugadores de un equipo
export async function getTeamPlayers(teamId) {
  try {
    const teamData = await fetchFromAPI(`${API_ENDPOINTS.TEAMS}/${teamId}`);
    
    return {
      response: formatPlayers(teamData.squad)
    };
  } catch (error) {
    console.error('Error al obtener jugadores del equipo:', error);
    throw error;
  }
}

// Añade esta función para obtener equipos por competición

// Obtener equipos por competición
export async function getTeamsByCompetition(competitionId) {
  try {
    const response = await fetchFromAPI(`/competitions/${competitionId}/teams`);
    
    return {
      teams: response.teams || []
    };
  } catch (error) {
    console.error(`Error al obtener equipos de la competición ${competitionId}:`, error);
    return { teams: [] };
  }
}

// Obtener detalles de un partido específico
export async function getMatchDetails(matchId) {
  try {
    const response = await fetchFromAPI(`${API_ENDPOINTS.MATCHES}/${matchId}`);
    
    // Si no hay datos o la estructura es incorrecta
    if (!response) {
      throw new Error('No se encontraron datos del partido');
    }
    
    // Formatear la respuesta para mantener consistencia con el resto de la aplicación
    return {
      match: {
        fixture: {
          id: response.id || 0,
          date: response.utcDate || new Date().toISOString(),
          venue: { 
            name: response.venue || 'No disponible', 
            city: '' 
          },
          status: { 
            long: response.status === 'FINISHED' ? 'Finalizado' : 'No comenzado', 
            short: response.status === 'FINISHED' ? 'FT' : 'NS' 
          }
        },
        league: {
          id: response.competition?.id || 0,
          name: response.competition?.name || 'Liga no especificada',
          country: response.competition?.area?.name || 'País no especificado',
          logo: response.competition?.id ? 
            `https://crests.football-data.org/${response.competition.id}.svg` : 
            '/assets/league-placeholder.png'
        },
        teams: {
          home: {
            id: response.homeTeam?.id || 0,
            name: response.homeTeam?.name || 'Equipo local',
            logo: response.homeTeam?.crest || 
                 (response.homeTeam?.id ? `https://crests.football-data.org/${response.homeTeam.id}.svg` : 
                 '/assets/team-placeholder.png')
          },
          away: {
            id: response.awayTeam?.id || 0,
            name: response.awayTeam?.name || 'Equipo visitante',
            logo: response.awayTeam?.crest || 
                 (response.awayTeam?.id ? `https://crests.football-data.org/${response.awayTeam.id}.svg` : 
                 '/assets/team-placeholder.png')
          }
        },
        goals: { 
          home: response.score?.fullTime?.home ?? null, 
          away: response.score?.fullTime?.away ?? null 
        },
        score: {
          halftime: {
            home: response.score?.halfTime?.home ?? null,
            away: response.score?.halfTime?.away ?? null
          },
          fulltime: {
            home: response.score?.fullTime?.home ?? null,
            away: response.score?.fullTime?.away ?? null
          }
        }
      }
    };
  } catch (error) {
    console.error('Error al obtener detalles del partido:', error);
    throw error;
  }
}

// Formatear datos de partidos para mantener compatibilidad con la estructura anterior
function formatMatches(matches) {
  if (!matches || !Array.isArray(matches)) {
    console.warn('No se recibió un array de partidos válido:', matches);
    return [];
  }
  
  return matches.map(match => {
    // Verificar que el objeto tenga la estructura esperada
    if (!match) return null;
    
    try {
      return {
        fixture: {
          id: match.id || 0,
          date: match.utcDate || new Date().toISOString(),
          venue: { 
            name: match.venue || 'No disponible', 
            city: '' 
          },
          status: { 
            long: match.status === 'FINISHED' ? 'Finalizado' : 'No comenzado', 
            short: match.status === 'FINISHED' ? 'FT' : 'NS' 
          }
        },
        league: {
          id: match.competition?.id || 0,
          name: match.competition?.name || 'Liga no especificada',
          country: match.competition?.area?.name || 'País no especificado',
          logo: match.competition?.id ? 
            `https://crests.football-data.org/${match.competition.id}.svg` : 
            '/assets/league-placeholder.png'
        },
        teams: {
          home: {
            id: match.homeTeam?.id || 0,
            name: match.homeTeam?.name || 'Equipo local',
            logo: match.homeTeam?.crest || 
                 (match.homeTeam?.id ? `https://crests.football-data.org/${match.homeTeam.id}.svg` : 
                 '/assets/team-placeholder.png')
          },
          away: {
            id: match.awayTeam?.id || 0,
            name: match.awayTeam?.name || 'Equipo visitante',
            logo: match.awayTeam?.crest || 
                 (match.awayTeam?.id ? `https://crests.football-data.org/${match.awayTeam.id}.svg` : 
                 '/assets/team-placeholder.png')
          }
        },
        goals: { 
          home: match.score?.fullTime?.home ?? null, 
          away: match.score?.fullTime?.away ?? null 
        },
        score: {
          halftime: {
            home: match.score?.halfTime?.home ?? null,
            away: match.score?.halfTime?.away ?? null
          },
          fulltime: {
            home: match.score?.fullTime?.home ?? null,
            away: match.score?.fullTime?.away ?? null
          }
        }
      };
    } catch (error) {
      console.error('Error al formatear partido:', error, match);
      return null;
    }
  }).filter(match => match !== null); // Filtrar cualquier partido que no se pudo procesar
}

// Formatear datos de equipo
function formatTeam(team) {
  return {
    team: {
      id: team.id,
      name: team.name,
      logo: team.crest,
      founded: team.founded,
      colors: team.clubColors,
      venue: team.venue
    },
    // Campos adicionales si están disponibles
    league: team.runningCompetitions?.[0] ? {
      id: team.runningCompetitions[0].id,
      name: team.runningCompetitions[0].name
    } : null,
    country: {
      name: team.area?.name || 'No disponible',
      flag: null
    }
  };
}

// Formatear datos de jugadores
function formatPlayers(players) {
  return players.map(player => ({
    player: {
      id: player.id,
      name: player.name,
      firstname: player.name.split(' ')[0],
      lastname: player.name.split(' ').slice(1).join(' '),
      age: calculateAge(player.dateOfBirth),
      nationality: player.nationality,
      position: player.position || 'No especificada',
      photo: null // Football-Data no proporciona fotos
    },
    statistics: [{
      team: {
        id: null,
        name: null
      },
      games: {
        position: player.position
      }
    }]
  }));
}

// Función auxiliar para calcular edad
function calculateAge(dateOfBirth) {
  if (!dateOfBirth) return null;
  
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}