import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

// extract ObjectId from schema
const { ObjectId } = Schema;

// declears new schema
const UserSchema = new Schema({
  id: ObjectId,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: {
    type: String,
    default: 'user',
    enum: ['admin', 'user'],
  },
  city: String,
});

// ensure password is encrypted
UserSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.email = this.email.toLowerCase(); // Convert to lowercase
  this.firstName = this.firstName.toLowerCase(); // Convert to lowercase
  this.lastName = this.lastName.toLowerCase(); // Convert to lowercase

  this.password = hash;
  next();
});

// password validation for log in
UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

// Prevent password from being displayed
UserSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

const UserModel = model('UserModel', UserSchema);
export { UserModel };
