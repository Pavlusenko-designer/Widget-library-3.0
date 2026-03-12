const JOB_RECORDS = [
  {
    id: "job-001",
    title: "Senior Product Designer",
    department: "Design",
    location: "Kyiv, UA",
    employmentType: "Full-time",
    workplace: "Hybrid",
    postedAt: "2026-03-08",
    slug: "senior-product-designer-kyiv"
  },
  {
    id: "job-002",
    title: "Frontend Engineer (React)",
    department: "Engineering",
    location: "Remote - Europe",
    employmentType: "Full-time",
    workplace: "Remote",
    tags: ["TypeScript", "Design Systems", "A/B Testing", "Next.js", "Accessibility"],
    postedAt: "2026-03-07",
    slug: "frontend-engineer-react-remote-europe"
  },
  {
    id: "job-003",
    title: "Talent Acquisition Partner, Commercial and Product Hiring Programs",
    department: "People",
    location: "Warsaw, PL",
    employmentType: "Full-time",
    workplace: "On-site",
    postedAt: "2026-03-05",
    slug: "talent-acquisition-partner-warsaw"
  },
  {
    id: "job-004",
    title: "Engineering Manager",
    department: "Engineering",
    location: "Berlin, DE",
    employmentType: "Full-time",
    workplace: "Hybrid",
    postedAt: "2026-03-03",
    slug: "engineering-manager-berlin"
  },
  {
    id: "job-005",
    title: "Lifecycle Marketing Manager",
    department: "Marketing",
    location: "Remote - UK",
    employmentType: "Full-time",
    workplace: "Remote",
    postedAt: "2026-03-01",
    slug: "lifecycle-marketing-manager-remote-uk"
  },
  {
    id: "job-006",
    title: "Senior Data Analyst",
    department: "Data",
    location: "Prague, CZ",
    employmentType: "Contract",
    workplace: "Hybrid",
    postedAt: "2026-02-27",
    slug: "senior-data-analyst-prague"
  }
];

function normalize(value) {
  return String(value ?? "").trim().toLowerCase();
}

export function getRecommendedJobs({ roleOrDepartment = "", location = "", limit = 4 } = {}) {
  const roleFilter = normalize(roleOrDepartment);
  const locationFilter = normalize(location);

  const filtered = JOB_RECORDS.filter((job) => {
    const roleMatch =
      roleFilter.length === 0 ||
      normalize(job.title).includes(roleFilter) ||
      normalize(job.department).includes(roleFilter);
    const locationMatch = locationFilter.length === 0 || normalize(job.location).includes(locationFilter);
    return roleMatch && locationMatch;
  });

  const sorted = [...filtered].sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
  return sorted.slice(0, Math.max(1, limit));
}

export function getRecommendedJobsEndpoint() {
  return "/api/recommended-jobs";
}
