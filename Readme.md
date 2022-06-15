![Estoes](assets/images/logo.png "Esto es Agencia Digital")
# Backend challenge
* Se debe crear un servicio que maneje los datos de la plataforma de gestiÃ³n de proyectos.
* Si bien no hay restricciÃ³n de tiempo, creemos que de 3 a 5 horas es un tiempo razonable para entregarlo con calidad.

## DiseÃ±o
PodÃ©s encontrar el diseÃ±o [acÃ¡](https://www.figma.com/file/YLDHikbDgfsZbVdEbO0H6U/Full-Stack-Test-1?node-id=1%3A1701). La referencia sirve para tener una idea clara del servicio a desarrollar.

## DefiniciÃ³n funcional
El usuario accede a un administrador de proyectos para realizar la gestiÃ³n, puede crearlos, editarlos y eliminarlos.

* El usuario puede crear proyectos y editarlos.
* El usuario puede eliminar proyectos.
* El usuario puede asignar proyectos a usuarios.
* El usuario puede buscar un proyecto.

## API REST
El objetivo es realizar la construcciÃ³n de endpoint clase Projects que represente la informaciÃ³n del proyecto como muestra el diseÃ±o.

* Realizar el schema de base de datos de proyectos(MySQL).
* El endpoint debe traer un listado de proyectos con paginado.
* Traer un solo proyecto /id.
* Realizar un POST para insertar o editar un proyecto.
* Realizar un DELETE para eliminar un proyecto.
* Debe permitir realizar una bÃºsqueda por nombre de proyecto.
* Asignar multiples usuarios a un proyecto.
* Se debe utilizar swagger para documentar los endpoints.

## Definiciones tÃ©cnicas
* El servicio debe estar realizado en Laravel, Node Express o el framework de JS que te sea mÃ¡s comodo utilizar.
* La aplicaciÃ³n debe estar publicada y debe ser accesible mediante un link(Ver Netfly, Heroku) o cualquier webserver.
* El cÃ³digo de la aplicaciÃ³n debe estar subida a un repositorio de pÃºblico acceso.

## Consideraciones
* Es importante que existan las validaciones de datos, ejemplo si se solicita un proyecto que no existe.

## Muchas gracias por tu tiempo!