
export interface OpenAIEngine {
    completePrompt(prompt: string): Promise<string>;
}