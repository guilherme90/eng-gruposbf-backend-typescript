FROM node:16

WORKDIR /app

COPY package.json ./
COPY ./prisma ./

RUN npm install

COPY . .

RUN chmod +x /app/entrypoint.sh
ENTRYPOINT ["sh", "/app/entrypoint.sh"]

EXPOSE 3000
