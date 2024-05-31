import {
  ByProjectKeyRequestBuilder,
  Category,
  ClientResponse,
  createApiBuilderFromCtpClient,
  Customer,
  CustomerDraft,
  CustomerSignInResult,
  MyCustomerChangePassword,
  MyCustomerUpdate,
  ProductProjection,
} from '@commercetools/platform-sdk';
import { Client, ClientBuilder } from '@commercetools/sdk-client-v2';
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

  public async getProducts(): Promise<ProductProjection[]> {
    const data = await this.apiRoot.productProjections().search().get().execute();
    return data.body.results;
  }

  public async getCategories(): Promise<Category[]> {
    const data = await this.apiRoot.categories().get().execute();
    return data.body.results;
  }

  public async getCustomerData(): Promise<Customer> {
    const data = await this.apiRoot.me().get().execute();
    return data.body;
  }

  public async updateAccountData(updateData: MyCustomerUpdate) {
    const result = await this.apiRoot.me().post({ body: updateData }).execute();
    return result;
  }

  public async updatePassword(updateData: MyCustomerChangePassword) {
    const result = await this.apiRoot.me().password().post({ body: updateData }).execute();
    return result;
  }

  public async updateAddress(updateData: MyCustomerUpdate) {
    const result = await this.apiRoot.me().post({ body: updateData }).execute();
    return result.body;
    // {
    //       version: customerVersion,
    //       actions: [
    //         {
    //           action: 'changeAddress',
    //           addressId: addressIdToChange,
    //           address: changedAddress,
    //         },
    //       ],
    //     },
  }

  public async deleteAddress(updateData: MyCustomerUpdate) {
    const result = await this.apiRoot.me().post({ body: updateData }).execute();
    return result.body;
    // {
    //   version: customerVersion,
    //   actions: [
    //     {
    //       action: 'removeAddress',
    //       addressId: addressIdToRemove,
    //     },
    //   ],
    // }
  }

  public async addAddress(updateData: MyCustomerUpdate) {
    const result = await this.apiRoot.me().post({ body: updateData }).execute();
    return result.body;
  }

  public async setAddressBillingOrShipping(updateData: MyCustomerUpdate) {
    const result = await this.apiRoot.me().post({ body: updateData }).execute();
    return result;
    // {
    //   version: customerVersion,
    //   actions: [
    //     {
    //       action: 'addAddress',
    //       address: newAddress,
    //     },
    //     {
    //       action: 'addShippingAddressId' или 'addBillingAddressId'
    //       addressId: newAddress,
    //     },
    //   ],
    // }
  }
  //   body: {
  //   version: customerVersion,
  //   actions: [
  //     {
  //       action: 'addAddress',
  //       address: newAddress,
  //     },
  //     {
  //       action: 'removeAddress',
  //       addressId: addressIdToRemove,
  //     },
  //     {
  //       action: 'changeAddress',
  //       addressId: addressIdToChange,
  //       address: changedAddress,
  //     },
  //   ],
  // },
}

export const sdkService = new SdkService();
