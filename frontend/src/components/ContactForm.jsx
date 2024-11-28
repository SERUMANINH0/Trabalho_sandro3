import React, { useState } from "react";

const ContactForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  // Define a URL base para o backend usando variável de ambiente
  const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          toMail: email,
          content: message,
        }),
      });

      if (response.ok) {
        setStatus("Mensagem enviada com sucesso!");
        setEmail("");
        setMessage("");
      } else {
        setStatus("Erro ao enviar mensagem. Tente novamente.");
      }
    } catch (error) {
      setStatus("Erro ao conectar ao servidor.");
    }
  };

  return (
    <div className="contact-form">
      <h2>Entre em contato</h2>
      <p>
        Entre em contato, desejamos tirar qualquer dúvida, seja um orçamento ou
        uma dúvida técnica.
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Seu melhor Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          placeholder="Motivo do contato"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>
        <button type="submit">Enviar</button>
      </form>
      {status && <p className="message">{status}</p>}
    </div>
  );
};

export default ContactForm;
