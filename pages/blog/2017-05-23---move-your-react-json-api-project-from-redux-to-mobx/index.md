---
title: Move your React JSON API project from Redux to MobX
description: A few notes regarding global state management
cover: images/mobx.jpg
template: post
category: work
---

After a few projects using Redux, I've realized that it might not be the best solution for all types of projects. Don't get me wrong, redux works great, but I tend to find myself procrastinating a bit whenever I have to add a new value to the state tree. Perhaps is due to the amount of code required to do it.

Anyway, this post is going to be about MobX. I will explain step by step the changes I had to do to make it work. Note that I am also using JSON API, so I will cover this aspect as well.

First of all, you need to remove all the redux packages and references from your codebase. Then you have to install the following babel plugins to allow the use of decorators.

```javascript
yarn add babel-plugin-transform-decorators-legacy -D
yarn add babel-plugin-transform-class-properties -D
```

And then add them to the plugins array in your `.babelrc` file:

```javascript
"plugins": ["transform-decorators-legacy", "transform-class-properties"]
```

Now we have to use babel as the ESLint parser. Add this package:

```javascript
yarn add babel-eslint -D
```

Then, update the parser in the `.eslintrc` file:

```javascript
"parser": "babel-eslint"
```

Now let's install the following MobX packages:

```javascript
yarn add mobx -S
yarn add mobx-jsonapi-store -S
yarn add mobx-react -S
yarn add mobx-react-router -S
```

That's all the dependencies we need so far. Now let's look at some code.

First of all, we are going to create a store to handle the app global states, like the loader, notifications alerts and other common flags.

Create a new file called `store.jsx` and add the following code:

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

In this file, we are just creating the state variables and making them observable. We are also using `autorun` to automatically console log any changes in the store (just for debug purposes).

Now, let's refactor the `index.jsx` file. We are going to be using the latest version of react router (v4) and the [Material UI framework](www.material-ui.com), so bear that in mind.

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

The important bit to mention here is the object that contains the stores, one for the router and the other one that we created before. We then pass these stores to the MobX provider and that's it!

Now let's look at the `app.jsx` file, which will contain the routes and other common components:

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

All we are doing here is creating the routes and telling the component to be an observer, so that anytime the state variables change, the component will update. Notice also that we are reading the `title` from the route to know which page title to set using the `Helmet` package.

Remember to use `Switch` inside the `Router` and set the root path with `exact`, otherwise the page not found won't work.

Another example of how to use MobX, is for the loader component. We need to know when to display or hide the loader, so we are going to use the `isLoading` flag from the `store` we created. If the flag is `true` then the loader will be visible, otherwise not.

Let's look at the loader component:

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

All we are doing is setting a `fade-in` or 'fade-out' class depending on the value of the `isLoading` state.

Now, from any component in the app, we can change this value by doing `this.props.app.isLoading = false` and the loader will hide.

Another thing that wasn't working with the new router, is the update of the page (with the new component) when moving from one page to another. After digging a bit about the issue, I found [this stack-overflow answer](https://stackoverflow.com/questions/42875949/react-router-v4-redirect-not-working) that fixed it.

When you do `@inject('routing')` to a component, you get access to `this.props.routing`, so you can push new URLs to the browser history. That was working fine by doing something like this: `this.props.routing.push('/leads/231234')`.

The problem was that the page was not refreshing, so I had to wrap the export of the components with `withRouter()`: `export default withRouter(Home)`. You can import it from the `react-router` package.

Finally, let's look at how to integrate JSON API with MobX. This is a bit more difficult, but we'll get there!. The package we are using is [mobx-jsonapi-store](https://github.com/infinum/mobx-jsonapi-store).

A simple example of how to request data from the API and asign it a store would be the following:

```javascript
import { Store, config } from 'mobx-jsonapi-store';
const teststore = new Store();
config.defaultHeaders = {'xxxxxx': 'xxxxxxxxxx'};

teststore.request('http://localhost:3000/xxxxxxxxxxx')
  .then((response) => {
    const Data = teststore.sync(response.data);
    console.log(Data);
  });
```

UPDATE June 2022: I'm not very fond of using MobX in React projects anymore. It's better to keep everything under the same functional programming paradigm.
