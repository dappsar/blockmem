# CI/CD

## Gitlab

En gitlab tienen que estar configuradas variables de entorno, que son utilizadas en el archivo
[giltab-ci.yml](giltab-ci.yml). Estas variable son:

- CI_REGISTRY: docker.io
- CI_REGISTRY_IMAGE: index.docker.io/delsud/javit-front
- CI_REGISTRY_PASSWORD: password de usuario "delsud" en docker.hub
- CI_REGISTRY_USER: delsud
- HEROKU_API_KEY: api_key para la aplicación javit
- HEROKU_APP: javit
- NODE_TLS_REJECT_UNAUTHORIZED=0
- REACT_APP_HTTPS=true
- Mas todas las variables de sample_env por ambiente con el sufijo \_stg o \_prd (según sea staging
  o production)

## Deploy en Heroku

Se puede desplegar la app en heroku, desde los fuentes o con docker. Para cualquiera de los casos
tiene que estar instalado el [cliente de heroku](https://devcenter.heroku.com/articles/heroku-cli) o
instalar con npm (npm install -g heroku).

### Deploy en heroku desde los fuentes

Ejemplo, para crear una app con CRA de react y subirla a heroku (para tener de referencia):

```
# ref: https://blog.heroku.com/deploying-react-with-zero-configuration

npm install -g create-react-app
create-react-app my-app
cd my-app
git init
git add .
git commit -m "react-create-app on Heroku"

# Cambiar "app_name" por un nombre o dejar en blanco para un nombre al azar

heroku create app_name -b https://github.com/mars/create-react-app-buildpack.git
git push heroku master
heroku open
```

Luego de creada, para posteriores subidas:

```
# cambiar "branchLocal" por el branch que se quiere subir develop, feature/xx, etc.
git push heroku branchLocal:master
```

Para configurar las variables de entorno, ejecutar

```
heroku config:set nombre_variable=valor
```

Opcionalmente, se pueden configurar manualmente, en la sección "settings" de la app en el sitio de
heroku.

### Deploy en heroku con el container de Docker

Crear un archivo heroku.yml

```
build:
  docker:
    web: Dockerfile
run:
  web: yarn start
```

Luego setear el uso de containers

```
heroku stack:set container
git push heroku master
```

Hay algunos scripts para los pasos con docker en la carpeta [./scripts](./scripts) o más información
en el [sitio de heroku](https://devcenter.heroku.com/articles/build-docker-images-heroku-yml).

## Deploy en heroku con Gitlab

Se puede desplegar en heroku mediante el script de CI/CD. El script está preparado, pero actualmente
no se ejecuta en ninguna rama. En caso de querer habiltiarlo, cambiar la rama en el script de gitlab
(gitlab-ci.yml) y verificar que estén configuradas las variables de entorno del proyecto en la
sección de variables de CI/CD en Gitlab.

Por otro lado, en heroku, tiene que estar configurado el boilerplate para react
[mars/create-react-app](https://elements.heroku.com/buildpacks/mars/create-react-app-buildpack) y
estar configuradas las variables de entorno que utiliza la aplicación (ver archivo
[sample_env](sample_env))

Link al buildpack utilizado (se configurada en settings de la app de heroku):
https://buildpack-registry.s3.amazonaws.com/buildpacks/mars/create-react-app.tgz

## Descarga de fuentes de heroku

```
heroku git:clone -a app_name
```

## Deploy con Docker / docker-compose

Se puede desplegar la app, usando docker y docker-compose. Están los archivos en la raíz, solo hace
falta tener instalador docker (docker desktop en windows) y configurar las variables de entornos.

Se puede ver las línea para construir la imagen en los archivos de heroku (ver carpeta ./scripts) o
en el archivo [gitlab-ci.yml](./.gitlab-ci.yml).
