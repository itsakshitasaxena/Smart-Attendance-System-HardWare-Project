# Deployment Guide for Render

This guide will help you deploy Attendify to Render.

## Prerequisites

1. A GitHub account with your repository pushed
2. A Render account (sign up at https://render.com)

## Step 1: Create MongoDB Database

You have two options:

### Option A: Use Render's MongoDB (Recommended)
1. Go to your Render dashboard
2. Click "New +" → "MongoDB"
3. Create a new MongoDB instance
4. Copy the Internal Database URL or External Database URL
5. Use this URL as your `MONGODB_URI`

### Option B: Use MongoDB Atlas (Recommended for production)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get your connection string
4. Use it as your `MONGODB_URI`

## Step 2: Deploy Web Service

1. Go to your Render dashboard
2. Click "New +" → "Web Service"
3. Connect your GitHub repository: `itsakshitasaxena/Smart-Attendance-System-HardWare-Project`
4. Configure the service:
   - **Name**: attendify (or any name you prefer)
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (or choose a paid plan)

## Step 3: Set Environment Variables

In your Render service dashboard, go to "Environment" and add:

1. **MONGODB_URI**: Your MongoDB connection string
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/attendify?retryWrites=true&w=majority`
   - Or for Render MongoDB: `mongodb://hostname:port/attendify`

2. **SESSION_SECRET**: A random secret string for session encryption
   - Generate one using: `openssl rand -hex 32`
   - Or use any random secure string

3. **NODE_ENV**: Set to `production`

## Step 4: Deploy

1. Click "Create Web Service"
2. Render will automatically:
   - Clone your repository
   - Run `npm install`
   - Start your application with `npm start`
3. Wait for the deployment to complete
4. Your app will be available at `https://your-app-name.onrender.com`

## Alternative: Using render.yaml

If you prefer, you can use the `render.yaml` file for automatic configuration:

1. Go to Render Dashboard
2. Click "New +" → "Blueprint"
3. Connect your GitHub repository
4. Render will automatically detect `render.yaml` and create services accordingly

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Ensure Node.js version is compatible (Render uses Node 18 by default)

### Database Connection Issues
- Verify `MONGODB_URI` is set correctly
- Check that your MongoDB instance is accessible from Render's IPs
- For MongoDB Atlas, ensure your IP whitelist includes Render's IPs (or use 0.0.0.0/0 for development)

### Application Crashes
- Check the logs in Render dashboard
- Verify all environment variables are set
- Ensure the PORT environment variable is used (already configured in app.js)

## Environment Variables Summary

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/attendify` |
| `SESSION_SECRET` | Secret for session encryption | Random 32+ character string |
| `PORT` | Server port (auto-set by Render) | Automatically set |
| `NODE_ENV` | Environment mode | `production` |

## Notes

- The free tier on Render spins down after 15 minutes of inactivity and may take ~30 seconds to spin back up
- File uploads are stored in `public/uploads/` which is ephemeral on Render - consider using cloud storage (S3, Cloudinary) for production
- Large files (>95MB) like `shape_predictor_68_face_landmarks.dat` should be handled separately or excluded from deployment

