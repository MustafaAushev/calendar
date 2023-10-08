FROM node:18-alpine


RUN apk add bash;\
    mkdir -p /opt/app &&\
    addgroup app &&\
    adduser -D -G app app &&\
    chown app:app /opt/app
WORKDIR /opt/app

ADD ./package-lock.json /opt/app/package-lock.json
ADD ./package.json /opt/app/package.json
ADD ./tsconfig.json /opt/app/tsconfig.json

RUN set -xe; \
    npm ci

COPY . ./
RUN set -xe; \
    npm run build

RUN npm run prisma:generate

EXPOSE 3000

CMD [ "node", "dist/main.js"  ] 

