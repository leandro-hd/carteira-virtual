import { Request, Response } from 'express';
import User from '../models/User';
import Transaction from '../models/Transaction';
import * as Yup from 'yup';
import { Op } from 'sequelize';
import * as fastcsv from 'fast-csv';
import * as fs from 'fs';

export default {
  async total (request: Request, response: Response) {
    const { email } = request.params;

    const userAlreadyExists = await User.findOne({
      where: { email }
    });

    if (!userAlreadyExists) {
      return response.status(401).json({ message: 'User not exists!'});
    }

    const user_id = userAlreadyExists.dataValues.id;

    const values = await Transaction.findAll({ where: { user_id_by: user_id } });

    let total_in = 0;

    let total_out = 0;

    for (let value in values) {
      if (values[value].is_input === true) {
        total_in += values[value].dataValues.value;
      }
      if (values[value].is_input === false) {
        total_out += values[value].dataValues.value;
      }
    }

    const total = total_in - total_out;

    return response.status(200).json(total);
  },

  async history (request: Request, response: Response) {
    const { email, start_date, end_date } = request.params;

    const userAlreadyExists = await User.findOne({
      where: { email }
    });

    if (!userAlreadyExists) {
      return response.status(401).json({ message: 'User not exists!' });
    }

    const user_id = userAlreadyExists.dataValues.id;

    const values = await Transaction.findAll({ where: { 'created_at': {[Op.between] : [start_date, end_date] }}});

    let history = [];

    for (let value in values) {
      if (values[value].dataValues.user_id_by === user_id) {
        history.push(values[value].dataValues);
      }      
    }

    const ws = fs.createWriteStream('C:/history.csv');

    fastcsv
      .write(history, { headers: true })
      .on('finish', function() {
        console.log('Write to history.csv successfully!');
      })
      .pipe(ws);

    return response.status(200).json(history);
  },

  async friends (request: Request, response: Response) {
    const { sender, address } = request.params;

    const senderAlreadyExists = await User.findOne({
      where: { email: sender }
    });

    if (!senderAlreadyExists) {
      return response.status(401).json({ message: 'Sender not exists!'});
    }

    const user_id = senderAlreadyExists.dataValues.id;

    const addressAlreadyExists = await User.findOne({
      where: { email: address }
    });

    if (!addressAlreadyExists) {
      return response.status(401).json({ message: 'Address not exists!'});
    }

    const friends = await Transaction.findAll({ where: { user_id_by: user_id }});

    let history = [];

    for (let friend in friends) {
      if (friends[friend].dataValues.is_friend === true) {
        history.push(friends[friend].dataValues);
      }      
    }

    return response.status(200).json(history);
  }
}