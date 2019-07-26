Build:
docker build -t="docker-course-ecommerce-db" .

Run:
docker run --name ecommerce_db \
  -e "MYSQL_USER=ecommerce" \
  -e "MYSQL_PASSWORD=password" \
  -e "MYSQL_ROOT_PASSWORD=password" \
  -e "MYSQL_DATABASE=ecommerce" \
  docker-course-ecommerce-db

When already created:
docker start ecommerce_db