import { Request, Response } from 'express';
import { Serve, ServeMeal } from '../../models';
import Meal from '../../models/meal';

const index = async (req: Request, res: Response) => {
  try {
    const profileId = req.params.profileId;

    const serves = await Serve.findAll({
      where: { profileId },
      include: {
        model: ServeMeal,
        as: 'serveMeals',
        include: [
          {
            model: Meal,
            as: 'meal'
          }
        ]
      }
    });

    res.json(serves);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const profileId = req.params.profileId;
    const servesParams = req.body.serves;

    const servePlan = await Serve.create({ profileId, ...servesParams });
    res.status(201).json(servePlan);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const update = async () => {};

const destroy = async () => {};

export default {
  index,
  create,
  update,
  destroy
};
