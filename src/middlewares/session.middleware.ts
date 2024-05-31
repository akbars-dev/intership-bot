import {session as grammySession} from 'grammy';
import { FileAdapter } from '@grammyjs/storage-file';

import SessionData from '../types/session'


const fileAdapter = new FileAdapter<SessionData>({dirName: "../session"});

export default grammySession({
    initial: (): SessionData => ({
        state: 'start'
    }),

    storage: fileAdapter
})
