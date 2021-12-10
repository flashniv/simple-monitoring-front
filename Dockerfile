FROM node

ENV HOST=0.0.0.0
ENV NODE_OPTIONS=--openssl-legacy-provider

COPY . /app
WORKDIR /app
RUN npm install
RUN npm run build
RUN npm install -g serve
CMD serve -s build
