import {
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  type PasswordAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { tokenController } from './token.service';

const {
  VITE_CTP_CLIENT_ID,
  VITE_CTP_CLIENT_SECRET,
  VITE_CTP_PROJECT_KEY,
  VITE_CTP_API_URL,
  VITE_CTP_AUTH_URL,
  VITE_CTP_SCOPES,
} = import.meta.env;

export const authMiddlewareOptions: AuthMiddlewareOptions = {
  projectKey: VITE_CTP_PROJECT_KEY,
  host: VITE_CTP_AUTH_URL,
  credentials: {
    clientId: VITE_CTP_CLIENT_ID,
    clientSecret: VITE_CTP_CLIENT_SECRET,
  },
  scopes: [VITE_CTP_SCOPES],
  tokenCache: tokenController,
  fetch,
};

export const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: VITE_CTP_API_URL,
  fetch,
};

export const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
  projectKey: VITE_CTP_PROJECT_KEY,
  host: VITE_CTP_AUTH_URL,
  credentials: {
    clientId: VITE_CTP_CLIENT_ID,
    clientSecret: VITE_CTP_CLIENT_SECRET,
    user: {
      username: '',
      password: '',
    },
  },
  scopes: [VITE_CTP_SCOPES],
  tokenCache: tokenController,
};
