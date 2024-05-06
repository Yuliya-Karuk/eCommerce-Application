import {ClientBuilder, type AuthMiddlewareOptions, type HttpMiddlewareOptions} from '@commercetools/sdk-client-v2';

const {
  VITE_CTP_CLIENT_ID,
  VITE_CTP_CLIENT_SECRET,
  VITE_CTP_PROJECT_KEY,
  VITE_CTP_API_URL,
  VITE_CTP_AUTH_URL,
  VITE_CTP_SCOPES,
} = import.meta.env;

const projectKey = VITE_CTP_PROJECT_KEY;
const scopes = [VITE_CTP_SCOPES];

const authMiddlewareOptions: AuthMiddlewareOptions = {
  projectKey,
  host: VITE_CTP_AUTH_URL,
  credentials: {
    clientId: VITE_CTP_CLIENT_ID,
    clientSecret: VITE_CTP_CLIENT_SECRET,
  },
  scopes,
  fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: VITE_CTP_API_URL,
  fetch,
};

export const ctpClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .build();
