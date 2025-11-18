// Map telemetry names to consistent track names
const trackMappings = {
    "Italy": "Monza Circuit",
    "Italian": "Monza Circuit",
    "Monza": "Monza Circuit",
    "Japan": "Suzuka Circuit",
    "Suzuka": "Suzuka Circuit",
    "Bahrain": "Bahrain International Circuit",
    "Austria": "Red Bull Ring",
    "Spain": "Circuit de Barcelona-Catalunya",
    "Great Britain": "Silverstone Circuit",
    "Belgium": "Circuit de Spa-Francorchamps",
    "Canada": "Circuit Gilles Villeneuve",
    "Saudi Arabia": "Jeddah Corniche Circuit",
    "Netherlands": "Circuit Zandvoort",
    "Mexico": "Autódromo Hermanos Rodríguez",
    "Brazil": "Autódromo José Carlos Pace",
    "Abu Dhabi": "Yas Marina Circuit",
    "United States": "Circuit of the Americas",
    "Las Vegas": "Las Vegas Strip Circuit",
    "Azerbaijan": "Baku City Circuit"
};

function normalizeTrackName(trackName) {
    return trackMappings[trackName] || trackName;
}

function findRaceByTrack(trackName, races) {
    const normalizedTrack = normalizeTrackName(trackName);
    return races.find(race => 
        normalizeTrackName(race.circuit) === normalizedTrack ||
        normalizeTrackName(race.name) === normalizedTrack ||
        normalizeTrackName(race.track) === normalizedTrack ||
        normalizeTrackName(race.location) === normalizedTrack
    );
}