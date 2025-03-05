HOla!!

en el repositorio existen 2 carpetas uno de back y otro de front

Back: 

Drupal en version 10

Nota:
el repositorio fue instalado con Docker - lando.

1. Para poder instalar el repositorio de back se debe ingresar por consola a la carpeta del repositorio y colocar el comando "lando start".
2. Despues de haber creado el contenedor de docker se debe descomprimir la base de datos (backup.sql.gz) y dejarla en la raiz de la carpeta.
3. a continuacion para importar la base de datos por consola se debe ingresar "lando db-import backup.sql".


Front

React

Nota:
Se recomienda iniciar react despues de tener instalado la parte de back

1. debe ingresar a la carpeta del respositorio (front-react) por consola y escribir npm start 
