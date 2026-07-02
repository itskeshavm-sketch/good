const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => res.send('AI Automation Server is Alive 🚀'));

// This is the endpoint Cron-Job.org will ping every day at 10:00 AM
app.post('/run-task', async (req, res) => {
    try {
        console.log("Triggering 10:00 AM Email Summary Process...");

        // ==========================================
        // YOUR CUSTOM MAKE.COM REPLACEMENT LOGIC GOES HERE
        // ==========================================
        // Example: Fetch from a source, format summary, send email.
        
        console.log("Summary created and sent successfully!");
        res.status(200).send("Daily task executed with 0 credit cost!");
    } catch (err) {
        console.error("Task failed:", err.message);
        res.status(500).send(err.message);
    }
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
