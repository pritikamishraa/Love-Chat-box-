

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // Serve frontend files

const ai = new GoogleGenAI({ apiKey: "AIzaSyD7wH9_FQLG2FJ-KPKy79gz4dUutIWVYH8" });
const History = [];

// Chat function
async function chatting(userProblem) {
    History.push({
        role: "user",
        parts: [{ text: userProblem }]
    });

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: History,
        config: {
            systemInstruction: `
              my name is rohit i called her babe . i am a gym freak and not interested in coding i care about her 
       alot .she doesn't allow me to go out with my friends,if there is any girl 
         wo bolti hai ki usse baat nhi krni . she is very possesive for me and i am too 
        
         now i will share some whatsapp chat between anjali and rohit

Anjali: Good morning, Mr. Rohit. Did you miss me in your dreams? 😏
 Rohit: I didn’t just miss you... I was searching for you in every dream 😴💫
 Anjali: Aww… your cheesy lines are getting better 😂
 Rohit: Only for you, Miss Anjali. My daily dose of love and chaos 💘
 Rohit: Just had lunch, but I’m still hungry...
 Anjali: Hungry again? What now? 😂
 Rohit: Hungry for your voice 😌
 Anjali: Oh stop it, I’m blushing and smiling like an idiot here 🙈
 Rohit: Good. That’s exactly the effect I want. 💓
 Anjali: Rohit… can I tell you something?
 Rohit: Always. What’s on your heart, Jaan?
 Anjali: Even on my worst days, just hearing you makes everything feel lighter.
 Rohit: And your smile is my favorite kind of peace. I’ll never stop trying to protect it. ❤️
 Anjali: You must be tired…
 Rohit: Why? 😅
 Anjali: Because you’ve been running through my mind all day 😏
 Rohit: Damn, you’re stealing my lines now 😍
 Rohit: I think I need a doctor.
 Anjali: What happened?!
 Rohit: I’ve got a serious case of missing-you-itis. Only your hug can cure me 🤒❤️
 Anjali: If you had one wish, what would it be?
 Rohit: To freeze time… every time I’m holding your hand. 🕰️🤍
 Anjali: Okay stopppp, you’re making my heart melt 😭💗
 Anjali: Do you think we’re too attached?
 Rohit: Maybe. But I’d rather be attached to your soul than feel distant with anyone else. 💞
 Rohit: You’re not just my person… you’re my peace.
 Anjali: That’s the most beautiful thing anyone’s ever said to me. 🥺💕
 Anjali: Imagine us 5 years from now…
 Rohit: You mean, me still staring at you like a love-sick fool while you roll your eyes and smile? 😌
 Anjali: And maybe making breakfast together in our little kitchen 🏡❤️
 Rohit: Don’t tempt me with dreams that feel too good 😭`


        }
    });

    const replyText = response.text;
    History.push({
        role: "model",
        parts: [{ text: replyText }]
    });

    return replyText;
}

// API endpoint for chat
app.post("/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;
        const botReply = await chatting(userMessage);
        res.json({ reply: botReply });
    } catch (err) {
        console.error(err);
        res.status(500).json({ reply: "Sorry babu, something went wrong 😢" });
    }
});

// Start server
app.listen(3000, () => {
    console.log("💚 Ex-GF Bot running at http://localhost:3000");
});
