/* eslint-disable prefer-const */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IDonationPost } from './donationPost.interface';
import { DonationPost } from './donationPost.model';

const createDonationPost = async (payload: IDonationPost) => {
  const result = await DonationPost.create(payload);

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Donation Post creation failed');
  }

  return result;
};

type query = {
  category?: string;
};

const getDonationPost = async (query: query) => {
  if (query.category) {
    const categoryRegex = new RegExp(query.category, 'i');
    const reuslt = await DonationPost.find({ category: categoryRegex });
    return reuslt;
  } else {
    const result = await DonationPost.find({});
    return result;
  }
};

const getSinglePost = async (id: string) => {
  const result = await DonationPost.findById(id);
  return result;
};

const updateDonationPost = async (id: string, payload: IDonationPost) => {
  const result = await DonationPost.findByIdAndUpdate(id, payload, {
    new: true,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Update donation post failed');
  }

  return result;
};

const deleteDonationPost = async (id: string) => {
  const result = await DonationPost.findByIdAndDelete(id);
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
  getSinglePost,
};
