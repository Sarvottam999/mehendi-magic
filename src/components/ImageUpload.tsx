import React, { useRef, useState } from "react";
import { Hand, Palette, X, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  label: string;
  icon: "hand" | "palette";
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ label, icon, file, onFileChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    if (selected) {
      onFileChange(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleRemove = () => {
    onFileChange(null);
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const IconComp = icon === "hand" ? Hand : Palette;

  return (
    <div className="flex flex-col items-center gap-2 w-full ">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
      {preview ? (
        <div className="relative w-full  rounded-lg border border-border overflow-hidden shadow-sm ">
          <img src={preview} alt={label} className="w-full h-full object-cover" />
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm rounded-full p-1 border border-border hover:bg-destructive hover:text-destructive-foreground transition-colors"
            aria-label="Remove image"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <button
          onClick={() => inputRef.current?.click()}
          className={cn(
            "w-full h-[160px] sm:h-auto sm:aspect-square rounded-lg border-2 border-dashed border-border",
            "flex flex-col items-center justify-center gap-3",
            "hover:border-foreground/40 hover:bg-muted/50 transition-colors cursor-pointer"
          )}
        >
          <IconComp size={32} className="text-muted-foreground" />
          <Upload size={16} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground font-medium">{label}</span>
        </button>
      )}
      {file && (
        <p className="text-xs text-muted-foreground truncate max-w-full">{file.name}</p>
      )}
    </div>
  );
};

export default ImageUpload;
