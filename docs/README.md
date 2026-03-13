# Cendeki App Documentation

## Overview

Cendeki App is an interactive learning platform that generates educational stories with fill-in-the-blank questions for History and English learning. The application uses AI to create engaging content and provides real-time scoring and feedback.

## 📚 Documentation Index

### Getting Started
- [Setup Guide](./SETUP.md) - Complete development setup instructions
- [Environment Configuration](./ENVIRONMENT.md) - Environment variables and configuration
- [API Documentation](./API.md) - Complete API reference

### Deployment
- [Deployment Guide](./DEPLOYMENT.md) - Production deployment instructions

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

## 🏗️ Architecture

### Technology Stack
- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Next.js API Routes, MongoDB
- **Authentication**: NextAuth.js + JWT
- **AI Services**: OpenAI, OpenRouter
- **Real-time**: Socket.IO

### Key Features
- 🤖 AI-powered story generation
- 📝 Fill-in-the-blank learning exercises
- 🏆 Real-time scoring and leaderboard
- 🔐 Secure authentication (OAuth + JWT)
- 📱 Responsive design
- ⚡ Real-time multiplayer features

## 📖 API Overview

### Authentication
- `POST /api/login` - User login
- `POST /api/register` - User registration
- `POST /api/auth/[...nextauth]` - Google OAuth

### Stories & Learning
- `POST /api/openrouter-story` - Generate AI stories
- `GET /api/journey` - Get random story
- `POST /api/journey/collect` - Submit score
- `POST /api/journey/retry` - Retry journey

### User Management
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update profile
- `GET /api/leaderboard` - Get leaderboard

## 🔧 Development

### Project Structure
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

### Key Components
- **IncompleteJourney**: Active learning interface
- **CompleteJourney**: Results and review
- **PromptAPI**: AI story generation interface
- **ProfileSummary**: User statistics and history

## 🛡️ Security

### Authentication Flow
1. User logs in via email/password or Google OAuth
2. JWT token issued and stored in HTTP-only cookie
3. Middleware validates tokens on protected routes
4. User context available throughout application

### Security Features
- Password hashing with bcryptjs
- JWT token validation
- Input validation with Zod
- Environment variable protection
- CORS configuration

## 📊 Data Models

### User
```javascript
{
  _id: ObjectId,
  fullname: String,
  email: String (unique),
  password: String (hashed),
  age: Number,
  bio: String (optional)
}
```

### Story
```javascript
{
  _id: ObjectId,
  title: String,
  story: String (with blanks),
  fullStory: String (complete),
  answer: [String], // 5 answers
  category: String ("history" | "english")
}
```

### Score
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  storyId: ObjectId,
  score: Number,
  timer: String,
  createdAt: Date
}
```

## 🎯 Learning Flow

1. **Generate Story**: User inputs topic, AI creates story with blanks
2. **Start Journey**: Timer begins, user fills in blanks
3. **Real-time Feedback**: Immediate validation and scoring
4. **Complete**: Results shown with correct answers
5. **Leaderboard**: Score saved and ranked

## 🔌 External Integrations

### AI Services
- **OpenAI**: ChatGPT API for story generation
- **OpenRouter**: Alternative AI service provider

### OAuth Providers
- **Google**: Single sign-on integration

### Database
- **MongoDB**: Primary data storage
- **MongoDB Atlas**: Cloud hosting option

## 🚀 Performance

### Optimization Features
- Next.js automatic code splitting
- Image optimization with Next.js Image
- Tailwind CSS purging for smaller bundles
- MongoDB aggregation pipelines for efficient queries

### Monitoring
- Error tracking and logging
- Performance metrics
- API response time monitoring

## 📱 Responsive Design

### Breakpoints
- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

### Key UI Components
- Adaptive layouts for different screen sizes
- Touch-friendly mobile interfaces
- Optimized typography and spacing

## 🔄 Real-time Features

### Socket.IO Events
- `hello`: Connection establishment
- `coba`: Data transmission
- `trigger`: Action triggering
- `leader`: Leaderboard updates
- `send`: Real-time responses

### Use Cases
- Live leaderboard updates
- Multiplayer learning sessions
- Real-time progress tracking

## 🧪 Testing

### Current State
- Manual testing procedures
- API endpoint validation
- User flow testing

### Future Improvements
- Unit tests with Jest
- Integration tests
- E2E tests with Playwright
- Component testing with React Testing Library

## 📈 Analytics

### User Metrics
- Journey completion rates
- Score distributions
- Learning time analytics
- Popular story categories

### Technical Metrics
- API response times
- Error rates
- Database query performance
- Resource utilization

## 🔧 Configuration

### Environment Variables
See [Environment Configuration](./ENVIRONMENT.md) for complete setup instructions.

### Build Configuration
- Next.js standalone output
- Image optimization enabled
- Compression enabled
- Security headers configured

## 🚨 Error Handling

### API Errors
- Standardized error response format
- Validation error messages
- Graceful degradation
- User-friendly error messages

### Client Errors
- Error boundary components
- Network error handling
- Loading states and skeletons
- Retry mechanisms

## 📝 Contributing

### Development Workflow
1. Fork repository
2. Create feature branch
3. Implement changes
4. Add tests
5. Update documentation
6. Submit pull request

### Code Standards
- ESLint for code quality
- Prettier for formatting
- Conventional commits
- TypeScript ready

## 📞 Support

### Getting Help
1. Check this documentation
2. Review API documentation
3. Search existing issues
4. Create new issue with details

### Common Issues
- Environment variable configuration
- API key setup
- Database connection
- Authentication flow

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Next.js team for the excellent framework
- OpenAI and OpenRouter for AI services
- MongoDB for database hosting
- Tailwind CSS for styling framework
- All contributors and testers

---

## 📋 Quick Reference

### Essential Commands
```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
mongosh              # Connect to MongoDB
# Use database: cendeki-app
```

### Key Files
- `package.json` - Dependencies and scripts
- `next.config.mjs` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `.env.local` - Environment variables (don't commit!)
- `src/middleware.js` - Authentication middleware

### Important URLs
- Application: `http://localhost:3000`
- API Base: `http://localhost:3000/api`
- MongoDB: `mongodb://localhost:27017/cendeki-app`

---

For detailed information on any topic, please refer to the specific documentation files linked in the index above.
