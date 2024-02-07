/* eslint-disable prefer-const */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IDonation } from './donation.interface';
import { Donation } from './donation.model';

const createDonation = (payload: IDonation) => {
  const result = Donation.create(payload);

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Donation failed');
  }

  return result;
};

type query = {
  id?: string;
};

const getDonation = (query: query) => {
  if (query.id) {
    const reuslt = Donation.find({ userId: query.id })
      .populate('userId')
      .populate('postId');
    return reuslt;
  } else {
    const result = Donation.find({}).populate('userId').populate('postId');
    return result;
  }
};

export const DonationService = {
  createDonation,
  getDonation,
};
