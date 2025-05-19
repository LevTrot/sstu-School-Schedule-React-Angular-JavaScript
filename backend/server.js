const app = require('./app');

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Service is running on http://localhost:${PORT}`);
});
