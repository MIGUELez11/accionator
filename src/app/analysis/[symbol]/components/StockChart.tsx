'use client';

import { memo, useEffect, useRef } from 'react';

function TradingViewWidget({ symbol }: { symbol: string }) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = `
        {
          "autosize": true,
          "symbol": "${symbol}",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "light",
          "style": "1",
          "locale": "es",
          "hide_top_toolbar": true,
          "hide_legend": true,
          "allow_symbol_change": false,
          "save_image": false,
          "details": true,
          "hotlist": true,
          "height": 284,
          "support_host": "https://www.tradingview.com"
        }`;
    container.current?.appendChild(script);

    const containerRef = container.current;

    return () => {
      if (containerRef) {
        containerRef.innerHTML = '';
      }
    };
  }, [symbol]);

  return (
    <div className="tradingview-widget-container" ref={container} style={{ height: '100%', width: '100%' }}>
      <div className="tradingview-widget-container__widget" style={{ height: '100%', width: '100%' }}></div>
    </div>
  );
}

export default memo(TradingViewWidget);
