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
    /**
     * Construct a new GemineService instance.
     *
     * This constructor starts a new chat session with the Gemini 1.5 Flash
     * model.  The chat session is configured to use the default generation
     * config from the Google Generative AI library.
     */
    constructor() {
        this.genAI = new GoogleGenerativeAI(this.apiKey);
        this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        this.chatSession = this.model.startChat({
            generationConfig: this.generationConfig,
            history: [],
        });
    }

    /**
     * Send a message to the chat session and return the response.
     *
     * @param {string} text The message to send to the chat session.
     * @return {Promise.<Object>} A Promise that resolves with the response from
     *   the chat session.  The response is an object with a single `text`
     *   property, which is a string containing the response text.
     */
    async generate(text) {
        const response = await this.chatSession.sendMessage(text);
        return response;
    }
}

export default GemineService;