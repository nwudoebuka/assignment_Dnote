export interface Experiment {
    experiment: string;
    variant: string;
  }
  
  export interface UserVariantDTO {
    user_id: string | null;
    experiments: Experiment[];
  }

  export interface PriceInfoDTO {
    country_id: string;
    price_control: number;
    price_variant1: number;
    price_variant2: number;
    currency: string;
    id: string;
  }