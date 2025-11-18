// Admin Authentication
const ADMIN_KEY = 'admin_authenticated';
const DRIVERS_KEY = 'drivers_data';
const TEAMS_KEY = 'teams_data';
const NEWS_KEY = 'news_data';
const RACES_KEY = 'calendar_races';
const STANDINGS_KEY = 'standings_data';

// F1 League Data Management System
class F1LeagueDataManager {
    constructor() {
        this.data = {
            drivers: [],
            teams: [],
            races: [],
            news: [],
            standings: {
                drivers: {},
                constructors: {}
            }
        };
        this.loadData();
    }

    // Load all data from localStorage
    loadData() {
        this.data.drivers = JSON.parse(localStorage.getItem(DRIVERS_KEY) || '[]');
        this.data.teams = JSON.parse(localStorage.getItem(TEAMS_KEY) || '[]');
        this.data.races = JSON.parse(localStorage.getItem(RACES_KEY) || '[]');
        this.data.news = JSON.parse(localStorage.getItem(NEWS_KEY) || '[]');
        this.data.standings = JSON.parse(localStorage.getItem(STANDINGS_KEY) || '{"drivers":{},"constructors":{}}');
    }

    // Save all data to localStorage
    saveData() {
        // Save to localStorage
        localStorage.setItem(DRIVERS_KEY, JSON.stringify(this.data.drivers));
        localStorage.setItem(TEAMS_KEY, JSON.stringify(this.data.teams));
        localStorage.setItem(RACES_KEY, JSON.stringify(this.data.races));
        localStorage.setItem(NEWS_KEY, JSON.stringify(this.data.news));
        localStorage.setItem(STANDINGS_KEY, JSON.stringify(this.data.standings));
        
        // Log save confirmation
        console.log('💾 Data saved to localStorage. Use "Export All Data" button to save permanently.');
        
        updateAllPages();
    }

    // Driver Management
    addDriver(driverData) {
        if (!driverData.id) {
            driverData.id = Date.now().toString();
        }
        this.data.drivers.push(driverData);
        this.saveData();
        return driverData;
    }

    updateDriver(driverId, driverData) {
        const index = this.data.drivers.findIndex(d => d.id === driverId);
        if (index !== -1) {
            this.data.drivers[index] = { ...this.data.drivers[index], ...driverData };
            this.saveData();
            return this.data.drivers[index];
        }
        return null;
    }

    deleteDriver(driverId) {
        this.data.drivers = this.data.drivers.filter(d => d.id !== driverId);
        this.saveData();
    }

    // Team Management
    addTeam(teamData) {
        if (!teamData.id) {
            teamData.id = Date.now().toString();
        }
        this.data.teams.push(teamData);
        this.saveData();
        return teamData;
    }

    updateTeam(teamId, teamData) {
        const index = this.data.teams.findIndex(t => t.id === teamId);
        if (index !== -1) {
            this.data.teams[index] = { ...this.data.teams[index], ...teamData };
            this.saveData();
            return this.data.teams[index];
        }
        return null;
    }

    deleteTeam(teamId) {
        this.data.teams = this.data.teams.filter(t => t.id !== teamId);
        this.saveData();
    }

    // Race Management
    addRace(raceData) {
        if (!raceData.id) {
            raceData.id = Date.now().toString();
        }
        this.data.races.push(raceData);
        this.saveData();
        return raceData;
    }

    updateRace(raceId, raceData) {
        const index = this.data.races.findIndex(r => r.id === raceId);
        if (index !== -1) {
            this.data.races[index] = { ...this.data.races[index], ...raceData };
            this.saveData();
            return this.data.races[index];
        }
        return null;
    }

    deleteRace(raceId) {
        this.data.races = this.data.races.filter(r => r.id !== raceId);
        this.saveData();
    }

    // News Management
    addNews(newsData) {
        if (!newsData.id) {
            newsData.id = Date.now().toString();
        }
        newsData.date = new Date().toISOString();
        this.data.news.push(newsData);
        this.saveData();
        return newsData;
    }

    updateNews(newsId, newsData) {
        const index = this.data.news.findIndex(n => n.id === newsId);
        if (index !== -1) {
            this.data.news[index] = { ...this.data.news[index], ...newsData };
            this.saveData();
            return this.data.news[index];
        }
        return null;
    }

    deleteNews(newsId) {
        this.data.news = this.data.news.filter(n => n.id !== newsId);
        this.saveData();
    }

    // Standings Management
    updateStandings(driverStandings, constructorStandings) {
        this.data.standings.drivers = driverStandings;
        this.data.standings.constructors = constructorStandings;
        this.saveData();
    }

    // Get Methods
    getDrivers() { return this.data.drivers; }
    getTeams() { return this.data.teams; }
    getRaces() { return this.data.races; }
    getNews() { return this.data.news; }
    getStandings() { return this.data.standings; }
}

// Initialize the data manager
const dataManager = new F1LeagueDataManager();

// Check if admin is authenticated
function isAuthenticated() {
    return localStorage.getItem(ADMIN_KEY) === 'true';
}

// Simple authentication
function authenticate(password) {
    if (password === 'admin123') { // Change this to a secure password
        localStorage.setItem(ADMIN_KEY, 'true');
        return true;
    }
    return false;
}

function logout() {
    localStorage.removeItem(ADMIN_KEY);
    window.location.href = 'admin-login.html';
}

// Initial Driver Data
const initialDriverData = {
    "harish": {
        name: "Jilla Harish",
        team: "Red Bull Racing",
        photo: "Harish.png",
        points: 286,
        wins: 5,
        podiums: 9,
        position: 1
    },
    "dt": {
        name: "Tamil Gaming Doctor",
        team: "Red Bull Racing",
        photo: "DT.jpg",
        points: 286,
        wins: 5,
        podiums: 9,
        position: 1,
        nameStyle: "font-size: 19px"
    },
    "simman": {
        name: "Simman",
        team: "Ferrari",
        photo: "Simman.png",
        points: 274,
        wins: 4,
        podiums: 8,
        position: 2
    },
    "jamieson": {
        name: "Jamieson Paul",
        team: "Ferrari",
        photo: "Jamieson.jpg",
        points: 274,
        wins: 4,
        podiums: 8,
        position: 2
    },
    "nightfury": {
        name: "Nightfury",
        team: "Mercedes",
        photo: "Nightfury.png",
        points: 251,
        wins: 2,
        podiums: 7,
        position: 3
    },
    "majunu": {
        name: "Majunu",
        team: "Mercedes",
        photo: "Majunu.jpg",
        points: 251,
        wins: 2,
        podiums: 7,
        position: 3
    },
    "aswin": {
        name: "Aswin",
        team: "McLaren",
        photo: "Aswin.jpg",
        points: 228,
        wins: 1,
        podiums: 6,
        position: 4
    },
    "arvind": {
        name: "Arvind Siva",
        team: "McLaren",
        photo: "Arvind.jpg",
        points: 228,
        wins: 1,
        podiums: 6,
        position: 4
    },
    "tokumei": {
        name: "Tokumei",
        team: "Aston Martin",
        photo: "tokumei.png",
        points: 195,
        wins: 0,
        podiums: 4,
        position: 5
    },
    "vibhi": {
        name: "Vibhi",
        team: "Aston Martin",
        photo: "Vibhi.jpg",
        points: 195,
        wins: 0,
        podiums: 4,
        position: 5
    },
    "hariharan": {
        name: "Hariharan Perumal",
        team: "Williams Racing",
        photo: "Hariharan.png",
        points: 182,
        wins: 0,
        podiums: 3,
        position: 6,
        nameStyle: "font-size: 21px"
    },
    "denji": {
        name: "Denji",
        team: "Williams Racing",
        photo: "Denji.jpg",
        points: 182,
        wins: 0,
        podiums: 3,
        position: 6
    },
    "apex": {
        name: "Apexentropy",
        team: "Racing Bulls",
        photo: "Apex.jpg",
        points: 168,
        wins: 0,
        podiums: 2,
        position: 7
    },
    "jinx": {
        name: "Jinx",
        team: "Racing Bulls",
        photo: "jinx.png",
        points: 168,
        wins: 0,
        podiums: 2,
        position: 7
    },
    "dicaprio": {
        name: "Dicaprio",
        team: "Kick Sauber",
        photo: "Dicaprio.jpg",
        points: 145,
        wins: 0,
        podiums: 2,
        position: 8
    },
    "kentucky": {
        name: "Kentucky",
        team: "Kick Sauber",
        photo: "Kentucky.jpg",
        points: 145,
        wins: 0,
        podiums: 2,
        position: 8
    },
    "sleazy": {
        name: "Sleazy",
        team: "MoneyGram Haas F1",
        photo: "Sleazy.jpg",
        points: 145,
        wins: 0,
        podiums: 2,
        position: 8
    },
    "bala": {
        name: "Bala",
        team: "MoneyGram Haas F1",
        photo: "Bala.jpg",
        points: 145,
        wins: 0,
        podiums: 2,
        position: 8
    },
    "ramkumar": {
        name: "Ramkumar",
        team: "Alpine F1",
        photo: "Ramkumar.jpg",
        points: 145,
        wins: 0,
        podiums: 2,
        position: 8
    },
    "spartan": {
        name: "Spartan Gamer",
        team: "Alpine F1",
        photo: "Spartan.jpg",
        points: 145,
        wins: 0,
        podiums: 2,
        position: 8,
        nameStyle: "font-size: 27px"
    }
};

// Driver Management
function saveDriver(driverData) {
    if (driverData.id) {
        dataManager.updateDriver(driverData.id, driverData);
    } else {
        dataManager.addDriver(driverData);
    }
}

function deleteDriver(driverId) {
    dataManager.deleteDriver(driverId);
}

// Team Management
function saveTeam(teamData) {
    if (teamData.id) {
        dataManager.updateTeam(teamData.id, teamData);
    } else {
        dataManager.addTeam(teamData);
    }
}

function deleteTeam(teamId) {
    dataManager.deleteTeam(teamId);
}

// News Management
function saveNews(newsData) {
    if (newsData.id) {
        dataManager.updateNews(newsData.id, newsData);
    } else {
        dataManager.addNews(newsData);
    }
}

function deleteNews(newsId) {
    dataManager.deleteNews(newsId);
}

// Race Management
function saveRace(raceData) {
    if (raceData.id) {
        dataManager.updateRace(raceData.id, raceData);
    } else {
        dataManager.addRace(raceData);
    }
}

function deleteRace(raceId) {
    dataManager.deleteRace(raceId);
}

// File Upload Handling
function handleImageUpload(file, callback) {
    const reader = new FileReader();
    reader.onloadend = () => {
        callback(reader.result);
    };
    reader.readAsDataURL(file);
}

// Update all pages with new data
function updateAllPages() {
    const event = new CustomEvent('adminDataUpdated');
    window.dispatchEvent(event);
}

// Initialize drivers with photos and data
function initializeDrivers() {
    // Only initialize if no drivers exist
    if (dataManager.getDrivers().length === 0) {
        const drivers = Object.entries(initialDriverData).map(([key, data]) => ({
            id: key,
            name: data.name,
            team: data.team,
            photo: data.photo,
            points: data.points,
            wins: data.wins,
            podiums: data.podiums,
            position: data.position,
            nameStyle: data.nameStyle,
            profilePage: `${key}.html`
        }));
        drivers.forEach(driver => dataManager.addDriver(driver));
    }
}

// Data Initialization Functions
function initializeData() {
    initializeTracks();
    initializeDrivers();
    initializeTeams();
}

// Initialize tracks with current calendar data
function initializeTracks() {
    // Only initialize if no races exist in calendar_races
    if (!localStorage.getItem('calendar_races')) {
        const initialTracks = [
            {
                id: "1",
                round: "01",
                grandPrixName: "Australian Grand Prix",
                circuit: "Melbourne Grand Prix Circuit",
                date: "2025-03-16",
                flag: "🇦🇺",
                status: "upcoming",
                winner: ""
            },
            {
                id: "2",
                round: "02",
                grandPrixName: "Japanese Grand Prix",
                circuit: "Suzuka Circuit",
                date: "2025-03-30",
                flag: "🇯🇵",
                status: "upcoming",
                winner: ""
            },
            {
                id: "3",
                round: "03",
                grandPrixName: "Saudi Arabian Grand Prix",
                circuit: "Jeddah Corniche Circuit",
                date: "2025-04-13",
                flag: "🇸🇦",
                status: "upcoming",
                winner: ""
            },
            {
                id: "4",
                round: "04",
                grandPrixName: "Spanish Grand Prix",
                circuit: "Circuit de Barcelona-Catalunya",
                date: "2025-04-27",
                flag: "🇪🇸",
                status: "upcoming",
                winner: ""
            },
            {
                id: "5",
                round: "05",
                grandPrixName: "Bahrain Grand Prix",
                circuit: "Bahrain International Circuit",
                date: "2025-05-11",
                flag: "🇧🇭",
                status: "upcoming",
                winner: ""
            },
            {
                id: "6",
                round: "06",
                grandPrixName: "Austrian Grand Prix",
                circuit: "Red Bull Ring",
                date: "2025-05-25",
                flag: "🇦🇹",
                status: "upcoming",
                winner: ""
            },
            {
                id: "7",
                round: "07",
                grandPrixName: "Canadian Grand Prix",
                circuit: "Circuit Gilles Villeneuve",
                date: "2025-06-08",
                flag: "🇨🇦",
                status: "upcoming",
                winner: ""
            },
            {
                id: "8",
                round: "08",
                grandPrixName: "Italian Grand Prix",
                circuit: "Monza Circuit",
                date: "2025-06-22",
                flag: "🇮🇹",
                status: "upcoming",
                winner: ""
            },
            {
                id: "9",
                round: "09",
                grandPrixName: "British Grand Prix",
                circuit: "Silverstone Circuit",
                date: "2025-07-06",
                flag: "🇬🇧",
                status: "upcoming",
                winner: ""
            },
            {
                id: "10",
                round: "10",
                grandPrixName: "Belgian Grand Prix",
                circuit: "Circuit de Spa-Francorchamps",
                date: "2025-07-20",
                flag: "🇧🇪",
                status: "upcoming",
                winner: ""
            },
            {
                id: "11",
                round: "11",
                grandPrixName: "Las Vegas Grand Prix",
                circuit: "Las Vegas Strip Circuit",
                date: "2025-08-03",
                flag: "🇺🇸",
                status: "upcoming",
                winner: ""
            },
            {
                id: "12",
                round: "12",
                grandPrixName: "Azerbaijan Grand Prix",
                circuit: "Baku City Circuit",
                date: "2025-08-17",
                flag: "🇦🇿",
                status: "upcoming",
                winner: ""
            },
            {
                id: "13",
                round: "13",
                grandPrixName: "Dutch Grand Prix",
                circuit: "Circuit Zandvoort",
                date: "2025-08-31",
                flag: "🇳🇱",
                status: "upcoming",
                winner: ""
            },
            {
                id: "14",
                round: "14",
                grandPrixName: "United States Grand Prix",
                circuit: "Circuit of the Americas",
                date: "2025-09-14",
                flag: "🇺🇸",
                status: "upcoming",
                winner: ""
            },
            {
                id: "15",
                round: "15",
                grandPrixName: "Mexico City Grand Prix",
                circuit: "Autódromo Hermanos Rodríguez",
                date: "2025-09-28",
                flag: "🇲🇽",
                status: "upcoming",
                winner: ""
            },
            {
                id: "16",
                round: "16",
                grandPrixName: "São Paulo Grand Prix",
                circuit: "Autódromo José Carlos Pace",
                date: "2025-10-12",
                flag: "🇧🇷",
                status: "upcoming",
                winner: ""
            },
            {
                id: "17",
                round: "17",
                grandPrixName: "Abu Dhabi Grand Prix",
                circuit: "Yas Marina Circuit",
                date: "2025-10-26",
                flag: "🇦🇪",
                status: "upcoming",
                winner: ""
            }
        ];
        localStorage.setItem('calendar_races', JSON.stringify(initialTracks));
        updateAllPages();
    }
}

// Initialize teams
function initializeTeams() {
    if (dataManager.getTeams().length === 0) {
        const initialTeams = [
            {
                id: "1",
                name: "Red Bull Racing",
                code: "RB",
                color: "#3671C6",
                logo: "./static/img/redbull-logo.png"
            },
            {
                id: "2",
                name: "Ferrari",
                code: "FE",
                color: "#E10600",
                logo: "./static/img/ferrari-logo.png"
            },
            {
                id: "3",
                name: "Mercedes",
                code: "ME",
                color: "#00D2BE",
                logo: "./static/img/mercedes-logo.png"
            },
            {
                id: "4",
                name: "McLaren",
                code: "MC",
                color: "#FF8700",
                logo: "./static/img/mclaren-logo.png"
            },
            {
                id: "5",
                name: "Aston Martin",
                code: "AM",
                color: "#006F62",
                logo: "./static/img/astonmartin-logo.png"
            },
            {
                id: "6",
                name: "Williams Racing",
                code: "WR",
                color: "#E10600",
                logo: "./static/img/williams-logo.png"
            },
            {
                id: "7",
                name: "Racing Bulls",
                code: "RB",
                color: "#3671C6",
                logo: "./static/img/racingbulls-logo.png"
            },
            {
                id: "8",
                name: "Kick Sauber",
                code: "KS",
                color: "#00D2BE",
                logo: "./static/img/kicksauber-logo.png"
            },
            {
                id: "9",
                name: "MoneyGram Haas F1",
                code: "HS",
                color: "#00D2BE",
                logo: "./static/img/haas-logo.png"
            },
            {
                id: "10",
                name: "Alpine F1",
                code: "AP",
                color: "#00D2BE",
                logo: "./static/img/alpine-logo.png"
            }
        ];
        initialTeams.forEach(team => dataManager.addTeam(team));
    }
}

// Export all functions
window.adminAPI = {
    // Authentication
    isAuthenticated,
    authenticate,
    logout,

    // Data Management Functions
    saveDriver,
    deleteDriver,
    saveTeam,
    deleteTeam,
    saveNews,
    deleteNews,
    saveRace,
    deleteRace,

    // Utility Functions
    handleImageUpload,
    
    // Data Access
    getDrivers: () => dataManager.getDrivers(),
    getTeams: () => dataManager.getTeams(),
    getRaces: () => dataManager.getRaces(),
    getNews: () => dataManager.getNews(),
    getStandings: () => dataManager.getStandings(),
    
    // Initialization
    initializeData,
    updateStandings: (driverStandings, constructorStandings) => 
        dataManager.updateStandings(driverStandings, constructorStandings)
};