FROM node:14.17.1-alpine3.11 
RUN addgroup app && adduser -S -G app app
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm","run","dev"]