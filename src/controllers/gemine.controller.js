import GemineService from '../services/gemine.js';

const gemineService = new GemineService();

class GemineController {
    async generate(req, res) {
        const { text } = req.body;
        const response = await gemineService.generate(text);
        res.send(response.response.candidates[0].content.parts[0]);
    }
}

export default GemineController