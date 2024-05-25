export type EnergyDetails = {
    quantityEnergy?: string;
    priceEnergy?: string;
    unityTariffEnergy?: string;
  
    amountOfEnergyInject?: string;
    priceOfEnergyInject?: string;
    unityTariffOfEnergyInject?: string;
  };
  
  export type IcmsDetails = {
    amountIcms?: string;
    priceIcms?: string;
    unityIcms?: string;
  };
  
  export type GdiDetails = {
    amountGDI?: string;
    priceGDI?: string;
    unityGDI?: string;
  };
  
  export type InvoiceProps = {
    id?:string;
    userId: string;
    installationNumber: string;
    monthReferring: string;
    expirationDate: string;
    amountToBePaid: string;
    publicContribution: string;
    path: string;
  
    energyDetails?: EnergyDetails;
    icmsDetails?: IcmsDetails;
    gdiDetails?: GdiDetails;
  };