import { useState } from "react";
import { Sparkles, Wand2, Download, RotateCcw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/ImageUpload";
import AdBanner from "@/components/AdBanner";
import { generatePreview } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { useIsWebView } from "@/hooks/use-webview";

const Index = () => {
  const [handImage, setHandImage] = useState<File | null>(null);
  const [mehendiDesign, setMehendiDesign] = useState<File | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const isWebView = useIsWebView();

  const canGenerate = handImage && mehendiDesign && !loading;

  const handleGenerate = async () => {
    if (!handImage || !mehendiDesign) return;
    setLoading(true);
    setResultUrl(null);
    try {
      const data = await generatePreview(handImage, mehendiDesign);
      setResultUrl(data.result_url);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      toast({ variant: "destructive", title: "Error", description: message });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setHandImage(null);
    setMehendiDesign(null);
    setResultUrl(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-2">
          <Sparkles size={22} className="text-foreground" />
          <h1 className="text-xl font-semibold tracking-tight text-foreground">TryMehendi</h1>
        </div>
      </header>

      {/* Top Banner Ad — leaderboard on desktop, small banner on mobile */}
      <div className="max-w-2xl mx-auto px-4 pt-4">
        <AdBanner format="leaderboard" slot="TOP_BANNER_SLOT" />
      </div>

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-8">
        {/* Upload Section */}
        <section>
          <h2 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">
            Upload Images
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <ImageUpload
              label="Hand Image"
              icon="hand"
              file={handImage}
              onFileChange={setHandImage}
            />
            <ImageUpload
              label="Mehendi Design"
              icon="palette"
              file={mehendiDesign}
              onFileChange={setMehendiDesign}
            />
          </div>
        </section>

        {/* Mid-page Ad — between uploads and result (skip in WebView) */}
        {!isWebView && (
          <AdBanner format="rectangle" slot="MID_CONTENT_SLOT" className="my-4" />
        )}

        {/* Generate Button */}
        <section className="flex justify-center">
          <Button
            size="lg"
            disabled={!canGenerate}
            onClick={handleGenerate}
            className="min-w-[200px]"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 size={18} />
                Generate Preview
              </>
            )}
          </Button>
        </section>

        {/* Result Section */}
        {resultUrl && (
          <section className="space-y-4">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Result
            </h2>
            <div className="rounded-lg border border-border overflow-hidden shadow-sm">
              <img
                src={resultUrl}
                alt="Generated mehendi preview"
                className="w-full object-contain"
              />
            </div>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" asChild>
                <a href={resultUrl} download="mehendi-preview.png">
                  <Download size={16} />
                  Download
                </a>
              </Button>
              <Button variant="ghost" onClick={handleReset}>
                <RotateCcw size={16} />
                Try Again
              </Button>
            </div>
          </section>
        )}
      </main>

      {/* Sticky Bottom Banner — mobile only, hidden in desktop */}
      <div className="fixed bottom-0 left-0 right-0 z-50 block md:hidden bg-background border-t border-border">
        <AdBanner format="banner" slot="BOTTOM_BANNER_SLOT" />
      </div>

      {/* Bottom spacer on mobile so sticky ad doesn't cover content */}
      <div className="h-14 block md:hidden" />
    </div>
  );
};

export default Index;
