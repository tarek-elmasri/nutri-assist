import { Request, Response } from 'express';
import { Client, Profile, Serve } from '../../models';

const index = async (req: Request, res: Response) => {
  try {
    const user = req.user!;
    const clients = await Client.findAll({
      where: { userId: user.id },
      include: {
        model: Profile,
        as: 'profiles',
        include: [
          {
            model: Serve,
            as: 'serves'
          }
        ]
      }
    });

    res.json(clients);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const clientParams = req.body.client;
    const user = req.user!;
    const client = await user.createClient({
      ...clientParams
    });
    res.status(201).json({
      id: client.id,
      firstName: client.firstName,
      lastName: client.lastName,
      phoneNo: client.phoneNo,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const update = () => {};

const destroy = () => {};

export default {
  index,
  create,
  update,
  destroy
};
