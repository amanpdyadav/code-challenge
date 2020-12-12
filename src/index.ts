import * as express from 'express';
import { CodeChallenge } from './code-challange';

const app = express();
app.use((req, res, next) => {
    req['rawBody'] = '';
    req.on('data', (chunk) => (req['rawBody'] += chunk));
    req.on('end', () => {
        req.body = JSON.parse(req['rawBody']);
        next();
    });
});

app.post('/code-challenge/', async (req, res) => {
    res.send(
        JSON.stringify(new CodeChallenge(req.body).transform())
    );
});

app.listen(8888, async () => {
    console.log(`App listening at http://localhost:8888`);
});

module.exports = app;
