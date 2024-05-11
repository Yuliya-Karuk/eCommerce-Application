import {
  ByProjectKeyRequestBuilder,
  createApiBuilderFromCtpClient,
  CustomerDraft,
  Product,
} from '@commercetools/platform-sdk';
import { Client, ClientBuilder } from '@commercetools/sdk-client-v2';
import { CustomErrors } from '../types/enums';
import { authMiddlewareOptions, httpMiddlewareOptions, passwordAuthMiddlewareOptions } from './middlewareOptions';
import { tokenController } from './token.service';

const { VITE_CTP_PROJECT_KEY } = import.meta.env;

export class SdkService {
  private clientBuilder: ClientBuilder;
  private client: Client;
  private apiRoot: ByProjectKeyRequestBuilder;

  constructor() {
    this.clientBuilder = new ClientBuilder().withHttpMiddleware(httpMiddlewareOptions);
    this.createCtpClient();
  }

  private createCtpClient() {
    this.client = this.clientBuilder.withClientCredentialsFlow(authMiddlewareOptions).build();

    this.apiRoot = createApiBuilderFromCtpClient(this.client).withProjectKey({
      projectKey: VITE_CTP_PROJECT_KEY,
    });
  }

  private createWithPasswordClient(email: string, password: string) {
    const options = passwordAuthMiddlewareOptions;
    options.credentials.user = {
      username: email,
      password,
    };

    this.client = this.clientBuilder.withPasswordFlow(options).build();

    this.apiRoot = createApiBuilderFromCtpClient(this.client).withProjectKey({
      projectKey: VITE_CTP_PROJECT_KEY,
    });
  }

  public async loginUser(email: string, password: string): Promise<boolean> {
    this.createWithPasswordClient(email, password);

    try {
      tokenController.set({
        token: '',
        expirationTime: 0,
        refreshToken: '',
      });
      await this.apiRoot.me().login().post({ body: { email, password } }).execute();
      return true;
    } catch (error) {
      throw Error(CustomErrors.LOGIN_ERROR);
    }
  }

  public async register(userData: CustomerDraft): Promise<boolean> {
    try {
      await this.apiRoot.customers().post({ body: userData }).execute();
      return true;
    } catch (error) {
      throw Error(CustomErrors.ALREADY_REGISTER_ERROR);
    }
  }

  public async getProducts(): Promise<Product[]> {
    try {
      const data = await this.apiRoot.products().get().execute();
      return data.body.results;
    } catch (error) {
      throw Error(CustomErrors.SERVER_ERROR);
    }
  }
}

export const sdkService = new SdkService();

// export const ctpClient = new ClientBuilder()
//   .withClientCredentialsFlow(authMiddlewareOptions)
//   .withHttpMiddleware(httpMiddlewareOptions)
//   .build();

// export const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
//   projectKey: VITE_CTP_PROJECT_KEY,
// });
