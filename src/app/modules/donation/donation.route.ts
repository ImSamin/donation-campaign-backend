import express from 'express';
import { DonationController } from './donation.controller';

const router = express.Router();

router.post('/create', DonationController.createDonation);
router.get('/', DonationController.getDonation);

export const DonationRoutes = router;
