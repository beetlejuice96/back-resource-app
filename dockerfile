FROM node:17.1-alpine

RUN mkdir -p /home/node/app/node_modules \
    && chown -R node:node /home/node/app \
    && chmod -R +x /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node ./package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

CMD ["npm", "run", "start"]

