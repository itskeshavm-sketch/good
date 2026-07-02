const express = require('express');
const { GoogleGenAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 8080;

// This matches the updated official Google SDK syntax perfectly
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.get('/', (req, res) => res.send('AI Automation Server is Alive 🚀'));

// The 10:00 AM Trigger Endpoint
app.post('/run-task', async (req, res) => {
    try {
        console.log("Starting 10:00 AM Email Summary Process...");

        // 1. DUMMY EMAIL FETCHING (Replace this block when you plug in your Gmail credentials)
        const mockEmails = [
            { from: "GitHub", subject: "Successful Deployment Alert", body: "Your repository 'good' was successfully deployed to production." },
            { from: "School Board", subject: "Update on 10th Results and Schedule", body: "Please check the portal for the updated registration metrics for the upcoming term." },
            { from: "Robotics Store", subject: "Order Shipped: ESP32-CAM", body: "Your package containing the ESP32-CAM module and motor drivers has been handed to the courier." }
        ];

        // Format all the emails into one big wall of text for Gemini
        const formattedEmails = mockEmails.map((email, index) => 
            `Email #${index + 1}\nFrom: ${email.from}\nSubject: ${email.subject}\nBody: ${email.body}\n---`
        ).join("\n");

        console.log("Sending data to Gemini for summary...");

        // 2. Pass the text to Gemini Flash (huge context window, ultra-fast)
        const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `You are a helpful personal assistant. Summarize the following daily emails into a clean, easy-to-read daily digest bulletin. Group them by importance:\n\n${formattedEmails}`;
        
        const result = await model.generateContent(prompt);
        const summaryText = result.response.text();

        console.log("Generated Summary:\n", summaryText);

        // 3. TODO: Send the summaryText to your inbox using a library like nodemailer or gmail API

        res.status(200).send("Summary successfully processed!");
    } catch (err) {
        console.error("Automation error:", err.message);
        res.status(500).send(err.message);
    }
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
