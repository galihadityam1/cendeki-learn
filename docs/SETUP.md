# Cendeki App Development Setup Guide

## Prerequisites

Before setting up the development environment, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git** for version control

## Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd cendeki-app
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Configure your environment variables (see [Environment Configuration Guide](./ENVIRONMENT.md))

### 4. Database Setup

Ensure MongoDB is running locally or configure your MongoDB Atlas connection string in the `.env` file.

### 5. Start Development Server

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

## Detailed Setup

### Environment Variables

Create a `.env` file with the following variables:

```env
# Application Configuration
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-jwt-key-here"

# Database Configuration
NEXT_PUBLIC_MONGO_URI="mongodb://localhost:27017/cendeki-app"

# AI Service API Keys
OPENAI_API_KEY="your-openai-api-key"
NEXT_PUBLIC_OPENROUTER_API_KEY="your-openrouter-api-key"

# OAuth Configuration (Google)
NEXT_PUBLIC_GG_ID="your-google-oauth-client-id"
NEXT_PUBLIC_GG_SECRET="your-google-oauth-client-secret"

# Optional: Rapid API (if used)
NEXT_PUBLIC_RAPID_API_KEY="your-rapid-api-key"
```

### Database Setup

#### Option 1: Local MongoDB

1. Install MongoDB locally
2. Start MongoDB service:
   - **macOS**: `brew services start mongodb-community`
   - **Windows**: Start MongoDB service from Services
   - **Linux**: `sudo systemctl start mongod`

3. Create database:
   ```javascript
   use cendeki-app
   ```

#### Option 2: MongoDB Atlas

1. Create a free MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Add your IP to the whitelist
5. Update `NEXT_PUBLIC_MONGO_URI` in `.env`

### API Keys Setup

#### OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Create an account or sign in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key and add to `.env`

#### OpenRouter API Key

1. Go to [OpenRouter](https://openrouter.ai/)
2. Create an account or sign in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key and add to `.env`

#### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret to `.env`

## Project Structure

```
cendeki-app/
├── docs/                    # Documentation
├── public/                  # Static assets
├── server/                  # Server files
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── api/            # API routes
│   │   ├── (WithNavbar)/   # Layout group
│   │   └── (WithSidebar)/  # Layout group
│   ├── components/        # React components
│   ├── db/                # Database configuration
│   │   ├── config/        # DB config files
│   │   ├── helpers/       # DB helper functions
│   │   └── models/        # Data models
│   ├── context/           # React context
│   ├── utils/             # Utility functions
│   └── actions/           # Server actions
├── .env                   # Environment variables
├── package.json           # Dependencies
├── next.config.mjs        # Next.js configuration
└── README.md             # Project overview
```

## Development Workflow

### 1. Feature Development

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes

3. Test your changes:
   ```bash
   npm run dev
   ```

4. Run linting:
   ```bash
   npm run lint
   ```

5. Commit and push:
   ```bash
   git add .
   git commit -m "feat: add your feature"
   git push origin feature/your-feature-name
   ```

### 2. Code Style

The project uses:
- **ESLint** for code linting
- **Prettier** for code formatting
- **Tailwind CSS** for styling

Run linting and formatting:
```bash
npm run lint
npm run format  # if configured
```

### 3. Testing

Currently, no automated tests are configured. Consider adding:
- Unit tests with Jest
- Integration tests for API endpoints
- Component tests with React Testing Library

## Common Development Tasks

### Adding New API Endpoint

1. Create route file in `src/app/api/endpoint-name/route.js`
2. Implement HTTP methods (GET, POST, PUT, DELETE)
3. Add input validation with Zod
4. Add error handling
5. Update API documentation

### Adding New Database Model

1. Create model file in `src/db/models/modelName.jsx`
2. Define schema and validation
3. Implement CRUD methods
4. Update database documentation

### Adding New Page

1. Create `page.jsx` in appropriate route directory
2. Add loading state if needed
3. Implement client-side logic
4. Add navigation links

### Adding New Component

1. Create component file in `src/components/`
2. Follow existing naming conventions
3. Use TypeScript if possible
4. Add responsive design with Tailwind

## Debugging

### Common Issues

#### 1. MongoDB Connection Issues
- Check MongoDB is running
- Verify connection string in `.env`
- Check network/firewall settings

#### 2. API Key Issues
- Verify API keys are correct
- Check API key permissions
- Ensure keys are not expired

#### 3. Environment Variables
- Ensure `.env` file is in root directory
- Check variable names match exactly
- Restart server after changing `.env`

#### 4. Port Conflicts
- Kill processes on port 3000:
  ```bash
  lsof -ti:3000 | xargs kill
  ```
- Or change port in `server.js`

### Debug Tools

- **Browser DevTools**: For frontend debugging
- **MongoDB Compass**: For database inspection
- **Postman/Insomnia**: For API testing
- **VS Code Debugger**: For server-side debugging

## Performance Considerations

### Development Mode

- Next.js development mode includes additional debugging features
- Hot reload is enabled by default
- Source maps are generated

### Production Optimization

Before deploying to production:
1. Run `npm run build` to check for build errors
2. Test in production mode locally: `npm run start`
3. Optimize images and assets
4. Enable caching strategies

## Contributing Guidelines

### Code Standards

1. **Naming Conventions**:
   - Components: PascalCase
   - Files: kebab-case or camelCase
   - Variables: camelCase
   - Constants: UPPER_SNAKE_CASE

2. **File Organization**:
   - Keep components focused and small
   - Use proper folder structure
   - Separate business logic from UI

3. **Comments**:
   - Add comments for complex logic
   - Document API endpoints
   - Explain non-obvious code

### Pull Request Process

1. Fork the repository
2. Create feature branch
3. Make changes and test
4. Update documentation
5. Submit pull request with:
   - Clear title
   - Detailed description
   - Testing instructions

## Troubleshooting

### Frequently Asked Questions

**Q: Getting "MongoDB connection failed" error?**
A: Check MongoDB is running and connection string is correct.

**Q: API calls returning 401 Unauthorized?**
A: Check authentication cookies and JWT token validity.

**Q: OpenRouter API not working?**
A: Verify API key and check OpenRouter service status.

**Q: Google OAuth not working?**
A: Ensure redirect URIs match in Google Console and `.env` file.

### Getting Help

1. Check this documentation
2. Review API documentation in `docs/API.md`
3. Check existing issues in repository
4. Create new issue with detailed description

## Next Steps

After completing setup:

1. Read the [API Documentation](./API.md)
2. Review the [Environment Configuration Guide](./ENVIRONMENT.md)
3. Check the [Deployment Guide](./DEPLOYMENT.md)
4. Explore the codebase and start contributing!
