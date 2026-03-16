import { useState } from "react";
import { Video, Mic, FileText, Circle, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockQuestions, mockPrompts } from "@/data/mockData";

const RecordStory = () => {
  const [mode, setMode] = useState<"video" | "audio" | "text">("video");
  const [isRecording, setIsRecording] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const pendingQuestions = mockQuestions.filter(q => q.residentId === "res-1" && q.status === "PENDING");

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">Record a Story</h1>
        <p className="font-body text-muted-foreground mt-1">Share a memory, answer a question, or respond to a prompt.</p>
      </div>

      {/* Question selector */}
      {pendingQuestions.length > 0 && (
        <div className="rounded-2xl bg-secondary/5 border border-secondary/20 p-5">
          <h2 className="font-body text-sm font-semibold text-foreground mb-3">Answer a family question:</h2>
          <div className="space-y-2">
            {pendingQuestions.map(q => (
              <button
                key={q.id}
                onClick={() => setSelectedQuestion(q.id === selectedQuestion ? null : q.id)}
                className={`w-full text-left p-3 rounded-lg border transition-all font-body text-sm ${
                  selectedQuestion === q.id
                    ? "border-secondary bg-secondary/10"
                    : "border-border hover:border-secondary/50"
                }`}
              >
                <p className="font-medium text-foreground">"{q.questionText}"</p>
                <p className="text-xs text-muted-foreground mt-1">— {q.askedByName}, {q.askedByRelationship}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Recording mode */}
      <div className="flex gap-3">
        {[
          { key: "video" as const, icon: Video, label: "Video" },
          { key: "audio" as const, icon: Mic, label: "Audio" },
          { key: "text" as const, icon: FileText, label: "Text" },
        ].map(m => (
          <Button
            key={m.key}
            variant={mode === m.key ? "hero" : "outline"}
            onClick={() => setMode(m.key)}
            className="flex-1"
          >
            <m.icon className="w-4 h-4 mr-2" /> {m.label}
          </Button>
        ))}
      </div>

      {/* Recording area */}
      {mode !== "text" ? (
        <div className="rounded-2xl bg-foreground/95 aspect-video flex flex-col items-center justify-center relative">
          {!isRecording ? (
            <>
              <div className="w-20 h-20 rounded-full bg-destructive/80 flex items-center justify-center cursor-pointer hover:bg-destructive transition-colors" onClick={() => setIsRecording(true)}>
                <Circle className="w-10 h-10 text-destructive-foreground fill-current" />
              </div>
              <p className="font-body text-sm text-background/60 mt-4">
                Tap to start {mode === "video" ? "recording" : "recording audio"}
              </p>
            </>
          ) : (
            <>
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive animate-pulse" />
                <span className="font-body text-sm text-background/80">Recording... 0:12</span>
              </div>
              <div className="w-20 h-20 rounded-full bg-destructive/80 flex items-center justify-center cursor-pointer hover:bg-destructive transition-colors" onClick={() => setIsRecording(false)}>
                <Square className="w-8 h-8 text-destructive-foreground fill-current" />
              </div>
              <p className="font-body text-sm text-background/60 mt-4">Tap to stop recording</p>
            </>
          )}
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-card p-6">
          <textarea
            className="w-full h-64 bg-transparent font-body text-foreground text-base resize-none focus:outline-none placeholder:text-muted-foreground"
            placeholder="Write your story here..."
          />
        </div>
      )}

      {/* Story details */}
      <div className="rounded-2xl bg-card border border-border p-5 space-y-4">
        <div>
          <label className="font-body text-sm font-medium text-foreground block mb-1">Story Title</label>
          <input
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50"
            placeholder="Give your story a title..."
          />
        </div>
        <div>
          <label className="font-body text-sm font-medium text-foreground block mb-1">Who can see this?</label>
          <select className="w-full h-10 rounded-lg border border-border bg-background px-3 font-body text-sm">
            <option>All family members</option>
            <option>Selected family members</option>
            <option>Private (only me)</option>
          </select>
        </div>
        <div className="flex gap-3 pt-2">
          <Button variant="hero" size="lg" className="flex-1">Save Story</Button>
          <Button variant="outline" size="lg">Cancel</Button>
        </div>
      </div>

      {/* Suggested prompts */}
      <div className="rounded-2xl bg-card border border-border p-5">
        <h2 className="font-body text-sm font-semibold text-foreground mb-3">Need inspiration?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {mockPrompts.slice(0, 6).map(p => (
            <button key={p.id} className="text-left p-3 rounded-lg border border-border hover:border-secondary/50 font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
              {p.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecordStory;
