/**
 * @author Juan Carlos Cancela <cancela.juancarlos@gmail.com>
 */

/* eslint-disable global-require */
const routes = {
  path: '/',
  children: [
    {
      path: '/',
      load: () => import(/* webpackChunkName: 'home' */ './home'),
    },

  ],

  async action({ next }) {
    const route = await next();
    route.title = `${route.title || 'Untitled Page'} - Kymed`;
    route.description = route.description || '';
    return route;
  },
};

if (__DEV__) {
  routes.children.unshift({
    path: '/error',
    action: require('./error').default,
  });
}

export default routes;
