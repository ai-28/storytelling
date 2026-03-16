import { Video, MessageCircleQuestion, Heart, Bell } from "lucide-react";
import { mockStories, mockQuestions } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FamilyDashboard = () => {
  const sharedStories = mockStories.filter(s => s.residentId === "res-1" && s.visibility !== "private");
  const myQuestions = mockQuestions.filter(q => q.askedByUserId === "user-fam-1");
  const answeredQuestions = myQuestions.filter(q => q.status === "ANSWERED");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">Welcome, Sarah</h1>
        <p className="font-body text-muted-foreground mt-1">Stay connected with Eleanor's stories.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Video} label="Stories Available" value={String(sharedStories.length)} />
        <StatCard icon={MessageCircleQuestion} label="Questions Asked" value={String(myQuestions.length)} />
        <StatCard icon={Heart} label="Questions Answered" value={String(answeredQuestions.length)} accent />
        <StatCard icon={Bell} label="New This Week" value="2" />
      </div>

      {answeredQuestions.length > 0 && (
        <div className="rounded-2xl bg-secondary/5 border border-secondary/20 p-6">
          <h2 className="font-display text-xl font-semibold text-foreground mb-2">
            🎉 Your Question Was Answered!
          </h2>
          <p className="font-body text-muted-foreground mb-4">
            Eleanor just recorded a response to: <span className="font-medium text-foreground">"{answeredQuestions[0].questionText}"</span>
          </p>
          <Button variant="hero" size="sm">Watch Response</Button>
        </div>
      )}

      <div className="rounded-2xl bg-card border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-semibold text-foreground">Eleanor's Stories</h2>
          <Link to="/stories">
            <Button variant="ghost" size="sm" className="font-body text-secondary">View All</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sharedStories.map(story => (
            <div key={story.id} className="rounded-xl bg-background border border-border/50 p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="aspect-video bg-muted rounded-lg mb-3 flex items-center justify-center">
                <Video className="w-8 h-8 text-muted-foreground/40" />
              </div>
              <h3 className="font-body text-sm font-semibold text-foreground">{story.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <p className="font-body text-xs text-muted-foreground">{story.type} · {story.duration || "Text"}</p>
                {story.questionId && (
                  <span className="font-body text-xs bg-secondary/10 text-secondary px-2 py-0.5 rounded-full">Q&A</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-card border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-semibold text-foreground">Ask a Question</h2>
          <Link to="/prompts">
            <Button variant="ghost" size="sm" className="font-body text-secondary">Browse Library</Button>
          </Link>
        </div>
        <div className="flex gap-3">
          <input
            className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50"
            placeholder="Ask Eleanor a question you've always wanted answered..."
          />
          <Button variant="hero">Send</Button>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, accent }: { icon: React.ElementType; label: string; value: string; accent?: boolean }) => (
  <div className="rounded-xl bg-card border border-border p-5">
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${accent ? "bg-secondary/10 text-secondary" : "bg-muted text-muted-foreground"}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="font-display text-2xl font-bold text-foreground">{value}</p>
        <p className="font-body text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  </div>
);

export default FamilyDashboard;
