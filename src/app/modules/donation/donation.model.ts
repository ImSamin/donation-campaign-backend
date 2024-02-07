import { Schema, model } from 'mongoose';
import { IDonation } from './donation.interface';

const donationSchema = new Schema<IDonation>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  postId: { type: Schema.Types.ObjectId, ref: 'DonationPost', required: true },
  donateAmount: { type: Number, required: true },
});

export const Donation = model<IDonation>('Donation', donationSchema);
