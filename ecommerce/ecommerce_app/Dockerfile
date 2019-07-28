FROM node:dubnium-alpine

MAINTAINER Eduardo Scarello<eduardo.scarello@gmail.com>
LABEL maintainer="Eduardo Scarello<eduardo.scarello@gmail.com>"
LABEL description="Image to store the e-commerce application"

RUN mkdir -p /code
COPY . /code

WORKDIR "/code"

RUN npm install

ENTRYPOINT ["npm"]