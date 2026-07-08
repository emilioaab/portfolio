export type Facet = {
  id: string;
  // Directory-style label, kept literal/untranslated like the nav's ~/work
  // convention — these read as real path segments, not UI copy.
  slug: string;
};

export const facets: Facet[] = [
  { id: "cybersecurity", slug: "cybersecurity" },
  { id: "lowLevel", slug: "low-level-systems" },
  { id: "fullStack", slug: "full-stack" },
  { id: "music", slug: "music" },
  { id: "fitness", slug: "fitness" },
];
