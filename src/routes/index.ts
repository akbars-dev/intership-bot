import { Router } from '@grammyjs/router';
import { start } from './start.router';
import { main } from './main.router';
import { categories } from './categories';


import { MyContext } from '../types/context';

const router = new Router<MyContext>(ctx => ctx.session.state)

router.route('start', start)
router.route('main', main)
router.route('categories', categories)

export default router;