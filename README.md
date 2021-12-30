# <https://data-viz.josefabio.com>

[![2021-12-29-20-19.png](https://i.postimg.cc/Yq75BB5D/2021-12-29-20-19.png)](https://postimg.cc/SjZTc3Nc)

---

<!-- table-of-content GFM -->

+ [Herramientas de testing](#herramientas-de-testing)
  * [Cypress](#cypress)
    - [Correr los unit-test](#correr-los-unit-test)
    - [Configuración de Cypress para los unit-test.](#configuración-de-cypress-para-los-unit-test)
  * [Jest](#jest)
+ [Estructura del proyecto](#estructura-del-proyecto)
  * [`assets`](#assets)
  * [`components`](#components)
  * [`utils`](#utils)
  * [`views`](#views)
  * [`styles`](#styles)
  * [Créditos](#créditos)
+ [Librerías ocupadas](#librerías-ocupadas)
  * [Emotion styled](#emotion-styled)
  * [React Bootstrap](#react-bootstrap)
  * [D3](#d3)

<!-- table-of-content -->

---

# Herramientas de testing

## Cypress

Usé Cypress tanto para End-to-End como para **Unit** testing.

Preferí usar Cypress para Unit testing porque tiene las mismas ventajas que Cypress ya entrega, como poder ver tus tests
en vivo cuando se ejecutan, a pesar de que está en estado alpha esta funcionalidad de Cypress, y tuve algunos problemas
con un bug, pero encontré una forma de sobrellevarlo por el momento.

Aquí hay algunos materiales que me ayudaron a tomar la decisión:

* [Component testing - Introduction](https://docs.cypress.io/guides/component-testing/introduction).
* [Introducing the Cypress Component Test Runner– new in 7.0.0](https://www.cypress.io/blog/2021/04/06/introducing-the-cypress-component-test-runner/).
* [Component Testing Example: Create React App](https://github.com/cypress-io/cypress-component-testing-examples/tree/main/create-react-app).

### Correr los unit-test

* **Para abrir la UI:** `npx cypress open-ct`.
  [![2021-12-29-12-57.png](https://i.postimg.cc/zf00Bsvq/2021-12-29-12-57.png)](https://postimg.cc/rdRSZY5H)

* **Para hacerlo sin UI:** `npx cypress run-ct`.
  [![2021-12-29-13-20.png](https://i.postimg.cc/pXMzNPY3/2021-12-29-13-20.png)](https://postimg.cc/6TzynJPh)

### Configuración de Cypress para los unit-test.

El regex particular de este proyecto para los unit-test está definido de forma que solo aquellos tests que estén bajo una carpeta `__test__` serán tomados en cuenta. 

```
"component": {
  "componentFolder": "src",
  "testFiles": "**/__test__/*.spec.{js,jsx,ts,tsx}"
}
```

La forma en la que están organizados los componentes es que cada uno va en su propia carpeta, para que ahí mismo pueda ir la carpeta `__test__` de ese componente.

```
.
└── /Button
    ├── /__test__
    |   └── Button.spec.js
    └── Button.js
```

## Jest

Usé Jest para hacer un snapshot test, pero no continué con Jest ya que comencé a usar Cypress para unit testing, por lo que el test de snapshot no es necesario, pero lo dejo como evidencia, así como un test para DropDownSearch en el cual intenté usar `fireEvent`, pero está inconcluso.

# Estructura del proyecto

```
.
└── /src
    ├── /assets
    ├── /components
    ├── /utils
    ├── /views
    ├── /styles
    ├── index.js
    └── App.js
```

## `assets`
Fotos, logotipos, archivos, videos, etc.


## `components`
Componentes que se pueden ocupar globalmente, genéricos.

El `index.js` es para poder importar los componentes en una sola línea:
`import { TextField, Select, Radio } from '@components'`

El `index.js` seguirá esta estructura:
```
import { TextField } from './TextField/TextField'
import { Select } from './Select/Select'
import { Radio } from './Radio/Radio'

export { TextField, Select, Radio }
```

## `utils`
Funciones globales que hacen cosas muy genéricas, fáciles de reutilizar en diversos contextos.


## `views`
Todas las páginas del sitio. Ej: El home o la de Contacto.


## `styles`
Todos los archivos que exporten objetos que se puedan ocupar luego con emotion/styled.

## Créditos

Basé la estructura en este blog: <https://www.taniarascia.com/react-architecture-directory-structure>

# Librerías ocupadas

## Emotion styled
Es para darle estilo a los elementos de React sin los problemas de usar archivos CSS, ni la pérdida en preformance al usar CSS inline.

Resumen de toda la sintaxis: <https://emotion.sh/docs/styled>.

Cómo aplicar un tema: <https://emotion.sh/docs/theming>.

Una introducción práctica: <https://mauriciogc.medium.com/react-formas-de-dise%C3%B1ar-componentes-de-react-desde-estilos-en-l%C3%ADnea-hasta-css-in-js-5cafe15b13fa#be17>. Esa es una gran página que muestra un resumen de muchas formas de crear estilos en React, de las cuales he deducido que la más apropiada es `@emotion/styled`.

## React Bootstrap

Documentación: <https://react-bootstrap.github.io/components/alerts>.

## D3

Documentación: <https://devdocs.io/d3>
