import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String,
});

const user = mongoose.model('User', userSchema);
export default user;
