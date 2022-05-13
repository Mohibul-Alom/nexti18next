/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  i18n: {
    locales: ['en-US', 'fr', 'es-ES'],
    // establecemos el idioma por defecto si accede por ejemlo al "/home"
    defaultLocale: 'es-ES',
    // lista de dominios si lo tuvieramos por cada idioma
    domains: [
      {
        domain: 'example.com',
        defaultLocale: 'en-US',
      },
      {
        domain: 'example.fr',
        defaultLocale: 'fr',
      },
      {
        domain: 'example.es',
        defaultLocale: 'es-ES',
        // OPTIONAL: variable para realizar pruebas en local
        http: true,
      },
    ],
  }
}

module.exports = nextConfig
