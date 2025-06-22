require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: 'https://tourneedesplages.fr/nospartenaires'
}));
app.use(express.json());

// Configure SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Route POST
app.post('/api/contact', async (req, res) => {
  const { lastName, firstName, company, email, phone, message } = req.body;

  const msg = {
    to: "tdp.beach@gmail.com",
    from: "julienbernard.dev@gmaill.com", // DOIT être un email vérifié sur SendGrid
    subject: `Message de ${name}`,
    text: `Nom: ${lastName}\nPrénom: ${firstName}\nEntreprise: ${company}\nTéléphone: ${phone}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ message: 'Message envoyé avec succès.' });
  } catch (error) {
    console.error(error.response?.body || error);
    res.status(500).json({ error: 'Erreur lors de l’envoi.' });
  }
});

// Démarrage
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
