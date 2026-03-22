import { createHighlighter, type Highlighter } from "shiki";

let highlighter: Highlighter | null = null;

export async function getHighlighter(): Promise<Highlighter> {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: ["github-light", "github-dark"],
      langs: [
        "typescript",
        "javascript",
        "json",
        "bash",
        "shell",
        "html",
        "css",
        "toml",
        "yaml",
        "markdown",
        "python",
        "rust",
        "go",
        "ini",
        "diff",
        "sql",
        "graphql",
        "tsx",
        "jsx",
      ],
    });
  }
  return highlighter;
}

export async function highlight(
  code: string,
  lang: string,
): Promise<string> {
  const h = await getHighlighter();
  const loaded = h.getLoadedLanguages();
  const resolvedLang = loaded.includes(lang as never) ? lang : "text";

  return h.codeToHtml(code, {
    lang: resolvedLang,
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
  });
}
