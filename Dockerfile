FROM node:14-buster-slim

WORKDIR /app

COPY . .

EXPOSE 8080

RUN apt-get update && \ 
    apt-get install -y build-essential \
    wget \
    python3 \
    make \
    gcc \ 
    libc6-dev 

RUN npm install

CMD ["npm", "start"]