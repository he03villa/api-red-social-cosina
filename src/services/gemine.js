import { GoogleGenerativeAI } from '@google/generative-ai';

class GemineService {

    apiKey = 'AIzaSyAnndwUkgk9am6VfnKTzUbe_3_tvPbB64g';
    /* apiKey = process.env.GEMINI_API_KEY; */
    genAI;
    model;
    chatSession;
    generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
    };
    constructor() {
        this.genAI = new GoogleGenerativeAI(this.apiKey);
        this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        this.chatSession = this.model.startChat({
            generationConfig: this.generationConfig,
            history: [],
        });
    }

    async generate(text) {
        const response = await this.chatSession.sendMessage(text);
        return response;
    }
}

export default GemineService;