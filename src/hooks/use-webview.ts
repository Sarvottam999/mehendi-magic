import { useState, useEffect } from "react";

/**
 * Detects if the app is running inside a mobile WebView.
 * Checks common WebView user-agent indicators.
 */
export function useIsWebView(): boolean {
  const [isWebView, setIsWebView] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent || "";
    const isWV =
      // Android WebView
      /wv/.test(ua) ||
      // iOS WebView (WKWebView / UIWebView)
      (/iPhone|iPad|iPod/.test(ua) && !/Safari/.test(ua)) ||
      // Generic WebView markers
      /WebView/.test(ua);
    setIsWebView(isWV);
  }, []);

  return isWebView;
}
