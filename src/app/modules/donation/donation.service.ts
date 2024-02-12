/* eslint-disable prefer-const */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { DonationPost } from '../DonationPost/donationPost.model';
import { IDonation } from './donation.interface';
import { Donation } from './donation.model';

const createDonation = async (payload: IDonation) => {
  const result = await Donation.create(payload);

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Donation failed');
  }

  await DonationPost.findByIdAndUpdate(
    { _id: payload.postId },
    {
      $inc: { raisedAmount: payload.donateAmount },
    },
  );

  return result;
};

type query = {
  id?: string;
};

const getDonation = async (query: query) => {
  if (query.id) {
    const reuslt = await Donation.find({ userId: query.id })
      .populate('userId')
      .populate('postId');
    return reuslt;
  } else {
    const result = await Donation.find({})
      .populate('userId')
      .populate('postId');
    return result;
  }
};

export const DonationService = {
  createDonation,
  getDonation,
};
