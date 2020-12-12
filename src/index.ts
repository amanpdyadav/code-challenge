import * as express from 'express';

const app = express();
app.use((req, res, next) => {
    req['rawBody'] = '';
    req.on('data', (chunk) => (req['rawBody'] += chunk));
    req.on('end', () => {
        req.body = JSON.parse(req['rawBody']);
        next();
    });
});

app.listen(8888, async () => {
    console.log(`App listening at http://localhost:8888`);
});

module.exports = app;
