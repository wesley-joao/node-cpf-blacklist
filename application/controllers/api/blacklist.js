const sequelize = require('../../config/database');
const constants = require('../../config/constants');

const Blacklist = sequelize.import('../../models/Blacklist');

exports.add = async (req, res) => {
  try {
    await Blacklist.create(req.body);
    return res.status(201).json({
      msg: constants.MSG_CPF_ADDED_BLACKLIST,
    });
  } catch (error) {
    let msg = { msg: error.errors };

    if (error.errors[0].validatorKey === 'not_unique') {
      msg = { msg: constants.MSG_CPF_ADDED_BLACKLIST };
    }

    return res.status(500).json(msg);
  }
};

exports.delete = async (req, res) => {
  try {
    const cpf = await Blacklist.destroy({ where: { cpf: req.params.cpf } });
    if (!cpf) {
      return res.status(404).json({
        msg: constants.MSG_CPF_NOT_FOUND_ON_BLACKLIST,
      });
    }

    return res.status(200).json({
      msg: constants.MSG_CPF_REMOVED_BLACKLIST,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.errors,
    });
  }
};

exports.findOne = async (req, res) => {
  try {
    const cpf = await Blacklist.count({ where: { cpf: req.params.cpf } });

    if (!cpf) {
      return res.status(404).json({
        msg: constants.MSG_FREE,
      });
    }

    return res.status(200).json({
      msg: constants.MSG_BLOCK,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.errors,
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    const cpfs = await Blacklist.findAll({ attributes: ['cpf', 'createdDate'] });
    res.status(200).json({
      cpfs,
    });
  } catch (error) {
    res.status(500).json({
      msg: error.errors,
    });
  }
};
