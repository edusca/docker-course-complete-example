Build:
docker build -t="docker-course-blog-server" .

Run:
docker container run -d --name blog_server \
  -p 80:80 \
  --link blog_fpm \
  -v /path-to-home-dir:/var/www/html \
   docker-course-blog-server:latest

When already created:
docker start blog_server