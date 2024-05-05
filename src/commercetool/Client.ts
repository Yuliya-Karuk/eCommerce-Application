import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ctpClient } from './BuildClient';

const { VITE_CTP_PROJECT_KEY } = import.meta.env;

export const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: VITE_CTP_PROJECT_KEY });
