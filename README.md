# Coastline College Foundation Website

A modern, responsive website for the Coastline College Foundation built with React, TypeScript, and Express.

## 🚀 Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **UI Library**: shadcn/ui with Radix UI components
- **Styling**: Tailwind CSS v4
- **Backend**: Express.js
- **Routing**: wouter
- **Package Manager**: pnpm
- **Maps**: Google Maps API

## 📋 Features

- 8 main pages: Home, About, Programs, Budget, Dashboard, Strategic Plan, Get Involved
- Responsive design with mobile support
- Dark/light theme support
- Interactive Google Maps integration
- Modern UI components library
- Client-side routing with SPA architecture

## 🌐 Deploy to Render (One-Click)

The easiest way to deploy this application is using Render:

### Step 1: Fork/Push to GitHub
Make sure your code is pushed to a GitHub repository.

### Step 2: Deploy on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Blueprint"**
3. Connect your GitHub repository
4. Render will automatically detect the `render.yaml` file
5. Set the environment variable:
   - `VITE_FRONTEND_FORGE_API_KEY`: Your Google Maps API key
6. Click **"Apply"**

That's it! Render will build and deploy your app automatically.

### Alternative: Manual Render Setup

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name**: coastline-foundation
   - **Runtime**: Node
   - **Build Command**: `corepack enable && pnpm install && pnpm build`
   - **Start Command**: `pnpm start`
   - **Environment Variables**:
     - `NODE_VERSION`: 20.11.0
     - `VITE_FRONTEND_FORGE_API_KEY`: Your Google Maps API key
     - `VITE_FRONTEND_FORGE_API_URL`: https://forge.butterfly-effect.dev

## 🚂 Deploy to Railway

1. Go to [Railway](https://railway.app/)
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your repository
4. Railway will auto-detect the configuration
5. Add environment variables:
   - `VITE_FRONTEND_FORGE_API_KEY`: Your Google Maps API key
   - `VITE_FRONTEND_FORGE_API_URL`: https://forge.butterfly-effect.dev
6. Deploy!

## 💻 Local Development

### Prerequisites

- Node.js 20+
- pnpm 10+

### Setup

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd Foundationsite
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Edit `.env` and add your Google Maps API key:
   ```env
   VITE_FRONTEND_FORGE_API_KEY=your_actual_api_key_here
   ```

5. Start development server:
   ```bash
   pnpm dev
   ```

6. Open [http://localhost:5173](http://localhost:5173)

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Run production server
- `pnpm preview` - Preview production build locally
- `pnpm check` - Type check without building
- `pnpm format` - Format code with Prettier

## 🔑 Getting a Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable **Maps JavaScript API**
4. Go to **Credentials** → **Create Credentials** → **API Key**
5. Restrict your key:
   - **Application restrictions**: HTTP referrers
   - **API restrictions**: Maps JavaScript API
6. Copy the API key and add to your environment variables

## 📁 Project Structure

```
Foundationsite/
├── client/              # Frontend React application
│   ├── src/
│   │   ├── pages/      # Route pages
│   │   ├── components/ # React components
│   │   ├── hooks/      # Custom React hooks
│   │   ├── contexts/   # React contexts
│   │   └── lib/        # Utilities
│   └── public/         # Static assets (build output)
├── server/             # Express backend
├── shared/             # Shared constants
├── patches/            # Package patches
└── dist/               # Production build output
```

## 🔧 Configuration Files

- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.js` - Tailwind CSS configuration (generated)
- `components.json` - shadcn/ui configuration
- `render.yaml` - Render deployment configuration

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_FRONTEND_FORGE_API_KEY` | Google Maps API key | Yes |
| `VITE_FRONTEND_FORGE_API_URL` | Forge proxy URL | No (has default) |
| `PORT` | Server port | No (default: 3000) |
| `NODE_ENV` | Environment (production/development) | No |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

MIT License - See LICENSE file for details

## 🆘 Troubleshooting

### Build fails on Render/Railway
- Ensure Node version is set to 20.11.0 or higher
- Check that all environment variables are set correctly

### Maps not loading
- Verify `VITE_FRONTEND_FORGE_API_KEY` is set correctly
- Check API key restrictions in Google Cloud Console
- Ensure Maps JavaScript API is enabled

### Port already in use locally
- The app will automatically use the next available port
- Or set custom port: `PORT=3001 pnpm dev`

## 📞 Support

For issues and questions, please open an issue on GitHub.
