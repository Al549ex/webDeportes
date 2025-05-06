// Datos de ejemplo para desarrollo independientes de API

export const getMockUpcomingMatches = (limit = 5) => {
  const matches = [
    {
      fixture: {
        id: 1,
        date: "2025-04-28T19:00:00+00:00",
        venue: { name: "Santiago Bernabéu", city: "Madrid" },
        status: { long: "No comenzado", short: "NS" }
      },
      league: {
        id: 2014,
        name: "La Liga",
        country: "Spain",
        logo: "https://crests.football-data.org/2014.svg"
      },
      teams: {
        home: {
          id: 86,
          name: "Real Madrid",
          logo: "https://crests.football-data.org/86.svg"
        },
        away: {
          id: 78,
          name: "Atlético Madrid",
          logo: "https://crests.football-data.org/78.svg"
        }
      },
      goals: { home: null, away: null }
    },
    {
      fixture: {
        id: 2,
        date: "2025-04-29T18:30:00+00:00",
        venue: { name: "Camp Nou", city: "Barcelona" },
        status: { long: "No comenzado", short: "NS" }
      },
      league: {
        id: 2014,
        name: "La Liga",
        country: "Spain",
        logo: "https://crests.football-data.org/2014.svg"
      },
      teams: {
        home: {
          id: 81,
          name: "Barcelona",
          logo: "https://crests.football-data.org/81.svg"
        },
        away: {
          id: 559,
          name: "Sevilla",
          logo: "https://crests.football-data.org/559.svg"
        }
      },
      goals: { home: null, away: null }
    },
    {
      fixture: {
        id: 3,
        date: "2025-04-30T19:00:00+00:00",
        venue: { name: "Estadio Mestalla", city: "Valencia" },
        status: { long: "No comenzado", short: "NS" }
      },
      league: {
        id: 2014,
        name: "La Liga",
        country: "Spain",
        logo: "https://crests.football-data.org/2014.svg"
      },
      teams: {
        home: {
          id: 95,
          name: "Valencia",
          logo: "https://crests.football-data.org/95.svg"
        },
        away: {
          id: 92,
          name: "Villarreal",
          logo: "https://crests.football-data.org/92.svg"
        }
      },
      goals: { home: null, away: null }
    }
  ];

  return { response: matches.slice(0, limit) };
};

export const getMockRecentMatches = (limit = 3) => {
  const matches = [
    {
      fixture: {
        id: 4,
        date: "2025-04-23T19:00:00+00:00",
        venue: { name: "Old Trafford", city: "Manchester" },
        status: { long: "Finalizado", short: "FT" }
      },
      league: {
        id: 2021,
        name: "Premier League",
        country: "England",
        logo: "https://crests.football-data.org/2021.svg"
      },
      teams: {
        home: {
          id: 33,
          name: "Manchester United",
          logo: "https://crests.football-data.org/33.svg"
        },
        away: {
          id: 62,
          name: "Everton",
          logo: "https://crests.football-data.org/62.svg"
        }
      },
      goals: { home: 3, away: 1 }
    },
    {
      fixture: {
        id: 5,
        date: "2025-04-22T18:30:00+00:00",
        venue: { name: "Etihad Stadium", city: "Manchester" },
        status: { long: "Finalizado", short: "FT" }
      },
      league: {
        id: 2021,
        name: "Premier League",
        country: "England",
        logo: "https://crests.football-data.org/2021.svg"
      },
      teams: {
        home: {
          id: 50,
          name: "Manchester City",
          logo: "https://crests.football-data.org/50.svg"
        },
        away: {
          id: 40,
          name: "Liverpool",
          logo: "https://crests.football-data.org/40.svg"
        }
      },
      goals: { home: 2, away: 2 }
    },
    {
      fixture: {
        id: 6,
        date: "2025-04-21T19:00:00+00:00",
        venue: { name: "Emirates Stadium", city: "London" },
        status: { long: "Finalizado", short: "FT" }
      },
      league: {
        id: 2021,
        name: "Premier League",
        country: "England",
        logo: "https://crests.football-data.org/2021.svg"
      },
      teams: {
        home: {
          id: 42,
          name: "Arsenal",
          logo: "https://crests.football-data.org/42.svg"
        },
        away: {
          id: 47,
          name: "Tottenham",
          logo: "https://crests.football-data.org/47.svg"
        }
      },
      goals: { home: 1, away: 0 }
    }
  ];

  return { response: matches.slice(0, limit) };
};

export const getMockMatchDetails = (matchId) => {
  const allMatches = [
    ...getMockUpcomingMatches(10).response,
    ...getMockRecentMatches(10).response
  ];
  
  const match = allMatches.find(match => match.fixture.id === parseInt(matchId));
  
  if (!match) {
    return null;
  }
  
  return { match };
};

export const getMockTeamsByCompetition = (competitionId) => {
  const laLigaTeams = [
    {
      id: 86,
      name: "Real Madrid",
      crest: "https://crests.football-data.org/86.svg",
      founded: 1902,
      area: { name: "España" }
    },
    {
      id: 81,
      name: "Barcelona",
      crest: "https://crests.football-data.org/81.svg",
      founded: 1899,
      area: { name: "España" }
    },
    {
      id: 78,
      name: "Atlético Madrid",
      crest: "https://crests.football-data.org/78.svg",
      founded: 1903,
      area: { name: "España" }
    },
    {
      id: 95,
      name: "Valencia",
      crest: "https://crests.football-data.org/95.svg",
      founded: 1919,
      area: { name: "España" }
    },
    {
      id: 559,
      name: "Sevilla",
      crest: "https://crests.football-data.org/559.svg",
      founded: 1890,
      area: { name: "España" }
    }
  ];

  const premierLeagueTeams = [
    {
      id: 50,
      name: "Manchester City",
      crest: "https://crests.football-data.org/50.svg",
      founded: 1880,
      area: { name: "Inglaterra" }
    },
    {
      id: 40,
      name: "Liverpool",
      crest: "https://crests.football-data.org/40.svg",
      founded: 1892,
      area: { name: "Inglaterra" }
    },
    {
      id: 42,
      name: "Arsenal",
      crest: "https://crests.football-data.org/42.svg",
      founded: 1886,
      area: { name: "Inglaterra" }
    },
    {
      id: 33,
      name: "Manchester United",
      crest: "https://crests.football-data.org/33.svg",
      founded: 1878,
      area: { name: "Inglaterra" }
    },
    {
      id: 47,
      name: "Tottenham",
      crest: "https://crests.football-data.org/47.svg",
      founded: 1882,
      area: { name: "Inglaterra" }
    }
  ];

  if (competitionId === 2014) {
    return { teams: laLigaTeams };
  } else if (competitionId === 2021) {
    return { teams: premierLeagueTeams };
  } else {
    return { teams: [] };
  }
};