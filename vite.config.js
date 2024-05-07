import { devConfig } from './config/dev.js';
import { prodConfig } from './config/prod.js';

export default ({ mode }) => {
  if (mode === 'development') {
    return devConfig;
  } else if (mode === 'production') {
    return prodConfig;
  }
};
