#!/bin/bash

# for production
if [ ! -f "src/vendor/autoload.php" ]; then
    composer install --no-ansi --no-dev --no-interaction --no-plugins --no-progress --no-scripts --optimize-autoloader
fi

if [ ! -f "src/.env" ]; then
    echo "Creating env file for env $APP_ENV"
    cp src/.env.example src/.env
    case "$APP_ENV" in
    "local")
        echo "Copying .env.example ... "
        cp src/.env.example src/.env
    ;;
    "prod")
        echo "Copying .env.prod ... "
        cp src/.env.production src/.env
    ;;
    esac
else
    echo "env file exists."
fi

# php artisan migrate
php artisan clear
php artisan optimize:clear
php artisan migrate

# Fix files ownership.
chown -R www-data .
chown -R www-data /src/app/storage
chown -R www-data /src/app/storage/logs
chown -R www-data /src/app/storage/framework
chown -R www-data /src/app/storage/framework/sessions
chown -R www-data /src/app/bootstrap
chown -R www-data /src/app/bootstrap/cache

# Set correct permission.
chmod -R 775 /src/app/storage
chmod -R 775 /src/app/storage/logs
chmod -R 775 /src/app/storage/framework
chmod -R 775 /src/app/storage/framework/sessions
chmod -R 775 /src/app/bootstrap
chmod -R 775 /src/app/bootstrap/cache

php-fpm -D
nginx -g "daemon off;"