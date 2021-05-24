import { Request, Response } from 'express';
import User from '../models/User';
import Transaction from '../models/Transaction';
import * as Yup from 'yup';

export default {
  async create (request: Request, response: Response) {
    const { sender, address, value, category, description, is_input, is_friend } = request.body;

    const schema = Yup.object().shape({
      sender: Yup.string().required(),
      address: Yup.string().required(),      
      value: Yup.string().required(),
      is_input: Yup.boolean().required(),
      is_friend: Yup.boolean().required(),
    });

    try {
      await schema.validate(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json(err);
    }

    const userByAlreadyExists = await User.findOne({ where: { email: sender } });

    if (!userByAlreadyExists) {
      return response.status(400).json('Sender not exists');
    }

    const user_id_by = userByAlreadyExists.dataValues.id;

    const userFromAlreadyExists = await User.findOne({ where: { email: address } });

    if (!userFromAlreadyExists) {
      return response.status(400).json('Address not exists');
    }

    const user_id_from = userFromAlreadyExists.dataValues.id;

    const transaction = await Transaction.create({ user_id_by, user_id_from, value, category, description, is_input, is_friend });

    return response.status(201).json(transaction);
  },

  async update (request: Request, response: Response) {
    const { user_email, old_category, new_category } = request.body;

    const schema = Yup.object().shape({
      user_email: Yup.string().email().required(),
      old_category: Yup.string().required(),
      new_category: Yup.string().required(),
    });

    try {
      await schema.validate(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json(err);
    }

    const userAlreadyExists = await User.findOne({ where: { email: user_email } });

    if (!userAlreadyExists) {
      return response.status(400).json('User not exists');
    }

    const user_id = userAlreadyExists.dataValues.id;

    const categoryAlreadyExists = await Transaction.findOne({ where: { user_id_by: user_id } });

    if (!categoryAlreadyExists) {
      return response.status(400).json('Category not exists');
    }

    await Transaction.update({ category: new_category }, { where: { category: old_category }})

    return response.status(200).json(new_category);
  }
}