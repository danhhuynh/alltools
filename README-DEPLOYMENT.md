# AllTools Production Deployment Guide

This guide explains how to deploy your AllTools application to production using PM2.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git
- PM2 (will be installed automatically by the deployment script)

## Quick Start

### First Time Deployment

1. **Clone your repository to production server:**
   ```bash
   git clone <your-repo-url>
   cd alltools
   ```

2. **Run the full deployment script:**
   ```bash
   npm run deploy
   ```
   
   This script will:
   - Install PM2 globally if not present
   - Install all dependencies
   - Build both frontend and backend
   - Create production data directories
   - Start applications with PM2
   - Configure PM2 to start on system boot

### Subsequent Deployments

For regular updates after `git pull`:

```bash
npm run deploy:quick
```

This will:
- Pull latest changes
- Install any new dependencies
- Rebuild applications
- Restart PM2 processes

## Manual PM2 Commands

### Start Applications
```bash
npm run pm2:start
```

### Stop Applications
```bash
npm run pm2:stop
```

### Restart Applications
```bash
npm run pm2:restart
```

### View Logs
```bash
npm run pm2:logs
```

### Check Status
```bash
npm run pm2:status
```

### Monitor Applications
```bash
npm run pm2:monit
```

## Direct PM2 Commands

You can also use PM2 commands directly:

```bash
# View all processes
pm2 list

# View logs for specific app
pm2 logs alltools-backend
pm2 logs alltools-frontend

# Restart specific app
pm2 restart alltools-backend
pm2 restart alltools-frontend

# Stop specific app
pm2 stop alltools-backend
pm2 stop alltools-frontend

# Delete specific app
pm2 delete alltools-backend
pm2 delete alltools-frontend
```

## Application URLs

After deployment, your applications will be available at:

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001

## Environment Configuration

The deployment automatically sets:
- `NODE_ENV=production`
- Frontend port: 3000
- Backend port: 3001

## Data Persistence

The deployment script creates:
- `backend/data/` directory for nickname files
- `logs/` directory for PM2 logs
- Production-specific nickname file: `user-nicknames-production.json`

## Troubleshooting

### Check if PM2 is running
```bash
pm2 status
```

### View detailed logs
```bash
pm2 logs --lines 100
```

### Restart everything from scratch
```bash
pm2 delete all
npm run deploy
```

### Check system resources
```bash
pm2 monit
```

### View startup logs
```bash
pm2 startup
```

## File Structure

```
alltools/
├── ecosystem.config.js    # PM2 configuration
├── deploy.sh             # Full deployment script
├── quick-deploy.sh       # Quick deployment script
├── package.json          # Root package with deployment scripts
├── logs/                 # PM2 log files
├── backend/
│   ├── dist/            # Built backend files
│   └── data/            # Production data files
└── frontend/
    └── build/           # Built frontend files
```

## Security Notes

- The deployment script creates production-specific data files
- PM2 runs applications with proper environment isolation
- Logs are stored in the `logs/` directory for monitoring
- Applications restart automatically on crashes

## Performance Monitoring

Monitor your applications with:
```bash
pm2 monit
```

This provides real-time monitoring of:
- CPU usage
- Memory usage
- Process status
- Log output

## Backup Strategy

Regular backups should include:
- `backend/data/` directory (nickname mappings)
- Database files (if using SQLite)
- PM2 configuration: `pm2 save`

## Support

If you encounter issues:
1. Check PM2 logs: `pm2 logs`
2. Verify environment: `echo $NODE_ENV`
3. Check file permissions: `ls -la`
4. Restart deployment: `npm run deploy` 