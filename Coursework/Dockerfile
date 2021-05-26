FROM nginx

ENV NGINX_WORKER_PROCESSES auto
ENV LISTEN_PORT 80
EXPOSE 80

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
CMD /bin/sh -c "envsubst '\$PORT \$HEROKU_APP_FRONT_URL \$HEROKU_APP_WIC_URL \$HEROKU_APP_LEARNING_URL \$HEROKU_APP_ID_URL' < /etc/nginx/conf.d/default.conf > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'