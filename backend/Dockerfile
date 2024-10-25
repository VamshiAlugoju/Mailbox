FROM node:18

WORKDIR /app

ENV DBURL="mongodb+srv://vamshi:dfdsfsfadf@cluster0.xseut.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

COPY ./package.json .
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm" , "start" ]
