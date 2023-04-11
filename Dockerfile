FROM node:11


WORKDIR /vgn-sifon-frontend

COPY package*.json ./

RUN apk add g++ make python;\
    npm install;

COPY . .

CMD ["npm", "run", "serve"]
