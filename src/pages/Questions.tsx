import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { mockQuestions, mockResidents } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { MessageCircleQuestion, CheckCircle, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Questions = () => {
  const { user } = useAuth();
  const [tab, setTab] = useState<"pending" | "answered">("pending");

  let questions = mockQuestions;
  if (user?.role === "resident") {
    questions = questions.filter(q => q.residentId === "res-1");
  } else if (user?.role === "family") {
    questions = questions.filter(q => q.askedByUserId === "user-fam-1");
  }

  const filtered = questions.filter(q => q.status === (tab === "pending" ? "PENDING" : "ANSWERED"));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">
          {user?.role === "resident" ? "Question Queue" : user?.role === "family" ? "My Questions" : "Pending Questions"}
        </h1>
        <p className="font-body text-muted-foreground mt-1">
          {questions.filter(q => q.status === "PENDING").length} pending · {questions.filter(q => q.status === "ANSWERED").length} answered
        </p>
      </div>

      <div className="flex gap-2">
        <Button variant={tab === "pending" ? "hero" : "outline"} size="sm" onClick={() => setTab("pending")}>
          <Clock className="w-4 h-4 mr-1" /> Pending ({questions.filter(q => q.status === "PENDING").length})
        </Button>
        <Button variant={tab === "answered" ? "hero" : "outline"} size="sm" onClick={() => setTab("answered")}>
          <CheckCircle className="w-4 h-4 mr-1" /> Answered ({questions.filter(q => q.status === "ANSWERED").length})
        </Button>
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <MessageCircleQuestion className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="font-body text-muted-foreground">No {tab} questions</p>
          </div>
        ) : (
          filtered.map(q => {
            const resident = mockResidents.find(r => r.id === q.residentId);
            return (
              <div key={q.id} className="rounded-xl bg-card border border-border p-5 hover:shadow-sm transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-body text-sm font-bold flex-shrink-0">
                    {q.askedByName.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-base font-medium text-foreground">{q.questionText}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <p className="font-body text-xs text-muted-foreground">
                        From <span className="font-medium">{q.askedByName}</span> ({q.askedByRelationship})
                      </p>
                      {resident && (
                        <p className="font-body text-xs text-muted-foreground">
                          To <span className="font-medium">{resident.name}</span>
                        </p>
                      )}
                      <p className="font-body text-xs text-muted-foreground">{q.createdAt}</p>
                    </div>
                  </div>
                  {q.status === "PENDING" && (user?.role === "resident" || user?.role === "staff") && (
                    <Link to="/record">
                      <Button variant="hero" size="sm">Record Answer</Button>
                    </Link>
                  )}
                  {q.status === "ANSWERED" && (
                    <Button variant="outline" size="sm">Watch</Button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Questions;
