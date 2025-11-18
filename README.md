# 🏎️ KRL F1 League Web Platform

![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-yellow.svg) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![License](https://img.shields.io/badge/License-GPL%203.0-blue.svg)

---

## 🧠 Introduction

**KRL F1 League Web Platform** is a client-side racing league management system built with pure vanilla JavaScript. It provides a complete solution for managing F1 racing leagues including race calendars, driver standings, telemetry processing, and content management.

The platform features:
- **Admin Panel** for managing races, uploading telemetry, and publishing news
- **Public Pages** displaying race calendar, live standings, driver profiles
- **Zero Backend** — Runs entirely in the browser with static hosting
- **Instant Updates** — Changes reflect immediately after page refresh

Built for simplicity and ease of deployment on any static hosting platform.

---

## 🚀 Features

- 🏎️ **17-Race Calendar** with automatic completion tracking
- 📊 **Live Standings** for drivers and constructors
- 🎮 **Telemetry Processing** with drag-and-drop functionality
- 📰 **News Management** system for announcements
- 👥 **20 Driver Profiles** with statistics and photos
- 🏆 **10 Team Management** with logos and colors
- 📱 **Responsive Design** for desktop and mobile
- 📤 **JSON Export/Import** for data backup

---

## 🔧 How to Run

### Local Development

```bash
# 1. Download or clone the repository
git clone https://github.com/vishnuvarshansaravanakarthikeyan/F1-Web-based-League-Manager.git

# 2. Navigate to the project folder
cd krl-league-web

# 3. Start a local web server
python -m http.server 8000
# Or use VS Code Live Server extension

# 4. Open in browser
http://localhost:8000/
```

### Admin Access

- URL: `http://localhost:8000/admin-login.html`
- Default Password: `admin123`
- ⚠️ **Change the password** in `js/admin.js` before deployment

---

## 📦 Deployment

### Upload to Hosting (Hostinger, GitHub Pages, etc.)

```bash
# Simply upload all files to your hosting:
public_html/
├── All HTML files (10 files)
├── js/ folder
├── data/ folder  
├── static/ folder
└── driver_profile/ folder
```

**No configuration needed** — Just upload and access via your domain!

---

## ⚠️ Important Warnings

### Hardcoded Elements

Several components are hardcoded in the source code and require manual editing:

1. **Admin Password** (`js/admin.js` line 175)
   - Default: `admin123`
   - Visible in source code (client-side only)

2. **Initial Driver Data** (`js/admin.js` lines 186-414)
   - 20 drivers with names, teams, points
   - Must edit code for new seasons

3. **Initial Race Calendar** (`js/admin.js` lines 472-644)
   - 17 races for 2025 season
   - Dates and circuits hardcoded

4. **Team Information** (`js/admin.js` lines 652-724)
   - 10 teams with colors and logos
   - Not editable via UI

5. **Track Name Mappings** (`admin.html` lines 791-811)
   - Telemetry file name conversions
   - Must update manually for new tracks

6. **Navigation Menus** (All HTML files)
   - No shared component
   - Must edit each file individually

### Security Considerations

- 🔓 **Client-side authentication** — Password visible in JavaScript
- ⚠️ **No server validation** — All validation happens in browser
- 🛡️ **XSS vulnerability** — Input sanitization needed for production
- 💾 **Data persistence** — Relies on browser storage mechanisms

---

## 📊 Limitations

### Technical Constraints

- **Browser-dependent storage** — Data capacity varies by browser
- **Single-device updates** — Changes require manual export for multi-device sync
- **No real-time collaboration** — Multiple admins may cause conflicts
- **Client-side only** — No backend API for automation

### Performance Considerations

- **Optimized for <100 drivers** — May slow down with larger datasets
- **All data loads at once** — No pagination or lazy loading
- **Image optimization needed** — Large photos can slow page loads
- **Desktop-focused admin** — Some features work better on desktop

### Scalability

- **Small to medium leagues** — Best for leagues with 20-50 participants
- **Seasonal use case** — Designed for single-season management
- **Static data export** — No automated backup system
- **Manual updates** — No API for external integrations

---

## 🔮 Future Improvements

### Planned Enhancements

- ⚙️ **Backend API** for automatic data synchronization
- 🗄️ **Database Integration** (MySQL/MongoDB) for scalability
- 🔒 **Secure Authentication** with JWT tokens
- 📊 **Analytics Dashboard** with charts and historical trends
- 📱 **Mobile App** (PWA) for offline access
- 🌍 **Multi-language Support** for international leagues
- 🔄 **Real-time Updates** via WebSockets
- 📧 **Email Notifications** for race updates
- 🎨 **Theme Customization** without editing CSS
- 📝 **UI-based Configuration** for teams and settings

### Long-term Vision

- **Multi-season Support** with historical data archive
- **Advanced Telemetry Analysis** with lap times and sectors
- **Live Race Tracking** with position updates
- **Driver Performance Metrics** and trend analysis
- **API for Third-party Tools** and integrations

---

## 🤝 Contributing

We welcome contributions from the community!

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes**
4. **Test thoroughly**
5. **Commit your changes** (`git commit -m 'Add amazing feature'`)
6. **Push to branch** (`git push origin feature/amazing-feature`)
7. **Open a Pull Request**

### Areas for Contribution

- 🐛 Bug fixes and error handling improvements
- 🎨 UI/UX enhancements and responsive design
- 🔒 Security improvements and input validation
- 📚 Documentation and code comments
- ⚡ Performance optimizations
- 🌐 Internationalization (i18n)
- ✨ New features and functionality

### Code Style Guidelines

- Use vanilla JavaScript (ES6+)
- Follow existing code structure
- Comment complex logic
- Test in multiple browsers
- Ensure mobile responsiveness

---

## 📄 License

This project is licensed under the **GNU General Public License v3.0 (GPL-3.0)**.

### Key Points

- ✅ **Freedom to use** — Use for any purpose
- ✅ **Freedom to study** — Access to source code
- ✅ **Freedom to modify** — Make changes as needed
- ✅ **Freedom to distribute** — Share modifications
- ⚠️ **Copyleft** — Derivative works must use GPL-3.0
- ⚠️ **No Warranty** — Software provided "as is"

See the [LICENSE](LICENSE) file for full details.

---

## 👨‍💻 Author

**Vishnu Varshan**  
🎓 B.E. Artificial Intelligence & Machine Learning  
🌐 Founder of Sky-Hostings

📧 Contact: **willsmith5314** on Discord  
🔗 [LinkedIn](#) • [GitHub](#) • [Portfolio](#)

---

**Made with ❤️ by the KRL F1 League Team**  
*Last updated: November 18, 2025 | Version 2.0.0*
