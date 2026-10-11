import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({
        message: "Hello from a container!",
        service: 'hello-node',
        pod: process.env.POD_NAME || 'unknown',
        time: new Date().toISOString(),
    });
});

app.get('/ready', (req, res) => res.status(200).send('ready'));
app.get('/healthz', (req, res) => res.status(200).send('ok'));

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});
