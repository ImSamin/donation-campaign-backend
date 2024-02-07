/* eslint-disable prefer-const */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IDonationPost } from './donationPost.interface';
import { DonationPost } from './donationPost.model';

const createDonationPost = (payload: IDonationPost) => {
  const result = DonationPost.create(payload);

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Donation Post creation failed');
  }

  return result;
};

type query = {
  category?: string;
};

const getDonationPost = (query: query) => {
  if (query.category) {
    const categoryRegex = new RegExp(query.category, 'i');
    const reuslt = DonationPost.find({ category: categoryRegex });
    return reuslt;
  } else {
    const result = DonationPost.find({});
    return result;
  }
};

const updateDonationPost = (id: string, payload: IDonationPost) => {
  const result = DonationPost.findByIdAndUpdate(id, payload, {
    new: true,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Update donation post failed');
  }

  return result;
};

const deleteDonationPost = (id: string) => {
  const result = DonationPost.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Delete donation post failed');
  }

  return result;
};

export const DonationPostService = {
  createDonationPost,
  updateDonationPost,
  deleteDonationPost,
  getDonationPost,
};
