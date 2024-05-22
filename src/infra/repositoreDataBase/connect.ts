import mongoose from 'mongoose';
import { ConnectionOptions } from 'tls';

// Função para conectar ao MongoDB
export async function connectToMongoDB(): Promise<void> {
  try {
    // URL de conexão com o MongoDB
    //const mongoURL = 'mongodb://root:example@localhost:27017/databaserbr';
  const mongoURL = 'mongodb://root:example@mongo:27017/databaserbr';

    // Conexão com o MongoDB
    await mongoose.connect(mongoURL, {
      useUnifiedTopology: true,
      authSource: 'admin' // O banco de dados de autenticação
    } as ConnectionOptions);

    console.log('Conexão bem-sucedida com o MongoDB.');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    throw error;
  }
}

export const disconnectFromMongoDB = async () => {
  await mongoose.disconnect();
};
