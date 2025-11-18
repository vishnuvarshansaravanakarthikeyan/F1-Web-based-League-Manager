// Constants
const DRIVERS_KEY = 'drivers_data';
const TEAMS_KEY = 'teams_data';
const NEWS_KEY = 'news_data';
const RACES_KEY = 'races_data';

// Load and render functions
function loadDriversData() {
    const drivers = JSON.parse(localStorage.getItem(DRIVERS_KEY) || '[]');
    const driversContainer = document.querySelector('.drivers-grid');
    
    if (!driversContainer) return;

    const html = drivers.map(driver => `
        <div class="driver-card" onclick="window.location.href='./driver_profile/${driver.profilePage}'">
            <div class="driver-banner" style="background-color: ${driver.teamColor}">
                <img src="./static/img/team/${driver.teamLogo}" alt="${driver.team} logo" class="team-logo">
            </div>
            <div class="driver-photo">
                <img src="./static/img/drivers/${driver.photo}" alt="${driver.name}">
            </div>
            <div class="driver-info">
                <h3 ${driver.nameStyle ? `style="${driver.nameStyle}"` : ''}>${driver.name}</h3>
                <p class="team">${driver.team}</p>
                <div class="stats">
                    <div>
                        <span>Points</span>
                        <strong>${driver.points}</strong>
                    </div>
                    <div>
                        <span>Wins</span>
                        <strong>${driver.wins}</strong>
                    </div>
                    <div>
                        <span>Podiums</span>
                        <strong>${driver.podiums}</strong>
                    </div>
                    <div>
                        <span>Position</span>
                        <strong>${driver.position}</strong>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    driversContainer.innerHTML = html;
}

function loadTeamsData() {
    const teams = JSON.parse(localStorage.getItem(TEAMS_KEY) || '[]');
    const teamsContainer = document.querySelector('.teams-grid');
    
    if (!teamsContainer) return;

    const html = teams.map(team => `
        <div class="team-card">
            <div class="team-banner" style="background-color: ${team.color}">
                <img src="./static/img/team/${team.logo}" alt="${team.name} logo" class="team-logo">
            </div>
            <div class="team-info">
                <h3>${team.name}</h3>
                <p class="code">${team.code}</p>
            </div>
        </div>
    `).join('');

    teamsContainer.innerHTML = html;
}

function loadNewsData() {
    const news = JSON.parse(localStorage.getItem(NEWS_KEY) || '[]');
    const newsContainer = document.querySelector('.news-grid');
    
    if (!newsContainer) return;

    const html = news.map(article => `
        <div class="news-card">
            ${article.image ? `<img src="${article.image}" alt="${article.title}">` : ''}
            <div class="news-content">
                <h3>${article.title}</h3>
                <p>${article.content}</p>
                <small>Published: ${new Date(article.date).toLocaleDateString()}</small>
            </div>
        </div>
    `).join('');

    newsContainer.innerHTML = html;
}

function loadRacesData() {
    const races = JSON.parse(localStorage.getItem(RACES_KEY) || '[]');
    
    // Update calendar if we're on the calendar page
    const calendarContainer = document.querySelector('.calendar-container');
    if (calendarContainer) {
        const calendarHtml = races.map(race => `
            <div class="race-weekend" data-track="${race.circuit}">
                <div class="race-info">
                    <div class="circuit-name">${race.circuit}</div>
                    <div class="race-date">${new Date(race.date).toLocaleDateString()}</div>
                    <div class="race-location">${race.location}</div>
                </div>
                ${race.completed ? '<div class="completed-badge">✓</div>' : ''}
            </div>
        `).join('');
        calendarContainer.innerHTML = calendarHtml;
    }

    // Update races grid if we're on a page with races listing
    const racesContainer = document.querySelector('.races-grid');
    if (racesContainer) {
        const html = races.map(race => `
            <div class="race-card ${race.completed ? 'completed' : ''}">
                <div class="race-info">
                    <h3>${race.name}</h3>
                    <p>Date: ${new Date(race.date).toLocaleDateString()}</p>
                    <p>Circuit: ${race.circuit}</p>
                    <p>Location: ${race.location}</p>
                    ${race.completed ? '<span class="completed-tag">Completed</span>' : ''}
                </div>
            </div>
        `).join('');
        racesContainer.innerHTML = html;
    }
}

// Listen for admin updates
window.addEventListener('adminDataUpdated', () => {
    loadDriversData();
    loadTeamsData();
    loadNewsData();
    loadRacesData();
});

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    loadDriversData();
    loadTeamsData();
    loadNewsData();
    loadRacesData();
});