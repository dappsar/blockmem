# Interacción con la aplicación

## ¿Cómo iniciar la app?

### Paso 1: Descargar el código fuente con git

```bash
git clone <repo url>
```

### Paso 2: Configurar variables de entorno de la aplicación

Configurar las variables de entorno que usa la aplicación. Se puede ver un ejemplo en el archivo
[sample_env](../sample_env). Estas variables son importantes para dar inicio a la aplicación.

Si se agregan nuevas variables, tienen que quedar con el prefijo "REACT_APP", dado que así las
reconoce react, si no, no las va a reconcer al levantar con el process.env, por más que se use el
paquete cross_env.

### Paso 3: Iniciar la aplicación

```bash
yarn start
# El yarn start ejecuta el script "start" declarado en el package.json.
# Se abrirá un naveagador con la página de inicio de la app (https://localhost:3000/)
```

## ¿Cómo probar?

```bash
yarn test
```

## ¿Cómo hacer un build?

```bash
yarn build
```

## ¿Cómo limpiar el repo de git local?

```bash
# listar ramas borradas en remote
git remote prune origin --dry-run

# borrar ramas borradas en remote
git remote prune origin
```

## ¿Cómo construir con docker?

```bash
# docker
# more info: https://mherman.org/blog/dockerizing-a-react-app/
docker build .

# docker-compose
# more info: https://mherman.org/blog/dockerizing-a-react-app/
docker-compose up -d --build
docker build -f Dockerfile-prod -t sample:prod .
docker run -it -p 80:80 --rm sample:prod
```
