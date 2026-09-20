export interface ArticleSource {
  id: string;
  name: string;
  trust_score: number;
  bias: string;
  country: string;
  url?: string;
  is_verified?: boolean;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  content?: string;
  link: string;
  source: ArticleSource;
  published_at: string;
  category: string;
  region: string;
  image_url?: string;
  reading_time: number;
  is_breaking: boolean;
  is_featured: boolean;
  impact_level: 'Critical' | 'High' | 'Moderate' | 'Standard';
  sentiment_score: number;
  sentiment_label: 'Positive' | 'Neutral' | 'Negative';
  fact_check_score: number;
  tags: string[];
}

export interface NewsResponse {
  articles: Article[];
  total: number;
  page: number;
  limit: number;
  has_more: boolean;
}

export interface CategoryInfo {
  slug: string;
  name: string;
  icon: string;
  color: string;
  article_count: number;
}

export interface SourceInfo {
  id: string;
  name: string;
  category: string;
  region: string;
  trust_score: number;
  bias: string;
  country: string;
  homepage: string;
  status: string;
  latency_ms: number;
  article_count: number;
}

export interface RegionInfo {
  code: string;
  name: string;
  flag: string;
  description: string;
  sentiment_summary: string;
  article_count: number;
  top_articles: Article[];
}

export interface AISummary {
  article_id?: string;
  three_key_bullets: string[];
  executive_takeaway: string;
  deep_context?: string;
  reading_time_seconds: number;
  generated_by: string;
}

export interface ClaimVerification {
  claim: string;
  verdict: string;
  confidence: number;
  corroborating_sources: string[];
  notes: string;
}

export interface FactCheckReport {
  article_id?: string;
  overall_truth_score: number;
  credibility_rating: string;
  claims: ClaimVerification[];
  primary_sources_cited: string[];
  unverified_elements_count: number;
}

export interface PerspectiveItem {
  source_name: string;
  source_bias: string;
  framing_angle: string;
  key_emphasis: string;
  quote_highlight?: string;
}

export interface PerspectiveComparison {
  topic: string;
  consensus_facts: string[];
  divergent_points: string[];
  perspectives: PerspectiveItem[];
}

export interface BlindspotData {
  topic: string;
  heavily_covered_by: string[];
  underreported_by: string[];
  missing_context: string;
  recommendation: string;
}

export interface TimelineMilestone {
  date: string;
  time?: string;
  title: string;
  summary: string;
  source_name: string;
  importance: string;
}

export interface StoryTimeline {
  story_title: string;
  timeframe: string;
  milestones: TimelineMilestone[];
}

export interface AudioChapter {
  id: string;
  timestamp_seconds: number;
  timestamp_display: string;
  title: string;
  category: string;
  anchor_name: string;
  script_segment: string;
}

export interface PodcastScript {
  id: string;
  title: string;
  date: string;
  duration_estimated_minutes: number;
  host_intro: string;
  chapters: AudioChapter[];
  host_outro: string;
  full_audio_script: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  is_guest: boolean;
  preferred_categories: string[];
  saved_articles_count: number;
  reading_streak_days: number;
  created_at: string;
}

export interface DailyBriefing {
  title: string;
  date: string;
  audio_ready: boolean;
  top_developments: {
    id: string;
    title: string;
    category: string;
    source: string;
    takeaway: string;
    impact: string;
  }[];
  global_mood: string;
  executive_quote: string;
}
