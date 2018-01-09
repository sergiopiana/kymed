/**
 * @author Juan Carlos Cancela <cancela.juancarlos@gmail.com>
 */

/* eslint consistent-return: 0 */

import path from 'path';
import Promise from 'bluebird';
import express from 'express';
import cookieParser from 'cookie-parser';
import requestLanguage from 'express-request-language';
import bodyParser from 'body-parser';
import expressGraphQL from 'express-graphql';
import nodeFetch from 'node-fetch';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { getDataFromTree } from 'react-apollo';
import PrettyError from 'pretty-error';
import { IntlProvider } from 'react-intl';
import request from 'request';

import './serverIntlPolyfill';
import createApolloClient from './core/createApolloClient';
import App from './components/App';
import Html from './components/Html';
import { ErrorPageWithoutStyle } from './routes/error/ErrorPage';
import errorPageStyle from './routes/error/ErrorPage.css';
import createFetch from './createFetch';
import router from './router';
import models from './data/models';
import schema from './data/schema';
import assets from './assets.json'; // eslint-disable-line import/no-unresolved
import configureStore from './store/configureStore';
import { setRuntimeVariable } from './actions/runtime';
import { setLocale } from './actions/intl';
import config from './config';

const app = express();

// TODO Review later
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

//
// Register Node.js middleware
// -----------------------------------------------------------------------------


app.use(express.static(path.resolve(__dirname, 'public')));
app.use(cookieParser());
app.use(
  requestLanguage({
    languages: config.locales,
    queryName: 'lang',
    cookie: {
      name: 'lang',
      options: {
        path: '/',
        maxAge: 3650 * 24 * 3600 * 1000, // 10 years in miliseconds
      },
      url: '/lang/{language}',
    },
  }),
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//
// Authentication
// -----------------------------------------------------------------------------
if (__DEV__) {
  app.enable('trust proxy');
}

// Obtener integrantes
/* app.post('/obtenerIntegrantes', (req, res) => {
  const contra = req.body.contra;
  const url =
    'http://192.168.104.127/smgapi/react/afiliado_datos_integrantes.php/';

  const options = {
    uri: url,
    method: 'GET',
  };

  return request(options, (err, rsp, body) => {
    if (err) return res.status(401).send(err);
    if (!err && parseInt(rsp.statusCode, 10) === 200) {
      res.setHeader('content-type', 'application/json');
      return res.status(200).send(body);
    }
  });
}); */

app.post('/obtenerIntegrantes', (req, res) => {
  const json = [
    {
      label: 'SERGIO LUIS PIANA',
      inte: '01',
      nombre: 'SERGIO LUIS',
      apellido: 'PIANA',
      edad: '20',
      sexo: 'M',
    },
    {
      label: 'URSULA LUCILA LLASER',
      inte: '02',
      nombre: 'URSULA LUCILA',
      apellido: 'LLASER',
      edad: '40',
      sexo: 'F',
    },
  ];

  res.status(200).send(json);
});

app.post('/auth', (req, res) => {
  const url =
    'https://mobile.swissmedical.com.ar/cl/api-smg/v0/auth-login-Client';
  const documento = req.body.documento;
  const password = req.body.password;
  const json = {
    request: {
      tipodoc: 'DU',
      documento,
      password,
      canal: 'cfe67e56f3c90368a238',
      device: {
        bloqueado: true,
        recordar: true,
        deviceid: 'aaaaahhhgggkkkllllllllll',
        messagingid: 'EsteEsElIDDeMensajeria',
        nombre: 'Juauei 0.8 Mate',
      },
    },
  };

  const options = {
    uri: url,
    method: 'POST',
    json,
  };

  return request(options, (err, rsp, body) => {
    if (err) return res.status(401).send(err);
    if (!err && parseInt(rsp.statusCode, 10) === 200) {
      res.setHeader('content-type', 'application/json');
      return res.status(200).send(body);
    }
  });
});

app.post('/renew-token', (req, res) => {
  const url =
    'https://mobile.swissmedical.com.ar/cl/api-smg/v0/auth-refresh-Client';
  const { token } = req.body;

  const json = {
    refresh: {
      tipodoc: 'DU',
      canal: 'cfe67e56f3c90368a238',
      device: {
        bloqueado: true,
        recordar: true,
        deviceid: 'aaaaahhhgggkkkllllllllll',
        messagingid: 'EsteEsElIDDeMensajeria',
        nombre: 'Juauei 0.8 Mate',
      },
    },
  };

  const options = {
    uri: url,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Cache-Control': 'no-cache',
      Authorization: `Bearer ${token}`,
    },
    json,
  };

  return request(options, (err, rsp, body) => {
    if (err) {
      return res.status(401).send(err);
    }

    if (parseInt(rsp.statusCode, 10) !== 200) {
      return res.status(401).send(body);
    }
    if (!err && parseInt(rsp.statusCode, 10) === 200) {
      res.setHeader('content-type', 'application/json');
      return res.status(200).send(body);
    }
  });
});

app.post('/api/facturas', (req, res) => {
  const uri =
    'https://mobile.swissmedical.com.ar/cl/api-smg/v0/clientes/0441334/integrantes/01/facturas?desde=20160101&hasta=20170101';
  const { token } = req.body;
  const options = {
    uri,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  request(options, (err, rsp, body) => {
    if (err) {
      return res.status(401).send(err);
    }

    if (parseInt(rsp.statusCode, 10) === 401) {
      return res.status(401).send(body);
    }

    if (!err && parseInt(rsp.statusCode, 10) === 200) {
      res.setHeader('content-type', 'application/json');
      return res.status(200).send(body);
    }
  });
});

//
// Register API middleware
// -----------------------------------------------------------------------------
const graphqlMiddleware = expressGraphQL(req => ({
  schema,
  graphiql: __DEV__,
  rootValue: { request: req },
  pretty: __DEV__,
}));

app.use('/graphql', graphqlMiddleware);

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
  try {
    const apolloClient = createApolloClient({
      schema,
      rootValue: { request: req },
    });

    // Universal HTTP client
    const fetch = createFetch(nodeFetch, {
      baseUrl: config.api.serverUrl,
      cookie: req.headers.cookie,
      apolloClient,
    });

    const initialState = {
      user: req.user || null,
    };

    const store = configureStore(initialState, {
      cookie: req.headers.cookie,
      apolloClient,
      fetch,
      // I should not use `history` on server.. but how I do redirection? follow universal-router
      history: null,
    });

    store.dispatch(
      setRuntimeVariable({
        name: 'initialNow',
        value: Date.now(),
      }),
    );

    store.dispatch(
      setRuntimeVariable({
        name: 'availableLocales',
        value: config.locales,
      }),
    );

    const locale = req.language;
    const intl = await store.dispatch(
      setLocale({
        locale,
      }),
    );

    const css = new Set();

    // Global (context) variables that can be easily accessed from any React component
    // https://facebook.github.io/react/docs/context.html
    const context = {
      // Enables critical path CSS rendering
      // https://github.com/kriasoft/isomorphic-style-loader
      insertCss: (...styles) => {
        // eslint-disable-next-line no-underscore-dangle
        styles.forEach(style => css.add(style._getCss()));
      },
      fetch,
      // You can access redux through react-redux connect
      store,
      storeSubscription: null,
      // Apollo Client for use with react-apollo
      client: apolloClient,
      // intl instance as it can be get with injectIntl
      intl,
    };

    const route = await router.resolve({
      ...context,
      path: req.path,
      query: req.query,
      locale,
    });

    if (route.redirect) {
      res.redirect(route.status || 302, route.redirect);
      return;
    }

    const data = { ...route };

    const rootComponent = (
      <App context={context} store={store}>
        {route.component}
      </App>
    );
    await getDataFromTree(rootComponent);
    // this is here because of Apollo redux APOLLO_QUERY_STOP action
    await Promise.delay(0);
    data.children = await ReactDOM.renderToString(rootComponent);
    data.styles = [{ id: 'css', cssText: [...css].join('') }];

    data.scripts = [assets.vendor.js];
    if (route.chunks) {
      data.scripts.push(...route.chunks.map(chunk => assets[chunk].js));
    }
    data.scripts.push(assets.client.js);

    // Furthermore invoked actions will be ignored, client will not receive them!
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log('Serializing store...');
    }
    data.app = {
      apiUrl: config.api.clientUrl,
      state: context.store.getState(),
      lang: locale,
    };

    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
    res.status(route.status || 200);
    res.send(`<!doctype html>${html}`);
  } catch (err) {
    next(err);
  }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const locale = req.language;
  console.error(pe.render(err));
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
      styles={[{ id: 'css', cssText: errorPageStyle._getCss() }]} // eslint-disable-line no-underscore-dangle
      app={{ lang: locale }}
    >
      {ReactDOM.renderToString(
        <IntlProvider locale={locale}>
          <ErrorPageWithoutStyle error={err} />
        </IntlProvider>,
      )}
    </Html>,
  );
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
});

//
// Launch the server
// -----------------------------------------------------------------------------
const promise = models.sync().catch(err => console.error(err.stack));
if (!module.hot) {
  promise.then(() => {
    app.listen(config.port, () => {
      console.info(`The server is running at http://localhost:${config.port}/`);
    });
  });
}

//
// Hot Module Replacement
// -----------------------------------------------------------------------------
if (module.hot) {
  app.hot = module.hot;
  module.hot.accept('./router');
}

export default app;
