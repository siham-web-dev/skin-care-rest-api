FROM alpine
RUN apk update
RUN apk install nodejs
RUN apk install npm

WORKDIR /usr/skinno 
COPY package.json ./

RUN npm install
