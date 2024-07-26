FROM nginx:stable-alpine

#override le fichier par defaut de configuration
# ADD ./nginx/default.prod.conf /etc/nginx/conf.d/default.prod.conf
ADD ./nginx/default.prod.conf /etc/nginx/default.conf

ADD ./src/ var/www/html

RUN mkdir -p /var/www/html
