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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header - Fixed for better mobile UX */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center gap-2">
            <img src="./logo.png" alt=""   style={{
              height: 50
            }}/>

            {/* <Sparkles size={20} className="text-foreground sm:w-6 sm:h-6" />
            <h1 className="text-lg sm:text-xl font-semibold tracking-tight text-foreground">
              TryMehendi
            </h1> */}
          </div>
        </div>
      </header>

      {/* Top Banner Ad — responsive sizing */}
      {/* <div className="container max-w-4xl mx-auto px-4 sm:px-6 pt-4">
        <div className="w-full overflow-hidden">
          <AdBanner format="leaderboard" slot="TOP_BANNER_SLOT" />
        </div>
      </div> */}

<div className="relative container max-w-4xl mx-auto px-4 sm:px-6 pt-4 ">
  <img src="b1.png"
       alt="Banner"
       className="w-full h-full object-cover"></img>

  {/* <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
    <h1 className="text-white text-4xl md:text-6xl font-bold">
      Welcome to My Website
    </h1>
  </div> */}
</div>

      {/* Main Content - Scrollable with proper padding */}
      <main className="flex-1 container max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6 pb-[140px] md:pb-8">
      <div className="space-y-4 sm:space-y-6">
      {/* Upload Section */}
          <section>
            <h2 className="text-xs sm:text-sm font-medium text-muted-foreground mb-3 sm:mb-4 uppercase tracking-wide">
              Upload Images
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
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

          {/* Mid-page Ad — responsive with proper overflow handling */}
          {/* {!isWebView && (
            <div className="w-full overflow-hidden my-3 sm:my-4">
            <AdBanner format="rectangle" slot="MID_CONTENT_SLOT" />
            </div>
          )} */}

          {/* Generate Button */}
          <section className="flex justify-center">
            <Button
              size="lg"
              disabled={!canGenerate}
              onClick={handleGenerate}
              className="w-full sm:w-auto sm:min-w-[200px] md:min-w-[240px] text-sm sm:text-base"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin sm:w-[18px] sm:h-[18px]" />
                  <span className="ml-2">Generating...</span>
                </>
              ) : (
                <>
                  <Wand2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                  <span className="ml-2">Generate Preview</span>
                </>
              )}
            </Button>
          </section>

          {/* Result Section - With proper image handling */}
          {resultUrl && (
            <section className="space-y-4 sm:space-y-6">
              <h2 className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Result
              </h2>
              
              {/* Image container with proper overflow and aspect ratio handling */}
              <div className="rounded-lg border border-border overflow-hidden shadow-sm bg-muted/30">
                <div className="relative w-full">
                  <img
                    src={resultUrl}
                    alt="Generated mehendi preview"
                    className="w-full h-auto max-h-[60vh] sm:max-h-[70vh] object-contain"
                    loading="lazy"
                  />
                </div>
              </div>
              
              {/* Action buttons - Responsive layout */}
              <div className="flex flex-col sm:flex-row gap-3 sm:justify-center">
                <Button 
                  variant="outline" 
                  asChild
                  className="w-full sm:w-auto text-sm sm:text-base"
                >
                  <a href={resultUrl} download="mehendi-preview.png">
                    <Download size={16} className="sm:w-[18px] sm:h-[18px]" />
                    <span className="ml-2">Download</span>
                  </a>
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={handleReset}
                  className="w-full sm:w-auto text-sm sm:text-base"
                >
                  <RotateCcw size={16} className="sm:w-[18px] sm:h-[18px]" />
                  <span className="ml-2">Try Again</span>
                </Button>
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Sticky Bottom Banner — mobile only with safe area handling */}
      {/* <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/95 backdrop-blur border-t border-border pb-safe">
              <div className="w-full overflow-hidden">
          <AdBanner format="banner" slot="BOTTOM_BANNER_SLOT" />
        </div>
      </div> */}

      {/* Bottom spacer for sticky ad - with safe area support */}
      {/* <div className="h-16 sm:h-20 md:hidden" aria-hidden="true" /> */}
    </div>
  );
};

export default Index;