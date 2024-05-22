export type InvoiceProps = {
    userId: string,
    numeroInstalcao: string;
    monthReferring: string;
    expirationDate: string;
    amountToBePaid: string;

    quantityEnergy?:string;
    priceEnergy?:string;
    unityTariffEnergy?:string;

    amountOfEnergyInject?:string;
    priceOfEnergyInject?:string;
    unityTariffOfEnergyInject?:string;

    amountIcms?:string;
    priceIcms?:string;
    unityIcms?:string;

    amountGDI?:string;
    priceGDI?:string;
    unityGDI?:string;
    publicContribution:string;
    
  };
 
  export class Invoice {
    constructor(private props: InvoiceProps) {}
    get userId() {
        return this.props.userId;
      }
    get numeroInstalcao() {
      return this.props.numeroInstalcao;
    }
    get monthReferring() {
        return this.props.monthReferring;
    }

    get amountToBePaid() {
        return this.props.amountToBePaid;
    }
    get expirationDate() {
        return this.props.expirationDate;
    }
    get quantityEnergy() {
        return this.props.quantityEnergy;
    }
    get priceEnergy() {
        return this.props.priceEnergy;
    }
    get unityTariffEnergy() {
        return this.props.unityTariffEnergy;
    }
    get amountOfEnergyInject() {
        return this.props.amountOfEnergyInject;
    }
    get priceOfEnergyInject() {
        return this.props.priceOfEnergyInject;
    }
    get unityTariffOfEnergyInject() {
        return this.props.unityTariffOfEnergyInject;
    }
    get amountIcms() {
        return this.props.amountIcms;
    }
    get priceIcms() {
        return this.props.priceIcms;
    }
    get unityIcms() {
        return this.props.unityIcms;
    }
    get amountGDI() {
        return this.props.unityIcms;
    }
    get priceGDI() {
        return this.props.unityIcms;
    }
    get unityGDI() {
        return this.props.unityIcms;
    }
    get publicContribution() {
        return this.props.publicContribution;
    }
  

  }
