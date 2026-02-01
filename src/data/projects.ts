export interface Project {
  slug: string;
  title: string;
  description: string;
  color: string;
  url: string;
  github?: string;
}

export const projects: Project[] = [
  {
    slug: "pomo",
    title: "Pomo",
    description:
      "A simple, elegant Pomodoro timer with concentration music links and productivity tracking",
    color: "#ef4444",
    url: "https://pomodo.ink",
    github: "https://github.com/Wozacosta/pomo",
  },
  {
    slug: "guideto",
    title: "Guide To",
    description:
      "Create and browse immersive music guides with rich media content",
    color: "#8b5cf6",
    url: "https://guideto.vercel.app",
  },
  {
    slug: "baseline",
    title: "Baseline",
    description:
      "A PWA to help quit nicotine with motivation, progress tracking, and crisis support",
    color: "#10b981",
    url: "https://basel.ink",
  },
  {
    slug: "fitlog",
    title: "FitLog",
    description:
      "Track daily exercises, monitor progress over time, and view statistics",
    color: "#f59e0b",
    url: "https://fitlog-theta.vercel.app",
  },
  {
    slug: "wezer",
    title: "Wezer",
    description:
      "Real-time weather anomaly tracking for global cities, monitoring temperature deviations from historical averages across 50 cities worldwide",
    color: "#3b82f6",
    url: "https://wezer.vercel.app",
    github: "https://github.com/Wozacosta/wezer",
  },
  {
    slug: "leplein",
    title: "Le Plein",
    description:
      "A mobile-first web app for finding the cheapest fuel prices near you in France, using real-time data from the official French government API",
    color: "#22c55e",
    url: "https://leple.ink",
    github: "https://github.com/Wozacosta/leplein",
  },
  {
    slug: "progress",
    title: "Progress",
    description:
      "A local-first habit tracking PWA. Grid-based, offline-capable, no login required",
    color: "#6366f1",
    url: "https://habitu.xyz",
  },
];
