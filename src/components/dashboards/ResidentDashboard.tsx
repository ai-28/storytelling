import { Video, MessageCircleQuestion, Users, BookOpen } from "lucide-react";
import { mockStories, mockQuestions } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ResidentDashboard = () => {
  const myStories = mockStories.filter(s => s.residentId === "res-1");
  const myQuestions = mockQuestions.filter(q => q.residentId === "res-1" && q.status === "PENDING");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">Welcome back, Eleanor</h1>
        <p className="font-body text-muted-foreground mt-1">Your stories are making a difference. Here's what's new.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Video} label="Stories Recorded" value="14" />
        <StatCard icon={MessageCircleQuestion} label="Pending Questions" value={String(myQuestions.length)} accent />
        <StatCard icon={Users} label="Family Connected" value="5" />
        <StatCard icon={BookOpen} label="Stories Shared" value="12" />
      </div>

      {myQuestions.length > 0 && (
        <div className="rounded-2xl bg-card border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-semibold text-foreground">Questions Waiting for You</h2>
            <Link to="/questions">
              <Button variant="ghost" size="sm" className="font-body text-secondary">View All</Button>
            </Link>
          </div>
          <div className="space-y-3">
            {myQuestions.slice(0, 3).map(q => (
              <div key={q.id} className="flex items-start gap-4 p-4 rounded-xl bg-background border border-border/50">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-body text-sm font-bold flex-shrink-0">
                  {q.askedByName.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body text-sm font-medium text-foreground">{q.questionText}</p>
                  <p className="font-body text-xs text-muted-foreground mt-1">
                    From {q.askedByName} ({q.askedByRelationship}) · {q.createdAt}
                  </p>
                </div>
                <Link to="/record">
                  <Button variant="hero" size="sm">Answer</Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-2xl bg-card border border-border p-6">
        <h2 className="font-display text-xl font-semibold text-foreground mb-4">Recent Stories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {myStories.slice(0, 3).map(story => (
            <div key={story.id} className="rounded-xl bg-background border border-border/50 p-4 hover:shadow-md transition-shadow">
              <div className="aspect-video bg-muted rounded-lg mb-3 flex items-center justify-center">
                <Video className="w-8 h-8 text-muted-foreground/40" />
              </div>
              <h3 className="font-body text-sm font-semibold text-foreground">{story.title}</h3>
              <p className="font-body text-xs text-muted-foreground mt-1">
                {story.type} · {story.duration || "Text"} · {story.createdAt}
              </p>
            </div>
          ))}
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

export default ResidentDashboard;
