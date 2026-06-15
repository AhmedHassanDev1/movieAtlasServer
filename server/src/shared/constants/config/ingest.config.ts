
export const INGEST = {
  releaseDateFrom: "1950-01-01",

  minVoteCount: {
    movie: 100,
    tv: 50,
  },

  minVoteAverage: 5,
  includeAdult: false,
  sortBy: "popularity.desc",

  maxPages: Number(process.env.INGEST_MAX_PAGES) || 3,
  maxReviews: 10,
  maxCast: 25,

  maxPosters: 1,
  maxBackdrops: 5,

  crewJobs: new Set([
    "Director",
    "Screenplay",
    "Writer",
    "Story",
    "Executive Producer",
    "Producer",
  ]),

  requestDelayMs: 300,
  maxRetries: 3,
  retryBaseMs: 1000,

  enrichConcurrency: Number(process.env.INGEST_CONCURRENCY) || 3,

  /** Re-enrich titles older than this many days */
  staleAfterDays: Number(process.env.INGEST_STALE_DAYS) || 7,
  language:"en-US",
  watchProviderRegion: process.env.WATCH_PROVIDER_REGION || "US",
};

