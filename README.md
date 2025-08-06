# StringMovies 🎬

A modern movie discovery web application built with vanilla JavaScript and Tailwind CSS, powered by The Movie Database (TMDB) API.

## Features

- **Dynamic Movie Data**: Real-time movie information from TMDB API
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Interactive Carousels**: Smooth scrolling movie galleries with navigation controls
- **Loading States**: User-friendly loading indicators during data fetching
- **Error Handling**: Graceful error handling with user feedback
- **Modern UI**: Clean, dark theme with smooth animations

## Project Structure

```
stringmoives/
├── public/
│   ├── css/
│   │   └── output.css          # Compiled Tailwind CSS
│   ├── js/
│   │   └── index.js            # Main application logic
│   └── index.html              # Main HTML file
├── src/
│   ├── assets/
│   │   ├── icons/              # SVG icons and favicon
│   │   └── images/             # Static images
│   ├── components/
│   │   ├── nav.html            # Navigation component
│   │   └── footer.html         # Footer component
│   ├── css/
│   │   └── input.css           # Tailwind CSS source
│   └── js/
│       ├── config.js           # API configuration
│       ├── data.js             # API data fetching functions
│       ├── compLoader.js       # Component loader utility
│       └── main.js             # Additional utilities
├── package.json                # Dependencies and scripts
└── README.md                   # This file
```

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd stringmoives
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```
   This will start Tailwind CSS in watch mode to compile your styles.

4. **Open the application**
   Open `public/index.html` in your browser or use a local development server.

## API Configuration

The application uses The Movie Database (TMDB) API. The API key is currently embedded in the code for development purposes. For production:

1. Create a `.env` file in the root directory
2. Add your TMDB API key: `TMDB_API_KEY=your_api_key_here`
3. Update `src/js/config.js` to use environment variables

## Key Improvements Made

### Code Quality
- ✅ Removed commented-out code blocks
- ✅ Added proper error handling with user feedback
- ✅ Implemented loading states for better UX
- ✅ Centralized API configuration
- ✅ Fixed duplicate HTML IDs

### Performance
- ✅ Concurrent API calls using Promise.all()
- ✅ Optimized image loading with fallbacks
- ✅ Efficient DOM manipulation

### User Experience
- ✅ Responsive design improvements
- ✅ Smooth animations and transitions
- ✅ Working carousel navigation
- ✅ Dynamic hero section with real movie data

### Security
- ✅ Centralized API key management
- ✅ Input validation and sanitization

## Available Scripts

- `npm start` - Start Tailwind CSS in watch mode
- `npm run build` - Build production CSS (if configured)

## Technologies Used

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Styling**: Tailwind CSS
- **API**: The Movie Database (TMDB) API
- **Build Tool**: Tailwind CLI

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational purposes. Movie data provided by TMDB.

## Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the movie data API
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework