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

  res.status(200).json({ success: true, message: "Message sent successfully" });
}