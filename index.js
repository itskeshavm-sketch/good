const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => res.send('AI Automation Server is Alive 🚀'));

// This is the endpoint Azure or a free cron job will ping to trigger your script
app.post('/run-task', async (req, res) => {
    try {
        console.log("Running automation task via OpenCode framework...");
        // Your automation script logic goes here!
        res.status(200).send("Task completed successfully!");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
