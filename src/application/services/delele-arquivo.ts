import fs from 'fs';
import path from 'path';

export const DeleteFile = (filePath: string) => {
  const folderPathLocal = `./arquivos/${filePath}`;
  const absolutePath = path.resolve(folderPathLocal);


    fs.unlink(absolutePath, (err) => {
      if (err) {
        console.error(`Erro ao excluir o arquivo: ${err.message}`);
        return;
      }
      console.log('Arquivo excluído com sucesso');
    });
  };