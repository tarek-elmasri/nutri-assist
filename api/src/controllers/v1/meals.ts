import { Request, Response } from 'express';
import Meal from '../../models/meal';

const index = async (_req: Request, res: Response) => {
  try {
    const meals = await Meal.findAll();
    res.json(meals);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const mealParams = req.body.meal as Meal;
    const meal = await Meal.create(mealParams);
    res.status(201).json(meal);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default {
  index,
  create
};
