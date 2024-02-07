import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { DonationService } from './donation.service';

const createDonation = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  const result = await DonationService.createDonation(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Donation Post created successfully',
    data: result,
  });
});

const getDonation = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;

  const result = await DonationService.getDonation(query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Donation Post Retrive successfully',
    data: result,
  });
});

export const DonationController = {
  createDonation,
  getDonation,
};
