# Use a imagem oficial do Node.js como base
FROM node:latest

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
COPY arquivos ./arquivos/

RUN npm install

COPY . .



EXPOSE 3001

# Execute o script "extract" e, em seguida, "start-bot" ao iniciar o contêiner
CMD ["npm", "run", "start:migrate:prod"]