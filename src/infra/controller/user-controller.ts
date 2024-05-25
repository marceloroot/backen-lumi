import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { connectionPrisma } from "../prisma/prisma";
import { FetchAllUserFactory } from "../facotry/abstract-factory/user/fetch-all-user-factory";

export const getByAll = async (_: Request, res: Response): Promise<void> => {
  try {
    const fetchALlUserFactorye = FetchAllUserFactory.FetchAllUserAbstractFacotory(
      connectionPrisma
    );
    const allUsers = await fetchALlUserFactorye.execute();
    res.status(StatusCodes.OK).json(allUsers);
  } catch (error:any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: error.message,
    });
  }
};
