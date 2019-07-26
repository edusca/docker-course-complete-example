### Create (run each in the same directory of the specific Dockerfile) and run containers for the first time
- docker build -t="docker-course-blog-db" .
- docker build -t="docker-course-blog-fpm" .
- docker build -t="docker-course-blog-server" .

#### Before running wordpress-fpm container we need to run the db container
- docker container run -d --name blog_db -p 3306:3306 docker-course-blog-db:latest

#### Run the wordpress-fpm container
- docker container run -d --name blog_fpm -p 9000:9000 -v /path-to-home-dir:/var/www/html --link blog_db docker-course-blog-fpm:latest 

#### With the fpm container and db linked to it, we run the server that will proxy the nginx requests to the fpm fast-cgi container
- docker container run -d --name blog_server -p 80:80 --link blog_fpm -v /path-to-home-dir:/var/www/html docker-course-blog-server:latest

### Manage the life cycle of the containers in the following order:

- docker start blog_db && docker start blog_fpm && docker start blog_server
