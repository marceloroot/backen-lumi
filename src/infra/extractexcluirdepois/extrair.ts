import fs from 'fs/promises';
import pdf from 'pdf-parse';
import path from 'path';
import console from 'console';


interface ClienteI {
    numeroCliente: string;
    numeroInstalcao: string;
    error:string | null;
}

interface VencimentoI {
    refereenteA: string;
    vencimento: string;
    valorAPagar: string;
    error:string | null;
}

interface ValorResI {
    name:string;
    quantidadeInicial: string;
    valor: string;
    tarifaUnitaria: string;
    error:string | null;
}

interface ContribuicaoPublicaI {
    valor: string;
}

export interface RetornoDadosI {
    cliente: ClienteI;
    vencimentos: VencimentoI;
    valoresArray: ValorResI[];
    contribuicaoPublica: ContribuicaoPublicaI;
}
interface PalavraChaveI {
    name: string;
    chave: string;
}


const palavrasChave:PalavraChaveI[] = [
    {
        name: 'itens da fatura',
        chave: 'ICMSICMSEnergiaElétricakWh'
    },
    {
        name: 'Energia Enjetada',
        chave: 'EnergiainjetadaHFPkWh'
    },
    {
        name: 'ICMS',
        chave: 'Encomp.s/ICMSkWh'
    },
    {
        name: 'Energia GD I',
        chave: 'EnergiacompensadaGDIkWh'
    },
];



const palavraChaveContribuicao = "ContribIlumPublicaMunicipal";

async function getPdfFilesFromFolder(folderPath: string): Promise<string[]> {
    try {
        const files = await fs.readdir(folderPath);
        const pdfFiles = files.filter((file:any) => path.extname(file).toLowerCase() === '.pdf');
        return pdfFiles;
    } catch (error:any) {
        console.error('Erro ao obter arquivos PDF da pasta:', error);
        throw error;
    }
}


async function extractTextFromPDF(filePath: string): Promise<string> {
    try {
        const dataBuffer = await fs.readFile(filePath);
        const data = await pdf(dataBuffer);
        return data.text;
    } catch (error) {
        throw error;
    }
}


async function processPdfFiles(): Promise<string[]> {
    const folderPath = './arquivos';
    try {
        const pdfFiles = await getPdfFilesFromFolder(folderPath);
        const textPdf: string[] = [];
        for (const pdfFile of pdfFiles) {
            const filePath = path.join(folderPath, pdfFile);
            const text = await extractTextFromPDF(filePath);
            textPdf.push(text);
        }
        return textPdf;
    } catch (error) {
        console.error('Erro ao processar arquivos PDF:', error);
        throw error;
    }
}

const retoranNumerocliente = (text:string):ClienteI =>{
    const startIndex = text.indexOf("NºDOCLIENTENºDAINSTALAÇÃO");
    console.log(startIndex);
    if (startIndex !== -1) {
            // Extrair o número do cliente
            const initCliente = startIndex + 25;
            const finalCliente=startIndex + 35
            const finalSerie=startIndex + 45
            const numeroCliente = text.substring(initCliente,finalCliente);
            const numeroInstalacao = text.substring(finalCliente,finalSerie);
   
        return {
            numeroCliente:numeroCliente,
            numeroInstalcao:numeroInstalacao,
            error:null,
        }

    } else {
        return {
            numeroCliente:'',
            numeroInstalcao:'',
            error:"Nº DO CLIENTE Nº DA INSTALAÇÃO não encontrado.",
        }
        
    }

}


const retoraReferenteVencimento = (text:string):VencimentoI =>{
    const startIndex = text.indexOf("ReferenteaVencimentoValorapagar(R$)");
    console.log(startIndex);
    if (startIndex !== -1) {
            // Extrair o número do cliente
            const inicioReferente = startIndex + 35
            const fimReferente=startIndex + 43
            const refereenteA = text.substring(inicioReferente,fimReferente);

            const finalVencimento =startIndex + 53
            const vencimento = text.substring(fimReferente,finalVencimento);

            
            const finalValaroApagar =startIndex + 59
            const valorAPagar = text.substring(finalVencimento,finalValaroApagar);
   
        return {
            refereenteA:refereenteA,
            vencimento:vencimento,
            valorAPagar:valorAPagar,
            error:null

        }

    } else {
        return {
            refereenteA:'',
            vencimento:'',
            valorAPagar:'',
            error:'Nº DO CLIENTE Nº DA INSTALAÇÃO não encontrado.'

        }
       
    }

}

const  extractValorres = (chave:string,nome:string,text:string) :ValorResI  =>{
    const startIndex = text.toString().indexOf(chave.toString());
     console.log(chave.toString())

        if (startIndex !== -1) {
                // Extrair o número do cliente
                const initIndex = startIndex +chave.toString().length;
                 //Se tiver ponto pega o 5 ex: 1.456 se nao pega 3 ex: 323
                let quantidadeInicial = text.substring(initIndex,initIndex+3);
                if(quantidadeInicial.includes("."))  quantidadeInicial = text.substring(initIndex,initIndex+5);
                
                //Preço Unitario
                const indexInitPrecoUnitario = initIndex + quantidadeInicial.length;
                const precoUnitario = text.substring(indexInitPrecoUnitario,indexInitPrecoUnitario+10);
    
    
                //valor
                let indexValor = indexInitPrecoUnitario + precoUnitario.length;
                let valor = text.substring(indexValor,indexValor+20);
                const splitValor = valor.split(",");
                const valorDecimal = splitValor[1].substring(0,splitValor[1].length - 1)
                valor = `${splitValor[0]},${valorDecimal}`
    
    
                const indexTarifaUnitaria = indexValor + valor.length;
                const tarifaUnitaria = text.substring(indexTarifaUnitaria,indexTarifaUnitaria+10);
         
    
                return {
                    name:nome,
                    quantidadeInicial:quantidadeInicial,
                    valor:valor,
                    tarifaUnitaria:tarifaUnitaria,
                    error:null
                
                }
    
        } else { 
            return {
                name:nome,
                quantidadeInicial:'',
                valor:'',
                tarifaUnitaria:'',
                error:`Energia ${nome} nessa fatura não encontrado.`
            
            }
        }
}


const  retornaContribuicaoPublica = (chave:string,text:string):ContribuicaoPublicaI =>{
    const startIndex = text.toString().indexOf(chave.toString());
    console.log(chave)

    if (startIndex !== -1) {
            // Extrair o número do cliente
            const initIndex = startIndex +palavraChaveContribuicao.length

            //valor
            let valor = text.substring(initIndex,initIndex+10);
            const splitValor = valor.split(",");
            let decimal = splitValor[1].match(/\d+/g);
            valor = `${splitValor[0]},${decimal}`

            return {
                valor:valor,
            }

    } else { 
        return {
            valor:'',
        }
    }

}


const createDateFromPdf = async (textPdf:string) :Promise<RetornoDadosI>=>{
     
    // Expressão regular para encontrar os valores de consumo de energia elétrica
    var textoSemEspacos = textPdf.replace(/\s+/g, '');
    console.log(textoSemEspacos);
    const cliente = retoranNumerocliente(textoSemEspacos)

     console.log(cliente)

    const refenteEVencimento = retoraReferenteVencimento(textoSemEspacos)

    let valoresArray:ValorResI[] =[];
    palavrasChave.map(item =>{
        const valores:ValorResI = extractValorres(item.chave,item.name,textoSemEspacos)
        console.log(item.name,valores)
        valoresArray.push(valores);
    })
    const contribuicaoPublica = retornaContribuicaoPublica(palavraChaveContribuicao,textoSemEspacos)
    return {
        cliente:cliente,
        vencimentos:refenteEVencimento,
        valoresArray:valoresArray,
        contribuicaoPublica:contribuicaoPublica
    }
    
}



export class ProcessPDF {
    async execute():Promise<RetornoDadosI[]>{
        const listText = await processPdfFiles();
        const arrayDeRetornoDados:RetornoDadosI[] = await Promise.all(listText.map(async (item) => {
          return await createDateFromPdf(item);
      }));
      
           return arrayDeRetornoDados;
    }
   
}