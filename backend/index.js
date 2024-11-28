const express = require('express');
const cors = require('cors'); 
const sendgrid = require('@sendgrid/mail');

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
if (!SENDGRID_API_KEY) {
  throw new Error('SENDGRID_API_KEY não definida!');
}
sendgrid.setApiKey(SENDGRID_API_KEY);

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Aplicação rodando no Cloud Run!');
});

app.post('/send-email', async (req, res) => {
  try {
    const { toMail, content } = req.body;

    if (!toMail || !content) {
      return res.status(400).send({ error: 'Missing "toMail" or "content" fields' });
    }

    const msg = {
      to: toMail,
      from: 'veneryportorufino@gmail.com',
      subject: 'Automated Email',
      text: content,
    };

    await sendgrid.send(msg);
    res.status(200).send({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to send email', details: error.message });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Aplicação rodando na porta ${PORT}`);
});
