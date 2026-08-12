FROM node:20 

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 8081

CMD ["npx", "expo", "start", "--dev-client", "--lan"]