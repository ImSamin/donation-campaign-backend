import { Types } from 'mongoose';

export type IDonation = {
  userId: Types.ObjectId;
  postId: Types.ObjectId;
  donateAmount: number;
};
