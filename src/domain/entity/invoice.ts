import { InvoiceProps } from "../subentities/invoice";
import { User } from "./user";

export class Invoice {

    constructor(
      private props: InvoiceProps,
      private _user?: User
    ) {}
    get id() {
      return this.props.id;
    }
    get userId() {
      return this.props.userId;
    }
  
    get installationNumber() {
      return this.props.installationNumber;
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
    get user() {
      return this._user; 
    }
  
    set user(user: User | undefined) {
      this._user = user;
    }
  }
  