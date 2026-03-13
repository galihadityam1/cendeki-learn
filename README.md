# Cendeki App

An interactive learning platform that generates educational stories with fill-in-the-blank questions for various subjects.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- API keys for OpenAI/OpenRouter

### Installation

```bash
git clone <repository-url>
cd cendeki-app
npm install
cp .env.example .env.local
# Configure .env.local with your API keys
npm run dev
```

Visit `http://localhost:3000` to start using the application.

## 📚 Documentation

Complete documentation is available in the `/docs` folder:

- **[Setup Guide](./docs/SETUP.md)** - Complete development setup instructions
- **[API Documentation](./docs/API.md)** - Complete API reference
- **[Environment Configuration](./docs/ENVIRONMENT.md)** - Environment variables and configuration
- **[Deployment Guide](./docs/DEPLOYMENT.md)** - Production deployment instructions
- **[Documentation Index](./docs/README.md)** - All documentation in one place

## 🏗️ Technology Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Next.js API Routes, MongoDB
- **Authentication**: NextAuth.js + JWT
- **AI Services**: OpenAI, OpenRouter
- **Real-time**: Socket.IO

## ✨ Features

- 🤖 AI-powered story generation
- 📝 Fill-in-the-blank learning exercises
- 🏆 Real-time scoring and leaderboard
- 🔐 Secure authentication (OAuth + JWT)
- 📱 Responsive design
- ⚡ Real-time multiplayer features

## 🔧 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

## 📖 API Overview

### Authentication

- `POST /api/login` - User login
- `POST /api/register` - User registration
- `POST /api/auth/[...nextauth]` - Google OAuth

### Stories & Learning

- `POST /api/openrouter-story` - Generate AI stories
- `GET /api/journey` - Get random story
- `POST /api/journey/collect` - Submit score

### User Management

- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update profile
- `GET /api/leaderboard` - Get leaderboard

## 🛡️ Security

This application implements several security measures:

- Password hashing with bcryptjs
- JWT token validation
- Input validation with Zod
- Environment variable protection
- CORS configuration

⚠️ **Important**: See the [code review findings](./docs/README.md#security-considerations) for security recommendations.

## 📊 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── (WithNavbar)/      # Layout group
│   └── (WithSidebar)/     # Layout group
├── components/            # React components
├── db/                   # Database layer
│   ├── config/           # DB configuration
│   ├── helpers/          # DB helpers
│   └── models/           # Data models
├── context/              # React context
├── utils/                # Utility functions
└── actions/              # Server actions
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the excellent framework
- OpenAI and OpenRouter for AI services
- MongoDB for database hosting
- Tailwind CSS for styling framework

---

For detailed information on setup, API usage, and deployment, please refer to the [documentation](./docs/README.md).
