FROM node:18-alpine AS builder

WORKDIR /app

ARG CLERK_PUBLISHABLE_KEY
ARG PARSE_APP_ID
ARG PARSE_SERVER_URL=http://localhost:8080/api
ENV CLERK_PUBLISHABLE_KEY=$CLERK_PUBLISHABLE_KEY
ENV PARSE_APP_ID=$PARSE_APP_ID
ENV PARSE_SERVER_URL=$PARSE_SERVER_URL

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
