// Datos de ejemplo para desarrollo mientras se resuelven problemas de API

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