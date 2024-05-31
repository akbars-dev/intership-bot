import { Composer } from "grammy";
import { MyContext } from "../types/context";

import { startInit } from "../routes/start.router";



const handler = new Composer<MyContext>();

handler.command('start', startInit);


export default handler