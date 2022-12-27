import { NextFunction, Request, Response } from 'express';
import { Serve } from '../../models';

const serveExists = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const profileId = req.params.profileId;
    const serveId = req.params.serveId;

    const serve = await Serve.findOne({
      where: { id: serveId, profileId }
    });

    if (!serve) throw new Error();

    next();
  } catch (error) {
    res.status(404).json({ error });
  }
};

export default serveExists;
