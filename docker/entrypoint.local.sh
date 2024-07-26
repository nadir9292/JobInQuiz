#!/bin/bash

if [ ! -f "src/vendor/autoload.php" ]; then
    composer install --no-progress --no-interaction
fi

if [ ! -f "src/.env" ]; then
    echo "Creating env file for env $APP_ENV"
    cp src/.env.example src/.env
else
    echo "env file exists."
fi

php artisan migrate
php artisan optimize clear
php artisan view:clear
php artisan route:clear

php-fpm -D
nginx -g "daemon off;"