FROM node:11


WORKDIR /vgn-sifon-frontend

COPY package*.json ./

RUN apk add g++ make python;\
    npm install;

COPY . .

RUN npm run build

# Etapa de producción
FROM nginx:latest
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
