import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { mockResidents, mockStories, mockQuestions, mockFamilyConnections, mockConsentRecords } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Video, Mic, FileText, MessageCircleQuestion, Users, ShieldCheck, Clock, CheckCircle, ArrowLeft, UserPlus, Lock, Eye } from "lucide-react";

const ResidentProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [tab, setTab] = useState<"stories" | "questions" | "family" | "consent">("stories");

  const resident = mockResidents.find(r => r.id === id) || mockResidents[0];
  const stories = mockStories.filter(s => s.residentId === resident.id);
  const questions = mockQuestions.filter(q => q.residentId === resident.id);
  const connections = mockFamilyConnections.filter(fc => fc.residentId === resident.id);
  const consentRecords = mockConsentRecords.filter(cr => cr.residentId === resident.id);

  const typeIcon = (type: string) => {
    if (type === "video") return <Video className="w-4 h-4" />;
    if (type === "audio") return <Mic className="w-4 h-4" />;
    return <FileText className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <Link to="/residents">
          <Button variant="ghost" size="icon" className="mt-1"><ArrowLeft className="w-5 h-5" /></Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-display text-2xl font-bold">
              {resident.name.charAt(0)}
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">{resident.name}</h1>
              <p className="font-body text-muted-foreground">Room {resident.roomNumber} · DOB: {resident.dateOfBirth}</p>
            </div>
            <span className={`ml-auto text-xs font-body font-semibold px-3 py-1 rounded-full ${
              resident.consentStatus === "self" ? "bg-green-100 text-green-700" :
              resident.consentStatus === "representative" ? "bg-blue-100 text-blue-700" :
              "bg-amber-100 text-amber-700"
            }`}>
              Consent: {resident.consentStatus}
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-xl bg-card border border-border p-4 text-center">
          <p className="font-display text-2xl font-bold text-foreground">{resident.storiesCount}</p>
          <p className="font-body text-xs text-muted-foreground">Stories</p>
        </div>
        <div className="rounded-xl bg-card border border-border p-4 text-center">
          <p className="font-display text-2xl font-bold text-foreground">{resident.pendingQuestions}</p>
          <p className="font-body text-xs text-muted-foreground">Pending Questions</p>
        </div>
        <div className="rounded-xl bg-card border border-border p-4 text-center">
          <p className="font-display text-2xl font-bold text-foreground">{resident.familyConnections}</p>
          <p className="font-body text-xs text-muted-foreground">Family Connected</p>
        </div>
        <div className="rounded-xl bg-card border border-border p-4 text-center">
          <p className="font-body text-sm text-muted-foreground">Last Story</p>
          <p className="font-body text-sm font-semibold text-foreground">{resident.lastStoryDate || "Never"}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-3">
        <Link to="/record"><Button variant="hero">Record Story</Button></Link>
        <Link to="/admissions"><Button variant="outline"><UserPlus className="w-4 h-4 mr-2" /> Invite Family</Button></Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border pb-0">
        {([
          { key: "stories" as const, label: "Stories", icon: Video, count: stories.length },
          { key: "questions" as const, label: "Questions", icon: MessageCircleQuestion, count: questions.length },
          { key: "family" as const, label: "Family", icon: Users, count: connections.length },
          { key: "consent" as const, label: "Consent", icon: ShieldCheck, count: consentRecords.length },
        ]).map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex items-center gap-2 px-4 py-3 font-body text-sm font-medium border-b-2 -mb-px transition-colors ${
              tab === t.key
                ? "border-secondary text-secondary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <t.icon className="w-4 h-4" /> {t.label} ({t.count})
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {tab === "stories" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stories.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <Video className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="font-body text-muted-foreground">No stories recorded yet</p>
              <Link to="/record"><Button variant="hero" className="mt-3">Record First Story</Button></Link>
            </div>
          ) : stories.map(story => (
            <div key={story.id} className="rounded-xl bg-card border border-border p-4 hover:shadow-sm transition-shadow">
              <div className="aspect-video bg-muted rounded-lg mb-3 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-primary/80 flex items-center justify-center text-primary-foreground">
                  {typeIcon(story.type)}
                </div>
              </div>
              <h3 className="font-body text-sm font-semibold text-foreground">{story.title}</h3>
              {story.questionId && (
                <p className="font-body text-xs text-secondary mt-1 italic">
                  In response to: "{questions.find(q => q.id === story.questionId)?.questionText}"
                </p>
              )}
              <div className="flex items-center gap-2 mt-2">
                <span className="font-body text-xs text-muted-foreground">{story.type} · {story.duration || "Text"} · {story.createdAt}</span>
              </div>
              <div className="flex items-center gap-1 mt-2">
                {story.visibility === "private" ? <Lock className="w-3 h-3 text-muted-foreground" /> : <Eye className="w-3 h-3 text-muted-foreground" />}
                <span className="font-body text-xs text-muted-foreground capitalize">{story.visibility}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "questions" && (
        <div className="space-y-3">
          {questions.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircleQuestion className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="font-body text-muted-foreground">No questions yet</p>
            </div>
          ) : questions.map(q => (
            <div key={q.id} className="rounded-xl bg-card border border-border p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-body text-sm font-bold flex-shrink-0">
                  {q.askedByName.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="font-body text-sm font-medium text-foreground">{q.questionText}</p>
                  <p className="font-body text-xs text-muted-foreground mt-1">
                    From {q.askedByName} ({q.askedByRelationship}) · {q.createdAt}
                  </p>
                </div>
                <span className={`flex items-center gap-1 font-body text-xs font-semibold px-2 py-1 rounded-full ${
                  q.status === "ANSWERED" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                }`}>
                  {q.status === "ANSWERED" ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                  {q.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "family" && (
        <div className="space-y-3">
          {connections.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="font-body text-muted-foreground">No family members connected yet</p>
              <Button variant="hero" className="mt-3"><UserPlus className="w-4 h-4 mr-2" /> Invite Family</Button>
            </div>
          ) : connections.map(fc => (
            <div key={fc.id} className="rounded-xl bg-card border border-border p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-body text-sm font-bold">
                  {fc.userName.charAt(0)}
                </div>
                <div>
                  <p className="font-body text-sm font-medium text-foreground">{fc.userName}</p>
                  <p className="font-body text-xs text-muted-foreground">{fc.relationship} · {fc.userEmail}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`font-body text-xs font-semibold px-2 py-1 rounded-full ${
                  fc.inviteStatus === "accepted" ? "bg-green-100 text-green-700" :
                  fc.inviteStatus === "pending" ? "bg-amber-100 text-amber-700" :
                  "bg-red-100 text-red-700"
                }`}>
                  {fc.inviteStatus}
                </span>
                {fc.inviteStatus === "pending" && (
                  <Button variant="outline" size="sm" className="font-body">Resend</Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "consent" && (
        <div className="space-y-4">
          {consentRecords.length === 0 ? (
            <div className="text-center py-12">
              <ShieldCheck className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="font-body text-muted-foreground">No consent records found</p>
              <Button variant="hero" className="mt-3">Capture Consent</Button>
            </div>
          ) : consentRecords.map(cr => (
            <div key={cr.id} className="rounded-xl bg-card border border-border p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-body text-sm font-semibold text-foreground">
                  {cr.consentType === "SELF" ? "Self-Consent" : "Representative Consent"}
                </h3>
                <span className={`font-body text-xs font-semibold px-2 py-1 rounded-full ${
                  cr.revokedAt ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                }`}>
                  {cr.revokedAt ? "Revoked" : "Active"}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 font-body text-sm">
                <div>
                  <p className="text-muted-foreground">Consent Date</p>
                  <p className="font-medium text-foreground">{cr.consentDate}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Form Version</p>
                  <p className="font-medium text-foreground">{cr.formVersion}</p>
                </div>
                {cr.representativeName && (
                  <>
                    <div>
                      <p className="text-muted-foreground">Representative</p>
                      <p className="font-medium text-foreground">{cr.representativeName}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Relationship</p>
                      <p className="font-medium text-foreground">{cr.representativeRelationship}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
          <Button variant="outline"><ShieldCheck className="w-4 h-4 mr-2" /> Add Consent Record</Button>
        </div>
      )}
    </div>
  );
};

export default ResidentProfile;
