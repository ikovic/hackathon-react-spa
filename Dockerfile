FROM node:8.7-alpine

WORKDIR /app

COPY . /app
RUN apk add --no-cache --virtual=.run-deps bash && \
    npm install && \
    npm install -g http-server

COPY . /app

EXPOSE 8090
CMD ["bash", "run.sh"]
LABEL name=hackathon-fe version=dev \
      maintainer="Ivan Kovic"