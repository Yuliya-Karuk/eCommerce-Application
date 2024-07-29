import { sdkService } from '@commercetool/sdk.service';
import { describe, expect, vi } from 'vitest';

describe('Testing sdkService', () => {
  test('getCategories should return a products Categories', async () => {
    vi.mock('@commercetools/platform-sdk', () => ({
      createApiBuilderFromCtpClient: vi.fn().mockReturnValue({
        withProjectKey: vi.fn().mockReturnValue({
          categories: vi.fn().mockReturnValue({
            get: vi.fn().mockReturnValue({
              execute: vi.fn().mockResolvedValue({
                body: {
                  results: [
                    { id: '1', key: 'Category 1' },
                    { id: '2', key: 'Category 2' },
                  ],
                },
              }),
            }),
          }),
        }),
      }),
    }));

    const mockCategories = [
      { id: '1', key: 'Category 1' },
      { id: '2', key: 'Category 2' },
    ];

    const productCategories = await sdkService.getCategories();

    expect(productCategories).toEqual(mockCategories);
  });
});
