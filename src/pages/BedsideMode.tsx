import { useState } from "react";
import { mockResidents, mockPrompts } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Circle, Square, Volume2 } from "lucide-react";

const BedsideMode = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const hospicePrompts = mockPrompts.filter(p => ["HOSPICE", "GRATITUDE", "FAITH", "LEGACY"].includes(p.category));

  return (
    <div className="fixed inset-0 bg-foreground/95 flex flex-col items-center justify-center p-8 z-50">
      {/* Minimal header */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
        <p className="font-body text-sm text-background/40">Hospice Bedside Mode</p>
        <Button variant="ghost" size="sm" className="text-background/40 hover:text-background" onClick={() => window.history.back()}>
          Exit
        </Button>
      </div>

      {/* Prompt display - large text */}
      <div className="max-w-2xl text-center mb-16">
        <p className="font-display text-2xl sm:text-3xl lg:text-4xl text-background/90 leading-relaxed">
          "{hospicePrompts[currentPromptIndex]?.text}"
        </p>
        <button className="mt-4 inline-flex items-center gap-2 text-background/40 hover:text-background/70 transition-colors font-body text-sm">
          <Volume2 className="w-4 h-4" /> Read aloud
        </button>
      </div>

      {/* Record button - oversized 120px+ */}
      <div className="mb-12">
        {!isRecording ? (
          <button
            onClick={() => setIsRecording(true)}
            className="w-32 h-32 rounded-full bg-destructive/80 hover:bg-destructive flex items-center justify-center transition-all active:scale-95"
          >
            <Circle className="w-16 h-16 text-destructive-foreground fill-current" />
          </button>
        ) : (
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-destructive animate-pulse" />
              <span className="font-body text-lg text-background/80">Recording...</span>
            </div>
            <button
              onClick={() => setIsRecording(false)}
              className="w-32 h-32 rounded-full bg-destructive/80 hover:bg-destructive flex items-center justify-center transition-all active:scale-95"
            >
              <Square className="w-12 h-12 text-destructive-foreground fill-current" />
            </button>
          </div>
        )}
      </div>

      {/* Prompt navigation */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="lg"
          className="text-background/40 hover:text-background text-lg"
          onClick={() => setCurrentPromptIndex(Math.max(0, currentPromptIndex - 1))}
          disabled={currentPromptIndex === 0}
        >
          ← Previous
        </Button>
        <span className="font-body text-sm text-background/30">
          {currentPromptIndex + 1} / {hospicePrompts.length}
        </span>
        <Button
          variant="ghost"
          size="lg"
          className="text-background/40 hover:text-background text-lg"
          onClick={() => setCurrentPromptIndex(Math.min(hospicePrompts.length - 1, currentPromptIndex + 1))}
          disabled={currentPromptIndex === hospicePrompts.length - 1}
        >
          Next →
        </Button>
      </div>
    </div>
  );
};

export default BedsideMode;
