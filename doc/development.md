# Decisiones de Desarrollo

Se lista, a modo de resumen, las decisiones de desarrollo tomadas para ésta app:

- Metodología de trabajo para fuenteS: GIT + GITFLOW
- Estilos: Estilos en archivo separado con el framework de material-ui y tratando de centralizar
  todo en el theme.
- Localización: i18n
- Routing: [React-route](https://github.com/ReactTraining/react-router)
- Estado: Context API de React
- Responsive Design: Dado por material-ui
- Interacción con API: Con un simple fecth, centralizado en el archivo
  [services/apiUtils.js](services/apiUtils.js)
- Seguridad: Brindanda por la API para autenticación y autorización para recaptcha V3 brindado por
  Google.

A continuación, se entra en detalle en estos temas.

## Metodología de trabajo con los archivos fuentes

Usamos [gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) como
metodología para trabajar con diferentes branch y mantener el repo ordenado. Ver más información en
[éste documento](https://docs.google.com/document/d/1FDBSFUc3HDV9M-kdeISWd4DppIPMnukuBNsAAA1RYeE/edit)
de [Globons](https://www.globons.com/).

_Al hacer un commit_

Al hacer un commit a gitlab:

- Local: se ejecutarán las reglas de pre-commit (el lint por lo general) definidas en el
  package.json. Ver más info de pre-commit en el siguiente
  [link](https://www.npmjs.com/package/pre-commit).

- En el servidor: se ejecutará el pipeline de CI/CD definido en el archivo
  [.gitlab-ci.yml](.gitlab-ci.yml), que validará los estándares (lints) de la aplicación y realizará
  la ejecución de los tests.

## Estilos en React

De las [maneras que hay](https://www.oscarlijo.com/blog/estilos-en-react/) para aplicar estilos:

- Archivos CSS
- Estilos en línea
- Hojas de Estilo JS
- Módulos CSS
- [styled-components](https://styled-components.com/) (llamado css-in-js)
- Un Framework

Estamos usando la última, un framework.

## Localización / Lenguaje

El sitio admite localización con el archivo i18n.js, permitiendo traducir entre inglés y español.
Para ello, hay que incorporar las traducciones en [/public/locales](/public/locales).

Ver información detallada la localización en éste
[link](https://react.i18next.com/legacy-v9/step-by-step-guide).

## Manejo del estado en react

Lo manejamos a través de [context API](https://es.reactjs.org/docs/context.html), con Hooks y
siempre dentro del diseño de
[functional components](https://es.reactjs.org/docs/components-and-props.html) (no class
components).

## Responsive Design

Hay varias opciones para adaptar la interfaz de la aplicación al tamaño de la pantalla del
dispositivo en donde se esté visualizando (conocido como
[Responsive Design](https://es.wikipedia.org/wiki/Dise%C3%B1o_web_adaptable)):

- [flexbox](https://flexbox.buildwithreact.com/)
- [bootstrap](https://react-bootstrap.github.io/)
- [material-UI](https://material-ui.com/es/guides/responsive-ui/)
- [styled-components](https://styled-components.com/)
- [media queries](https://medium.com/better-programming/how-to-use-media-queries-programmatically-in-react-4d6562c3bc97)
- [Solo Inline Styles y JavaScript](https://codeburst.io/how-to-build-fully-responsive-react-apps-with-nothing-but-inline-styles-and-javascript-242c091b6ba1)
- [bootstrap-styled](https://bootstrap-styled.github.io/bootstrap-styled/)

Entre los posts leídos (ver referencias al final de éste README), optamos por usar para los estilos
[material-UI](https://material-ui.com/es/guides/responsive-ui/). Se puede ver artículos para hacer
vistas responsive en las referencias de éste README.

## Interacción con APIs

Se centraliza la interacción con la api en el archivo [services/apiUtils.js](services/apiUtils.js).
Este tiene el primero contacto con la API, luego hay una capa superior de abstracción que se deja en
cada archivo particular de API (ejemplo: apiLocality.js, apiPoints.js, etc.). Estos archivos hacen
un import de los métodos de apiUtils.js y llaman a su API paraticular en el proyecto de servicios
(C#).

## Generación de iconos / imagenes

La generación de iconos para los diversos dispositivos, se puede realizar en:
https://realfavicongenerator.net/

## Algunas consideraciones de desarrollo

- Usar arrow functions (= () =>) dentro de los componentes para evitar problema con 'this'. Más info
  [aquí](https://www.freecodecamp.org/news/this-is-why-we-need-to-bind-event-handlers-in-class-components-in-react-f7ea1a6f93eb/).

- En el route, se tiene que pasar una property en los componentes, por lo que se usa directamente
  render (más información en éste
  [link](https://tylermcginnis.com/react-router-pass-props-to-components/)). Se omite el uso de algo
  así: component={() => <Dashboard isAuthed={true} />}, para evitar lo que indica react en estos
  casos:

        "When you use the component props, the router uses React.createElement to create a new React element from the given component. That means if you provide an inline function to the component attribute, you would create a new component every render. This results in the existing component unmounting and the new component mounting instead of just updating the existing component.”

## Service Worker

El [service worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) es
(básicamente) un archivo de javascript que trabaja en segundo plano y orquesta las peticiones del
sitio, gestión de caché, acceso a persitencia de indexDB en el navegador, etc.

Es un requisito tenerlo para una
[PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps), además del archivo
manifest.json y HTTPS con un certificado válido.

Todo ello lo permite este proyecto en cualquier ambiente, incluso en ambiente local (ver
[deployment](./deployment.md)).

Las aplicación de reactJs creadas con [CRA](https://reactjs.org/docs/create-a-new-react-app.html)
generan un service worker por defecto, aunque tiene ciertas limitaciones (ver
[aquí](https://medium.com/free-code-camp/how-to-build-a-pwa-with-create-react-app-and-custom-service-workers-376bd1fdc6d3),
[aquí](https://github.com/facebook/create-react-app/issues/2237),
[aquí](https://www.freecodecamp.org/news/how-to-build-a-pwa-with-create-react-app-and-custom-service-workers-376bd1fdc6d3/)
y [aquí](https://github.com/facebook/create-react-app/pull/2714)), por lo que en ésta app se
customiza.

¿Cómo se customiza?

En el package.json, hay una llamda a un script que crea el sw:

```js
"sw": "yarn add workbox-build && node scripts/build-sw.js",
```

eso se llama (yarn sw) al hacer el build y al levantar el proyecto en local (yarn start)

```js
"start": "yarn install && yarn std && yarn sw && yarn manifest && yarn start-dev",
"start-dev": "cross-env HTTPS=true SSL_CRT_FILE=./.cert/cert.pem SSL_KEY_FILE=./.cert/key.pem react-scripts start",
"build": "cross-env HTTPS=true GENERATE_SOURCEMAP=false react-scripts build && yarn sw && yarn manifest",
```

El script están dentro de la carpeta [script/build-sw.js](script/build-sw.js). Termiando creando el
archivo firebase-messaging-sw.js en la carpeta build (para un build) y en la carpeta (public) para
desarrollo. En éste último caso, el archivo de sw (firebase-messaging-sw.js), se crea al levantar el
proyecto (yarn start) pero no queda persistente en el repo (está ignorado en .gitignore), dado que
se construye "hasheando" los archivos de imagenes, que cambian en cada construcción (por lo que
habría que subirlo al repo, todo el tiempo).

Al levantar el proyecto, se puede ver el service worker.

![Service worker en ambiente local](./images/sw-01.png)

Notas:

- Tener en cueta que se tiene que levantar con HTTPS y tener los certificados locales (ver más info
  en el readme de deployment).

- El archivo de service-worker final, toma el nombre firebase-messaging-sw.js, por
  [requerimientos de firebase](https://firebase.google.com/docs/cloud-messaging/js/receive).
