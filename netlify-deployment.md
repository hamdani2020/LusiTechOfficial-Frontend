# Netlify Deployment Setup

This guide explains how to set up automatic deployment of the LusiTech frontend to Netlify using GitHub Actions.

## Prerequisites

1. **Netlify Account**: Create an account at [netlify.com](https://netlify.com)
2. **Netlify CLI**: Install globally with `npm install -g netlify-cli`
3. **GitHub Repository**: Your code should be in a GitHub repository

## Initial Netlify Setup

### 1. Create Netlify Site

```bash
# Navigate to frontend directory
cd frontend

# Login to Netlify
netlify login

# Initialize site (follow prompts)
netlify init

# Note down the site settings:
# - Site Name: lusitech-website
# - Build Command: npm run build
# - Publish Directory: out
```

### 2. Get Netlify Site Information

```bash
# Get your site details
netlify sites:list

# Get site ID from netlify.toml or dashboard
cat netlify.toml
```

## GitHub Secrets Configuration

Add the following secrets to your GitHub repository:

### Required Secrets

1. **NETLIFY_AUTH_TOKEN**
   - Go to [Netlify Dashboard → User Settings → Applications](https://app.netlify.com/user/applications)
   - Create a new personal access token
   - Add as GitHub secret

2. **NETLIFY_SITE_ID**
   - Found in Site Settings → General → Site Information
   - Or get from `netlify.toml` after running `netlify init`

3. **NEXT_PUBLIC_API_URL_PROD**
   - Your production backend API URL
   - Example: `https://api.lusitech.com`

4. **NEXT_PUBLIC_API_URL_DEV**
   - Your development backend API URL
   - Example: `https://api-dev.lusitech.com`

5. **NEXT_PUBLIC_SITE_URL_PROD**
   - Your production site URL
   - Example: `https://lusitech.com`

6. **NEXT_PUBLIC_SITE_URL_DEV**
   - Your development site URL
   - Example: `https://dev.lusitech.com`

### Adding Secrets to GitHub

1. Go to your GitHub repository
2. Navigate to **Settings → Secrets and variables → Actions**
3. Click **New repository secret**
4. Add each secret with its corresponding value

## Environment Variables in Netlify

Configure environment variables in Netlify dashboard:

### Production Environment
- `NEXT_PUBLIC_API_URL`: `https://api.lusitech.com`
- `NEXT_PUBLIC_SITE_URL`: `https://lusitech.com`

### Preview Environment
- `NEXT_PUBLIC_API_URL`: `https://api-dev.lusitech.com`
- `NEXT_PUBLIC_SITE_URL`: `https://dev.lusitech.com`

## Workflow Behavior

### Automatic Deployments

- **Main Branch**: Deploys to production
- **Develop Branch**: Deploys to preview
- **Pull Requests**: Creates preview deployments with comment links

### Build Process

1. **Checkout**: Gets latest code
2. **Setup**: Installs Node.js and dependencies
3. **Lint**: Runs ESLint checks
4. **Build**: Creates production build with static export
5. **Deploy**: Pushes to Netlify

### Deployment Environments

- **Production**: `main` branch → `https://lusitech.com`
- **Preview**: Other branches → `https://deploy-preview-[pr-number]--lusitech.netlify.app`

## Custom Domain Setup

### 1. Add Domain in Netlify

1. Go to Netlify Dashboard → Site Settings → Domain Management
2. Add your custom domain: `lusitech.com`
3. Add www subdomain: `www.lusitech.com`

### 2. Configure DNS

Add these DNS records to your domain provider:

```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: [your-site-name].netlify.app
```

### 3. SSL Certificate

Netlify automatically provisions SSL certificates for custom domains via Let's Encrypt.

## Monitoring and Debugging

### Deployment Logs

- View logs in GitHub Actions tab
- Check Netlify dashboard for deployment details
- Monitor build times and errors in Netlify Functions tab

### Common Issues

1. **Build Failures**
   - Check TypeScript errors
   - Verify environment variables
   - Review dependency versions
   - Ensure `output: 'export'` in Next.js config

2. **Deployment Errors**
   - Verify Netlify auth token and site ID
   - Check build command and publish directory
   - Ensure correct base directory

3. **Runtime Issues**
   - Check API connectivity
   - Verify environment variables
   - Review browser console errors
   - Check Netlify Functions logs

## Performance Optimization

### Build Optimization

- Enable Next.js static export
- Use proper image optimization with `next/image`
- Implement code splitting
- Configure caching headers in `netlify.toml`

### Netlify Features

- **Edge Functions**: For API routes and middleware
- **Analytics**: Monitor performance and traffic
- **Forms**: Handle contact forms without backend
- **Split Testing**: A/B test different versions

## Security Considerations

- Never commit Netlify tokens to repository
- Use environment-specific API URLs
- Enable branch protection rules
- Review deployment previews before merging
- Configure security headers in `netlify.toml`

## Troubleshooting

### Reset Netlify Configuration

```bash
# Remove existing configuration
rm -rf .netlify

# Reinitialize site
netlify init

# Update GitHub secrets with new values
```

### Manual Deployment

```bash
# Deploy current branch manually
netlify deploy --prod  # for production
netlify deploy         # for preview
```

### Check Deployment Status

```bash
# List recent deployments
netlify sites:list

# Get site details
netlify status

# View deployment logs
netlify logs
```