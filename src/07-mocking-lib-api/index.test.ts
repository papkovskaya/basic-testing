import axios, {AxiosInstance} from 'axios';
import { throttledGetDataFromApi } from './index';

const relativePath = 'relativePath';

describe('throttledGetDataFromApi', () => {
  let mockCreateRequest: jest.SpyInstance;
  let mockGetResponse: AxiosInstance;

  beforeEach(() => {
    mockGetResponse = {
      get: jest.fn().mockResolvedValue({ data: 'data' })
    } as unknown as AxiosInstance;

    mockCreateRequest = jest.spyOn(axios, 'create').mockReturnValue(mockGetResponse);
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(relativePath);
    expect(mockCreateRequest).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com'
    });
  });

  // test('should perform request to correct provided url', async () => {
  //   await throttledGetDataFromApi(relativePath);
  //   expect(mockGetResponse.get).toHaveBeenCalledWith(relativePath);
  // });

  test('should return response data', async () => {
    expect(await throttledGetDataFromApi(relativePath)).toBe('data');
  });
});
