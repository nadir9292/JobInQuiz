ENV_FILE = src/.env
ENV_FILE_FRONT = front/.env
ENV_EXAMPLE_FILE = src/.env.example
# Détecter la commande Docker
DOCKER_COMPOSE := $(shell if command -v docker-compose > /dev/null 2>&1; then echo "docker-compose"; else echo "docker compose"; fi)

clear-cache:
	@$(DOCKER_COMPOSE) run --rm artisan optimize:clear

# run les migrations 
migrations:
	@$(DOCKER_COMPOSE) run --rm artisan migrate 

migrations-seed:
	@$(DOCKER_COMPOSE) run --rm artisan migrate
	@$(DOCKER_COMPOSE) run --rm artisan db:seed

passport:
	@$(DOCKER_COMPOSE) run --rm artisan passport:install

# pour lancer le projet des le début avec toutes les commande dans lordre
build-start:
	@$(DOCKER_COMPOSE) up --build --force-recreate -d nginx
	@$(DOCKER_COMPOSE) run --rm composer install
	@make env-file
	@echo "génération de la clé d'application... "
	@$(DOCKER_COMPOSE) run --rm artisan key:generate
	@echo "installation de passport ... "
	@make flush-db
	@make migrations-seed
	@make passport
	@echo "l'api est prête à être utiliser..."

#refraichi la base de donnée et en met ajour le clé id client de passport 
refresh:
	@$(DOCKER_COMPOSE) run --rm artisan migrate:refresh
	@make passport

nextjs:
	@make env-front
	@$(DOCKER_COMPOSE) up --build -d nextjs

flush-db:
	@$(DOCKER_COMPOSE) run --rm artisan migrate:fresh

#création du fichier env file 
env-front: 
	@if [ ! -f $(ENV_FILE_FRONT) ]; then \
		cp $(ENV_EXAMPLE_FILE) $(ENV_FILE_FRONT); \
		echo "\n# open AI Configuration" >> $(ENV_FILE_FRONT); \
		echo "NEXT_PUBLIC_OPENAI_API_KEY=VOTRE_CLE_ICI" >> $(ENV_FILE_FRONT); \
		echo "$(ENV_FILE_FRONT) a été crée avec succès."; \
	else \
		echo "$(ENV_FILE_FRONT) existe déjà."; \
	fi

env-file: 
	@if [ ! -f $(ENV_FILE) ]; then \
		cp $(ENV_EXAMPLE_FILE) $(ENV_FILE); \
		echo "\n# Database configuration" >> $(ENV_FILE); \
		echo "DB_CONNECTION=mysql" >> $(ENV_FILE); \
		echo "DB_HOST=mysql" >> $(ENV_FILE); \
		echo "DB_PORT=3306" >> $(ENV_FILE); \
		echo "DB_DATABASE=quizdevbdd" >> $(ENV_FILE); \
		echo "DB_USERNAME=homestead" >> $(ENV_FILE); \
		echo "DB_PASSWORD=secret" >> $(ENV_FILE); \
		echo "$(ENV_FILE) a été créer."; \
	else \
		echo "$(ENV_FILE) already exists. No changes made."; \
	fi


push: 
	@git add . 
	@git commit -m "add some updated"
	@git push origin feature/swagger
