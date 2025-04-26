import { getGeminiClient } from "../service/gemini";

interface TagPattern {
  name: string;
  patterns: RegExp[];
}

export const tagPatterns: TagPattern[] = [
  {
    name: "loop",
    patterns: [
      /\bfor\s*\(/i,
      /\bwhile\s*\(/i,
      /\bforeach\b/i,
      /\b\.forEach\(/i,
      /\bdo\s*{[\s\S]*}\s*while\s*\(/i,
    ],
  },
  {
    name: "api",
    patterns: [
      /\bfetch\s*\(/i,
      /\baxios\b/i,
      /\bXMLHttpRequest\b/i,
      /\b\.ajax\(/i,
      /\bhttp\.get\(/i,
      /\bhttp\.post\(/i,
      /\brequest\s*\(/i,
      /\bgot\s*\(/i,
    ],
  },
  {
    name: "error-handling",
    patterns: [
      /\btry\s*{[\s\S]*}\s*catch\s*\(/i,
      /\bcatch\s*\(/i,
      /\bthrow\s+new\s+Error\(/i,
      /\.catch\(/i,
      /\berror\s*=>/i,
    ],
  },
  {
    name: "array-ops",
    patterns: [
      /\.map\s*\(/i,
      /\.filter\s*\(/i,
      /\.reduce\s*\(/i,
      /\.find\s*\(/i,
      /\.some\s*\(/i,
      /\.every\s*\(/i,
      /\.flat\s*\(/i,
      /\.flatMap\s*\(/i,
    ],
  },
  {
    name: "debugging",
    patterns: [
      /console\.log\s*\(/i,
      /console\.error\s*\(/i,
      /console\.warn\s*\(/i,
      /console\.info\s*\(/i,
      /console\.debug\s*\(/i,
      /print\s*\(/i,
      /\bdebugger\b/i,
    ],
  },
  {
    name: "function",
    patterns: [
      /function\s+\w+\s*\(/i,
      /const\s+\w+\s*=\s*\([^)]*\)\s*=>/i,
      /\([^)]*\)\s*=>/i,
      /def\s+\w+\s*\(/i,
      /\bclass\b/i,
    ],
  },
  {
    name: "async",
    patterns: [
      /\basync\s+/i,
      /\bawait\s+/i,
      /\.then\s*\(/i,
      /new\s+Promise\s*\(/i,
      /Promise\.all\s*\(/i,
    ],
  },
  {
    name: "dom-manipulation",
    patterns: [
      /document\.get/i,
      /document\.query/i,
      /document\.create/i,
      /\.\$\(/i,
      /document\.append/i,
      /innerHTML/i,
    ],
  },
  {
    name: "regex",
    patterns: [
      /new\s+RegExp\s*\(/i,
      /\/[^/]+\/[gimsuy]*/i,
      /\.match\s*\(/i,
      /\.replace\s*\(/i,
      /\.test\s*\(/i,
      /\.exec\s*\(/i,
    ],
  },
  {
    name: "conditional",
    patterns: [
      /\bif\s*\(/i,
      /\belse\s+if\s*\(/i,
      /\belse\b/i,
      /\bswitch\s*\(/i,
      /\?.*:/i,
      /\|\|/i,
      /\&\&/i,
    ],
  },
  {
    name: "import",
    patterns: [
      /\bimport\s+/i,
      /\brequire\s*\(/i,
      /\bfrom\s+/i,
      /\bimport\s*\{/i,
      /\bexport\s+/i,
    ],
  },
];

export const languageFileExtensions: Record<string, string> = {
  javascript: "js",
  typescript: "ts",
  python: "py",
  java: "java",
  "c#": "cs",
  "c++": "cpp",
  ruby: "rb",
  go: "go",
  php: "php",
  swift: "swift",
  kotlin: "kt",
  rust: "rs",
  html: "html",
  css: "css",
  bash: "sh",
  powershell: "ps1",
  sql: "sql",
};

export async function detectTags(code: string): Promise<string[]> {
  const detectedTags: string[] = [];

  tagPatterns.forEach((tagPattern) => {
    const hasPattern = tagPattern.patterns.some((pattern) =>
      pattern.test(code)
    );
    if (hasPattern) {
      detectedTags.push(tagPattern.name);
    }
  });

  const geminiClient = getGeminiClient();
  const detectedByGemini = await geminiClient.detectTagsWithGemini(code);

  const uniqueTags = new Set([...detectedTags, ...detectedByGemini]);
  const uniqueTagsArray = Array.from(uniqueTags);

  return uniqueTagsArray;
}
