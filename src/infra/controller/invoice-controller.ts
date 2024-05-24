import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import { connectionPrisma } from '../prisma/prisma';
import { ExtractDataFileDashBoardFactory } from '../facotry/abstract-factory/invoice/extract-data-file-dashboard-factory';
export const getById = async (req: Request, res: Response): Promise<void> =>  {
    try{
        let id: string | undefined = req.params.id; 
        if (!id) {
            id = undefined;
        }
      const extractDataFileDashBoardFactory = ExtractDataFileDashBoardFactory.ExtractDataFileDashBoardFactory(
        connectionPrisma
      );
      const invocesDashBorad = await extractDataFileDashBoardFactory.execute(id);
      res.status(StatusCodes.OK).json(invocesDashBorad);
    } catch (error:any) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          errors: error.message
        });
    }
   
  };