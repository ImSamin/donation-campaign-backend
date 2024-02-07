import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { DonationPostRoutes } from '../modules/DonationPost/donationPost.route';

const router = express.Router();

router.use('/users/', UserRoutes);
router.use('/auth/', AuthRoutes);
router.use('/donation-post/', DonationPostRoutes);

export default router;
