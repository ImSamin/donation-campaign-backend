import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { DonationPostService } from './donationPost.service';

const createDonationPost = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  const result = await DonationPostService.createDonationPost(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Donation Post created successfully',
    data: result,
  });
});

const getDonationPost = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;

  const result = await DonationPostService.getDonationPost(query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Donation Post Retrive successfully',
    data: result,
  });
});

const updateDonationPost = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const id = req.params.id;

  const result = await DonationPostService.updateDonationPost(id, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Donation Post Updated successfully',
    data: result,
  });
});

const deleteDonationPost = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await DonationPostService.deleteDonationPost(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Donation Post Deleted successfully',
    data: result,
  });
});

export const DonationPostController = {
  createDonationPost,
  updateDonationPost,
  deleteDonationPost,
  getDonationPost,
};
