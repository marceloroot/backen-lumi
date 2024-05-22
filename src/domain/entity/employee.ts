export type EmployeeProps = {
    id: string;
    name: string;
    role: string;
    department:string;
    date: Date;
  };
 
  export class Employee {
    constructor(private props: EmployeeProps) {}
  
    get id() {
      return this.props.id;
    }
  
    get name() {
      return this.props.name;
    }
  
    get role() {
      return this.props.role;
    }
    get department() {
      return this.props.department;
    }
    get date() {
      return this.props.date;
    }
  }
  