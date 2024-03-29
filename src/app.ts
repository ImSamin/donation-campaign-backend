import cors from 'cors';
import express, { Application } from 'express';
//import userService from './app/modules/user/user.service'
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import Routes from './app/routes';

const app: Application = express();

// Cors and Parser
app.use(cors());
app.use(express.json());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

app.use('/api/v1/', Routes);

// Handle Not Found
app.use((req, res) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
});

// Error Handler
app.use(globalErrorHandler);

export default app;
