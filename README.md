# Stockator 📈

> **Transform your way of investing with artificial intelligence and real-time data**

Imagine having a financial assistant that helps you make smarter investment decisions? That's exactly what Stockator is!

A modern financial analysis platform built with the latest web technologies, designed to help investors like you make data-driven decisions through stock screening, portfolio tracking, and AI-powered investment planning.

## ✨ What makes Stockator special?

### 📊 **Intelligent Stock Screener**

Tired of wasting time searching for the perfect stocks? Our screener allows you to:

- Filter stocks with advanced and customizable criteria
- Real-time market data that updates automatically
- Interactive visualizations that help you understand data at a glance
- Save your favorite filters for future use

### 📈 **Deep Stock Analysis**

Get to know each stock as if it were your best friend:

- Complete information and detailed profiles of each company
- Real-time news that affects the market
- Technical and fundamental analysis tools
- Historical charts that tell the complete story

### 💼 **Operations Management**

Maintain total control of your portfolio:

- Record each buy and sell with precision
- Monitor your portfolio performance in real-time
- Organize your operations with custom tags
- Analyze your history to improve your future decisions

### 🎯 **AI-Powered Investment Planning**

Let artificial intelligence help you plan:

- AI-generated investment strategies
- Risk assessment and profit/loss projections
- Personalized recommendations based on your profile
- Portfolio optimization suggestions

### 🔍 **Intelligent Search and Analytics**

Learn from your search patterns:

- Tracking of stock and sector searches
- Usage analytics and valuable insights
- Historical search patterns
- Personalized recommendations

## 🛠️ Technologies that make the magic

### Frontend (What you see)

- **Next.js 15** - The most modern React framework with App Router
- **React 19** - React with cutting-edge concurrent features
- **TypeScript** - Safe development without type errors
- **Tailwind CSS 4.1** - Modern and responsive styles
- **shadcn/ui** - Beautiful and accessible components built with Radix UI
- **Nivo** - Data visualizations that captivate

### Backend (What you don't see but makes everything work)

- **Convex** - Real-time database that updates automatically
- **Effect TS** - Functional programming for robust logic
- **Finnhub** - Real and reliable financial data

### State and Data

- **TanStack React Query** - Intelligent server state management
- **Convex React Query** - Real-time data synchronization

### Authentication and Internationalization

- **Clerk** - Secure and easy-to-use authentication
- **Tolgee** - Multi-language support to reach more people

### Development Tools

- **ESLint** - Clean and consistent code
- **Prettier** - Automatic formatting for beautiful code
- **pnpm** - Fast and efficient package manager

## 🚀 Let's start the adventure!

### What you need

- **Node.js 18+** - The JavaScript engine
- **pnpm** (recommended) or npm - To install dependencies
- **Convex account** - For the real-time database
- **Clerk account** - For user authentication
- **Finnhub API key** - For real financial data

### Step-by-step installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/miguelez11/accionator.git stockator
   cd stockator
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Configure environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key

   # Convex
   NEXT_PUBLIC_CONVEX_URL=your_convex_url

   # Finnhub API
   FINNHUB_API_KEY=your_finnhub_api_key

   # PostHog Analytics (optional)
   NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
   POSTHOG_SECRET=your_posthog_secret

   # Tolgee i18n (optional)
   NEXT_PUBLIC_TOLGEE_API_KEY=your_tolgee_api_key
   TOLGEE_API_KEY=your_tolgee_api_key
   ```

4. **Set up Convex**

   ```bash
   pnpx convex dev
   ```

5. **Start the development server!**

   ```bash
   pnpm dev
   ```

6. **Open your browser**
   Go to [http://localhost:3000](http://localhost:3000) and enjoy!

## 📁 Project structure

```
stockator/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [locale]/          # Internationalized routes
│   │   │   ├── (protected)/   # Protected routes
│   │   │   │   ├── screener/  # Stock screening
│   │   │   │   ├── analysis/  # Stock analysis
│   │   │   │   ├── operations/# Portfolio operations
│   │   │   │   └── plan/      # Investment planning
│   │   │   └── layout.tsx
│   │   ├── api/               # API routes
│   │   └── providers/         # Context providers
│   ├── components/            # Reusable components
│   │   └── ui/               # UI component library
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility functions
│   ├── queries/              # React Query hooks
│   ├── mutations/            # React Query mutations
│   └── server/               # Server-side utilities
├── convex/                   # Convex backend
│   ├── schema.ts            # Database schema
│   ├── queries/             # Database queries
│   ├── mutations/           # Database mutations
│   └── helpers/             # Shared utilities
├── public/                  # Static assets
└── i18n/                   # Internationalization files
```

## 🗄️ Intelligent database

The application uses Convex with the following main tables:

- **tokens** - Token usage tracking and subscriptions
- **historicalUsage** - Usage analytics and reports
- **stocksSearched** - Stock search patterns
- **sectorsSearched** - Sector search patterns
- **operations** - Portfolio buy/sell operations
- **operationTags** - Operation categorization

## 🎨 Beautiful UI components

The application uses a custom component library built with:

- **Radix UI** primitives for accessibility
- **Tailwind CSS** for modern styles
- **Class Variance Authority** for component variants
- **Lucide React** for beautiful icons

## 🌐 Internationalization

The application supports multiple languages using Tolgee:

- English (default)
- Spanish
- More languages can be easily added!

## 📊 Captivating data visualization

Charts and visualizations are powered by Nivo:

- Line charts for price trends
- Bar charts for comparisons
- Pie charts for portfolio allocation
- Custom interactive visualizations

## 🔐 Secure authentication

User authentication is handled by Clerk:

- Secure user registration and login
- Protected routes and middleware
- User profile management
- Role-based access control

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables in the Vercel dashboard
3. Automatic deployment on every push to the main branch!

### Other platforms

The application can be deployed on any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Join the community!

1. Fork the repository
2. Create a branch for your feature (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request!

### Development guidelines

- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

## 📝 Available commands

```bash
# Development
pnpm dev          # Start development server with Turbopack
pnpm build        # Build for production
pnpm start        # Start production server

# Code quality
pnpm lint         # Run ESLint
pnpm prettier     # Format code with Prettier
pnpm check        # Run linting and formatting

# Internationalization
pnpm i18n:login   # Login to Tolgee
pnpm i18n:pull    # Get latest translations
pnpm i18n:push    # Send new translations
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework that makes everything possible
- [Convex](https://convex.dev/) - Real-time backend that rocks
- [Clerk](https://clerk.com/) - Authentication that works wonderfully
- [Finnhub](https://finnhub.io/) - Real and reliable financial data
- [Nivo](https://nivo.rocks/) - Visualizations that captivate
- [Tailwind CSS](https://tailwindcss.com/) - CSS that makes life easier

## 📞 Need help?

If you have questions or need help:

- Open an issue on GitHub
- Check the documentation
- Join our community discussions

---

**Stockator** - Making financial analysis accessible and intelligent. 📈✨

_Ready to transform your way of investing? Let's get started! 🚀_
