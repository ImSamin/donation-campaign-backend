import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelper';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';

const login = catchAsync(async (req: Request, res: Response) => {
  const loginData = req.body;
  const result = await AuthService.login(loginData);

  //res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: result,
  });
});

const verifyToken = catchAsync(async (req: Request, res: Response) => {
  const { token } = req.body;
  const secret = config.jwt.secret as Secret;

  const result = await jwtHelpers.verifyToken(token, secret);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Verify Token successfully',
    data: result,
  });
});

// const refreshToken = catchAsync(async (req: Request, res: Response) => {
//   const { refreshToken } = req.cookies;

//   const result = await AuthService.refreshToken(refreshToken);

//   //set refresh token into cookie
//   const cookieOptions = {
//     secure: config.env === 'production',
//     httpOnly: true,
//   };

//   res.cookie('refreshToken', refreshToken, cookieOptions);

//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'User logged in successfully !',
//     data: result,
//   });
// });

export const AuthController = {
  login,
  //refreshToken,
  verifyToken,
};
