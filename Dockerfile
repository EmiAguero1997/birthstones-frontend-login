FROM node:lts-alpine AS builder
RUN npm install -g @angular/cli@19.2.3
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN ng build --configuration=production

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist/birthstones-frontend-login/browser /usr/share/nginx/html
COPY --from=builder /app/dist/birthstones-frontend-login/3rdpartylicenses.txt /usr/share/nginx/html/
COPY --from=builder /app/dist/birthstones-frontend-login/prerendered-routes.json /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
