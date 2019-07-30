Build:
docker build -t="docker-course-blog-fpm" .

Run:
docker run --name blog_fpm \
  -e "WORDPRESS_DB_HOST=blog_db" \
  -e "WORDPRESS_DB_USER=wordpress" \
  -e "WORDPRESS_DB_PASSWORD=password" \
  -e "WORDPRESS_DB_NAME=blog" \
  -p 9000:9000
  docker-course-blog-fpm

When already created:
docker start blog_fpm