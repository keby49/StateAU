import {Aurelia} from 'aurelia-framework'
import environment from './environment';
import { initialState } from 'models/IState';

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature('resources');

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  aurelia.use.plugin('aurelia-store', { initialState });  // <----- REGISTER THE PLUGIN


  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  return aurelia.start().then(() => aurelia.setRoot());
}
