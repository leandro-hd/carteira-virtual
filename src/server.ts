import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

import { app } from './app';

app.listen(process.env.PORT || 3333, () => {
  console.log('Server is running');
});