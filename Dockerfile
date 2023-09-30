FROM node:18.16.0

WORKDIR /app

EXPOSE 4200

COPY package*.json .

RUN npm install

COPY . .

CMD [ "npm", "run", "dev" ]
