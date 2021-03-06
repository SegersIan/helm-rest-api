FROM node:12.16.3-alpine3.11

RUN mkdir /app

WORKDIR /app

RUN mkdir bin/
COPY bin/linux-amd64-v3.2.0/helm /usr/local/bin/helm

RUN mkdir api/
COPY api/ api/

WORKDIR /app/api
RUN mkdir temp/

ENV NODE_ENV=production
RUN npm i --only=production

EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]
