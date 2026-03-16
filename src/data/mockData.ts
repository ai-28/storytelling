// Mock data for the Observe Life platform

export type UserRole = "resident" | "family" | "staff" | "facility_admin" | "platform_admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  orgId?: string;
}

export interface Organization {
  id: string;
  name: string;
  type: "SNF" | "AL" | "HOSPICE";
  address: string;
  residentsCount: number;
  billingStatus: "active" | "past_due" | "cancelled";
  contractStart: string;
}

export interface Resident {
  id: string;
  name: string;
  roomNumber: string;
  dateOfBirth: string;
  orgId: string;
  consentStatus: "pending" | "self" | "representative";
  storiesCount: number;
  lastStoryDate: string | null;
  pendingQuestions: number;
  familyConnections: number;
  profilePhoto?: string;
}

export interface Story {
  id: string;
  residentId: string;
  title: string;
  type: "video" | "audio" | "text";
  createdAt: string;
  duration?: string;
  questionId?: string;
  visibility: "private" | "family" | "selected";
  content?: string;
  thumbnailUrl?: string;
}

export interface Question {
  id: string;
  residentId: string;
  askedByUserId: string;
  askedByName: string;
  askedByRelationship: string;
  questionText: string;
  status: "PENDING" | "ANSWERED";
  answeredStoryId?: string;
  createdAt: string;
}

export interface FamilyConnection {
  id: string;
  residentId: string;
  userId: string;
  userName: string;
  userEmail: string;
  relationship: string;
  inviteStatus: "pending" | "accepted" | "declined";
  connectedAt: string | null;
}

export interface ConsentRecord {
  id: string;
  residentId: string;
  consentedByUserId: string;
  consentType: "SELF" | "REPRESENTATIVE";
  representativeName?: string;
  representativeRelationship?: string;
  consentDate: string;
  formVersion: string;
  revokedAt: string | null;
}

export interface Prompt {
  id: string;
  text: string;
  category: "OT" | "SLP" | "RT" | "HOSPICE" | "GENERAL" | "CHILDHOOD" | "FAMILY" | "WISDOM" | "LEGACY" | "WORK" | "HISTORY" | "GRATITUDE" | "FAITH";
  source: "SYSTEM" | "FAMILY" | "STAFF";
}

export interface StaffMember {
  id: string;
  orgId: string;
  userId: string;
  name: string;
  email: string;
  role: "FACILITATOR" | "ADMIN" | "THERAPIST";
  department: string;
  active: boolean;
  lastLogin: string;
}

// ─── Mock Data ───

export const mockOrg: Organization = {
  id: "org-1",
  name: "Sunrise Senior Living — Mountain View",
  type: "SNF",
  address: "1234 El Camino Real, Mountain View, CA 94040",
  residentsCount: 47,
  billingStatus: "active",
  contractStart: "2025-01-15",
};

export const mockCurrentUser: User = {
  id: "user-staff-1",
  name: "Maria Santos",
  email: "maria@sunrisesenior.com",
  role: "staff",
  orgId: "org-1",
};

export const mockResidents: Resident[] = [
  { id: "res-1", name: "Eleanor Thompson", roomNumber: "204A", dateOfBirth: "1938-04-12", orgId: "org-1", consentStatus: "self", storiesCount: 14, lastStoryDate: "2025-03-10", pendingQuestions: 3, familyConnections: 5 },
  { id: "res-2", name: "Robert Chen", roomNumber: "112B", dateOfBirth: "1942-09-22", orgId: "org-1", consentStatus: "representative", storiesCount: 7, lastStoryDate: "2025-02-28", pendingQuestions: 1, familyConnections: 3 },
  { id: "res-3", name: "Dorothy Williams", roomNumber: "318C", dateOfBirth: "1935-11-05", orgId: "org-1", consentStatus: "self", storiesCount: 22, lastStoryDate: "2025-03-14", pendingQuestions: 0, familyConnections: 8 },
  { id: "res-4", name: "James Martinez", roomNumber: "205A", dateOfBirth: "1940-01-30", orgId: "org-1", consentStatus: "pending", storiesCount: 0, lastStoryDate: null, pendingQuestions: 2, familyConnections: 0 },
  { id: "res-5", name: "Margaret O'Brien", roomNumber: "110A", dateOfBirth: "1937-07-18", orgId: "org-1", consentStatus: "self", storiesCount: 9, lastStoryDate: "2025-01-15", pendingQuestions: 5, familyConnections: 4 },
  { id: "res-6", name: "William Jackson", roomNumber: "302B", dateOfBirth: "1943-03-25", orgId: "org-1", consentStatus: "self", storiesCount: 3, lastStoryDate: "2025-03-12", pendingQuestions: 0, familyConnections: 2 },
];

export const mockStories: Story[] = [
  { id: "story-1", residentId: "res-1", title: "My First Day of School", type: "video", createdAt: "2025-03-10", duration: "4:32", visibility: "family" },
  { id: "story-2", residentId: "res-1", title: "Meeting Your Grandfather", type: "video", createdAt: "2025-03-05", duration: "6:15", visibility: "family", questionId: "q-1" },
  { id: "story-3", residentId: "res-1", title: "The Farm Where I Grew Up", type: "audio", createdAt: "2025-02-28", duration: "8:44", visibility: "family" },
  { id: "story-4", residentId: "res-3", title: "Life During the War", type: "video", createdAt: "2025-03-14", duration: "12:03", visibility: "family" },
  { id: "story-5", residentId: "res-3", title: "My Recipe for Apple Pie", type: "text", createdAt: "2025-03-12", visibility: "selected", content: "The secret is always cold butter..." },
  { id: "story-6", residentId: "res-2", title: "Coming to America", type: "video", createdAt: "2025-02-28", duration: "9:22", visibility: "family" },
];

export const mockQuestions: Question[] = [
  { id: "q-1", residentId: "res-1", askedByUserId: "user-fam-1", askedByName: "Sarah Thompson", askedByRelationship: "Granddaughter", questionText: "How did you and grandpa meet? I've always wanted to hear the full story.", status: "ANSWERED", answeredStoryId: "story-2", createdAt: "2025-03-01" },
  { id: "q-2", residentId: "res-1", askedByUserId: "user-fam-2", askedByName: "Michael Thompson", askedByRelationship: "Son", questionText: "What was your favorite holiday tradition growing up?", status: "PENDING", createdAt: "2025-03-08" },
  { id: "q-3", residentId: "res-1", askedByUserId: "user-fam-1", askedByName: "Sarah Thompson", askedByRelationship: "Granddaughter", questionText: "What's the best advice you've ever received?", status: "PENDING", createdAt: "2025-03-12" },
  { id: "q-4", residentId: "res-1", askedByUserId: "user-fam-3", askedByName: "Lisa Chen", askedByRelationship: "Daughter-in-law", questionText: "Can you tell us about your first job?", status: "PENDING", createdAt: "2025-03-13" },
  { id: "q-5", residentId: "res-2", askedByUserId: "user-fam-4", askedByName: "David Chen", askedByRelationship: "Son", questionText: "What was it like growing up in Taipei?", status: "PENDING", createdAt: "2025-03-10" },
  { id: "q-6", residentId: "res-5", askedByUserId: "user-fam-5", askedByName: "Katie O'Brien", askedByRelationship: "Granddaughter", questionText: "What was your wedding day like?", status: "PENDING", createdAt: "2025-03-05" },
];

export const mockFamilyConnections: FamilyConnection[] = [
  { id: "fc-1", residentId: "res-1", userId: "user-fam-1", userName: "Sarah Thompson", userEmail: "sarah@email.com", relationship: "Granddaughter", inviteStatus: "accepted", connectedAt: "2025-01-20" },
  { id: "fc-2", residentId: "res-1", userId: "user-fam-2", userName: "Michael Thompson", userEmail: "michael@email.com", relationship: "Son", inviteStatus: "accepted", connectedAt: "2025-01-18" },
  { id: "fc-3", residentId: "res-1", userId: "user-fam-3", userName: "Lisa Chen", userEmail: "lisa@email.com", relationship: "Daughter-in-law", inviteStatus: "accepted", connectedAt: "2025-02-05" },
  { id: "fc-4", residentId: "res-1", userId: "user-fam-6", userName: "Tom Thompson", userEmail: "tom@email.com", relationship: "Grandson", inviteStatus: "pending", connectedAt: null },
  { id: "fc-5", residentId: "res-2", userId: "user-fam-4", userName: "David Chen", userEmail: "david@email.com", relationship: "Son", inviteStatus: "accepted", connectedAt: "2025-01-22" },
];

export const mockPrompts: Prompt[] = [
  { id: "p-1", text: "Where did you grow up? What was your home like?", category: "CHILDHOOD", source: "SYSTEM" },
  { id: "p-2", text: "What was your favorite thing to do as a child?", category: "CHILDHOOD", source: "SYSTEM" },
  { id: "p-3", text: "How did you meet your spouse?", category: "FAMILY", source: "SYSTEM" },
  { id: "p-4", text: "What do you want us to know about our family history?", category: "FAMILY", source: "SYSTEM" },
  { id: "p-5", text: "What was the hardest job you ever had?", category: "WORK", source: "SYSTEM" },
  { id: "p-6", text: "What are you most proud of?", category: "WORK", source: "SYSTEM" },
  { id: "p-7", text: "What is the best advice you ever received?", category: "WISDOM", source: "SYSTEM" },
  { id: "p-8", text: "What would you tell your younger self?", category: "WISDOM", source: "SYSTEM" },
  { id: "p-9", text: "What do you want your grandchildren to know?", category: "LEGACY", source: "SYSTEM" },
  { id: "p-10", text: "What do you hope your legacy will be?", category: "LEGACY", source: "SYSTEM" },
  { id: "p-11", text: "What was it like living through a major historical event?", category: "HISTORY", source: "SYSTEM" },
  { id: "p-12", text: "How did the world change in your lifetime?", category: "HISTORY", source: "SYSTEM" },
  // Therapeutic
  { id: "p-13", text: "Can you describe your morning routine when you were young?", category: "OT", source: "SYSTEM" },
  { id: "p-14", text: "Tell me about a meal you loved to cook.", category: "OT", source: "SYSTEM" },
  { id: "p-15", text: "Describe a place that felt like home.", category: "SLP", source: "SYSTEM" },
  { id: "p-16", text: "Tell me about a song that means something to you.", category: "RT", source: "SYSTEM" },
  // Hospice
  { id: "p-17", text: "What are you most grateful for in your life?", category: "GRATITUDE", source: "SYSTEM" },
  { id: "p-18", text: "Who do you most want to thank?", category: "GRATITUDE", source: "SYSTEM" },
  { id: "p-19", text: "What do you want your family to know about how much they meant to you?", category: "HOSPICE", source: "SYSTEM" },
  { id: "p-20", text: "What have you learned about life that you want to pass on?", category: "HOSPICE", source: "SYSTEM" },
  { id: "p-21", text: "What do you believe in? What has given your life meaning?", category: "FAITH", source: "SYSTEM" },
  { id: "p-22", text: "What do you hope people will remember about you?", category: "HOSPICE", source: "SYSTEM" },
];

export const mockStaffMembers: StaffMember[] = [
  { id: "sm-1", orgId: "org-1", userId: "user-staff-1", name: "Maria Santos", email: "maria@sunrisesenior.com", role: "FACILITATOR", department: "Activities", active: true, lastLogin: "2025-03-14" },
  { id: "sm-2", orgId: "org-1", userId: "user-staff-2", name: "Dr. James Park", email: "jpark@sunrisesenior.com", role: "THERAPIST", department: "OT/PT", active: true, lastLogin: "2025-03-13" },
  { id: "sm-3", orgId: "org-1", userId: "user-staff-3", name: "Angela Rivera", email: "arivera@sunrisesenior.com", role: "ADMIN", department: "Administration", active: true, lastLogin: "2025-03-14" },
  { id: "sm-4", orgId: "org-1", userId: "user-staff-4", name: "Tom Williams", email: "twill@sunrisesenior.com", role: "FACILITATOR", department: "Activities", active: true, lastLogin: "2025-03-10" },
  { id: "sm-5", orgId: "org-1", userId: "user-staff-5", name: "Karen Liu", email: "kliu@sunrisesenior.com", role: "FACILITATOR", department: "Social Services", active: false, lastLogin: "2025-02-15" },
];

export const mockConsentRecords: ConsentRecord[] = [
  { id: "cr-1", residentId: "res-1", consentedByUserId: "user-staff-1", consentType: "SELF", consentDate: "2025-01-15", formVersion: "1.0", revokedAt: null },
  { id: "cr-2", residentId: "res-2", consentedByUserId: "user-staff-1", consentType: "REPRESENTATIVE", representativeName: "David Chen", representativeRelationship: "Son", consentDate: "2025-01-20", formVersion: "1.0", revokedAt: null },
  { id: "cr-3", residentId: "res-3", consentedByUserId: "user-staff-3", consentType: "SELF", consentDate: "2025-01-22", formVersion: "1.0", revokedAt: null },
];

// Analytics mock data
export const mockAnalytics = {
  totalResidents: 47,
  totalStories: 312,
  totalFamilyAccounts: 186,
  questionsAskedThisMonth: 89,
  questionsAnsweredThisMonth: 67,
  engagementRate: 78,
  storiesThisMonth: 43,
  monthlyTrend: [
    { month: "Oct", stories: 22, questions: 31 },
    { month: "Nov", stories: 28, questions: 45 },
    { month: "Dec", stories: 19, questions: 38 },
    { month: "Jan", stories: 35, questions: 52 },
    { month: "Feb", stories: 38, questions: 71 },
    { month: "Mar", stories: 43, questions: 89 },
  ],
};
