import { useEffect, useRef } from "react";
import { useIsWebView } from "@/hooks/use-webview";

type AdFormat = "leaderboard" | "banner" | "rectangle";

interface AdBannerProps {
  /** Where this ad appears — controls responsive sizing */
  format?: AdFormat;
  /** Additional CSS classes */
  className?: string;
  /** AdSense ad slot ID */
  slot: string;
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

const AD_SIZES: Record<AdFormat, { desktop: string; mobile: string }> = {
  leaderboard: { desktop: "min-h-[90px]", mobile: "min-h-[50px]" },
  banner: { desktop: "min-h-[90px]", mobile: "min-h-[50px]" },
  rectangle: { desktop: "min-h-[250px]", mobile: "min-h-[200px]" },
};

const AdBanner = ({ format = "banner", className = "", slot }: AdBannerProps) => {
  const adRef = useRef<HTMLModElement>(null);
  const isWebView = useIsWebView();
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // AdSense not loaded yet — ok in dev
    }
  }, []);

  const sizes = AD_SIZES[format];

  return (
    <div
      className={`w-full flex justify-center overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <ins
        ref={adRef}
        className={`adsbygoogle block w-full ${sizes.mobile} md:${sizes.desktop}`}
        style={{ display: "block" }}
        data-ad-client={import.meta.env.VITE_ADSENSE_CLIENT || "ca-pub-XXXXXXXXXXXXXXXX"}
        data-ad-slot={slot}
        data-ad-format={isWebView ? "banner" : "auto"}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdBanner;
