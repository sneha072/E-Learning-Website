import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: false },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);

export default ContactMessage;
