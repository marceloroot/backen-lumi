import { ExtractDataFileUseCaseFactory } from "../facotry/abstract-factory/invoice/extract-data-file-use-case-factory";
import { connectionPrisma } from "../prisma/prisma";

var cron = require('node-cron');



// Função que será executada pelo cronjob
function minhaTarefa() {
    console.log('Tarefa executada em: ', new Date().toISOString());
    // Adicione sua lógica aqui
    const extractAbstractFacture = ExtractDataFileUseCaseFactory.ExtractDataFileAbstractFactory(connectionPrisma);
    extractAbstractFacture.execute();
}

// Agendamento do cronjob para ser executado a cada minuto (por exemplo)
cron.schedule('0 */6 * * *', () => {
    minhaTarefa();
});