// Este script armar el manifest.json que queda en la carpeta public.
// El manifest es necesario para una PWA (junto con el service worker)
const fs = require('fs-extra') // eslint-disable-line
require('dotenv').config()

/**
 * Actualiza el archivo public/manifest.json
 * reempalazando el valor de GSM_SENDER_ID (firebase),
 * por el que existe en la variable de entorno GCM_SENDER_ID
 */
function updateManifest () {
  const cwd = process.cwd()
  const gcmSenderIdEnv = process.env.GCM_SENDER_ID || ''

  if (gcmSenderIdEnv === '') {
    throw new Error('GCM_SENDER_ID NOT DEFINED IN ENVIRONMENT')
  }

  const readPath = `${cwd}/public/manifest.json`
  let data = fs.readFileSync(readPath, 'utf8')
  data = data.replace('{GCM_SENDER_ID}', gcmSenderIdEnv)

  const path = `${cwd}/build/manifest.json`
  fs.writeFileSync(path, data, 'utf8')
}

try {
  updateManifest()
} catch (e) {
  // eslint-disable-next-line no-console
  console.error(e)
}
