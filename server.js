const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

let bookings = []; 

app.use(cors());
app.use(bodyParser.json());

// Create Booking
app.post('/api/bookings', (req, res) => {
  const { date, time, guests, name, contact } = req.body;

  // Check for double bookings
  const existingBooking = bookings.find(
    (b) => b.date === date && b.time === time
  );
  if (existingBooking) {
    return res.status(400).json({ success: false, message: 'Slot already booked.' });
  }

  bookings.push({ id: Date.now(), date, time, guests, name, contact });
  res.status(201).json({ success: true });
});

// Get Bookings
app.get('/api/bookings', (req, res) => {
  res.json(bookings);
});

// Delete Booking
app.delete('/api/bookings/:id', (req, res) => {
  const { id } = req.params;
  bookings = bookings.filter((b) => b.id !== parseInt(id));
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Welcome to the Restaurant Table Booking API');
  });
  