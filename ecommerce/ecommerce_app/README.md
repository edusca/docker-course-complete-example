BUILD:
docker build -t="docker-course-ecommerce-app" .

RUN:
docker run --name ecommerce -p 3000:3000 -v /path-host:/code --link ecommerce_db --link ecommerce_session docker-course-ecommerce-app run prod

First time:
Nodejs mysql client 2 doesn't support the authentication protocol beacuse the hashing algorithm for the password, run this as root inside the ecommerce_db container:
- alter user 'ecommerce'@'%' identified with mysql_native_password by 'password';

Run the migrations:
- npm run migrations:migrate
