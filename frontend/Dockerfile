FROM node:18

WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

RUN npm install -g serve

COPY . .

EXPOSE 3000
RUN npm run build
CMD ["serve", "-s", "dist"]