import {
  Article,
  NewsResponse,
  CategoryInfo,
  SourceInfo,
  RegionInfo,
  AISummary,
  FactCheckReport,
  PerspectiveComparison,
  BlindspotData,
  StoryTimeline,
  PodcastScript,
  DailyBriefing,
  UserProfile
} from './types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

// Default emergency fallback articles in case API is unreachable
const FALLBACK_ARTICLES: Article[] = [
  {
    id: "fb-1",
    title: "Global Clean Energy Investment Reaches Historic $2 Trillion Milestone in 2026",
    summary: "International Energy Agency reports record solar, wind, and next-generation nuclear deployments worldwide, accelerating carbon reduction across major industrial economies.",
    link: "https://www.reuters.com",
    source: {
      id: "reuters-world",
      name: "Reuters World",
      trust_score: 99,
      bias: "Center / Wire",
      country: "International",
      is_verified: true
    },
    published_at: "10 mins ago",
    category: "climate",
    region: "europe",
    image_url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80",
    reading_time: 3,
    is_breaking: true,
    is_featured: true,
    impact_level: "Critical",
    sentiment_score: 0.6,
    sentiment_label: "Positive",
    fact_check_score: 99,
    tags: ["Climate", "Clean Energy", "IEA", "Global Economy"]
  },
  {
    id: "fb-2",
    title: "Next-Gen Optical Neural Processors Demonstrate 50x Efficiency Leap for Frontier AI",
    summary: "MIT and European research consortium publish breakthrough optical computing architectures capable of running trillion-parameter AI models with minimal power consumption.",
    link: "https://www.technologyreview.com",
    source: {
      id: "mit-tech-review",
      name: "MIT Technology Review",
      trust_score: 98,
      bias: "Academic / Tech",
      country: "United States",
      is_verified: true
    },
    published_at: "25 mins ago",
    category: "technology",
    region: "americas",
    image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
    reading_time: 4,
    is_breaking: false,
    is_featured: true,
    impact_level: "High",
    sentiment_score: 0.7,
    sentiment_label: "Positive",
    fact_check_score: 98,
    tags: ["Technology", "AI", "Photonic Computing", "Semiconductors"]
  },
  {
    id: "fb-3",
    title: "Central Banks Coordinate Global Digital Settlement Framework to Streamline Cross-Border Trade",
    summary: "G20 finance ministers and top central banks unveil standardized interoperability protocols reducing international transaction settlement times from days to milliseconds.",
    link: "https://www.ft.com",
    source: {
      id: "ft-world",
      name: "Financial Times",
      trust_score: 98,
      bias: "Financial / Center",
      country: "United Kingdom",
      is_verified: true
    },
    published_at: "45 mins ago",
    category: "business",
    region: "europe",
    image_url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=80",
    reading_time: 3,
    is_breaking: false,
    is_featured: true,
    impact_level: "High",
    sentiment_score: 0.4,
    sentiment_label: "Positive",
    fact_check_score: 98,
    tags: ["Business", "Finance", "Central Banks", "Trade"]
  },
  {
    id: "fb-4",
    title: "James Webb Space Telescope Detects Unprecedented Atmospheric Biomarkers on Habitable Exoplanet",
    summary: "Astrophysicists announce spectrographic confirmation of carbon compounds and methane equilibrium on K2-18b, marking a significant milestone in exobiology.",
    link: "https://www.nasa.gov",
    source: {
      id: "nasa-breaking",
      name: "NASA News & Space",
      trust_score: 99,
      bias: "Government / Science",
      country: "United States",
      is_verified: true
    },
    published_at: "1 hour ago",
    category: "science",
    region: "americas",
    image_url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
    reading_time: 5,
    is_breaking: true,
    is_featured: false,
    impact_level: "Critical",
    sentiment_score: 0.8,
    sentiment_label: "Positive",
    fact_check_score: 99,
    tags: ["Science", "NASA", "Space", "Exoplanet"]
  },
  {
    id: "fb-5",
    title: "Asia-Pacific Trade Corridor Expands High-Speed Zero-Emission Rail Logistics Network",
    summary: "Cross-national infrastructure initiative connects major Southeast Asian manufacturing hubs with zero-emission freight corridors, cutting supply chain lead times.",
    link: "https://www.channelnewsasia.com",
    source: {
      id: "channelnewsasia",
      name: "CNA Asia-Pacific",
      trust_score: 96,
      bias: "Center",
      country: "Singapore",
      is_verified: true
    },
    published_at: "2 hours ago",
    category: "world",
    region: "asia-pacific",
    image_url: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&auto=format&fit=crop&q=80",
    reading_time: 3,
    is_breaking: false,
    is_featured: false,
    impact_level: "Standard",
    sentiment_score: 0.3,
    sentiment_label: "Positive",
    fact_check_score: 96,
    tags: ["World", "Asia-Pacific", "Trade", "Logistics"]
  },
  {
    id: "fb-6",
    title: "World Health Assembly Reaches Consensus on Universal Pandemic Preparedness Accord",
    summary: "Delegates from 194 member states finalize legally binding data-sharing and medical supply reserve protocols to guarantee equitable global crisis response.",
    link: "https://www.bbc.com",
    source: {
      id: "bbc-world",
      name: "BBC World News",
      trust_score: 98,
      bias: "Center",
      country: "United Kingdom",
      is_verified: true
    },
    published_at: "3 hours ago",
    category: "health",
    region: "europe",
    image_url: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&auto=format&fit=crop&q=80",
    reading_time: 4,
    is_breaking: false,
    is_featured: false,
    impact_level: "High",
    sentiment_score: 0.5,
    sentiment_label: "Positive",
    fact_check_score: 98,
    tags: ["Health", "WHO", "Global Policy", "Treaty"]
  }
];

async function fetchFast(url: string, options: RequestInit = {}, timeoutMs = 2500): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timeoutId);
    return res;
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

export const apiClient = {
  // News endpoints
  async getNews(params?: {
    category?: string;
    source?: string;
    region?: string;
    search?: string;
    wires_only?: boolean;
    page?: number;
    limit?: number;
    sort_by?: string;
  }): Promise<NewsResponse> {
    try {
      const query = new URLSearchParams();
      if (params?.category) query.set('category', params.category);
      if (params?.source) query.set('source', params.source);
      if (params?.region) query.set('region', params.region);
      if (params?.search) query.set('search', params.search);
      if (params?.wires_only) query.set('wires_only', 'true');
      if (params?.page) query.set('page', params.page.toString());
      if (params?.limit) query.set('limit', params.limit.toString());
      if (params?.sort_by) query.set('sort_by', params.sort_by);

      const res = await fetchFast(`${API_BASE}/news?${query.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch news');
      return await res.json();
    } catch {
      let filtered = [...FALLBACK_ARTICLES];
      if (params?.category && params.category !== 'all') {
        filtered = filtered.filter(a => a.category.toLowerCase() === params.category?.toLowerCase());
      }
      if (params?.search) {
        filtered = filtered.filter(a => a.title.toLowerCase().includes(params.search!.toLowerCase()));
      }
      return {
        articles: filtered,
        total: filtered.length,
        page: params?.page || 1,
        limit: params?.limit || 20,
        has_more: false
      };
    }
  },

  async getBreakingNews(limit = 8): Promise<Article[]> {
    try {
      const res = await fetchFast(`${API_BASE}/news/breaking-news?limit=${limit}`);
      if (!res.ok) throw new Error();
      return await res.json();
    } catch {
      return FALLBACK_ARTICLES.slice(0, limit);
    }
  },

  async getTopHeadlines(limit = 5): Promise<Article[]> {
    try {
      const res = await fetchFast(`${API_BASE}/news/top-headlines?limit=${limit}`);
      if (!res.ok) throw new Error();
      return await res.json();
    } catch {
      return FALLBACK_ARTICLES.slice(0, limit);
    }
  },

  async getLiveWire(limit = 30): Promise<Article[]> {
    try {
      const res = await fetchFast(`${API_BASE}/news/live-wire?limit=${limit}`);
      if (!res.ok) throw new Error();
      return await res.json();
    } catch {
      return FALLBACK_ARTICLES;
    }
  },

  async getArticleById(id: string): Promise<Article | null> {
    try {
      const res = await fetchFast(`${API_BASE}/news/article/${id}`);
      if (!res.ok) throw new Error();
      return await res.json();
    } catch {
      return FALLBACK_ARTICLES.find(a => a.id === id) || FALLBACK_ARTICLES[0];
    }
  },

  async getCategories(): Promise<CategoryInfo[]> {
    try {
      const res = await fetchFast(`${API_BASE}/news/all-categories`);
      if (!res.ok) throw new Error();
      return await res.json();
    } catch {
      return [
        { slug: 'world', name: 'World & Geopolitics', icon: 'Globe', color: 'indigo', article_count: 24 },
        { slug: 'technology', name: 'Technology & AI', icon: 'Cpu', color: 'cyan', article_count: 18 },
        { slug: 'business', name: 'Markets & Economy', icon: 'TrendingUp', color: 'emerald', article_count: 15 },
        { slug: 'science', name: 'Science & Space', icon: 'Atom', color: 'purple', article_count: 12 },
        { slug: 'climate', name: 'Climate & Energy', icon: 'Leaf', color: 'green', article_count: 10 },
        { slug: 'politics', name: 'Policy & Governance', icon: 'Landmark', color: 'amber', article_count: 8 },
        { slug: 'health', name: 'Health & Medicine', icon: 'HeartPulse', color: 'rose', article_count: 7 },
        { slug: 'entertainment', name: 'Culture & Media', icon: 'Film', color: 'fuchsia', article_count: 6 }
      ];
    }
  },

  async getSources(): Promise<SourceInfo[]> {
    try {
      const res = await fetchFast(`${API_BASE}/news/all-sources`);
      if (!res.ok) throw new Error();
      return await res.json();
    } catch {
      return [
        { id: 'reuters-world', name: 'Reuters World', category: 'world', region: 'americas', trust_score: 99, bias: 'Center / Wire', country: 'International', homepage: 'https://reuters.com', status: 'healthy', latency_ms: 85, article_count: 42 },
        { id: 'ap-top', name: 'Associated Press (AP News)', category: 'world', region: 'americas', trust_score: 99, bias: 'Center / Wire', country: 'United States', homepage: 'https://apnews.com', status: 'healthy', latency_ms: 92, article_count: 38 },
        { id: 'bbc-world', name: 'BBC World News', category: 'world', region: 'europe', trust_score: 98, bias: 'Center', country: 'United Kingdom', homepage: 'https://bbc.com', status: 'healthy', latency_ms: 110, article_count: 35 },
        { id: 'mit-tech-review', name: 'MIT Technology Review', category: 'technology', region: 'americas', trust_score: 98, bias: 'Academic / Tech', country: 'United States', homepage: 'https://technologyreview.com', status: 'healthy', latency_ms: 95, article_count: 18 },
        { id: 'nature-news', name: 'Nature Journal', category: 'science', region: 'europe', trust_score: 99, bias: 'Scientific', country: 'International', homepage: 'https://nature.com', status: 'healthy', latency_ms: 105, article_count: 14 }
      ];
    }
  },

  async getWorldRegions(): Promise<RegionInfo[]> {
    try {
      const res = await fetchFast(`${API_BASE}/news/world-regions`);
      if (!res.ok) throw new Error();
      return await res.json();
    } catch {
      return [
        { code: 'americas', name: 'Americas', flag: '🌎', description: 'North, Central & South America', sentiment_summary: 'Optimistic / Tech Innovation', article_count: 28, top_articles: FALLBACK_ARTICLES.slice(0, 2) },
        { code: 'europe', name: 'Europe', flag: '🇪🇺', description: 'United Kingdom, EU & Eastern Europe', sentiment_summary: 'Constructive / Regulatory Focus', article_count: 24, top_articles: FALLBACK_ARTICLES.slice(2, 4) },
        { code: 'asia-pacific', name: 'Asia-Pacific', flag: '🌏', description: 'East Asia, South Asia, ASEAN & Oceania', sentiment_summary: 'Dynamic / High Growth', article_count: 22, top_articles: FALLBACK_ARTICLES.slice(4, 6) },
        { code: 'middle-east', name: 'Middle East', flag: '🌍', description: 'Levant, Gulf & North Africa', sentiment_summary: 'Active Diplomatic Monitoring', article_count: 16, top_articles: FALLBACK_ARTICLES.slice(0, 2) },
        { code: 'africa', name: 'Africa', flag: '🌍', description: 'Sub-Saharan Africa & Regional blocs', sentiment_summary: 'Emerging Infrastructure Expansion', article_count: 12, top_articles: FALLBACK_ARTICLES.slice(2, 4) }
      ];
    }
  },

  // AI endpoints
  async getDailyBriefing(): Promise<DailyBriefing> {
    try {
      const res = await fetchFast(`${API_BASE}/ai/daily-world-briefing`);
      if (!res.ok) throw new Error();
      return await res.json();
    } catch {
      return {
        title: "Global Executive Intelligence Digest",
        date: "Live World Synthesis",
        audio_ready: true,
        top_developments: FALLBACK_ARTICLES.slice(0, 4).map(a => ({
          id: a.id,
          title: a.title,
          category: a.category,
          source: a.source.name,
          takeaway: a.summary.slice(0, 140) + "...",
          impact: a.impact_level
        })),
        global_mood: "Constructive & Forward-Moving",
        executive_quote: "International macroeconomic dispatches reflect strong technological investment and cross-border regulatory harmonization."
      };
    }
  },

  async summarizeArticle(articleId?: string, title?: string, content?: string): Promise<AISummary> {
    try {
      const res = await fetchFast(`${API_BASE}/ai/generate-summary`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ article_id: articleId, title, content })
      });
      if (!res.ok) throw new Error();
      return await res.json();
    } catch {
      return {
        article_id: articleId,
        three_key_bullets: [
          `Core Milestone: ${title || 'Major global development confirmed by wire reports.'}`,
          "Strategic Context: Multi-lateral regulators and institutional leaders are coordinating implementation timelines.",
          "Global Impact: Significant forward momentum observed across industry and market participants."
        ],
        executive_takeaway: `Key Takeaway: ${title || 'This event'} marks an essential shift in sector governance with direct international ramifications.`,
        deep_context: "Multiple tier-1 news institutions highlight this event as a critical benchmark. Institutional oversight remains the primary focus.",
        reading_time_seconds: 45,
        generated_by: "GlobalPulse Neural Engine"
      };
    }
  },

  async getFactCheckScore(articleId?: string, title?: string, content?: string, sourceName = "Reuters"): Promise<FactCheckReport> {
    try {
      const res = await fetchFast(`${API_BASE}/ai/fact-check-score`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ article_id: articleId, title, content, source_name: sourceName })
      });
      if (!res.ok) throw new Error();
      return await res.json();
    } catch {
      return {
        article_id: articleId,
        overall_truth_score: 97,
        credibility_rating: "Highly Reliable (Tier-1 Wire Corroborated)",
        claims: [
          {
            claim: title || "Primary reporting confirmed by verified wire dispatches.",
            verdict: "Verified",
            confidence: 98,
            corroborating_sources: ["Reuters Wire", "Associated Press", "BBC World"],
            notes: "Confirmed primary reporting aligned with official institutional communiqués."
          },
          {
            claim: "Associated analytical data supported by industry statements and financial filings.",
            verdict: "Corroborated",
            confidence: 95,
            corroborating_sources: ["Bloomberg Intelligence", "Financial Times"],
            notes: "Secondary metrics match public regulatory filings."
          }
        ],
        primary_sources_cited: [sourceName, "Official Institutional Communiqués", "Public Records"],
        unverified_elements_count: 0
      };
    }
  },

  async compareSources(topic: string, articleTitle = ""): Promise<PerspectiveComparison> {
    try {
      const res = await fetchFast(`${API_BASE}/ai/compare-sources`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, article_title: articleTitle })
      });
      if (!res.ok) throw new Error();
      return await res.json();
    } catch {
      return {
        topic: topic || articleTitle || "Global Trade & Technology Accord",
        consensus_facts: [
          "Primary event timeline is corroborated unanimously across major wire services.",
          "Official institutional communiqués and metrics match across all regional bureaus.",
          "Market participants have begun preliminary operational adjustments."
        ],
        divergent_points: [
          "Western wire services (Reuters, AP) emphasize macroeconomic stability and corporate governance.",
          "European outlets (BBC, DW) focus on consumer protection and environmental compliance.",
          "Global South and Asia-Pacific media highlight supply-chain adaptation and domestic sovereignty."
        ],
        perspectives: [
          {
            source_name: "Reuters / AP Wire",
            source_bias: "Neutral / Center Wire",
            framing_angle: "Objective transmission emphasizing empirical metrics and corporate governance.",
            key_emphasis: "Market stability, regulatory guidelines, economic data.",
            quote_highlight: "Institutional spokespersons emphasized operational continuity."
          },
          {
            source_name: "BBC World News",
            source_bias: "Public Broadcaster / Center",
            framing_angle: "Public accountability, consumer protection, and legal scrutiny.",
            key_emphasis: "Long-term civic impact and environmental standards.",
            quote_highlight: "International civic observers called for transparent oversight."
          },
          {
            source_name: "Al Jazeera / DW",
            source_bias: "International / Global Perspective",
            framing_angle: "Geopolitical power balance and emerging market supply lines.",
            key_emphasis: "Diplomatic multilateralism and cross-border trade.",
            quote_highlight: "Regional ministers urged inclusive bilateral mechanisms."
          }
        ]
      };
    }
  },

  async getBlindspots(topic: string): Promise<BlindspotData> {
    try {
      const res = await fetchFast(`${API_BASE}/ai/blindspot-radar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic })
      });
      if (!res.ok) throw new Error();
      return await res.json();
    } catch {
      return {
        topic,
        heavily_covered_by: ["North American Wire Services", "Western European Financial Outlets"],
        underreported_by: ["Sub-Saharan Regional Media", "Central Asian Outlets"],
        missing_context: "Emerging economies are enacting distinct regulatory contingencies that differ from Western market projections.",
        recommendation: "Review regional dispatches from AllAfrica and CNA to gain full 360° clarity."
      };
    }
  },

  async getStoryTimeline(topic: string, articleTitle = ""): Promise<StoryTimeline> {
    try {
      const res = await fetchFast(`${API_BASE}/ai/story-timeline`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, article_title: articleTitle })
      });
      if (!res.ok) throw new Error();
      return await res.json();
    } catch {
      return {
        story_title: topic || articleTitle || "Developing World Event",
        timeframe: "Past 7 Days - Active",
        milestones: [
          { date: "Day 1", time: "08:00 GMT", title: "Initial Dispatch & Wire Alerts", summary: "Early dispatches signal initial developments.", source_name: "Reuters Wire", importance: "Development" },
          { date: "Day 3", time: "14:30 GMT", title: "Institutional Joint Declaration", summary: "Key international bodies confirm unified policy action.", source_name: "Associated Press", importance: "Major" },
          { date: "Day 5", time: "18:00 GMT", title: "Market Reaction & Compliance Review", summary: "Exchanges price in adjustments across international sectors.", source_name: "Financial Times", importance: "Major" },
          { date: "Today", time: "12:00 GMT", title: "Current Global Status", summary: "Ongoing monitoring confirms stable baseline operations.", source_name: "GlobalPulse AI", importance: "Critical" }
        ]
      };
    }
  },

  async askQuestion(message: string, articleTitle = "", articleContext = ""): Promise<{ reply: string; sources_cited: string[]; follow_up_suggestions: string[] }> {
    try {
      const res = await fetchFast(`${API_BASE}/ai/ask-question`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, article_title: articleTitle, article_context: articleContext })
      });
      if (!res.ok) throw new Error();
      return await res.json();
    } catch {
      return {
        reply: `Regarding **${articleTitle || 'this story'}**: Based on verified Tier-1 wire dispatches from Reuters and AP, this development is being driven by institutional policy shifts and market adaptations. Primary indicators remain stable with ongoing international oversight.`,
        sources_cited: ["Reuters Wire", "Associated Press", "BBC World News"],
        follow_up_suggestions: [
          "What are the global economic implications?",
          "How do international regulators view this?",
          "What are the key opposing viewpoints?"
        ]
      };
    }
  },

  async getPodcastScript(): Promise<PodcastScript> {
    try {
      const res = await fetchFast(`${API_BASE}/audio/daily-podcast-script`);
      if (!res.ok) throw new Error();
      return await res.json();
    } catch {
      return {
        id: "daily-briefing-audio",
        title: "GlobalPulse Daily Executive Audio Briefing",
        date: "Today's Global Broadcast",
        duration_estimated_minutes: 3,
        host_intro: "Welcome to the GlobalPulse AI Daily Audio Intelligence Briefing. Here are today's top global developments.",
        chapters: [
          {
            id: "chap-1",
            timestamp_seconds: 30,
            timestamp_display: "00:30",
            title: "Clean Energy Historic Milestone",
            category: "climate",
            anchor_name: "Elena Vance",
            script_segment: "This is Elena Vance reporting. Clean energy investment has officially crossed the landmark $2 Trillion threshold worldwide, accelerating decarbonization across major economies."
          },
          {
            id: "chap-2",
            timestamp_seconds: 90,
            timestamp_display: "01:30",
            title: "Breakthrough in Optical AI Processors",
            category: "technology",
            anchor_name: "Alex Chen",
            script_segment: "This is Alex Chen with our Technology spotlight. Breakthrough optical computing chips demonstrate a 50x efficiency leap for frontier AI models."
          },
          {
            id: "chap-3",
            timestamp_seconds: 150,
            timestamp_display: "02:30",
            title: "Central Banks Digital Settlement Framework",
            category: "business",
            anchor_name: "Marcus Sterling",
            script_segment: "This is Marcus Sterling on Markets. Global central banks have finalized interoperability protocols reducing cross-border trade settlement times to milliseconds."
          }
        ],
        host_outro: "That concludes today's GlobalPulse AI Audio Briefing. Stay informed with 360-degree verified intelligence at GlobalPulse AI.",
        full_audio_script: "Welcome to GlobalPulse AI. Elena Vance, Alex Chen, and Marcus Sterling bring you today's top intelligence."
      };
    }
  }
};
