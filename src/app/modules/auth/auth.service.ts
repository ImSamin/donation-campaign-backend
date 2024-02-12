import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { jwtHelpers } from './../../../helpers/jwtHelper';
import { ILoginData } from './auth.interface';

const login = async (payload: ILoginData) => {
  const isUserExist = await User.findOne({ email: payload.email });
  console.log(isUserExist);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const checkPassword = await User.findOne({
    email: payload.email,
    password: payload.password,
  });

  if (isUserExist.password && !checkPassword) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  const { email, name, id, role } = isUserExist;
  const { password, ...restUserInfo } = isUserExist.toJSON();

  const accessToken = jwtHelpers.createToken(
    { email, name, id, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  const refreshToken = jwtHelpers.createToken(
    { name, email, role, id },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  );

  return restUserInfo;
};

// const refreshToken = async (token: string) => {
//   let verifiedToken = null;
//   try {
//     verifiedToken = jwtHelpers.verifyToken(
//       token,
//       config.jwt.refresh_secret as Secret,
//     );
//   } catch (err) {
//     throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
//   }

//   const { email, } = verifiedToken;

//   const isUserExist = await User.find({email});
//   if (!isUserExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
//   }

//   //generate new token

//   const newAccessToken = jwtHelpers.createToken(
//     {
//       username: isUserExist.name,
//       name: isUserExist.email,
//       id: isUserExist.id,
//       role: isUserExist.role,

//     },
//     config.jwt.secret as Secret,
//     config.jwt.expires_in as string,
//   );

//   return {
//     accessToken: newAccessToken,
//   };
// };

export const AuthService = {
  login,
  //refreshToken,
};
