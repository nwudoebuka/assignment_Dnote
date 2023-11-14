// user.saga.test.js
import { pricesHandler} from '../handlers/user.handlers';
import { userApi } from '../../../services/apis/user-api';
import { PriceInfoDTO } from '../../../services/models/user-dto';
import { runSaga } from 'redux-saga';

// Mock the Config module
jest.mock('react-native-config', () => ({
  APP_FLAVOR: 'mocked_flavor',
  VARIANT_BASE_URL: 'https://6548fde7dd8ebcd4ab240284.mockapi.io',
  PRICE_BASE_URL: 'https://6548fde7dd8ebcd4ab240284.mockapi.io',
  APP_VERSION: '1.0.0',
  APP_BUILD: '0.0.1',
}));

/* mock price data */
const mockpricesData: [PriceInfoDTO] = [
    {
      country_id: 'dk',
      price_control: 65,
      price_variant1: 70,
      price_variant2: 60,
      currency: 'DKK',
      id: '1',
    },
  ];

describe('pricesSaga', () => {

    it('should call api and dispatch success action', async () => {
        const getPrices = jest.spyOn(userApi,'getPrices')
          .mockImplementation(() => Promise.resolve(mockpricesData));

        const dispatched: any[] = [];
        await runSaga({
          dispatch: (action) => dispatched.push(action),
        }, pricesHandler);
    
        expect(getPrices).toHaveBeenCalledTimes(1);
        getPrices.mockClear();
      });
});