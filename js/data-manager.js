// Data Manager - Centralized data operations for JSON files
class DataManager {
    constructor() {
        this.dataPath = './data/';
        this.cache = {};
    }

    // Generic fetch function with fallback to localStorage
    async fetchJSON(fileName, localStorageKey = null) {
        try {
            const response = await fetch(this.dataPath + fileName);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            this.cache[fileName] = data;
            return data;
        } catch (error) {
            console.warn(`Failed to fetch ${fileName}, trying localStorage fallback:`, error);
            // Fallback to localStorage if JSON file doesn't exist yet
            if (localStorageKey) {
                const localData = localStorage.getItem(localStorageKey);
                return localData ? JSON.parse(localData) : (fileName.includes('standings') || fileName.includes('contributions') ? {} : []);
            }
            return fileName.includes('standings') || fileName.includes('contributions') ? {} : [];
        }
    }

    // Load all data files
    async loadAllData() {
        const [
            drivers,
            teams,
            news,
            races,
            driverStandings,
            constructorStandings,
            completedRaces,
            raceContributions,
            lastUpdate
        ] = await Promise.all([
            this.fetchJSON('drivers.json', 'drivers_data'),
            this.fetchJSON('teams.json', 'teams_data'),
            this.fetchJSON('news.json', 'news_data'),
            this.fetchJSON('races.json', 'calendar_races'),
            this.fetchJSON('driver-standings.json', 'driverStandings'),
            this.fetchJSON('constructor-standings.json', 'constructorStandings'),
            this.fetchJSON('completed-races.json', 'completedRaces'),
            this.fetchJSON('race-contributions.json', 'raceContributions'),
            this.fetchJSON('last-update.json', 'standingsLastUpdate')
        ]);

        return {
            drivers,
            teams,
            news,
            races,
            driverStandings,
            constructorStandings,
            completedRaces,
            raceContributions,
            lastUpdate
        };
    }

    // Save data to both localStorage and trigger sync
    saveToLocalStorage(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
        // Trigger storage event for other tabs/windows
        window.dispatchEvent(new StorageEvent('storage', {
            key: key,
            newValue: JSON.stringify(data),
            url: window.location.href
        }));
    }

    // Sync localStorage to JSON files (manual export when needed)
    async syncAllData() {
        console.log('💾 Data synced to localStorage. Use "Export All Data" to save permanently.');
        return { success: true, message: 'Data saved locally' };
    }

    // Download JSON file (for manual backup)
    downloadJSON(fileName, data) {
        const jsonStr = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Export all data as JSON files
    async exportAllData() {
        const data = {
            'drivers.json': JSON.parse(localStorage.getItem('drivers_data') || '[]'),
            'teams.json': JSON.parse(localStorage.getItem('teams_data') || '[]'),
            'news.json': JSON.parse(localStorage.getItem('news_data') || '[]'),
            'races.json': JSON.parse(localStorage.getItem('calendar_races') || '[]'),
            'driver-standings.json': JSON.parse(localStorage.getItem('driverStandings') || '[]'),
            'constructor-standings.json': JSON.parse(localStorage.getItem('constructorStandings') || '[]'),
            'completed-races.json': JSON.parse(localStorage.getItem('completedRaces') || '[]'),
            'race-contributions.json': JSON.parse(localStorage.getItem('raceContributions') || '{}'),
            'last-update.json': {
                timestamp: localStorage.getItem('standingsLastUpdate') || new Date().toISOString(),
                lastRace: this.getLastCompletedRace()
            }
        };

        // Download each file
        for (const [fileName, fileData] of Object.entries(data)) {
            this.downloadJSON(fileName, fileData);
            // Small delay between downloads to prevent browser blocking
            await new Promise(resolve => setTimeout(resolve, 200));
        }

        return data;
    }

    // Get last completed race name
    getLastCompletedRace() {
        const completedRaces = JSON.parse(localStorage.getItem('completedRaces') || '[]');
        if (completedRaces.length > 0) {
            const lastRace = completedRaces[completedRaces.length - 1];
            return lastRace.trackName || lastRace.track || 'Unknown';
        }
        return '';
    }

    // Specific data loaders
    async getDrivers() {
        return await this.fetchJSON('drivers.json', 'drivers_data');
    }

    async getTeams() {
        return await this.fetchJSON('teams.json', 'teams_data');
    }

    async getNews() {
        return await this.fetchJSON('news.json', 'news_data');
    }

    async getRaces() {
        return await this.fetchJSON('races.json', 'calendar_races');
    }

    async getDriverStandings() {
        return await this.fetchJSON('driver-standings.json', 'driverStandings');
    }

    async getConstructorStandings() {
        return await this.fetchJSON('constructor-standings.json', 'constructorStandings');
    }

    async getCompletedRaces() {
        return await this.fetchJSON('completed-races.json', 'completedRaces');
    }

    async getRaceContributions() {
        return await this.fetchJSON('race-contributions.json', 'raceContributions');
    }

    async getLastUpdate() {
        return await this.fetchJSON('last-update.json', 'standingsLastUpdate');
    }
}

// Create global instance
window.dataManager = new DataManager();
