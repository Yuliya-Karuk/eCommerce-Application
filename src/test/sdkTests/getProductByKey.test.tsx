import { sdkService } from '@commercetool/sdk.service';
import { describe, expect, vi } from 'vitest';

describe('Testing sdkService', () => {
  test('getProductByKey should return a product', async () => {
    const mockProduct = { key: '123', name: 'Test Product' };

    vi.mock('@commercetools/platform-sdk', () => ({
      createApiBuilderFromCtpClient: vi.fn().mockReturnValue({
        withProjectKey: vi.fn().mockReturnValue({
          productProjections: vi.fn().mockReturnValue({
            withKey: vi.fn().mockReturnValue({
              get: vi.fn().mockReturnValue({
                execute: vi.fn().mockResolvedValue({ body: { key: '123', name: 'Test Product' } }),
              }),
            }),
          }),
        }),
      }),
    }));

    const product = await sdkService.getProductProjectionByKey('123');

    expect(product).toEqual(mockProduct);
  });
});
