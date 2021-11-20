// Este script armar el archivo firebase-messaging-sw.js
/* eslint-env serviceworker */
const fs = require('fs-extra') // eslint-disable-line
const pathmodule = require('path')
const workbox = require('workbox-build') // eslint-disable-line

function build (folder) {
  const cwd = process.cwd()
  const pkgPath = `${cwd}/node_modules/workbox-sw/package.json`

  const pkg = require(pkgPath) // eslint-disable-line
  const readPath = `${cwd}/node_modules/workbox-sw/${pkg.main}`
  let data = fs.readFileSync(readPath, 'utf8')
  let path = `${cwd}/${folder}/workbox-sw.js`
  fs.writeFileSync(path, data, 'utf8')
  data = fs.readFileSync(`${readPath}.map`, 'utf8')
  path = `${cwd}/${folder}/${pathmodule.basename(pkg.main)}.map`
  fs.writeFileSync(path, data, 'utf8')

  workbox
    .injectManifest({
      globDirectory: `${folder}`,
      globPatterns: ['**/*.{html,js,css,png,jpg,json,ico,svg}'],
      globIgnores: ['sw-default.js', 'service-worker.js', 'workbox-sw.js'],
      swSrc: './src/sw-template.js',
      swDest: `${folder}/sw-default.js`
    })
    .then(() => {
      console.log('Service worker generated.') // eslint-disable-line
    })
}

try {
  build('public') // para localhost
  build('build') // para prod
} catch (e) {
  console.log(e) // eslint-disable-line
}
