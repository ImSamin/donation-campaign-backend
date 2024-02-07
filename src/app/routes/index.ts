import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { DonationPostRoutes } from '../modules/DonationPost/donationPost.route';
import { DonationRoutes } from '../modules/donation/donation.route';

const router = express.Router();

router.use('/users/', UserRoutes);
router.use('/auth/', AuthRoutes);
router.use('/donation-post/', DonationPostRoutes);
router.use('/donation/', DonationRoutes);

export default router;
