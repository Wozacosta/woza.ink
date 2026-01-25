import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface AboutContent {
  title: string;
  description: string;
  content: string;
}

const ABOUT_PATH = path.join(process.cwd(), "src/content/about.md");

export function getAboutContent(): AboutContent | null {
  if (!fs.existsSync(ABOUT_PATH)) {
    return null;
  }

  const fileContent = fs.readFileSync(ABOUT_PATH, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    title: data.title,
    description: data.description,
    content,
  };
}
