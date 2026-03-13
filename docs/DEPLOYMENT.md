# Deployment Guide

## Overview

This guide covers deploying the Cendeki App to various platforms including Vercel, Docker, and traditional hosting services.

## Deployment Options

### 1. Vercel (Recommended)

Vercel is the recommended platform for Next.js applications with seamless deployment and automatic scaling.

#### Prerequisites

- Vercel account
- GitHub/GitLab/Bitbucket repository
- All environment variables configured

#### Deployment Steps

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login to Vercel
   vercel login
   
   # Link project
   vercel link
   ```

2. **Configure Environment Variables**
   
   In Vercel Dashboard:
   - Go to Project Settings → Environment Variables
   - Add all required variables from [Environment Guide](./ENVIRONMENT.md)
   - Mark sensitive variables as "Secret"

3. **Deploy**
   ```bash
   # Deploy to production
   vercel --prod
   
   # Or connect to GitHub for automatic deployments
   ```

4. **Verify Deployment**
   - Check the deployed URL
   - Test authentication flow
   - Verify API endpoints

#### Vercel Configuration

Create `vercel.json` in root directory:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "env": {
    "NEXT_PUBLIC_BASE_URL": "@vercel-base-url",
    "NEXTAUTH_URL": "@vercel-base-url"
  },
  "functions": {
    "src/app/api/**/*.js": {
      "maxDuration": 30
    }
  }
}
```

### 2. Docker Deployment

Deploy using Docker containers for better control over the runtime environment.

#### Dockerfile

```dockerfile
# Multi-stage build
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Build the application
FROM base AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

#### Docker Compose

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_BASE_URL=http://localhost:3000
      - NEXTAUTH_URL=http://localhost:3000
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
      - NEXT_PUBLIC_MONGO_URI=${MONGO_URI}
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - NEXT_PUBLIC_OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
      - NEXT_PUBLIC_GG_ID=${GOOGLE_CLIENT_ID}
      - NEXT_PUBLIC_GG_SECRET=${GOOGLE_CLIENT_SECRET}
    depends_on:
      - mongodb
    restart: unless-stopped

  mongodb:
    image: mongo:6.0
    ports:
      - "27017:27017"
    environment:
      - MONGO_INITDB_ROOT_USERNAME=${MONGO_ROOT_USERNAME}
      - MONGO_INITDB_ROOT_PASSWORD=${MONGO_ROOT_PASSWORD}
      - MONGO_INITDB_DATABASE=cendeki-app
    volumes:
      - mongodb_data:/data/db
    restart: unless-stopped

volumes:
  mongodb_data:
```

#### Deployment Commands

```bash
# Build and start containers
docker-compose up -d --build

# View logs
docker-compose logs -f app

# Stop containers
docker-compose down
```

### 3. Traditional Hosting (AWS, DigitalOcean, etc.)

#### Server Setup

1. **Provision Server**
   - Ubuntu 20.04+ or CentOS 8+
   - Minimum 2GB RAM, 1 CPU
   - 20GB storage

2. **Install Dependencies**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install PM2 for process management
   sudo npm install -g pm2
   
   # Install Nginx (optional)
   sudo apt install nginx -y
   ```

3. **Setup Application**
   ```bash
   # Clone repository
   git clone <repository-url> /var/www/cendeki-app
   cd /var/www/cendeki-app
   
   # Install dependencies
   npm ci --production
   
   # Build application
   npm run build
   ```

4. **Configure PM2**
   
   Create `ecosystem.config.js`:
   ```javascript
   module.exports = {
     apps: [{
       name: 'cendeki-app',
       script: 'server.js',
       instances: 'max',
       exec_mode: 'cluster',
       env: {
         NODE_ENV: 'production',
         PORT: 3000
       },
       env_production: {
         NODE_ENV: 'production',
         PORT: 3000
       }
     }]
   };
   ```

   Start application:
   ```bash
   pm2 start ecosystem.config.js --env production
   pm2 save
   pm2 startup
   ```

5. **Configure Nginx** (Optional)
   
   Create `/etc/nginx/sites-available/cendeki-app`:
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com www.yourdomain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   Enable site:
   ```bash
   sudo ln -s /etc/nginx/sites-available/cendeki-app /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

## Environment-Specific Configurations

### Production Environment Variables

Create `.env.production`:

```env
NODE_ENV=production
NEXT_PUBLIC_BASE_URL="https://yourdomain.com"
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="your-strong-production-secret"

# Database
NEXT_PUBLIC_MONGO_URI="mongodb+srv://user:password@cluster.mongodb.net/cendeki-app?retryWrites=true&w=majority"

# AI Services
OPENAI_API_KEY="your-production-openai-key"
NEXT_PUBLIC_OPENROUTER_API_KEY="your-production-openrouter-key"

# OAuth
NEXT_PUBLIC_GG_ID="your-production-google-client-id"
NEXT_PUBLIC_GG_SECRET="your-production-google-client-secret"
```

### Build Optimization

#### Next.js Configuration

Update `next.config.mjs`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  compress: true,
  poweredByHeader: false,
  images: {
    domains: ['yourdomain.com'],
    formats: ['image/webp', 'image/avif'],
  },
  experimental: {
    optimizeCss: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
};

export default nextConfig;
```

#### Performance Optimizations

1. **Enable Compression**
   ```javascript
   // next.config.mjs
   const nextConfig = {
     compress: true,
     // ... other config
   };
   ```

2. **Optimize Images**
   - Use Next.js Image component
   - Configure image domains
   - Enable WebP/AVIF formats

3. **Enable Caching**
   ```javascript
   // pages/api/your-route.js
   export default function handler(req, res) {
     res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
     // ... your logic
   }
   ```

## Security Considerations

### 1. SSL/TLS Configuration

#### Vercel
- Automatic SSL certificate included
- HTTP to HTTPS redirect enabled

#### Self-Hosted
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### 2. Firewall Configuration

```bash
# Configure UFW
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

### 3. Security Headers

Add security headers in Next.js:

```javascript
// next.config.mjs
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};
```

## Monitoring and Logging

### 1. Application Monitoring

#### Vercel Analytics
- Built-in analytics dashboard
- Performance metrics
- Error tracking

#### Self-Hosted Options
- **Sentry**: Error tracking
- **LogRocket**: Session replay
- **New Relic**: APM

### 2. Logging Configuration

```javascript
// next.config.mjs
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};
```

### 3. Health Check Endpoint

Create `src/app/api/health/route.js`:

```javascript
export async function GET() {
  try {
    // Check database connection
    // Check external services
    return Response.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  } catch (error) {
    return Response.json(
      {
        status: 'unhealthy',
        error: error.message,
      },
      { status: 503 }
    );
  }
}
```

## Backup and Recovery

### 1. Database Backups

#### MongoDB Atlas
- Automatic backups included
- Point-in-time recovery
- Cross-region replication

#### Self-Hosted MongoDB
```bash
# Create backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
mongodump --uri="$MONGO_URI" --out="/backup/mongodb_$DATE"

# Schedule daily backups
crontab -e
# Add: 0 2 * * * /path/to/backup-script.sh
```

### 2. Application Backups

```bash
# Backup application files
tar -czf cendeki-app-backup-$(date +%Y%m%d).tar.gz /var/www/cendeki-app

# Backup environment variables
cp .env.production .env.production.backup-$(date +%Y%m%d)
```

## Scaling Considerations

### 1. Horizontal Scaling

#### Vercel
- Automatic scaling
- Edge functions
- CDN distribution

#### Self-Hosted
- Load balancer configuration
- Multiple server instances
- Database sharding

### 2. Database Scaling

#### MongoDB Atlas
- Auto-scaling clusters
- Read replicas
- Sharding

#### Self-Hosted
- Replica sets
- Sharding configuration
- Connection pooling

## Deployment Checklist

### Pre-Deployment

- [ ] All environment variables set
- [ ] Database connection tested
- [ ] API keys valid and active
- [ ] SSL certificates configured
- [ ] Security headers implemented
- [ ] Error monitoring setup
- [ ] Backup strategy implemented

### Post-Deployment

- [ ] Application loads correctly
- [ ] Authentication flow works
- [ ] API endpoints respond
- [ ] Database operations work
- [ ] External services connected
- [ ] Monitoring dashboards active
- [ ] Performance benchmarks met

## Troubleshooting

### Common Issues

#### 1. Build Failures
```bash
# Clear build cache
rm -rf .next
npm run build
```

#### 2. Environment Variables Not Loading
```bash
# Verify .env file exists and permissions
ls -la .env
cat .env
```

#### 3. Database Connection Issues
```bash
# Test connection string
mongosh "your-connection-string"
```

#### 4. Memory Issues
```bash
# Check memory usage
free -h
# Increase swap space if needed
```

### Debug Tools

- **Vercel**: Function logs and deployment logs
- **Docker**: `docker logs` command
- **PM2**: `pm2 logs` command
- **Nginx**: `/var/log/nginx/` directory

## Cost Optimization

### Vercel
- Monitor usage in dashboard
- Optimize function execution time
- Use edge functions when possible

### Self-Hosted
- Right-size server resources
- Monitor resource usage
- Implement caching strategies

### Database
- Monitor query performance
- Optimize indexes
- Use connection pooling

## Next Steps

1. Choose deployment platform
2. Configure environment variables
3. Set up monitoring and logging
4. Implement backup strategy
5. Test deployment thoroughly
6. Monitor performance and costs

For additional information:
- [Setup Guide](./SETUP.md)
- [Environment Configuration](./ENVIRONMENT.md)
- [API Documentation](./API.md)
