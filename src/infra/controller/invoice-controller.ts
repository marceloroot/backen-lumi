import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import { connectionPrisma } from '../prisma/prisma';
import { ExtractDataFileDashBoardFactory } from '../facotry/abstract-factory/invoice/extract-data-file-dashboard-factory';
import { FetchAllInvoiceFactory } from '../facotry/abstract-factory/invoice/fetch-all-invoice-factory';
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

  export const getAll = async (req: Request, res: Response): Promise<void> =>  {
    try{
      let id: string | undefined =  req.query.id ? req.query.id.toString() : undefined;
      if (!id) {
          id = undefined;
      }
      const skip = parseInt(req.query.skip as string) || 0;
      const take = parseInt(req.query.take as string) || 10;
      const invoceFactory = FetchAllInvoiceFactory.FetchAllUserAbstractFacotory(connectionPrisma);
      const invoices = await invoceFactory.execute(skip,take,id);
   
      res.status(StatusCodes.OK).json(invoices);
    } catch (error:any) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          errors: error.message
        });
    }
   
  };