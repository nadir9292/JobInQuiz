FROM nginx:stable-alpine

#override le fichier par defaut de configuration
ADD ./nginx/default.conf /etc/nginx/conf.d/default.conf

ADD ./src/ var/www/html

RUN mkdir -p /var/www/html
