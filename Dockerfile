FROM node:10

RUN npm install yarn -g
RUN npm install pm2 -g
RUN npm install prisma -g

WORKDIR /usr/src/app

COPY . .

RUN yarn install

EXPOSE 4000

CMD ["pm2-runtime", "process.yml"]
