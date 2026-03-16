import { useState } from "react";
import { mockStories } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { Video, Mic, FileText, Lock, Users, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const Stories = () => {
  const { user } = useAuth();
  const [typeFilter, setTypeFilter] = useState<"all" | "video" | "audio" | "text">("all");

  const stories = user?.role === "resident"
    ? mockStories.filter(s => s.residentId === "res-1")
    : mockStories.filter(s => s.residentId === "res-1" && s.visibility !== "private");

  const filtered = stories.filter(s => typeFilter === "all" || s.type === typeFilter);

  const typeIcon = (type: string) => {
    if (type === "video") return <Video className="w-4 h-4" />;
    if (type === "audio") return <Mic className="w-4 h-4" />;
    return <FileText className="w-4 h-4" />;
  };

  const visibilityIcon = (vis: string) => {
    if (vis === "private") return <Lock className="w-3 h-3" />;
    if (vis === "family") return <Users className="w-3 h-3" />;
    return <UserCheck className="w-3 h-3" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            {user?.role === "resident" ? "My Stories" : "Eleanor's Stories"}
          </h1>
          <p className="font-body text-muted-foreground mt-1">{stories.length} stories recorded</p>
        </div>
        {(user?.role === "resident" || user?.role === "staff") && (
          <Button variant="hero">Record New Story</Button>
        )}
      </div>

      <div className="flex gap-2">
        {(["all", "video", "audio", "text"] as const).map(t => (
          <Button key={t} variant={typeFilter === t ? "hero" : "outline"} size="sm" onClick={() => setTypeFilter(t)}>
            {t === "all" ? "All" : t.charAt(0).toUpperCase() + t.slice(1)}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(story => (
          <div key={story.id} className="rounded-2xl bg-card border border-border overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
            <div className="aspect-video bg-muted flex items-center justify-center relative">
              <div className="w-16 h-16 rounded-full bg-primary/80 flex items-center justify-center text-primary-foreground group-hover:scale-110 transition-transform">
                {typeIcon(story.type)}
              </div>
              {story.duration && (
                <span className="absolute bottom-2 right-2 bg-foreground/80 text-background px-2 py-0.5 rounded font-body text-xs">
                  {story.duration}
                </span>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-body text-sm font-semibold text-foreground mb-1">{story.title}</h3>
              <div className="flex items-center gap-2">
                <span className="font-body text-xs text-muted-foreground">{story.createdAt}</span>
                {story.questionId && (
                  <span className="font-body text-xs bg-secondary/10 text-secondary px-2 py-0.5 rounded-full">Q&A Response</span>
                )}
              </div>
              {user?.role === "resident" && (
                <div className="flex items-center gap-1 mt-2">
                  {visibilityIcon(story.visibility)}
                  <span className="font-body text-xs text-muted-foreground capitalize">{story.visibility}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;
