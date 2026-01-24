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
    url: "https://pomo-coral-eight.vercel.app",
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
    url: "https://baseline-lilac.vercel.app",
  },
  {
    slug: "fitlog",
    title: "FitLog",
    description:
      "Track daily exercises, monitor progress over time, and view statistics",
    color: "#f59e0b",
    url: "https://fitlog-theta.vercel.app",
  },
];
