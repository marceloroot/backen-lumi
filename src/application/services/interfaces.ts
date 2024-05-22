export interface ClientI {
    numberClient: string;
    numberInstalation: string;
    error:string | null;
}

export interface GetTextNamePDFI{
    text:string,
    name:string,
}
export interface DueDatesAndValuesI {
    monthReferring: string;
    expirationDate: string;
    amountToBePaid: string;
    error:string | null;
}

export interface getItensInvoiceI {
    name:string;
    quantity: string;
    price: string;
    unityTariff: string;
    error:string | null;
}

export interface PublicContributionI {
    price: string;
}

export interface GetDataFilesI {
    client: ClientI;
    dueDateAndValues: DueDatesAndValuesI;
    getInvoices: getItensInvoiceI[];
    publicContribution: PublicContributionI;
    path:string;
}
export interface PalavraChaveI {
    name: string;
    chave: string;
}
