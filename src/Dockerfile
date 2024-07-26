FROM 975050020416.dkr.ecr.us-east-2.amazonaws.com/prod-laravel-api-base-image:latest as php



# Copy configuration files.
COPY ./docker/php/php.ini /usr/local/etc/php/php.ini
COPY ./docker/php/php-fpm.conf /usr/local/etc/php-fpm.d/www.conf
COPY ./docker/nginx/nginx.conf /etc/nginx/nginx.conf

# Set working directory to ...
WORKDIR /app

# Copy files from current folder to container current folder (set in workdir).
COPY --chown=www-data:www-data . .

# Ensure the entrypoint script has executable permissions
RUN chmod +x ./docker/entrypoint.sh 
RUN ["chmod", "+x", "docker/entrypoint.sh"]

# Create laravel caching folders.
RUN mkdir -p ./storage/framework
RUN mkdir -p ./storage/framework/{cache, testing, sessions, views}
RUN mkdir -p ./storage/framework/bootstrap
RUN mkdir -p ./storage/framework/bootstrap/cache

# Adjust user permission & group.
# RUN apk --no-cache add shadow
RUN usermod --uid 1000 www-data
RUN groupmod --gid 1000  www-data

RUN mkdir -p /var/www/html
# RUN apk --no-cache add shadow && usermod -u 1000 www-data
# RUN docker-php-ext-install pdo pdo_mysql

# RUN apk --no-cache add pcre-dev ${PHPIZE_DEPS} \
#     && pecl install redis \
#     && docker-php-ext-enable redis \
#     && apk del pcre-dev ${PHPIZE_DEPS} 
EXPOSE 80
# Run the entrypoint file.
ENTRYPOINT [ "sh", "docker/entrypoint.sh" ]