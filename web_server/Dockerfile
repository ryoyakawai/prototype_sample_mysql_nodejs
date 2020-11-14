FROM node:10

ARG WORK_DIR

ENV WORKDIR $WORK_DIR

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

# set ENV(in Dockerfile) and ARG(in Container)
ARG WEB_PORT
ENV WEB_PORT $WEB_PORT

EXPOSE $WEB_PORT
CMD [ "npm", "run", "start"]
