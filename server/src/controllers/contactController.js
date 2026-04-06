import nodemailer from 'nodemailer';

export const mailContact = async(req, res) => {
  const { name, email, message } = req.body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (name.trim().length < 3) {
    return res.status(400).json({ error: "Name must be at least 3 characters long" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  if (message.trim().length < 10) {
    return res.status(400).json({ error: "Message should be at least 10 characters long" });
  }

  console.log("Received:", { name, email, message });

  const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.APP_PASSWORD,
        },
    });

    const mailOptions = {
        from: {
            name: "Ishan Roy",
            address: "trickster10ishan@gmail.com"
        },
        to: "ishanroy3118107@gmail.com",
        subject: "Sent from Portfolio website",
        text: `Name: ${req.body.name}\nEmail: ${req.body.email}\nMessage: ${req.body.message}`,
    };
    const confirmationMail = {
        from: {
            name: "Ishan Roy",
            address: process.env.EMAIL
        },
        to: req.body.email,
        subject: `Thanks for reaching out, ${req.body.name}!`,
        text: `Hi ${req.body.name},\n\nI just received your message through my portfolio. Thank you so much for getting in touch!\n\nI really appreciate you taking the time to write to me. I've read your message and I'll make sure to get back to you personally as soon as I can (usually within 24 hours).\n\nIn the meantime, feel free to check out more of my work on GitHub or connect with me on LinkedIn.\n\nBest regards,\nIshan Roy`,
    };    

    try {
        await Promise.all([
            transporter.sendMail(mailOptions),
            transporter.sendMail(confirmationMail)
        ]);        
        res.status(200).json({ success: true, message: "Message sent successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to send message" });
    }

  
}