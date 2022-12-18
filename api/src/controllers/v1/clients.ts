import { Request, Response } from 'express';
import { Client, Profile, Serve } from '../../models';

const index = async (req: Request, res: Response) => {
  try {
    const user = req.user!;
    const clients = await Client.findAll({
      where: { userId: user.id },
      attributes: {
        exclude: ['password']
      },
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

const show = async (req: Request, res: Response) => {
  try {
    const { clientId } = req.params;
    const client = await Client.findOne({
      where: { id: clientId, userId: req.user!.id },
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Profile,
          as: 'profiles',
          include: [{ model: Serve, as: 'serves' }]
        }
      ]
    });

    if (client) {
      res.json(client);
    } else {
      res.status(404).json({ msg: 'not found' });
    }
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
  show,
  create,
  update,
  destroy
};
