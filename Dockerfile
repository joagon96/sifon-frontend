FROM node:11 as build-stage

WORKDIR /vgn-sifon-frontend

COPY package*.json ./

RUN apk add g++ make python;\
    npm install;

COPY . .

RUN npm run build

# Etapa de producción
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /vgn-sifon-frontend/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
