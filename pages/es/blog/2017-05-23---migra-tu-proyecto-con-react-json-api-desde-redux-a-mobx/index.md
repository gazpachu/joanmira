---
title: Migra tu proyecto con React JSON API desde Redux a MobX
description: Algunas notas sobre la gestión global del estado
cover: /blog/move-your-react-json-api-project-from-redux-to-mobx/images/mobx.jpg
template: post
category: work
---

Después de unos cuantos proyectos usando Redux, me he dado cuenta de que puede no ser la mejor solución para todo tipo de proyectos. No me malinterpretes, Redux funciona muy bien, pero tiendo a encontrarme procrastinando un poco cada vez que tengo que añadir un nuevo valor al árbol de estado. Quizás se deba a la cantidad de código que se requiere para hacerlo.

De todos modos, este post va a ser sobre MobX. Voy a explicar paso a paso los cambios que he tenido que hacer para que funcione. Hay que tener en cuenta que también estoy usando la API JSON, así que también cubriré este aspecto.

En primer lugar, tienes que eliminar todos los paquetes y referencias redux de tu código base. Luego tienes que instalar los siguientes plugins de babel para permitir el uso de decoradores.

```javascript
yarn add babel-plugin-transform-decorators-legacy -D
yarn add babel-plugin-transform-class-properties -D
```

Y luego definirlos en el archivo `.babelrc`:

```javascript
"plugins": ["transform-decorators-legacy", "transform-class-properties"]
```

Ahora tenemos que usar babel como parser de ESLint. Añade este paquete:

```javascript
yarn add babel-eslint -D
```

Luego, actualiza el parser en el archivo `.eslintrc`:

```javascript
"parser": "babel-eslint"
```

Ahora vamos a instalar los siguientes paquetes de MobX:

```javascript
yarn add mobx -S
yarn add mobx-jsonapi-store -S
yarn add mobx-react -S
yarn add mobx-react-router -S
```

Esas son todas las dependencias que necesitamos hasta ahora. Ahora veamos algo de código.

En primer lugar, vamos a crear un *store* para manejar los estados globales de la aplicación, como el cargador, las alertas de notificaciones y otros flags comunes.

Crea un nuevo archivo llamado `store.jsx` y añade el siguiente código:

```javascript
import { autorun, observable } from 'mobx';

class MainStore {
  @observable isLoading = true;
  @observable isFetching = false;
  @observable isDesktop = true;
  @observable notification: { message: '', type: '' };
  @observable apiReady = false;
  @observable isDesktop = false;
  @observable isDesktop = false;
}

const store = new MainStore();

autorun(() => {
  // eslint-disable-next-line
  console.log(store);
});

export default store;
```

En este archivo, sólo estamos creando las variables de estado y haciéndolas observables. También estamos usando `autorun` para registrar automáticamente en la consola cualquier cambio en el *store* (sólo para propósitos de depuración).

Ahora, vamos a refactorizar el archivo `index.jsx`. Utilizaremos la última versión de react router (v4) y el [Material UI framework](www.material-ui.com), así que tenlo en cuenta.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { Provider } from 'mobx-react';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { Router } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import mainStore from './store';
import App from './components/app';
import './components/bundle.scss';

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();

const stores = {
  routing: routingStore,
  app: mainStore
};

const history = syncHistoryWithStore(browserHistory, routingStore);

ReactDOM.render(
  <Provider {...stores}>
    <Router history={history}>
      <MuiThemeProvider>
        <App />
      </MuiThemeProvider>
    </Router>
  </Provider>,
  document.getElementById('react-root')
);
```

Lo importante aquí es el objeto que contiene los *stores*, uno para el router y el otro que creamos antes. Luego pasamos estos *stores* al proveedor MobX y ¡ya está!

Ahora veamos el archivo `app.jsx`, que contendrá las rutas y otros componentes comunes:

```javascript
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Route } from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Helmet from 'react-helmet';
import Notification from './common/notification/notification';
import Loader from './common/loader/loader';
import Home from './home/home';
import PageNotFound from './pageNotFound/pageNotFound';

injectTapEventPlugin();

@inject('routing') @observer
class App extends Component {
  render() {
    const title = this.props.routing.title
      ? `${this.props.routing.title} | App name`
      : 'App name';

    return (
      <section className="app-container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route component={PageNotFound} title="Page not found" />
        </Switch>
        <Helmet title={String(title)} />
        <Loader />
        <Notification />
      </section>
    );
  }
}

export default App;
```

Todo lo que estamos haciendo aquí es crear las rutas y decirle al componente que sea un observador, para que cada vez que las variables de estado cambien, el componente se actualice. Fíjate también en que estamos leyendo el `title` de la ruta para saber qué título de página poner usando el paquete `Helmet`.

Recuerda usar `Switch` dentro del `Router` y establecer la ruta raíz con `exact`, de lo contrario la página no encontrada no funcionará.

Otro ejemplo de cómo usar MobX, es para el componente `Loader`. Necesitamos saber cuándo mostrar u ocultar el cargador, así que vamos a utilizar la variable `isLoading` del `store` que hemos creado. Si la variable es `true` entonces el cargador será visible, de lo contrario no.

Veamos el componente del cargador:

```javascript
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import classnames from 'classnames';
import Icon from '../lib/icon/icon';
import Logo from '../../../assets/svg/logo.svg';

@inject('app') @observer
class Loader extends Component {
  render() {
    return (
      <section
        className={classnames('loader', {
          'fade-in': this.props.app.isLoading,
          'fade-out': !this.props.app.isLoading
        })}
      >
        <div className="loader__circle" />
        <div className="loader__line-mask">
          <div className="loader__line" />
        </div>
        <Icon glyph={Logo} className="loader__logo" />
      </section>
    );
  }
}

export default Loader;
```

Todo lo que estamos haciendo es establecer una clase `fade-in` o `fade-out` dependiendo del valor del estado `isLoading`.

Ahora, desde cualquier componente de la aplicación, podemos cambiar este valor haciendo `this.props.app.isLoading = false` y el cargador se ocultará.

Otra cosa que no funcionaba con el nuevo router, es la actualización de la página (con el nuevo componente) al pasar de una página a otra. Después de indagar un poco sobre el tema, encontré [esta respuesta de stack-overflow](https://stackoverflow.com/questions/42875949/react-router-v4-redirect-not-working) que lo arregló.

Cuando haces `@inject('routing')` a un componente, obtienes acceso a `this.props.routing`, por lo que puedes enviar nuevas URLs al historial del navegador. Esto funcionaba bien haciendo algo como esto `this.props.routing.push('/leads/231234')`.

El problema era que la página no se refrescaba, así que tuve que envolver la exportación de los componentes con `withRouter()`: `export default withRouter(Home)`. Puedes importarlo desde el paquete `react-router`.

Por último, vamos a ver cómo integrar la API JSON con MobX. Esto es un poco más difícil, pero lo conseguiremos. El paquete que estamos utilizando es [mobx-jsonapi-store](https://github.com/infinum/mobx-jsonapi-store).

Un ejemplo sencillo de cómo solicitar datos de la API y asignarle un store sería el siguiente:

```javascript
import { Store, config } from 'mobx-jsonapi-store';
const teststore = new Store();
config.defaultHeaders = {'xxxxxx': 'xxxxxxxxxx'};

teststore.request('http://localhost:3000/xxxxxxxxxxx')
  .then((respuesta) => {
    const Data = teststore.sync(response.data);
    console.log(Datos);
  });
```

ACTUALIZACIÓN Junio 2022: Ya no me gusta mucho usar MobX en proyectos React. Es mejor mantener todo bajo el mismo paradigma de programación funcional.
