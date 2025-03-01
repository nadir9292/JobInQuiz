FROM php:8.2-fpm-alpine

ADD ./src/ var/www/html

RUN mkdir -p /var/www/html
RUN apk --no-cache add shadow && usermod -u 1000 www-data
RUN docker-php-ext-install pdo pdo_mysql


RUN apk --no-cache add pcre-dev ${PHPIZE_DEPS} \
    && pecl install redis \
    && docker-php-ext-enable redis \
    && apk del pcre-dev ${PHPIZE_DEPS} \