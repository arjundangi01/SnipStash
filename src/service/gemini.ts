import { env } from "@/env.mjs";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenAI } from "@google/genai";

// Existing tag patterns for fallback or hybrid approach
interface TagPattern {
  name: string;
  patterns: RegExp[];
}

export const getGeminiClient = () => {
  return new GeminiCodeTagger();
};

// Initialize Gemini API
export class GeminiCodeTagger {
  async detectTagsWithGemini(code: string): Promise<string[]> {
    try {
      const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });
      const prompt = `
        You are a coding assistant that analyzes code snippets written in any programming language.

        Given a code snippet, carefully read and understand what the code is doing, regardless of language (e.g., JavaScript, Python, Java, C++, Go, etc.).
        Based on the functionality, return an array of meaningful tags that describe the main operations, patterns, and purposes in the code.
            1.If certain keywords or structures appear, assign corresponding tags:
            2.If you find for, while, or similar loops → tag: "loop"
            3.If you find fetch, axios, XMLHttpRequest, or HTTP network requests → tag: "API"
            4.If you find try-catch or error handling structures → tag: "error handling"
            5.If you find .map(), .filter(), or similar array operations → tag: "array operations"
            6.If you find console.log, print, System.out.println, etc. → tag: "debugging"

        Besides these examples, use your own understanding to detect other operations and add suitable tags.
        For example:

        1. Authentication → tag: "authentication"
        2. Database operations (e.g., SQL queries, MongoDB calls) → tag: "database"
        3. File read/write operations → tag: "file operations"
        4. Machine learning models → tag: "machine learning"
        5. Encryption or hashing → tag: "security"
        6. UI rendering → tag: "UI"
        7. State management → tag: "state management"
        8. Multi-threading → tag: "concurrency"
        9. Event listeners → tag: "event handling"
        10. Recursion → tag: "recursion"
        11. Variables → tag: "variables"
        12. Constants → tag: "constants"
        13. Functions → tag: "functions"
        14. Classes → tag: "classes"
        15. Interfaces → tag: "interfaces"
        16. Enums → tag: "enums"
        17. Modules → tag: "modules"
        18. css → tag: "css"
        19. html → tag: "html"
        20. javascript → tag: "javascript"
        21. typescript → tag: "typescript"
        22. python → tag: "python"
        23. java → tag: "java"
        

        Your output should be a simple array of lowercase string tags, e.g.,
        ["api", "error handling", "array operations", "authentication"]

        Important:

        You must think deeply about what the code is doing — don't rely only on keywords.

        You should cover all major activities in the code.

        Even if the code is very small or incomplete, still try to guess meaningful tags.
        
        CODE:
        \`\`\`
        ${code}
        \`\`\`
      `;

      const result = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: prompt,
      });
      const text = result.text;

      console.log("text", text);
      return JSON.parse(text || "[]");
    } catch (error) {
      return [];
    }
  }
}
