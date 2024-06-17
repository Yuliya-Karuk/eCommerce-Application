import { sdkService } from '@commercetool/sdk.service';
import { describe, expect, vi } from 'vitest';

describe('Testing sdkService', () => {
  test('getProductsTypes should return a products Types', async () => {
    vi.mock('@commercetools/platform-sdk', () => ({
      createApiBuilderFromCtpClient: vi.fn().mockReturnValue({
        withProjectKey: vi.fn().mockReturnValue({
          productTypes: vi.fn().mockReturnValue({
            get: vi.fn().mockReturnValue({
              execute: vi.fn().mockResolvedValue({
                body: {
                  results: [
                    { id: '1', name: 'Type 1' },
                    { id: '2', name: 'Type 2' },
                  ],
                },
              }),
            }),
          }),
        }),
      }),
    }));

    const mockProductTypes = [
      { id: '1', name: 'Type 1' },
      { id: '2', name: 'Type 2' },
    ];

    const productTypes = await sdkService.getProductsTypes();

    expect(productTypes).toEqual(mockProductTypes);
  });
});
