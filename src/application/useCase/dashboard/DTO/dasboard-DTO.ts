import { Invoice } from "../../../../domain/entity/invoice";


export type DashBoardDTO = {
    electricPowerConsumption: number;
    compensatedEnergy: number;
    totalValueWithoutGD: number;
    economiaGD: number;
    invoices:Invoice[];
}