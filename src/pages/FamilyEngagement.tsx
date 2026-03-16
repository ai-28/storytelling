import { mockResidents, mockFamilyConnections, mockQuestions, mockStories } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Download, Users, MessageCircleQuestion, Video, TrendingUp } from "lucide-react";

const FamilyEngagement = () => {
  const residentEngagement = mockResidents.map(r => {
    const familyCount = mockFamilyConnections.filter(fc => fc.residentId === r.id).length;
    const questionsSubmitted = mockQuestions.filter(q => q.residentId === r.id).length;
    const questionsAnswered = mockQuestions.filter(q => q.residentId === r.id && q.status === "ANSWERED").length;
    const storiesCount = mockStories.filter(s => s.residentId === r.id).length;
    const storiesWatched = Math.floor(storiesCount * 0.8); // mock
    return { ...r, familyCount, questionsSubmitted, questionsAnswered, storiesCount, storiesWatched };
  });

  const totalFamilies = mockFamilyConnections.length;
  const totalQuestions = mockQuestions.length;
  const answeredQuestions = mockQuestions.filter(q => q.status === "ANSWERED").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Family Engagement</h1>
          <p className="font-body text-muted-foreground mt-1">Per-resident family activity and engagement metrics</p>
        </div>
        <Button variant="outline" className="font-body">
          <Download className="w-4 h-4 mr-2" /> Export CSV
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl bg-card border border-border p-5">
          <Users className="w-5 h-5 text-muted-foreground mb-2" />
          <p className="font-display text-2xl font-bold text-foreground">{totalFamilies}</p>
          <p className="font-body text-xs text-muted-foreground">Family Connections</p>
        </div>
        <div className="rounded-xl bg-card border border-border p-5">
          <MessageCircleQuestion className="w-5 h-5 text-secondary mb-2" />
          <p className="font-display text-2xl font-bold text-foreground">{totalQuestions}</p>
          <p className="font-body text-xs text-muted-foreground">Questions Submitted</p>
        </div>
        <div className="rounded-xl bg-card border border-border p-5">
          <Video className="w-5 h-5 text-muted-foreground mb-2" />
          <p className="font-display text-2xl font-bold text-foreground">{answeredQuestions}</p>
          <p className="font-body text-xs text-muted-foreground">Questions Answered</p>
        </div>
        <div className="rounded-xl bg-card border border-border p-5">
          <TrendingUp className="w-5 h-5 text-secondary mb-2" />
          <p className="font-display text-2xl font-bold text-foreground">
            {totalQuestions > 0 ? Math.round((answeredQuestions / totalQuestions) * 100) : 0}%
          </p>
          <p className="font-body text-xs text-muted-foreground">Answer Rate</p>
        </div>
      </div>

      <div className="rounded-2xl bg-card border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-5">Resident</th>
              <th className="text-left font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-5">Room</th>
              <th className="text-center font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-5">Family Connected</th>
              <th className="text-center font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-5">Qs Submitted</th>
              <th className="text-center font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-5">Qs Answered</th>
              <th className="text-center font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-5">Stories</th>
              <th className="text-center font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-5">Stories Watched</th>
            </tr>
          </thead>
          <tbody>
            {residentEngagement.map(r => (
              <tr key={r.id} className="border-b border-border/50 hover:bg-muted/20">
                <td className="py-3 px-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-body text-xs font-bold">
                      {r.name.charAt(0)}
                    </div>
                    <span className="font-body text-sm font-medium text-foreground">{r.name}</span>
                  </div>
                </td>
                <td className="py-3 px-5 font-body text-sm text-muted-foreground">{r.roomNumber}</td>
                <td className="py-3 px-5 text-center font-body text-sm font-medium text-foreground">{r.familyCount}</td>
                <td className="py-3 px-5 text-center font-body text-sm text-muted-foreground">{r.questionsSubmitted}</td>
                <td className="py-3 px-5 text-center">
                  <span className={`font-body text-sm font-medium ${r.questionsAnswered > 0 ? "text-green-700" : "text-muted-foreground"}`}>
                    {r.questionsAnswered}
                  </span>
                </td>
                <td className="py-3 px-5 text-center font-body text-sm text-muted-foreground">{r.storiesCount}</td>
                <td className="py-3 px-5 text-center font-body text-sm text-muted-foreground">{r.storiesWatched}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FamilyEngagement;
