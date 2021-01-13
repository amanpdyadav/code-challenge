import * as express from 'express';
import { CodeChallenge } from './code-challange';

const app = express();

app.post('/code-challenge/', async (req, res) => {
    req['rawBody'] = '';
    req.on('data', (chunk) => (req['rawBody'] += chunk));
    req.on('end', () => {
        const str = JSON.parse(req['rawBody']);
        const transformedStr = new CodeChallenge(str).transform();
        res.send(JSON.stringify(transformedStr));
    });
});

app.listen(8080, async () => {
    console.log(`App listening at http://localhost:8888`);
});

module.exports = app;
