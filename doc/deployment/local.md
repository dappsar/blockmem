# Armado de ambiente local

Se describen a continuación los pasos para la instalación del ambiente local, asumiendo que el
sistema operativo es Window.

## Paso 1: Editor de texto

Se recomienda tener como editor [Visual Studio Code](https://code.visualstudio.com/) con los
siguientes plugins instalados:

- [Bracket Pair Colorizer](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer)
- [GitLens — Git supercharged](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
- [The ES7 React/Redux/GraphQL/React-Native Snippets Extension](https://scotch.io/tutorials/the-best-react-extension-for-vs-code#toc-the-es7-react-redux-graphql-react-native-snippets-extension)
- [Babel JavaScript](https://marketplace.visualstudio.com/items?itemName=mgmcdermott.vscode-language-babel)
- [JavaScript Standard Style](https://marketplace.visualstudio.com/items?itemName=chenxsan.vscode-standardjs)
- [npm Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.npm-intellisense)
- [Path IntelliSense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)
- [Prettier Code Formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [React Standard Style code snippets](https://marketplace.visualstudio.com/items/TimonVS.ReactSnippetsStandard)
- [EsLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

El proyecto cuenta con una carpeta _.vscode_ la cuenta tiene un archivo, el cual establece
parámetros de cofguración de vsCode al abrir el proyecto.

## Paso 2: Git

Descargar el instalador de Git del siguiente enlace: https://git-scm.com/, ejecutarlo y seguir las
indicaciones que aparezcan.

## Paso 3: NodeJs

Es recomendable instalar nodeJs con nvm, el cual permite tener varias versiones de nodeJs, npm y
yarn a la vez. Se puede descargar el binario para Windows desde el siguiente
[link](https://github.com/coreybutler/nvm-windows). Una vez instalado, ejecutar desde línea de
comando:

```bash
# Instalación de la versión 13 de nodeJs
nvm intall 14.0.0

# Seteo de la versión instalada de nodeJs
nvm use 14.0.0
```

## Paso 4: Yarn

Ejecutar el siguiente comando:

```bash
npm i -g yarn
```

## Paso 5: React

Ejecutar el siguiente comando:

```bash
npm i -g react-create-app
```

## Paso 6: Instalación global de estándares de Javascript

Ejecutar dentro de la carpeta raíz de la aplicación

```bash
yarn add global standard
```

## Paso 7: Dependencias de la aplicación

Ejecutar dentro de la carpeta raíz de la aplicación

```bash
yarn
```

## Paso 8: Instalación de bash-git in powerShell (opcional)

bash-git sirve para ver en powerShell (consola de windows) la rama del repositorio que estamos
usando en el prompt de la consola. Se puede instalar ejecutando los siguientes comandos en una
consola de powerShell, con permisos de administrador:

```
Set-ExecutionPolicy RemoteSigned
Install-Module bash-git
Import-Module bash-git
```

Más información en el siguiente
[enlace](https://git-scm.com/book/en/v2/Appendix-A%3A-Git-in-Other-Environments-Git-in-PowerShell).

## Paso 9: instalación de CA y Certificado

Este paso es necesario, para poder levantar la aplicación en https con un certificado válido,
condiciones necesarias para que funcione la app como
[PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps), el
[serviceWorker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) y las
notificaciones Push.

### 9.1: Instalar Chocolate para windows

Desde una ventana de PowerShell con derechos de administrador, ejecutar:

```sh
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
```

Ver otras opciones de instalación en windows o para lInux, mac
[aquí](https://chocolatey.org/install).

### 9.2: Instalar mKcert

```sh
choco install mkcert
```

Ver otras opciones de instalación [aquí](https://github.com/FiloSottile/mkcert).

### 9.3: Instalar una CA (Certification Authority)

```sh
mkcert -install
```

### 9.4: Crear el certificado del proyecto

Si existe la carpeta .cert con el certificado y key dentro, no hace falta ejecutar éste paso. En
caso contrario:

```sh
mkcert -key-file ./.cert/key.pem -cert-file ./.cert/cert.pem "localhost"
```
