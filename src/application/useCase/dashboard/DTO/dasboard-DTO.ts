
export type InvoiceEnergia = {
   name:string;
   kwhgdi:number;
   kwhenergia:number;
   kwhenergejetada:number
   kwhenergiaICMS:number;
  };

  export type InvoiceUsers = {
    clientNumber:string;
    instaltionNumber:string;
    energyRecent:string;
    priceRecent:string;
    totalEnergy:number;
    totalPrice:number;    
    
   };
  export type MonetaryValues = {
    name:string;
    gdiPrice:number;
    eenergyPrice:number;
    energyEjetadaPrice:number
    energyICMSPrice:number;
    
   };

export type DashBoardDTO = {
    electricPowerConsumption: number;
    compensatedEnergy: number;
    totalValueWithoutGD: number;
    economiaGD: number;
    invoicesEnergia:InvoiceEnergia[];
    invoiceUsers:InvoiceUsers[];
    monetaryValues:MonetaryValues[];
}