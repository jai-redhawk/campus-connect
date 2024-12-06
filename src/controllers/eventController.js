const prisma = require('../config/db'); // Prisma client instance

// Controller to create an event
const createEvent = async (req, res) => {
  const { title, description, date } = req.body;

  try {
    const event = await prisma.event.create({
      data: {
        title,
        description,
        date: new Date(date), // Make sure to parse the date correctly
        creatorId: req.user.id, // The user creating the event (from JWT token)
      },
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create event', details: error.message });
  }
};

// Controller to get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await prisma.event.findMany();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events', details: error.message });
  }
};

// Controller to edit an event
const editEvent = async (req, res) => {
  const { title, description, date } = req.body;
  const { id } = req.params;

  try {
    const event = await prisma.event.update({
      where: { id },
      data: {
        title,
        description,
        date: new Date(date), // Ensure the date is properly formatted
      },
    });

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update event', details: error.message });
  }
};

// Controller to delete an event
const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await prisma.event.delete({
      where: { id },
    });

    res.status(200).json({ message: 'Event deleted successfully', event });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete event', details: error.message });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  editEvent,
  deleteEvent,
};
