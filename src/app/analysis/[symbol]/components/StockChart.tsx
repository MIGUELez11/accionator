"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    TradingView: {
      widget: new (config: {
        width: string | number;
        height: string | number;
        symbol: string;
        interval: string;
        timezone: string;
        theme: string;
        style: string;
        locale: string;
        enable_publishing: boolean;
        hide_top_toolbar: boolean;
        hide_legend: boolean;
        save_image: boolean;
        container_id: string;
      }) => void;
    };
  }
}

interface StockChartProps {
  symbol: string;
}

export function StockChart({ symbol }: StockChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      if (containerRef.current) {
        new window.TradingView.widget({
          width: "100%",
          height: 264,
          symbol: symbol,
          interval: "D",
          timezone: "Europe/Madrid",
          theme: "light",
          style: "1",
          locale: "es",
          enable_publishing: false,
          hide_top_toolbar: true,
          hide_legend: true,
          save_image: false,
          container_id: containerRef.current.id,
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [symbol]);

  return <div id={`tradingview_${symbol}`} ref={containerRef} />;
}
