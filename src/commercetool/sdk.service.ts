import {
  ByProjectKeyRequestBuilder,
  ClientResponse,
  createApiBuilderFromCtpClient,
  Customer,
  CustomerDraft,
  CustomerSignInResult,
  MyCustomerChangePassword,
  MyCustomerUpdate,
  Product,
} from '@commercetools/platform-sdk';
import { Client, ClientBuilder } from '@commercetools/sdk-client-v2';
import { CustomErrors } from '@utils/constants';
import { storage } from '@utils/storage';
import {
  anonymousMiddlewareOptions,
  httpMiddlewareOptions,
  passwordAuthMiddlewareOptions,
  refreshAuthMiddlewareOption,
} from './middlewareOptions';
import { tokenController } from './token.service';

const { VITE_CTP_PROJECT_KEY } = import.meta.env;

export class SdkService {
  private clientBuilder: ClientBuilder;
  private client: Client;
  private apiRoot: ByProjectKeyRequestBuilder;

  constructor() {
    this.clientBuilder = new ClientBuilder().withHttpMiddleware(httpMiddlewareOptions);
    if (storage.getTokenStore()) {
      this.createRefreshedClient();
    } else {
      this.createAnonymousClient();
    }
  }

  public createAnonymousClient() {
    this.client = this.clientBuilder.withAnonymousSessionFlow(anonymousMiddlewareOptions).build();

    this.apiRoot = createApiBuilderFromCtpClient(this.client).withProjectKey({
      projectKey: VITE_CTP_PROJECT_KEY,
    });
  }

  private createRefreshedClient() {
    const options = refreshAuthMiddlewareOption;
    options.refreshToken = storage.getTokenStore()?.refreshToken as string;
    this.client = this.clientBuilder.withRefreshTokenFlow(options).build();

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

  public async loginUser(email: string, password: string): Promise<ClientResponse<CustomerSignInResult>> {
    this.createWithPasswordClient(email, password);

    tokenController.refresh();

    const result = await this.apiRoot.me().login().post({ body: { email, password } }).execute();
    return result;
  }

  public async register(userData: CustomerDraft): Promise<ClientResponse<CustomerSignInResult>> {
    const result = await this.apiRoot.customers().post({ body: userData }).execute();
    return result;
  }

  public logoutUser() {
    this.createAnonymousClient();
  }

  public async getProducts(): Promise<Product[]> {
    try {
      const data = await this.apiRoot.products().get().execute();
      return data.body.results;
    } catch (error) {
      throw new Error(CustomErrors.SERVER_ERROR);
    }
  }

  public async getCustomerData(): Promise<Customer> {
    const data = await this.apiRoot.me().get().execute();
    return data.body;
  }

  public async updateAccountData(updateData: MyCustomerUpdate) {
    const result = await this.apiRoot.me().post({ body: updateData }).execute();
    return result;
    // const body: {
    //   version: currentVersion,
    //   actions: [
    //     {
    //       action: 'setFirstName',
    //       firstName: 'NewFirstName',
    //     },
    //     {
    //       action: 'setLastName',
    //       lastName: 'NewLastName',
    //     },
    //     {
    //       action: 'setDateOfBirth',
    //       dateOfBirth: '1990-01-01', // The new date of birth in the format YYYY-MM-DD
    //     },
    //     {
    //       action: 'changeEmail',
    //       email: 'new-email@example.com', // The new email address
    //     },
    //   ],
    // },
  }

  public async updatePassword(updateData: MyCustomerChangePassword) {
    const result = await this.apiRoot.me().password().post({ body: updateData }).execute();
    return result;
    // {
    //   version: 1, // The current version of the customer's data
    //   actions: [
    //     {
    //       action: 'changePassword',
    //       currentPassword: currentPassword,
    //       newPassword: newPassword,
    //     },
    //   ],
    // }
  }
}

export const sdkService = new SdkService();
