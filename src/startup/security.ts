import cors from 'cors';
import { Express } from 'express';
// Define the allowed origins
const corsOpts = {
  origin: true,
  methods: [
    'GET',
    'POST',
    'PUT',
    'DELETE',
    'OPTIONS'
  ],
  allowedHeaders: ['Content-Type', 'Accept', 'Authorization', 'X-Requested-With','Refresh-Token'],
  credentials: true,
};



const securitySetup = (app: Express, express: any) =>
  app
    .use(cors(corsOpts))
    .use(express.json())

export default securitySetup;
