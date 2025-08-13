# Plan Components

This directory contains all the components used in the investment plan page. The components have been organized into logical subdirectories for better maintainability and reusability.

## Directory Structure

```
components/
├── page/           # Page-level components
├── stock/          # Stock-related components
├── ui/             # Reusable UI components
├── skeleton/       # Loading and error boundary components
└── index.ts        # Main export file
```

## Component Structure

### Page-Level Components (`page/`)

- **PlanHeader**: Displays the page title and creation timestamp
- **InvestmentStrategyCard**: Shows the overall investment strategy with key metrics

### Stock Investment Components (`stock/`)

- **StockHeader**: Displays stock information including logo, name, ticker, price, and percentage change
- **EntryPriceRange**: Shows the recommended entry price range for the stock
- **InvestmentMetrics**: Grid of investment metrics (quantity, stop loss, duration, profit/loss estimates, probability)
- **ExitStrategy**: Lists the exit strategy points with prices and percentages
- **AnalysisButton**: Button to view detailed stock analysis
- **StockInvestmentPlan**: Main container that combines all stock-related components

### UI Components (`ui/`)

- **StocksList**: List container for multiple stock investment plans

### Skeleton Components (`skeleton/`)

- **StockInvestmentPlanSkeleton**: Loading skeleton for stock investment plans
- **StockInvestmentErrorBoundary**: Error boundary for stock investment components

## Usage

All components can be imported from the main index file:

```typescript
import {
  PlanHeader,
  InvestmentStrategyCard,
  StockInvestmentPlan,
  // ... other components
} from './components';
```

Or import from specific subdirectories:

```typescript
import { PlanHeader, InvestmentStrategyCard } from './components/page';
import { StockInvestmentPlan } from './components/stock';
import { StocksList } from './components/ui';
import { StockInvestmentPlanSkeleton } from './components/skeleton';
```

## Component Props

Each component has well-defined TypeScript interfaces for their props, making them type-safe and self-documenting.

## Benefits of This Organization

1. **Logical Grouping**: Components are organized by their purpose and scope
2. **Reusability**: Components can be easily reused across different parts of the application
3. **Maintainability**: Each component has a single responsibility
4. **Testability**: Smaller components are easier to test in isolation
5. **Readability**: Code is more organized and easier to understand
6. **Type Safety**: All components have proper TypeScript interfaces
7. **Scalability**: Easy to add new components to the appropriate subdirectory
