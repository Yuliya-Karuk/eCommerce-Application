import {
  ByProjectKeyRequestBuilder,
  Category,
  ClientResponse,
  createApiBuilderFromCtpClient,
  CustomerDraft,
  CustomerSignInResult,
  Product,
  ProductProjection,
  ProductType,
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

  public async getProductsByCategory(categoryId: string): Promise<ProductProjection[]> {
    const data = await this.apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          filter: [`categories.id:"${categoryId}"`],
        },
      })
      .execute();
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

  public async getProduct(productKey: string): Promise<Product> {
    const data = await this.apiRoot.products().withKey({ key: productKey }).get().execute();
    // const data = await this.apiRoot.productProjections().withKey({ key: productKey }).get().execute();
    return data.body;
  }

  public async filterProductsByAttribute(filterArr: string[]) {
    const data = await this.apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          filter: [...filterArr],
        },
      })
      .execute();
    return data.body.results;
  }
}

export const sdkService = new SdkService();
