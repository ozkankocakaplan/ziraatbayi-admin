
FROM node:18 AS build


WORKDIR /app


COPY package*.json ./


RUN npm install

COPY . .

ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=${REACT_APP_API_BASE_URL}

RUN npm run build


FROM node:18


WORKDIR /app


RUN npm install -g pm2

 
COPY --from=build /app /app

 
EXPOSE 3001

 
CMD ["pm2-runtime", "start", "server.js"]