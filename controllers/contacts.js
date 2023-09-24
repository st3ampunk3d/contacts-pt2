const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId

const getAll = async (req, res) => {
  //#swagger.tags=['Contacts']
  const result = await mongodb.getDb().db().collection('contacts')
  .find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Contacts']
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('contacts').find({_id: contactId});
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  };

const createContact = async (req, res) => {
  //#swagger.tags=['Contacts']
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const result = await mongodb.getDb().db().collection('contacts').insertOne(contact);
  if (result.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).json(result.error || 'Some error occured while updating the contact.');
  }
};

const updateContact = async (req, res) => {
  //#swagger.tags=['Contacts']
  const contactId = new ObjectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const result = await mongodb.getDb().db().collection('contacts').replaceOne({_id: contactId}, contact);
  if (result.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(result.error || 'Some error occured while updating the contact.');
  }
};

const deleteContact = async (req, res) => {
  //#swagger.tags=['Contacts']
  const contactId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('contacts').deleteOne({_id: contactId});
  if (result.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(result.error || 'Some error occured while deleting the contact.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};