Build:
docker build -t="docker-course-blog-db" .

Run:
docker run --name blog_db \
  -e "MYSQL_USER=wordpress" \
  -e "MYSQL_PASSWORD=password" \
  -e "MYSQL_ROOT_PASSWORD=password" \
  -e "MYSQL_DATABASE=blog" \
  docker-course-blog-db

When already created:
docker start blog_db