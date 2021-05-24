import { Request, Response } from 'express';
import User from '../models/User';
import * as Yup from 'yup';
import bcrypt from 'bcryptjs';

export default {
  async create (request: Request, response: Response) {
    const { name, email, password } = request.body;

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    try {
      await schema.validate(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json(err);
    }

    const userAlreadyExists = await User.findOne({
      where: { email }
    });

    if (userAlreadyExists) {
      return response.status(401).json({ message: 'User already exists!'});
    }

    if (password) {
      const password_hash = await bcrypt.hash(password, 8);
      const user = await User.create({ name, email, password_hash });

      return response.status(201).json(user);
    }
  },

  async login( request: Request, response: Response) {
    const { email, password } = request.body;

    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    try {
      await schema.validate(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json(err);
    }

    const userAlreadyExists = await await User.findOne({
      where: { email }
    });

    if (!userAlreadyExists) {
      return response.status(400).json('User not found!');
    };

    if (!await bcrypt.compare(password, userAlreadyExists.dataValues.password_hash)) {
      return response.status(400).json('Invalid password!');
    }

    return response.status(200).json({ email });
  }
}