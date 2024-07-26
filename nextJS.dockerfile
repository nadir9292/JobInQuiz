# Use the official Node.js 18 image as a base
FROM node:18-alpine

WORKDIR /app

# on copie tous les fichiers json
COPY ./front/package*.json .

RUN npm install

COPY ./front ./


RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "dev"]
