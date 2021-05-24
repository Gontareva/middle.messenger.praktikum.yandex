FROM ubuntu:latest
RUN apt update
RUN apt install curl -y
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt install -y nodejs
WORKDIR /var/www
COPY ./ ./
EXPOSE 3000
CMD npm ci && npm run build && node server.ts
