# Flixora - Movie & TV Streaming Platform

A modern, responsive movie and TV show streaming platform built with Next.js 15, React 19, and Tailwind CSS. Features integration with TMDB for content discovery and third-party streaming services.

## Important Notice

**This application uses third-party streaming services that are openly available on the internet. We do not host, store, or distribute any media content on our servers. All content is sourced from external servers and providers. This website serves as an aggregation platform that organizes publicly available information in one place. We are not liable for any damages, copyright issues, or legal concerns related to the content accessed through this platform. Users are responsible for ensuring they comply with their local laws and regulations when accessing content.**

## Features

- Movie & TV Show Discovery: Browse trending, popular, and top-rated content
- Advanced Search: Real-time search with suggestions and filtering  
- Responsive Design: Works seamlessly on all devices
- Video Player Integration: Streaming capabilities powered by third-party services
- Episode Management: Season and episode browsing for TV shows
- Progress Tracking: Automatic watch progress saving
- Modern UI: Clean design with smooth animations
- Performance Optimized: Built with Next.js 15 for fast loading

## Quick Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ImonChakraborty/Flixora)

## Local Development

### Prerequisites

- Node.js 18+
- npm or yarn  
- TMDB API Key ([Get one here](https://www.themoviedb.org/settings/api))

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/ImonChakraborty/Flixora.git
   cd flixora
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   
   Create `.env.local` and add your TMDB API key:
   ```env
   TMDB_API_KEY=your_tmdb_api_key_here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. Run the development server
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment on Vercel

### Method 1: One-Click Deploy

1. Click the "Deploy with Vercel" button above
2. Connect your GitHub account
3. Fork the repository
4. Add your `TMDB_API_KEY` in Vercel environment variables
5. Deploy

### Method 2: Manual Deploy

1. Fork this repository
2. Go to [Vercel Dashboard](https://vercel.com/dashboard) and click "New Project"
3. Import your forked repository
4. Add environment variables:
   - `TMDB_API_KEY`: Your TMDB API key
   - `NEXT_PUBLIC_APP_URL`: Your Vercel app URL
5. Click "Deploy"

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `TMDB_API_KEY` | Your TMDB API key for movie/TV data | Yes |
| `NEXT_PUBLIC_APP_URL` | Your app's public URL | Yes |

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Data Source**: TMDB API
- **Video Streaming**: Third-party streaming services
- **Deployment**: Vercel

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer

This software is provided for educational and informational purposes only. Users are solely responsible for ensuring their use of this application complies with applicable laws and regulations in their jurisdiction.
