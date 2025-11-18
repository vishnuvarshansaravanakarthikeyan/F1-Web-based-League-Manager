// Update this in the admin.html processTelemetryFile function
function updateTrackCompletion(trackName, winner, teamName) {
    // Update races_data
    const races = JSON.parse(localStorage.getItem('races_data') || '[]');
    const raceIndex = races.findIndex(r => 
        r.circuit === trackName || 
        r.name === trackName || 
        r.track === trackName
    );

    if (raceIndex !== -1) {
        races[raceIndex].completed = true;
        races[raceIndex].status = 'completed';
        races[raceIndex].winner = winner;
        localStorage.setItem('races_data', JSON.stringify(races));
    }

    // Update completedRaces
    const completed = JSON.parse(localStorage.getItem('completedRaces') || '{}');
    completed[trackName] = {
        completed: true,
        winner: winner,
        team: teamName,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem('completedRaces', JSON.stringify(completed));

    // Trigger calendar update
    localStorage.setItem('calendarUpdateTrigger', Date.now().toString());
}