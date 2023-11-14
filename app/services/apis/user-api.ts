import { ApiBase } from './api-base';
import { VARIANT_BASE_URL, PRICE_BASE_URL } from '../config';
import { UserVariantDTO, PriceInfoDTO } from '../models/user-dto';
export class InvalidRefreshTokenError extends Error {}

export class UserApi extends ApiBase {

  getUserVariant = async (user_id: string): Promise<UserVariantDTO> => {
    const response = await UserApi.makeRequest({
      method: 'GET',
      path: `${VARIANT_BASE_URL}/user_experiments/${user_id}`
    });
    
    if(response.status >= 200 && response.status <= 202 && response){
      const userDTO: UserVariantDTO = await response.json();
      return userDTO;
    }else{
      throw new Error('Unable to fetch user variants');
    }
  };

  getPrices = async (): Promise<[PriceInfoDTO]> => {
    const response = await UserApi.makeRequest({
      method: 'GET',
      path: `${PRICE_BASE_URL}/api/v2/BeaconPrice`
    });
    //If response status is not a successful one, throw error to force failed variant flow
    if(response.status >= 200 && response.status <= 202 && response){
      const priceDTO: [PriceInfoDTO] = await response.json();
      return priceDTO;
    }else{
      throw new Error('Unable to fetch prices');
    }
  };


}
export const userApi = new UserApi();