import React, { useState } from "react";

const ContactForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });

  // Define a URL base para o backend usando variável de ambiente
  const API_URL =
    process.env.REACT_APP_BACKEND_URL ||
    "https://backend-service-818925002040.us-central1.run.app";

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
        setStatus({ type: "success", message: "Mensagem enviada com sucesso!" });
        setEmail("");
        setMessage("");
      } else {
        const errorData = await response.json();
        setStatus({
          type: "error",
          message:
            errorData.error || "Erro ao enviar mensagem. Tente novamente.",
        });
      }
    } catch (error) {
      console.error("Erro ao conectar ao servidor:", error);
      setStatus({ type: "error", message: "Erro ao conectar ao servidor." });
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
      {status.message && (
        <p className={`message ${status.type}`}>{status.message}</p>
      )}
    </div>
  );
};

export default ContactForm;
