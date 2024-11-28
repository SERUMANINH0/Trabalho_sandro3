# Use a imagem oficial do Node.js como base
FROM node:16

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copie os arquivos de dependência e instale
COPY package*.json ./
RUN npm install

# Copie o código-fonte
COPY . .

# Exponha a porta usada pelo backend (definida no index.js)
EXPOSE 8080

# Comando para rodar o backend
CMD ["node", "index.js"]
