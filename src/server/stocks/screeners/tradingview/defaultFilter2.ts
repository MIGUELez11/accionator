export const defaultFilter2 = {
  operands: [
    /* === Only Common Stocks === */
    {
      expression: {
        left: 'type',
        operation: 'equal',
        right: 'stock',
      },
    },
    {
      expression: {
        left: 'typespecs',
        operation: 'has',
        right: ['common'],
      },
    },

    /* === Recommended by TradingView Analysts === */
    {
      operation: {
        operands: [
          {
            expression: {
              left: 'recommendation_mark',
              operation: 'nequal',
              right: 1.75,
            },
          },
        ],
        operator: 'and',
      },
    },
    {
      operation: {
        operands: [
          {
            expression: {
              left: 'recommendation_mark',
              operation: 'in_range',
              right: [1.25, 1.75],
            },
          },
          {
            expression: {
              left: 'recommendation_mark',
              operation: 'in_range',
              right: [1, 1.25],
            },
          },
        ],
        operator: 'or',
      },
    },
    {
      operation: {
        operands: [
          {
            expression: {
              left: 'Recommend.Other',
              operation: 'nequal',
              right: 0.1,
            },
          },
        ],
        operator: 'and',
      },
    },
    {
      operation: {
        operands: [
          {
            expression: {
              left: 'Recommend.Other',
              operation: 'in_range',
              right: [0.1, 0.5],
            },
          },
          {
            expression: {
              left: 'Recommend.Other',
              operation: 'in_range',
              right: [0.5, 1],
            },
          },
        ],
        operator: 'or',
      },
    },
    {
      operation: {
        operands: [
          {
            expression: {
              left: 'Recommend.MA',
              operation: 'nequal',
              right: 0.1,
            },
          },
        ],
        operator: 'and',
      },
    },
    {
      operation: {
        operands: [
          {
            expression: {
              left: 'Recommend.MA',
              operation: 'in_range',
              right: [0.1, 0.5],
            },
          },
          {
            expression: {
              left: 'Recommend.MA',
              operation: 'in_range',
              right: [0.5, 1],
            },
          },
        ],
        operator: 'or',
      },
    },
    {
      operation: {
        operands: [
          {
            expression: {
              left: 'Recommend.All',
              operation: 'nequal',
              right: 0.1,
            },
          },
        ],
        operator: 'and',
      },
    },
    {
      operation: {
        operands: [
          {
            expression: {
              left: 'Recommend.All',
              operation: 'in_range',
              right: [0.1, 0.5],
            },
          },
          {
            expression: {
              left: 'Recommend.All',
              operation: 'in_range',
              right: [0.5, 1],
            },
          },
        ],
        operator: 'or',
      },
    },
  ],
  operator: 'and',
};
