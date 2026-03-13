# Environment Configuration Guide

## Overview

This guide covers all environment variables required to run the Cendeki App in different environments (development, staging, production).

## Security Notice

⚠️ **CRITICAL**: Never commit your `.env` file to version control. Environment variables contain sensitive information like API keys and database credentials.

## Environment Variables

### Required Variables

All these variables must be set for the application to function properly.

#### Application Configuration

```env
# Base URL for the application
NEXT_PUBLIC_BASE_URL="http://localhost:3000"

# NextAuth.js configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-jwt-key-min-32-chars"
```

**Notes:**
- `NEXTAUTH_SECRET` must be at least 32 characters long
- In production, use a strong, randomly generated secret
- `NEXTAUTH_URL` must match your deployed URL in production

#### Database Configuration

```env
# MongoDB connection string
NEXT_PUBLIC_MONGO_URI="mongodb://localhost:27017/cendeki-app"
```

**Examples:**
- **Local MongoDB**: `mongodb://localhost:27017/cendeki-app`
- **MongoDB Atlas**: `mongodb+srv://username:password@cluster.mongodb.net/cendeki-app?retryWrites=true&w=majority`

#### AI Service API Keys

```env
# OpenAI API Key (for ChatGPT features)
OPENAI_API_KEY="sk-proj-your-openai-api-key"

# OpenRouter API Key (for alternative AI service)
NEXT_PUBLIC_OPENROUTER_API_KEY="sk-or-v1-your-openrouter-key"
```

#### OAuth Configuration (Google)

```env
# Google OAuth 2.0 credentials
NEXT_PUBLIC_GG_ID="your-google-client-id.apps.googleusercontent.com"
NEXT_PUBLIC_GG_SECRET="your-google-client-secret"
```

### Optional Variables

These variables are optional but may be needed for additional features.

```env
# Rapid API (if using external APIs)
NEXT_PUBLIC_RAPID_API_KEY="your-rapid-api-key"
```

## Environment-Specific Configuration

### Development Environment (.env.development)

```env
# Application
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="dev-secret-key-change-in-production"

# Database
NEXT_PUBLIC_MONGO_URI="mongodb://localhost:27017/cendeki-app-dev"

# AI Services
OPENAI_API_KEY="your-dev-openai-key"
NEXT_PUBLIC_OPENROUTER_API_KEY="your-dev-openrouter-key"

# OAuth
NEXT_PUBLIC_GG_ID="your-dev-google-client-id"
NEXT_PUBLIC_GG_SECRET="your-dev-google-client-secret"

# Optional
NEXT_PUBLIC_RAPID_API_KEY="your-dev-rapid-api-key"
```

### Staging Environment (.env.staging)

```env
# Application
NEXT_PUBLIC_BASE_URL="https://staging.cendeki-app.vercel.app"
NEXTAUTH_URL="https://staging.cendeki-app.vercel.app"
NEXTAUTH_SECRET="staging-secret-key-strong-random"

# Database
NEXT_PUBLIC_MONGO_URI="mongodb+srv://staging-user:password@cluster.mongodb.net/cendeki-app-staging?retryWrites=true&w=majority"

# AI Services
OPENAI_API_KEY="your-staging-openai-key"
NEXT_PUBLIC_OPENROUTER_API_KEY="your-staging-openrouter-key"

# OAuth
NEXT_PUBLIC_GG_ID="your-staging-google-client-id"
NEXT_PUBLIC_GG_SECRET="your-staging-google-client-secret"
```

### Production Environment (.env.production)

```env
# Application
NEXT_PUBLIC_BASE_URL="https://cendeki-app.vercel.app"
NEXTAUTH_URL="https://cendeki-app.vercel.app"
NEXTAUTH_SECRET="production-secret-key-very-strong-random"

# Database
NEXT_PUBLIC_MONGO_URI="mongodb+srv://prod-user:password@cluster.mongodb.net/cendeki-app?retryWrites=true&w=majority"

# AI Services
OPENAI_API_KEY="your-production-openai-key"
NEXT_PUBLIC_OPENROUTER_API_KEY="your-production-openrouter-key"

# OAuth
NEXT_PUBLIC_GG_ID="your-production-google-client-id"
NEXT_PUBLIC_GG_SECRET="your-production-google-client-secret"
```

## API Key Setup Guide

### 1. OpenAI API Key

1. **Create Account**: Go to [OpenAI Platform](https://platform.openai.com/)
2. **Navigate**: API Keys section in dashboard
3. **Create Key**: Click "Create new secret key"
4. **Copy Key**: Store it securely
5. **Add to .env**: `OPENAI_API_KEY="sk-proj-..."`

**Permissions Needed:**
- ChatGPT API access
- Text generation capabilities

### 2. OpenRouter API Key

1. **Create Account**: Go to [OpenRouter.ai](https://openrouter.ai/)
2. **Navigate**: API Keys section
3. **Create Key**: Generate new API key
4. **Copy Key**: Store it securely
5. **Add to .env**: `NEXT_PUBLIC_OPENROUTER_API_KEY="sk-or-v1-..."`

**Usage**: Alternative AI service for story generation

### 3. Google OAuth Credentials

1. **Go to Console**: [Google Cloud Console](https://console.cloud.google.com/)
2. **Create Project**: New project or select existing
3. **Enable APIs**: 
   - Google+ API
   - Google OAuth2 API
4. **Create Credentials**:
   - Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
   - Application type: "Web application"
   - Name: "Cendeki App"
5. **Configure Redirect URIs**:
   - Development: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://yourdomain.com/api/auth/callback/google`
6. **Copy Credentials**: Add Client ID and Secret to `.env`

### 4. MongoDB Setup

#### Local MongoDB

```bash
# Install MongoDB (macOS)
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Create database
mongosh
use cendeki-app
```

#### MongoDB Atlas

1. **Create Account**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. **Create Cluster**: Free tier cluster
3. **Configure Network**:
   - Add your IP to whitelist
   - For production, use VPC peering or private endpoints
4. **Get Connection String**:
   - Click "Connect" → "Connect your application"
   - Copy connection string
5. **Update .env**: Replace password and add to `NEXT_PUBLIC_MONGO_URI`

## Security Best Practices

### 1. Secret Management

**Development:**
```env
NEXTAUTH_SECRET="dev-secret-not-for-production"
```

**Production:**
```bash
# Generate strong secret (32+ characters)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2. API Key Security

- **Never commit** API keys to version control
- **Use different keys** for each environment
- **Rotate keys** periodically
- **Monitor usage** and set up alerts
- **Use key restrictions** where possible

### 3. Database Security

- **Use strong passwords** for database users
- **Implement IP whitelisting** in production
- **Use SSL/TLS** connections
- **Create read-only users** for specific operations
- **Regular backups** and test restores

### 4. Environment File Security

```bash
# Add .env to .gitignore
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore
echo ".env.*" >> .gitignore

# Set proper permissions
chmod 600 .env
```

## Environment Variable Validation

The application includes validation for critical environment variables. If any required variable is missing, the application will:

1. Log an error message
2. Use fallback values (where safe)
3. Fail gracefully for critical missing variables

### Validation Code Example

```javascript
// src/db/config/constant.js
export const OPENROUTER_API_KEY = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || "fallback-value"

// src/db/helpers/jwt.js
const key = process.env.NEXT_PUBLIC_JWT_SECRET || "";
if (!key) {
  throw new Error("JWT_SECRET is required");
}
```

## Deployment Environment Variables

### Vercel Deployment

1. **Go to Project Settings**: In Vercel dashboard
2. **Environment Variables**: Add all required variables
3. **Redeploy**: Automatic deployment on variable changes

### Docker Environment

```dockerfile
# Dockerfile
ENV NEXT_PUBLIC_BASE_URL="http://localhost:3000"
ENV NEXTAUTH_SECRET="${NEXTAUTH_SECRET}"
ENV NEXT_PUBLIC_MONGO_URI="${MONGO_URI}"
```

```bash
# docker-compose.yml
services:
  app:
    environment:
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
      - NEXT_PUBLIC_MONGO_URI=${MONGO_URI}
      - OPENAI_API_KEY=${OPENAI_API_KEY}
```

## Troubleshooting

### Common Issues

#### 1. JWT Secret Too Short
```
Error: NEXTAUTH_SECRET must be at least 32 characters
```
**Solution**: Generate a longer secret using crypto module

#### 2. Invalid Google OAuth Redirect
```
Error: redirect_uri_mismatch
```
**Solution**: Update authorized redirect URIs in Google Console

#### 3. MongoDB Connection Failed
```
Error: Could not connect to MongoDB
```
**Solution**: 
- Check connection string format
- Verify IP whitelist
- Ensure MongoDB is running

#### 4. OpenAI API Key Invalid
```
Error: Invalid API key
```
**Solution**: 
- Verify key is correct
- Check key permissions
- Ensure key is active

### Debug Mode

Enable debug logging to troubleshoot environment issues:

```javascript
// In development
if (process.env.NODE_ENV === 'development') {
  console.log('Environment variables loaded:', {
    BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    MONGO_CONNECTED: !!process.env.NEXT_PUBLIC_MONGO_URI,
    OPENAI_CONFIGURED: !!process.env.OPENAI_API_KEY,
  });
}
```

## Environment Variable Templates

### .env.example

Create this file in your repository for reference:

```env
# Application Configuration
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-jwt-key-min-32-chars"

# Database Configuration
NEXT_PUBLIC_MONGO_URI="mongodb://localhost:27017/cendeki-app"

# AI Service API Keys
OPENAI_API_KEY="your-openai-api-key"
NEXT_PUBLIC_OPENROUTER_API_KEY="your-openrouter-api-key"

# OAuth Configuration
NEXT_PUBLIC_GG_ID="your-google-client-id"
NEXT_PUBLIC_GG_SECRET="your-google-client-secret"

# Optional Services
NEXT_PUBLIC_RAPID_API_KEY="your-rapid-api-key"
```

## Next Steps

1. Copy `.env.example` to `.env.local`
2. Fill in all required variables
3. Test the application locally
4. Set up production environment variables
5. Review security best practices
6. Monitor API usage and costs

For more information, see:
- [Setup Guide](./SETUP.md)
- [API Documentation](./API.md)
- [Deployment Guide](./DEPLOYMENT.md)
