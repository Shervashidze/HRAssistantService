# FROM nginx

# ENV NGINX_WORKER_PROCESSES auto
# ENV LISTEN_PORT 80
# EXPOSE 80

# COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
# CMD /bin/sh -c "envsubst '\$PORT \$HEROKU_APP_FRONT_URL \$HEROKU_APP_WIC_URL \$HEROKU_APP_LEARNING_URL \$HEROKU_APP_ID_URL' < /etc/nginx/conf.d/default.conf > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'

FROM node:13.12.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY Front/front-end/package.json ./
COPY Front/front-end/package-lock.json ./
RUN apk add --no-cache --virtual .gyp python make g++ && apk del .gyp
RUN npm install
RUN npm install react-scripts@3.4.1 -g
COPY Front/front-end/ ./
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY Front/front-end/nginx/nginx.conf /etc/nginx/conf.d/default.conf
#CMD ["nginx", "-g", "daemon off;"]
CMD /bin/sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'