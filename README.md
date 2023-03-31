# Theo Petit - Node JS API
A school project to create a Node JS API with Hapi JS and MySQL.

## Api documentation
You can test at this link : http://localhost:3000/documentation

The API is composed of 3 main parts :

- The user part :
  - POST /users/ - For the creation of a user
  - GET /users - For the get all users
  - GET /users/{id} - For the get a user
  - PATCH /users/{id} - For the update a user
  - DELETE /users/{id} - For the delete a user

- The movie part :
  - POST /movies/ - For the creation of a movie
  - GET /movies - For the get all movies
  - GET /movies/{id} - For the get a movie
  - PATCH /movies/{id} - For the update a movie
  - DELETE /movies/{id} - For the delete a movie

- The favorite part :
  - POST /favorite/{movieId} - For the creation of a favorite
  - GET /favorite - For the get all favorites
  - DELETE /favorite/{movieId} - For the delete a favorite

For this project, you need to have installed on your computer :
* Docker : https://docs.docker.com/install/
* Node JS : https://nodejs.org/en/download/
* NPM : https://www.npmjs.com/get-npm

Follow these steps to install the project :

1- Clone the project where you want to install it and install the dependencies with this command :
```bash
npm install
  ```
3- Create the docker container with this command :
```bash
docker run -p 3306:3306 --name hapi-mysql -e MYSQL_ROOT_PASSWORD=hapi -e MYSQL_DATABASE=user -d mysql:5
  ```
4- Create a file named `.env` in the server folder like this :
```bash
#Database
DB_HOST='0.0.0.0'
DB_USER='root'
DB_PASSWORD='hapi'
DB_DATABASE='user'

#Mailer
MAIL_HOST=smtp.ethereal.email
MAIL_PORT=587
MAIL_USERNAME=ethereal_username
MAIL_PASSWORD=ethereal_password
MAIL_FROM_ADDRESS=theo.petit@etu.unilim.fr
```
5 You should create an account on https://ethereal.email/ to get the username and password for the mailer.
6 For start the project, you should run this command :
```bash
npm start
  ```
## PS : For the first admin user, you should create it with the API but update his role manually in the database to `admin`.



