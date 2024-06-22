import {
  type AnonymousAuthMiddlewareOptions,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  type PasswordAuthMiddlewareOptions,
  type RefreshAuthMiddlewareOptions,
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

export const anonymousMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
  host: VITE_CTP_AUTH_URL,
  projectKey: VITE_CTP_PROJECT_KEY,
  credentials: {
    clientId: VITE_CTP_CLIENT_ID,
    clientSecret: VITE_CTP_CLIENT_SECRET,
    anonymousId: '',
  },
  scopes: [VITE_CTP_SCOPES],
  tokenCache: tokenController,
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

export const refreshAuthMiddlewareOption: RefreshAuthMiddlewareOptions = {
  host: VITE_CTP_AUTH_URL,
  projectKey: VITE_CTP_PROJECT_KEY,
  credentials: {
    clientId: VITE_CTP_CLIENT_ID,
    clientSecret: VITE_CTP_CLIENT_SECRET,
  },
  refreshToken: '',
  fetch,
};
