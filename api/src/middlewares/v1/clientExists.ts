import { NextFunction, Request, Response } from 'express';
import Client from '../../models/client';

const clientExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const clientId = req.params.clientId;
    if (!clientId) throw new Error();

    const user = req.user!;
    const client = Client.findOne({ where: { id: clientId, userId: user.id } });

    if (!client) throw new Error();

    next();
  } catch (error) {
    res.status(404);
  }
};

export default clientExists;
