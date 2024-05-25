import {  Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ExtractDataFileUseCaseFactory } from "../facotry/abstract-factory/invoice/extract-data-file-use-case-factory";
import { connectionPrisma } from "../prisma/prisma";



export const extract = async (req: any, res: Response): Promise<void> => {
  try {
    const extractAbstractFacture = ExtractDataFileUseCaseFactory.ExtractDataFileAbstractFactory(connectionPrisma);
    extractAbstractFacture.execute();
    res.json({ message: 'Dados extraidos com sucesso' })

  } catch (error:any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: error.message,
    });
  }
};
export const upLoad = async (req: any, res: Response): Promise<void> => {
  try {
    if (!req.file) {
       res.status(StatusCodes.BAD_REQUEST).json({ error: 'No file uploaded' });
    }
  
    res.json({ message: 'File uploaded successfully', filename: req.file.filename })

  } catch (error:any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: error.message,
    });
  }
};


