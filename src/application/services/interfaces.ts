export interface ClienteI {
    numeroCliente: string;
    numeroInstalcao: string;
    error:string | null;
}

export interface VencimentoI {
    refereenteA: string;
    vencimento: string;
    valorAPagar: string;
    error:string | null;
}

export interface ValorResI {
    name:string;
    quantidadeInicial: string;
    valor: string;
    tarifaUnitaria: string;
    error:string | null;
}

export interface ContribuicaoPublicaI {
    valor: string;
}

export interface RetornoDadosI {
    cliente: ClienteI;
    vencimentos: VencimentoI;
    valoresArray: ValorResI[];
    contribuicaoPublica: ContribuicaoPublicaI;
}
export interface PalavraChaveI {
    name: string;
    chave: string;
}
