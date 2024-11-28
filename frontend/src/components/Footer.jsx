import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="logo">LogoMarca</div>
        <div>
          <h3>Empresa</h3>
          <ul>
            <li>Sobre nós</li>
            <li>Faça parte do time</li>
            <li>Blog</li>
          </ul>
        </div>
        <div>
          <h3>Funcionalidades</h3>
          <ul>
            <li>Marketing</li>
            <li>Análise de dados</li>
            <li>Automação</li>
          </ul>
        </div>
        <div>
          <h3>Recursos</h3>
          <ul>
            <li>IOS & Android</li>
            <li>Teste a Demo</li>
            <li>Clientes</li>
            <li>API</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          Feito com amor na aula de Programação Web 💙 ©2024 AktieTech - Todos os
          direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
