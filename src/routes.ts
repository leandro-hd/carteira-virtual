import { Router } from 'express';
import { pageRegister, pageLogin, pageTransaction, pageUpdate, pageMoney, pageHistory, pageFriend } from './pages';
import UserController from './controllers/UserController';
import TransactionActionController from './controllers/TransactionActionController';
import TransactionQueryController from './controllers/TransactionQueryController';

const routes = Router();

routes.get('/register', pageRegister);
routes.post('/users', UserController.create);

routes.get('/login', pageLogin);
routes.post('/login', UserController.login);

routes.get('/transaction', pageTransaction);
routes.post('/transactions', TransactionActionController.create);

routes.get('/update', pageUpdate);
routes.post('/transactions/update', TransactionActionController.update);

routes.get('/money', pageMoney);
routes.get('/total/:email', TransactionQueryController.total);

routes.get('/history', pageHistory);
routes.get('/history/:email/:start_date/:end_date', TransactionQueryController.history);

routes.get('/friend', pageFriend);
routes.get('/friends/:sender/:address', TransactionQueryController.friends);

export { routes };