export type Category = "home" | "school" | "friends" | "myself" | "wish";
export type Audience = "teacher" | "npo" | "any";
export type Grade = "low" | "mid" | "junior" | "high" | "unknown";
export type Urgency = "urgent" | "watch" | "normal";
export type Status = "new" | "seen" | "working" | "done";

export type Tag =
  | "self-harm"
  | "abuse"
  | "bullying"
  | "school-refusal"
  | "isolation"
  | "family-hardship"
  | "teacher"
  | "wish"
  | "spam";

export type Post = {
  id: string;
  body: string;
  category: Category;
  audience: Audience;
  grade: Grade;
  schoolCode: string; // 任意。空文字可
  createdAt: string; // ISO
  updatedAt?: string;
  tags: Tag[];
  urgency: Urgency;
  status: Status;
  note: string; // 大人の内部メモ
};
