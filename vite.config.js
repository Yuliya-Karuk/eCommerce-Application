import {devConfig} from './config/tasks/dev.js';
import {prodConfig} from './config/tasks/prod.js';

export default ({command, mode}) => {
  if (mode === 'development') {
    return devConfig;
  } else if (mode === 'production') {
    return prodConfig;
  }
};
