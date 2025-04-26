import { GoogleGenerativeAI } from "@google/generative-ai";

// Existing tag patterns for fallback or hybrid approach
interface TagPattern {
  name: string;
  patterns: RegExp[];
}

export const tagPatterns: TagPattern[] = [
  // Your existing patterns
];

// Initialize Gemini API
export class GeminiCodeTagger {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
  }

  /**
   * Analyzes code using Gemini API and returns relevant tags
   */
  async detectTagsWithGemini(
    code: string,
    language: string
  ): Promise<string[]> {
    try {
      const prompt = `
        Analyze the following ${language} code and return ONLY a JSON array of tags that describe its functionality.
        Focus on identifying: loop, api, error-handling, array-ops, debugging, function, async, 
        dom-manipulation, regex, conditional, import, data-structure, state-management, 
        authentication, file-operations, database, testing, ui-component, and any other relevant tags.
        Return ONLY the JSON array without explanation or additional text.
        
        CODE:
        \`\`\`${language}
        ${code}
        \`\`\`
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      // Parse the response to extract just the JSON array
      const jsonMatch = text.match(/\[.*\]/);
      if (jsonMatch) {
        try {
          return JSON.parse(jsonMatch[0]);
        } catch (e) {
          // Fall back to regex-based detection
          return this.fallbackToRegex(code);
        }
      }

      return this.fallbackToRegex(code);
    } catch (error) {
      // Fall back to regex-based detection
      return this.fallbackToRegex(code);
    }
  }

  /**
   * Fallback method using regex patterns when Gemini API fails
   */
  private fallbackToRegex(code: string): string[] {
    const detectedTags: string[] = [];

    tagPatterns.forEach((tagPattern) => {
      const hasPattern = tagPattern.patterns.some((pattern) =>
        pattern.test(code)
      );
      if (hasPattern) {
        detectedTags.push(tagPattern.name);
      }
    });

    return detectedTags;
  }
}

/**
 * Legacy function preserved for backward compatibility
 */
export function detectTags(code: string): string[] {
  const detectedTags: string[] = [];

  tagPatterns.forEach((tagPattern) => {
    const hasPattern = tagPattern.patterns.some((pattern) =>
      pattern.test(code)
    );
    if (hasPattern) {
      detectedTags.push(tagPattern.name);
    }
  });

  return detectedTags;
}
