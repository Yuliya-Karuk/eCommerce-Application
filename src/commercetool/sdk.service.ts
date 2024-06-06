import {
  ByProjectKeyRequestBuilder,
  Cart,
  Category,
  ClientResponse,
  createApiBuilderFromCtpClient,
  Customer,
  CustomerDraft,
  CustomerSignInResult,
  MyCartUpdateAction,
  MyCustomerChangePassword,
  MyCustomerUpdate,
  MyCustomerUpdateAction,
  ProductProjection,
  ProductType,
} from '@commercetools/platform-sdk';
import { Client, ClientBuilder } from '@commercetools/sdk-client-v2';
import { LoginCartData, QueryParams } from '@models/index';
import { storage } from '@utils/storage';
import { isNotNullable } from '@utils/utils';
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
    const anonymousId = crypto.randomUUID();
    storage.setAnonId(anonymousId);
    anonymousMiddlewareOptions.credentials.anonymousId = anonymousId;

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

  private async createWithPasswordClient(email: string, password: string) {
    const options = passwordAuthMiddlewareOptions;
    options.credentials.user = {
      username: email,
      password,
    };

    tokenController.refresh();

    this.client = this.clientBuilder.withPasswordFlow(options).build();

    this.apiRoot = createApiBuilderFromCtpClient(this.client).withProjectKey({
      projectKey: VITE_CTP_PROJECT_KEY,
    });

    this.requestForToken();
  }

  private async requestForToken() {
    await this.apiRoot.me().get().execute();
    storage.setTokenStore(tokenController.get());
  }

  public async loginUser(email: string, password: string): Promise<Customer> {
    const auth: LoginCartData = {
      email,
      password,
      activeCartSignInMode: 'MergeWithExistingCustomerCart',
      updateProductData: true,
      anonymousCartId: isNotNullable(storage.getCartStore()).cartId,
      anonymousId: isNotNullable(storage.getCartStore()).anonymousId,
    };

    const result = await this.apiRoot
      .me()
      .login()
      .post({
        body: auth,
      })
      .execute();

    this.createWithPasswordClient(email, password);
    return result.body.customer;
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

  public async getProductsTypes(): Promise<ProductType[]> {
    const data = await this.apiRoot.productTypes().get().execute();
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

  public async updateAccountData(updateData: MyCustomerUpdate): Promise<Customer> {
    const result = await this.apiRoot.me().post({ body: updateData }).execute();
    return result.body;
  }

  public async updatePassword(updateData: MyCustomerChangePassword) {
    const result = await this.apiRoot.me().password().post({ body: updateData }).execute();
    return result.body;
  }

  public async updateAddresses(customerVersion: number, setActions: MyCustomerUpdateAction[]) {
    const result = await this.apiRoot
      .me()
      .post({
        body: {
          version: customerVersion,
          actions: [...setActions],
        },
      })
      .execute();
    return result.body;
  }

  public async filterProductsByAttribute(filterArr: QueryParams) {
    const data = await this.apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          ...filterArr,
        },
      })
      .execute();
    return data.body.results;
  }

  public async getProductProjectionByKey(productKey: string): Promise<ProductProjection> {
    const data = await this.apiRoot.productProjections().withKey({ key: productKey }).get().execute();
    return data.body;
  }

  public async getCategoryById(id: string): Promise<Category[]> {
    const category = await this.apiRoot
      .categories()
      .get({
        queryArgs: {
          where: `id="${id}"`,
        },
      })
      .execute();

    return category.body.results;
  }

  // public async createCart() {
  //   const data = await this.apiRoot
  //     .carts()
  //     .post({
  //       body: {
  //         currency: 'USD',
  //       },
  //     })
  //     .execute();
  //   return data.body;
  // }

  public async createCart() {
    const data = await this.apiRoot
      .me()
      .carts()
      .post({
        body: {
          currency: 'USD',
        },
      })
      .execute();
    return data.body;
  }

  public async getCart(cartId: string): Promise<Cart> {
    const data = await this.apiRoot.carts().withId({ ID: cartId }).get().execute();
    return data.body;
  }

  public async getAuthorizedCarts(): Promise<Cart[]> {
    const data = await this.apiRoot.me().carts().get().execute();
    return data.body.results;
  }

  public async updateCart(cartId: string, cartVersion: number, action: MyCartUpdateAction) {
    const data = await this.apiRoot
      .me()
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version: cartVersion,
          actions: [action],
        },
      })
      .execute();
    return data.body;
  }
  // {
  //   action: 'addLineItem',
  //   productId,
  //   variantId,
  //   quantity,
  // },

  // {
  //   action: 'removeLineItem',
  //   lineItemId: lineItemId,
  // },

  public async setAnonymousId(cartId: string, cartVersion: number, id: string) {
    const data = await this.apiRoot
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version: cartVersion,
          actions: [
            {
              action: 'setAnonymousId',
              anonymousId: id,
            },
          ],
        },
      })
      .execute();
    return data.body;
  }
}

export const sdkService = new SdkService();
