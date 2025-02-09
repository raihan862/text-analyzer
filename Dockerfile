FROM node:22.13.1-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN yarn install

COPY . .

RUN npm run build

EXPOSE 3000

ENV NODE_ENV=production

CMD ["npm", "run", "start:prod"]
