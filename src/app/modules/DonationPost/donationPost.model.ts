import { Schema, model } from 'mongoose';
import { IDonationPost } from './donationPost.interface';

const donationPostSchema = new Schema<IDonationPost>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    targetAmount: { type: Number, required: true },
    raisedAmount: { type: Number, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const DonationPost = model<IDonationPost>(
  'DonationPost',
  donationPostSchema,
);
