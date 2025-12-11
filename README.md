# AI Content Verification Platform

A full-stack hackathon project for AI-powered content verification with blockchain proof publishing.

## Features

- **Multi-Format Upload**: Support for images, videos, and text analysis
- **AI-Powered Analysis**: Advanced content verification algorithms
- **Blockchain Proof**: Publish immutable verification records on-chain
- **Wallet Integration**: Connect with MetaMask via ethers.js
- **Modern UI**: Beautiful, responsive interface built with React and Tailwind CSS
- **Full-Stack**: React frontend + Node/Express backend deployed on Vercel

## Tech Stack

### Frontend
- React 19 with TypeScript
- Vite for blazing-fast builds
- Tailwind CSS + shadcn/ui components
- React Router for navigation
- ethers.js for Web3 integration
- Axios for API calls

### Backend
- Node.js + Express
- TypeScript
- Multer for file uploads
- CORS enabled
- Vercel serverless functions

## Quick Start

### Installation

```bash
# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env

# Edit .env with your configuration
```

### Development

```bash
# Start frontend development server
pnpm dev

# Visit http://localhost:5173
```

### Build

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to Vercel

1. Push to GitHub
2. Import repository in Vercel
3. Configure environment variables
4. Deploy!

Your live URL will be: `https://your-project-name.vercel.app`

## Environment Variables

Create a `.env` file with the following variables:

```env
# Blockchain Configuration
VITE_CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000
VITE_CHAIN_ID=1
VITE_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY

# API Configuration
VITE_API_URL=/api

# Contract ABI
VITE_CONTRACT_ABI=[]
```

## API Endpoints

- `GET /api/health` - Health check endpoint
- `POST /api/analyze-image` - Analyze uploaded images
- `POST /api/analyze-video` - Analyze uploaded videos
- `POST /api/analyze-text` - Analyze text content
- `POST /api/publish-proof` - Publish verification proof to blockchain

## Project Structure

```
├── api/
│   └── index.ts              # Express API server
├── src/
│   ├── pages/
│   │   ├── Landing.tsx       # Landing page
│   │   ├── Upload.tsx        # Upload interface
│   │   ├── Results.tsx       # Analysis results
│   │   └── Verification.tsx  # Blockchain verification
│   ├── lib/
│   │   ├── wallet.ts         # Wallet connection service
│   │   └── api.ts            # API client
│   ├── components/           # UI components
│   └── App.tsx               # Main app component
├── vercel.json               # Vercel configuration
├── .env                      # Environment variables
└── DEPLOYMENT.md             # Deployment guide
```

## Usage

1. **Visit the landing page** - Learn about the platform
2. **Upload content** - Choose image, video, or text
3. **Review analysis** - See AI-powered verification results
4. **Connect wallet** - Link your MetaMask wallet
5. **Publish proof** - Store verification on blockchain

## Smart Contract Integration

To integrate with your smart contract:

1. Deploy your verification contract
2. Update `VITE_CONTRACT_ADDRESS` in `.env`
3. Add your contract ABI to `VITE_CONTRACT_ABI`
4. Update the chain ID in `VITE_CHAIN_ID`
5. Redeploy to Vercel

## Customization

### Replace Mock AI Analysis

The current implementation uses mock analysis. To integrate real AI:

1. Update `api/index.ts` endpoints
2. Add your AI service API keys to environment variables
3. Implement actual analysis logic

### Customize UI

- Edit components in `src/components/`
- Modify pages in `src/pages/`
- Update Tailwind config in `tailwind.config.js`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT

## Support

For deployment help, see [DEPLOYMENT.md](./DEPLOYMENT.md)
