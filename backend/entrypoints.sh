#!bin/bash

echo "esperando a la base de datos...."
while ! nc -z db 5432; do 
    sleep 1 
done 
echo "Base de datos disponible" 


python manage.py migrate 
python manage.py collectstatic --noinput 

exec daphne -b 0.0.0.0 -p 9000 proyecto.asgi:application