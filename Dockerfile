FROM node:20-alpine

WORKDIR /app

COPY package.json ./
RUN yarn

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]