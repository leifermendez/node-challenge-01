# syntax=docker/dockerfile:1
FROM node:16-alpine3.15
WORKDIR /src
EXPOSE 5000
COPY . .
CMD ["npm", "start"]