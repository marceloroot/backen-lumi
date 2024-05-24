import fs from "fs/promises";
import pdf from "pdf-parse";
import path from "path";
import console from "console";
import {
  ClientI,
  PublicContributionI,
  GetTextNamePDFI,
  PalavraChaveI,
  GetDataFilesI,
  getItensInvoiceI,
  DueDatesAndValuesI,
} from "./interfaces";

export enum namesSpace {
  energia = "energia",
  ejetato = "ejetato",
  ICMS = "ICMS",
  GDI = "GDI",
}
const palavrasChave: PalavraChaveI[] = [
  {
    name: namesSpace.energia,
    chave: "ICMSICMSEnergiaElétricakWh",
  },
  {
    name: namesSpace.ejetato,
    chave: "EnergiainjetadaHFPkWh",
  },
  {
    name: namesSpace.ICMS,
    chave: "Encomp.s/ICMSkWh",
  },
  {
    name: namesSpace.GDI,
    chave: "EnergiacompensadaGDIkWh",
  },
];

const keyNameClient = "NºDOCLIENTENºDAINSTALAÇÃO";
const keyNameReferenceData = "ReferenteaVencimentoValorapagar(R$)";

const palavraChaveContribuicao = "ContribIlumPublicaMunicipal";

// async function getPdfFilesFromFolder(folderPath: string): Promise<string[]> {
//   try {
//     const files = await fs.readdir(folderPath);
//     const pdfFiles = files.filter(
//       (file: any) => path.extname(file).toLowerCase() === ".pdf"
//     );
//     return pdfFiles;
//   } catch (error) {
//     console.error("Erro ao obter arquivos PDF da pasta:", error);
//     throw error;
//   }
// }

async function getPdfFilesFromFolder(folderPath: string): Promise<string[]> {
  let pdfFiles: string[] = [];

  async function readDirectory(directory: string) {
    try {
      const files = await fs.readdir(directory, { withFileTypes: true });
      for (const file of files) {
        const filePath = path.join(directory, file.name);
        if (file.isDirectory()) {
          await readDirectory(filePath); // Recursivamente lê subpastas
        } else if (file.isFile() && path.extname(file.name).toLowerCase() === '.pdf') {
          pdfFiles.push(filePath);
        }
      }
    } catch (error) {
      console.error(`Erro ao ler diretório ${directory}:`, error);
      throw error;
    }
  }

  await readDirectory(folderPath);
  return pdfFiles;
}

// async function processPdfFiles(): Promise<GetTextNamePDFI[]> {
//   const folderPathLocal = "./arquivos";
//   const absolutePath = path.resolve(folderPathLocal);
//   const folderPath = absolutePath
//   try {
//     const pdfFiles = await getPdfFilesFromFolder(folderPath);
//     const getTextPDF: GetTextNamePDFI[] = [];
//     for (const pdfFile of pdfFiles) {
//       const filePath = path.join(folderPath, pdfFile);
//       const text = await extractTextFromPDF(filePath);
//       const createPdfData: GetTextNamePDFI = {
//         name: pdfFile,
//         text: text,
//       };
//       getTextPDF.push(createPdfData);
//     }
//     return getTextPDF;
//   } catch (error) {
//     console.error("Erro ao processar arquivos PDF:", error);
//     throw error;
//   }
// }

async function processPdfFiles(): Promise<GetTextNamePDFI[]> {
  const folderPathLocal = "./arquivos";
  const absolutePath = path.resolve(folderPathLocal);
  const folderPath = absolutePath;
  try {
    const pdfFiles = await getPdfFilesFromFolder(folderPath);
    const getTextPDF: GetTextNamePDFI[] = [];
    for (const pdfFile of pdfFiles) {
      const text = await extractTextFromPDF(pdfFile);
      const createPdfData: GetTextNamePDFI = {
        name: path.basename(pdfFile),
        text: text,
      };
      getTextPDF.push(createPdfData);
    }
    return getTextPDF;
  } catch (error) {
    console.error("Erro ao processar arquivos PDF:", error);
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

const getNumberClient = (text: string): ClientI => {
  const startIndex = text.indexOf(keyNameClient);

  if (startIndex !== -1) {
    // Extrair o número do cliente
    const intiIndexClient = startIndex + keyNameClient.length;
    const finalIndexClient = startIndex + 35;
    const finalSerie = startIndex + 45;
    const numberClient = text.substring(intiIndexClient, finalIndexClient);
    const numberInstalation = text.substring(finalIndexClient, finalSerie);

    return {
      numberClient: numberClient,
      numberInstalation: numberInstalation,
      error: null,
    };
  } else {
    return {
      numberClient: "",
      numberInstalation: "",
      error: "Nº DO CLIENTE Nº DA INSTALAÇÃO não encontrado.",
    };
  }
};

const getReferenceData = (text: string): DueDatesAndValuesI => {
  const startIndex = text.indexOf(keyNameReferenceData);
  if (startIndex !== -1) {
    // Extrair o número do cliente
    const initReference = startIndex + keyNameReferenceData.length;
    const finalIndexMonthReferring = startIndex + 43;
    const monthReferring = text.substring(
      initReference,
      finalIndexMonthReferring
    );
    const finalIndexExpirationDate = startIndex + 53;
    const expirationDate = text.substring(
      finalIndexMonthReferring,
      finalIndexExpirationDate
    );
    const finalIndexToBePaid = startIndex + 65;
    const amountToBePaidForSplit = text.substring(
      finalIndexExpirationDate,
      finalIndexToBePaid
    );
    const splitToBePais = amountToBePaidForSplit.split(',')
    const amountToBePaidDecimal = splitToBePais[1].match(/\d+/g);
    const amountToBePaid = `${splitToBePais[0]},${amountToBePaidDecimal}`


    return {
      monthReferring: monthReferring,
      expirationDate: expirationDate,
      amountToBePaid: amountToBePaid,
      error: null,
    };
  } else {
    return {
      monthReferring: "",
      expirationDate: "",
      amountToBePaid: "",
      error: "Nº DO CLIENTE Nº DA INSTALAÇÃO não encontrado.",
    };
  }
};

const extractValorres = (
  chave: string,
  nome: string,
  text: string
): getItensInvoiceI => {
  const startIndex = text.toString().indexOf(chave.toString());


  if (startIndex !== -1) {
    // Extrair o número do cliente
    const initIndex = startIndex + chave.toString().length;
    //Se tiver ponto pega o 5 ex: 1.456 se nao pega 3 ex: 323
    let quantity = text.substring(initIndex, initIndex + 3);
    if (quantity.includes("."))
      quantity = text.substring(initIndex, initIndex + 5);

    //Preço Unitario
    const indexInitPrecoUnitario = initIndex + quantity.length;
    const precoUnitario = text.substring(
      indexInitPrecoUnitario,
      indexInitPrecoUnitario + 10
    );

    //valor
    let indexValor = indexInitPrecoUnitario + precoUnitario.length;
    let price = text.substring(indexValor, indexValor + 20);
    const splitValor = price.split(",");
    const valorDecimal = splitValor[1].substring(0, splitValor[1].length - 1);
    price = `${splitValor[0]},${valorDecimal}`;

    const indexTarifaUnitaria = indexValor + price.length;
    const unityTariff = text.substring(
      indexTarifaUnitaria,
      indexTarifaUnitaria + 10
    );

    return {
      name: nome,
      quantity: quantity,
      price: price,
      unityTariff: unityTariff,
      error: null,
    };
  } else {
    return {
      name: nome,
      quantity: "",
      price: "",
      unityTariff: "",
      error: `Energia ${nome} nessa fatura não encontrado.`,
    };
  }
};

const retornaContribuicaoPublica = (
  chave: string,
  text: string
): PublicContributionI => {
  const startIndex = text.toString().indexOf(chave.toString());


  if (startIndex !== -1) {
    // Extrair o número do cliente
    const initIndex = startIndex + palavraChaveContribuicao.length;

    //valor
    let price = text.substring(initIndex, initIndex + 10);
    const splitValor = price.split(",");
    let decimal = splitValor[1].match(/\d+/g);
    price = `${splitValor[0]},${decimal}`;

    return {
        price: price,
    };
  } else {
    return {
        price: "",
    };
  }
};

const createDateFromPdf = async (
  dataPDF: GetTextNamePDFI
): Promise<GetDataFilesI> => {
  // Expressão regular para encontrar os valores de consumo de energia elétrica
  var textoSemEspacos = dataPDF.text.replace(/\s+/g, "");

  const cliente = getNumberClient(textoSemEspacos);



  const refenteEVencimento = getReferenceData(textoSemEspacos);

  let valoresArray: getItensInvoiceI[] = [];
  palavrasChave.map((item) => {
    const valores: getItensInvoiceI = extractValorres(
      item.chave,
      item.name,
      textoSemEspacos
    );
  
    valoresArray.push(valores);
  });
  const contribuicaoPublica = retornaContribuicaoPublica(
    palavraChaveContribuicao,
    textoSemEspacos
  );
  return {
    client: cliente,
    dueDateAndValues: refenteEVencimento,
    getInvoices: valoresArray,
    publicContribution: contribuicaoPublica,
    path: dataPDF.name,
  };
};

export class ProcessPDFService {
  async execute(): Promise<GetDataFilesI[]> {
    const listDataPDF = await processPdfFiles();
    const arrayDeRetornoDados: GetDataFilesI[] = await Promise.all(
      listDataPDF.map(async (item) => {
        return await createDateFromPdf(item);
      })
    );

    return arrayDeRetornoDados;
  }
}
