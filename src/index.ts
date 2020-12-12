import * as express from 'express';

const app = express();

app.listen(8888, async () => {
    console.log(`App listening at http://localhost:8888`);
});

module.exports = app;
