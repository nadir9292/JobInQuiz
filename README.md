# API de l'application JOB'IN QUIZ

### Cette documentation vous guide pour installer et utiliser l'API et le front du site Job'in quiz.

## Installation

1. **Clonez le projet**
   ```bash
   git clone https://github.com/dani03/quizDEV.git
   cd quizDEV
 
   ```

1.bis **Si vous avez la version `docker compose` et pas `docker-compose` Lancer toutes les commandes ci-dessous avec la commande** 
   ```bash
      make build-start
   ```

2. **Installez les dépendances**
   ```bash
   docker-compose run --rm composer install
   ```
3. **Configurez l'environnement**

- Allez dans le dossier src.
- Copiez le fichier .env.exemple et renommez-le .env.
- Ajoutez le bloc suivant dans .env :

  ```bash
  DB_CONNECTION=mysql
  DB_HOST=mysql
  DB_PORT=3306
  DB_DATABASE=quizdevbdd
  DB_USERNAME=homestead
  DB_PASSWORD=secret
  ```

4. **Générez la clé de l'application**
   ```bash
   docker-compose run --rm artisan key:generate
   ```
5. **Installez Passport**

   ```bash
   docker-compose run --rm artisan migrate
   ```
   ```bash
   docker-compose run --rm artisan passport:install
   ```
6. **Supprimez le dossier "mysql" s'il existe à la racine du projet**

7. **Lancez les conteneurs**
   ```bash
   docker-compose up --build -d nginx
   docker-compose up --build -d nginx nextjs
   docker-compose ps
   ```
   Testez l'API à l'endpoint : http://localhost/api/v1/test.

## Lancer les migrations

1. **Lancer les migrations**

   ```bash
   docker-compose run --rm artisan migrate
   ```

2. **Lancer les seeders**
   ```bash
   docker-compose run --rm artisan db:seed
   ```

## Accès à PHPMyAdmin

- PHPMyAdmin : http://localhost:2023

- Adminer : http://localhost:2025
  - Nom d'utilisateur : homestead
  - Mot de passe : secret

## Rafraîchir la base de données

Pour rafraîchir la base de données après une modification :

```bash
    docker-compose run --rm artisan db:seed
```

```bash
    docker-compose run --rm artisan passport:install
```

```bash
    docker-compose run --rm artisan db:seed
```

## Documentation des endpoints de l'API

- Accédez à la documentation des endpoints : <a href="localhost:3002/docs/api#/">Documentation API avec SCRAMBLE.</a>

## Front

```bash
cd /front
npm install
npm run dev
```

## Fichier .gitignore

```bash
/mysql/*
/front/.next
/front/node_modules
/front/README.md
```

## Générer des questions avec OpenAI

- Ajoutez une clé OPENAI_API_KEY dans votre fichier .env avec votre clé API OpenAI.
- Créez une clé OpenAI sur la plateforme OpenAI.

## En cas de problème de cache BDD

```bash
docker-compose run --rm artisan cache:clear
docker-compose run --rm artisan config:clear
```
