# NextJs + i18n

[Notion](https://www.notion.so/NextJs-i18n-9dd524bbf7d848d9ab95f896ecb6463f)

[Demo](https://nexti18next.vercel.app/)

---

[Requisitos](NextJs%20+%20i18n%209dd524bbf7d848d9ab95f896ecb6463f/Requisitos%208e01e9fdd0fa45e9a984324d9379d58a.md)

[Internacionalización](NextJs%20+%20i18n%209dd524bbf7d848d9ab95f896ecb6463f/Internacionalizacio%CC%81n%2057959d0d47f0405ab8e0b9ee6d0686a4.md)

---

# Requisitos

- [ ] Leer la documentación oficial
  - NextJs: [https://nextjs.org/docs](https://nextjs.org/docs)
  - Nextjs-i18n: [https://nextjs.org/docs/advanced-features/i18n-routing](https://nextjs.org/docs/advanced-features/i18n-routing)
  - i18next: [https://www.i18next.com/](https://www.i18next.com/)
  - next-i18next: [https://github.com/isaachinman/next-i18next](https://github.com/isaachinman/next-i18next)

---

- [ ] Iniciar proyecto
  ```bash
  npx create-next-app@latest --typescript
  # or
  yarn create next-app --typescript
  # or
  pnpm create next-app -- --typescript
  ```

Next: [🌍 Internacionalización](Internacionalizacio%CC%81n%2057959d0d47f0405ab8e0b9ee6d0686a4.md)

---

# Internacionalización

🤭 🤭 Si te has leído la documentación, enhorabuena, no necesitas seguir leyendo 🤭 🤭

# 📑 Índice

- 🧐 [Background](Internacionalizacio%CC%81n%2057959d0d47f0405ab8e0b9ee6d0686a4.md)
- ⚙️ [Configuración](Internacionalizacio%CC%81n%2057959d0d47f0405ab8e0b9ee6d0686a4.md)
- ➕ [Añadiendo idiomas - next-i18next](Internacionalizacio%CC%81n%2057959d0d47f0405ab8e0b9ee6d0686a4.md)
- [🚄Transición entre locales](Internacionalizacio%CC%81n%2057959d0d47f0405ab8e0b9ee6d0686a4.md)

---

# 🧐 Background

Nextjs tiene soporte integrado para rutas con i18n desde la **versión** **10.0.0.**

Podemos establecer una lista de localizaciones, la localización por defecto y las localizaciones específicas del dominio y Nextjs se encarga automáticamente de su gestión.

Este soporte está destinado a **complementar** las soluciones de bibliotecas i18n existentes como, **react-i18next** por ejemplo.

[Índice](Internacionalizacio%CC%81n%2057959d0d47f0405ab8e0b9ee6d0686a4.md)

---

# ⚙️ Configuración

El siguiente fragmento del código debemos introducirlo en el fichero `next.config.js` en el directorio raíz del proyecto.

Generalmente el nombre del local está compuesto por la lengua, región y script separado por un guión. La región y script son opcionales. Por ejemplo:

- `en-US` - inglés de la región de Estados Unidos
- `en` - también se puede dejar así

Resultado:

```jsx
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  i18n: {
    // all of locales suported in our app
    locales: ["en-US", "fr", "es-ES"],
    // set the default languages for our app
    defaultLocale: "es-ES",
    // list of the possible domain
    domains: [
      {
        domain: "example.com",
        defaultLocale: "en-US",
      },
      {
        domain: "example.fr",
        defaultLocale: "fr",
      },
      {
        domain: "example.es",
        defaultLocale: "es-ES",
        // OPTIONAL: varaible to test the locales in http
        http: true,
      },
    ],
  },
};

module.exports = nextConfig;
```

⚠️ ❗Cada vez que se modifica este fichero hay que **reiniciar** el server del nextjs ❗⚠️

```bash
> Found a change in next.config.js. Restart the server to see the changes in effect.
```

Ahora si queremos ir [http://localhost:8080/fr](http://localhost:8080/fr) deberíamos tener la misma página sin cambios, en caso de no introducir los cambios de arriba, obtendríamos **404 | This page could not be found.**

👏 ¡Ya tenemos funcionando i18n con nextjs! 👏

[Índice](Internacionalizacio%CC%81n%2057959d0d47f0405ab8e0b9ee6d0686a4.md)

---

# ➕ Añadir idiomas - next-i18next

Vamos a utilizar la librería `next-i18next` creado a partir de `react-i18next` para Nextjs.

```bash
yarn add next-i18next

# or

npm i --save next-i18next
```

<aside>
📚 Documentación: 
[https://www.i18next.com/](https://www.i18next.com/)
[https://github.com/isaachinman/next-i18next](https://github.com/isaachinman/next-i18next)

</aside>

Una vez añadido la librería, debemos realizar añadir su configuración en el fichero `next-i18next.config.js` en el directorio raíz del proyecto. Este fichero será idéntico al `next.config.js`:

```jsx
//next-i18next.config.js
module.exports = {
  i18n: {
    locales: ["en-US", "fr", "es-ES"],
    defaultLocale: "es-ES",
  },
};
```

⚠️ Si añadimos otro idioma en el futuro habrá que cambiar ambos ficheros con sus respectivos cambios.

<aside>
💡 Consejo: podemos exportar el objeto i18n desde `next.config.js` , y usarlo en el `next-i18next.config.js`, así se mantiene ambos ficheros sincronizados.

</aside>

Ahora debemos modificar `pages/_app.js` puesto que vamos a usar componente de orden superior (HOC) para englobar nuestra aplicación. Por lo que el fichero va a quedar de la siguiente manera:

```tsx
//pages/_app.tsx

import "../styles/globals.css";
import type { AppProps } from "next/app";

import { appWithTranslation } from "next-i18next";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp);
```

Ahora vamos a renderizar nuestra página dependiendo de unos ficheros json que contendrán los valores en dichos lenguajes.

Vamos a añadir 3 carpetas, una por cada idioma en nuestra aplicación: `en-US`, `fr` y `es-ES`. Podemos crear estos ficheros en cualquier directorio, en nuestro caso lo vamos hacer en el `/public/locale` quedandose de la siguiente manera:

`en-US/home.json`

```json
{
  "welcome_msg": "Welcome to your NextJs-i18n app"
}
```

`fr/home.json`

```json
{
  "welcome_msg": "Bienvenue dans notre application NextJs-i18n"
}
```

`es-ES/home.json`

```json
{
  "welcome_msg": "Bienvenido a nuestra aplicación de NextJs-i18n"
}
```

⚠️ ⚠️ Además del fichero `es-ES/home.json` la librería de `next-i18next` por defecto espera que haya una estructura de carpeta igual a esta:

```markdown
.
└── public
└── locales
├── en
| └── common.json
└── de
└── common.json
```

Por lo que nuestra estructura de ficheros sería la siguiente:

```markdown
.
└── public
└── locales
├── en-US
| └── common.json
| └── home.json
└── fr
└── common.json
└── home.json
```

<aside>
ℹ️ Vamos a utilizar un fichero json por cada página que tenemos en nuestro proyecto. Es decir, la página de “home” tendrá sus variables y la página de “about” tendrá las suyas propias. Y el fichero common.json podría ser necesario para todas las páginas.

</aside>

Una vez que tenemos estos ficheros creados vamos a utilizarlo en nuestra página de home que se encuentra en `/pages/index.tsx` . creados Vamos a utilizar unas de las ventajas que nos ofrece Nextjs que es `getStaticProps`para obtener los datos previo a la renderización de la página.

<aside>
💡 getStaticProps: [https://nextjs.org/docs/basic-features/data-fetching/get-static-props](https://nextjs.org/docs/basic-features/data-fetching/get-static-props)

</aside>

Primero añadimos la función `getStaticProps`

```tsx
//pages/index.tsx

import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale } = context;

  //locale can be string or undefined, so we do a check before returning the props
  if (locale) {
    return {
      props: {
        //fetch the file for our home page depending of the locale
        ...(await serverSideTranslations(locale, ["home"])),
      },
    };
  }
  //in case the locale is undefined, we can just serve our default languege file
  return {
    props: {
      ...(await serverSideTranslations("es-ES", ["home"])),
    },
  };
};
```

Todavía nuestra página no está haciendo uso del fichero de idiomas, para ello debemos añadir el siguiente hook `useTranslation()` de `next-i18next` de la siguiente manera:

```tsx
//pages/index.tsx

import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useTranslation } from "next-i18next";

const Home: NextPage = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {/* here we are accessing welcome_msg from home.json  */}
        <h1 className={styles.title}>{t("home:welcome_msg")}</h1>
      </main>
    </div>
  );
};

export default Home;
```

Ahora si, podemos ir a las siguientes rutas y veremos como cambia el mensaje de bienvenida:

- [http://localhost:3000/](http://localhost:8080/)
- [http://localhost:3000/en-US](http://localhost:8080/en-US)
- [http://localhost:3000/fr](http://localhost:8080/fr)

- Resultado final:

  ```tsx
  //pages/index.tsx
  import type { NextPage } from "next";
  import Head from "next/head";
  import { useTranslation } from "next-i18next";
  import { GetStaticProps } from "next";
  import styles from "../styles/Home.module.css";
  import { serverSideTranslations } from "next-i18next/serverSideTranslations";

  export const getStaticProps: GetStaticProps = async (context) => {
    const { locale } = context;

    //locale can be string or undefined, so we do a check before returning the props
    if (locale) {
      return {
        props: {
          ...(await serverSideTranslations(locale, ["home"])),
        },
      };
    }
    //in case the locale is undefined, we can just serve our default langueges
    return {
      props: {
        ...(await serverSideTranslations("es-ES", ["home"])),
      },
    };
  };

  const Home: NextPage = () => {
    const { t } = useTranslation();

    return (
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          {/* here we are accessing welcome_msg from home.json  */}
          <h1 className={styles.title}>{t("home:welcome_msg")}</h1>
        </main>
      </div>
    );
  };

  export default Home;
  ```

![https://media1.giphy.com/media/CuMiNoTRz2bYc/200.gif](https://media1.giphy.com/media/CuMiNoTRz2bYc/200.gif)

[Índice](Internacionalizacio%CC%81n%2057959d0d47f0405ab8e0b9ee6d0686a4.md)

---

# 🚄 Transición entre locales

La transición se puede realizar a través de `next/link` o `next/router` de la siguiente manera:

```tsx
//pages/index.tsx

//skipped imports
import Link from "next/link";

// skipped getStaticProps code

const Home: NextPage = () => {
  const { t } = useTranslation();

  return (
    <>
      {/*skipped code */}
      <h4> Static *</h4>*<ul style={{ margin: "0" }}>
        <li>
          <Link href="/" locale="es-ES">
            <a style={{ textDecoration: "underline" }}>To /</a>
          </Link>
        </li>
        <li>
          <Link href="/" locale="fr">
            <a style={{ textDecoration: "underline" }}>To /fr</a>
          </Link>
        </li>
        <li>
          <Link href="/" locale="en-US">
            <a style={{ textDecoration: "underline" }}>To /en-US</a>
          </Link>
        </li>
      </ul>
    </>
  );
};

export default Home;
```

Con `next/router` tendríamos:

```tsx
//pages/index.tsx

//skipped imports
import { useRouter } from "next/router";

// skipped getStaticProps code

const Home: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <>
      {/*skipped code */}
      <h4> With next/router </h4>
      <div
        style={{ cursor: "pointer" }}
        onClick={() => {
          router.push("/", "/", { locale: "fr" });
        }}
      >
        to /fr
      </div>
    </>
  );
};

export default Home;
```

¿Y si necesitamos rutas dinámicas? Pues también lo tenemos cubierto

```tsx
//pages/index.tsx

//skipped imports
import { useRouter } from "next/router";

// skipped getStaticProps code

const Home: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <>
      {/*skipped code */}
      <h4> Dynamic route with router.push() </h4>
      <div
        style={{ cursor: "pointer" }}
        onClick={() => {
          // This variable can come from the api of another page, etc.
          // and we could go to the locale of that page
          dynamicLink("fr");
        }}
      >
        to /fr
      </div>
    </>
  );
};

export default Home;
```
