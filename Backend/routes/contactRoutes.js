const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { Contact } = require('../models');

// Simple email format check used on the backend as a safety net
// (frontend already validates, but the API should never trust the client alone)
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// ==========================
// CREATE CONTACT
// ==========================
router.post('/contacts', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email and message are all required' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address' });
    }

    const contact = await Contact.create({ name, email, message });
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==========================
// GET ALL CONTACTS
// Supports: search, date filter, sort, pagination -- all done in the query
// so the frontend never has to fetch everything and filter client-side.
// GET /api/contacts?search=&date=&sortBy=name|createdAt&order=asc|desc&page=1&limit=5
// ==========================
router.get('/contacts', async (req, res) => {
  try {
    const {
      search = '',
      date = '',
      sortBy = 'createdAt',
      order = 'DESC',
      page = 1,
      limit = 5,
    } = req.query;

    const where = {};

    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
      ];
    }

    if (date) {
      // Match contacts created on a specific calendar day
      const start = new Date(`${date}T00:00:00.000Z`);
      const end = new Date(`${date}T23:59:59.999Z`);
      where.createdAt = { [Op.between]: [start, end] };
    }

    const allowedSortFields = ['name', 'createdAt'];
    const sortField = allowedSortFields.includes(sortBy) ? sortBy : 'createdAt';
    const sortOrder = order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    const pageNum = Math.max(parseInt(page, 10) || 1, 1);
    const pageSize = Math.max(parseInt(limit, 10) || 5, 1);
    const offset = (pageNum - 1) * pageSize;

    const { rows, count } = await Contact.findAndCountAll({
      where,
      order: [[sortField, sortOrder]],
      limit: pageSize,
      offset,
    });

    res.json({
      data: rows,
      total: count,
      page: pageNum,
      totalPages: Math.ceil(count / pageSize) || 1,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==========================
// GET CONTACT BY ID
// ==========================
router.get('/contacts/:id', async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==========================
// UPDATE CONTACT
// ==========================
router.put('/contacts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email and message are all required' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address' });
    }

    const contact = await Contact.findByPk(id);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    contact.name = name;
    contact.email = email;
    contact.message = message;
    await contact.save();

    res.json({ message: 'Contact updated successfully', data: contact });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==========================
// DELETE CONTACT
// ==========================
router.delete('/contacts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByPk(id);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    await contact.destroy();
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
