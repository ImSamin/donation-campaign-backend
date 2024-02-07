import express from 'express';
import { DonationPostController } from './donationPost.controller';

const router = express.Router();

router.post('/create', DonationPostController.createDonationPost);
router.patch('/update/:id', DonationPostController.updateDonationPost);
router.delete('/delete/:id', DonationPostController.deleteDonationPost);
router.get('/', DonationPostController.getDonationPost);
router.get('/:id', DonationPostController.getSinglePost);

export const DonationPostRoutes = router;
