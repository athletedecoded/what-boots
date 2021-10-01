FROM node:14-alpine

WORKDIR /app

COPY . .

EXPOSE 8080

RUN apk --no-cache --virtual build-dependencies add \
    python \
    make \
    g++

RUN npm install

CMD ["npm", "start"]