import { Request, Response } from 'express';
import { ServeMeal } from '../../models';

const create = async (req: Request, res: Response) => {
  try {
    const serveId = req.params.serveId;
    const serveMealParams = req.body.serveMeals as ServeMeal[];
    const injectedServeMealParams = serveMealParams.map((serveMeal) => {
      serveMeal.serveId = serveId;
      return serveMeal;
    });

    await ServeMeal.bulkCreate(injectedServeMealParams);
    res.status(201).json({ msg: 'success' });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default {
  create
};
