export type UserProps = {
    id: string;
    createdAt:Date;
  };
 
  export class User {
    constructor(private props: UserProps) {}
  
    get id() {
      return this.props.id;
    }
  
    get createdAt() {
      return this.props.createdAt;
    }
  }
