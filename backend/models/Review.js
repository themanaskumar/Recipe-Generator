import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Removes leading and trailing whitespace
  },
  review: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets the timestamp for when the review was created
  },
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
