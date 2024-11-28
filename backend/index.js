const express = require('express');
const cors = require('cors'); // Importa o pacote cors
const sendgrid = require('@sendgrid/mail');

// Inicializar SendGrid com a API Key
sendgrid.setApiKey('REMOVED');

const app = express();

// Middleware CORS
app.use(cors()); // Permite requisições de outras origens
app.use(express.json());

// Rota principal para teste
app.get('/', (req, res) => {
  res.send('Aplicação rodando no Cloud Run!');
});

// Endpoint para envio de e-mail
app.post('/send-email', async (req, res) => {
  try {
    const { toMail, content } = req.body;

    if (!toMail || !content) {
      return res.status(400).send({ error: 'Missing "toMail" or "content" fields' });
    }

    const msg = {
      to: toMail,
      from: 'veneryportorufino@gmail.com', // Substitua pelo seu e-mail
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

// Configurar a porta para o servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Aplicação rodando na porta ${PORT}`);
});
