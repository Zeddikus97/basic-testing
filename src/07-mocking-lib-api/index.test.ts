import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const BASE_URL = 'https://jsonplaceholder.typicode.com';
const USERS_PATH = 'users';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    //spyGet?.mockClear();

  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test(
    'should create instance with provided base url',
    async () => {
      const spyCreate = jest.spyOn(axios, 'create');
      await throttledGetDataFromApi(USERS_PATH);
      jest.runAllTimers();
      expect(spyCreate).toHaveBeenCalledWith({ baseURL: BASE_URL });
    }
  );

  test(
    'should perform request to correct provided url',
    async () => {
      const spyGet = jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockImplementation(async () => ({ data: {} }));
      await throttledGetDataFromApi(USERS_PATH);
      jest.runAllTimers();
      expect(spyGet).toBeCalledWith(USERS_PATH);
    }
  );

  test(
    'should return response data',
    async () => {
      let mockingData = [
        { id: '1', name: 'test' },
        { id: '2', name: 'denis' }
      ];
      const spyGet = jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockImplementation(async () => ({ data: mockingData }));
      
      const users = await throttledGetDataFromApi(USERS_PATH);
      expect(spyGet).toBeCalledWith(USERS_PATH);
      expect(users).toEqual(mockingData);
    }
  );
});