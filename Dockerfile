FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY .output ./.output

EXPOSE 8080

ENV NITRO_PORT=8080
CMD ["node", ".output/server/index.mjs"]