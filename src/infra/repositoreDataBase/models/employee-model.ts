import mongoose, { Document, Schema } from 'mongoose';

export interface EmployeeInterface extends Document {
  name: string;
  role: string;
  department: string;
  date: Date;
}

const EmployeeSchema = new Schema<EmployeeInterface>({
  name: { type: String, required: true },
  role: { type: String, required: true },
  department: { type: String, required: true },
  date: { type: Date, default: Date.now },
}, { collection: 'employee' });

const EmployeeModel = mongoose.model<EmployeeInterface>('Employee', EmployeeSchema);

export default EmployeeModel;