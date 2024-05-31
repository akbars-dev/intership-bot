import { Router } from '@grammyjs/router';
import { start } from './start.router';
import { main } from './main.router';

import { MyContext } from '../types/context';

const router = new Router<MyContext>(ctx => ctx.session.state)

router.route('start', start)
router.route('main', main)

export default router;