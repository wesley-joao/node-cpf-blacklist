FROM node:8

ADD ./ usr/node_app
WORKDIR usr/node_app
RUN npm install

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]