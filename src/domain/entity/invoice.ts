import { InvoiceProps } from "../subentities/invoice";

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
  
    get publicContribution() {
      return this.props.publicContribution;
    }
  
    get path() {
      return this.props.path;
    }
  
    get energyDetails() {
      return this.props.energyDetails;
    }
  
    get icmsDetails() {
      return this.props.icmsDetails;
    }
  
    get gdiDetails() {
      return this.props.gdiDetails;
    }
  }
  