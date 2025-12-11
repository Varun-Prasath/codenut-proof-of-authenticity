# Deployment Guide

## Quick Start - Deploy to Vercel

### Prerequisites
- GitHub account
- Vercel account (sign up at https://vercel.com)
- MetaMask wallet (for testing blockchain features)

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit - AI Content Verification Platform"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 2: Deploy to Vercel

#### Option A: Using Vercel Dashboard (Recommended)
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure project:
   - **Framework Preset**: Vite
   - **Build Command**: `pnpm build`
   - **Output Directory**: `dist`
   - **Install Command**: `pnpm install`

4. Add Environment Variables:
   ```
   VITE_CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000
   VITE_CHAIN_ID=1
   VITE_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY
   VITE_API_URL=/api
   VITE_CONTRACT_ABI=[]
   ```

5. Click **Deploy**

#### Option B: Using Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# For production deployment
vercel --prod
```

### Step 3: Get Your Live URL
After deployment completes, Vercel will provide you with a live URL:
- **Preview URL**: `https://your-project-name.vercel.app`
- **Production URL**: `https://your-custom-domain.com` (if configured)

### Step 4: Configure Smart Contract (Optional)
If you have a deployed smart contract:

1. Update environment variables in Vercel dashboard:
   - Go to Project Settings → Environment Variables
   - Update `VITE_CONTRACT_ADDRESS` with your contract address
   - Update `VITE_CONTRACT_ABI` with your contract ABI JSON
   - Update `VITE_CHAIN_ID` (1 = Mainnet, 11155111 = Sepolia, etc.)
   - Update `VITE_RPC_URL` with your RPC endpoint

2. Redeploy:
   - Go to Deployments tab
   - Click "Redeploy" on the latest deployment

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_CONTRACT_ADDRESS` | Smart contract address | `0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb` |
| `VITE_CHAIN_ID` | Blockchain network ID | `1` (Mainnet), `11155111` (Sepolia) |
| `VITE_RPC_URL` | RPC endpoint URL | `https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY` |
| `VITE_API_URL` | Backend API URL | `/api` (for Vercel) |
| `VITE_CONTRACT_ABI` | Contract ABI JSON | `[{"inputs":[],"name":"verify",...}]` |

## API Endpoints

Your deployed application includes these API endpoints:

- `GET /api/health` - Health check
- `POST /api/analyze-image` - Analyze uploaded images
- `POST /api/analyze-video` - Analyze uploaded videos
- `POST /api/analyze-text` - Analyze text content
- `POST /api/publish-proof` - Publish verification proof

## Testing Your Deployment

1. **Visit your live URL**
2. **Test the upload flow**:
   - Click "Get Started"
   - Upload an image, video, or text
   - Review analysis results
   - Connect MetaMask wallet
   - Publish proof to blockchain

3. **Check API health**:
   ```bash
   curl https://your-project-name.vercel.app/api/health
   ```

## Custom Domain Setup

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed by Vercel
4. Wait for DNS propagation (usually 5-10 minutes)

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Verify environment variables are set correctly
- Check build logs in Vercel dashboard

### API Routes Not Working
- Ensure `vercel.json` is in the root directory
- Check that API routes start with `/api/`
- Verify serverless function size is under 50MB

### Wallet Connection Issues
- Ensure MetaMask is installed
- Check that you're on the correct network
- Verify `VITE_CHAIN_ID` matches your target network

### Environment Variables Not Loading
- Prefix all frontend env vars with `VITE_`
- Redeploy after changing environment variables
- Check that variables are set in Vercel dashboard

## Local Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Project Structure

```
├── api/
│   └── index.ts          # Express API server (Vercel serverless)
├── src/
│   ├── pages/
│   │   ├── Landing.tsx   # Landing page
│   │   ├── Upload.tsx    # Upload interface
│   │   ├── Results.tsx   # Analysis results
│   │   └── Verification.tsx # Blockchain verification
│   ├── lib/
│   │   ├── wallet.ts     # Wallet connection logic
│   │   └── api.ts        # API client
│   └── components/       # UI components
├── vercel.json           # Vercel configuration
└── .env                  # Environment variables
```

## Next Steps

1. **Customize the AI Analysis**: Replace mock analysis with real AI models
2. **Deploy Smart Contract**: Deploy your verification contract to mainnet/testnet
3. **Add Authentication**: Implement user accounts and history
4. **Enhance UI**: Customize branding and styling
5. **Add Analytics**: Track usage with Vercel Analytics

## Support

- Vercel Documentation: https://vercel.com/docs
- Ethers.js Documentation: https://docs.ethers.org
- React Documentation: https://react.dev

## License

MIT
