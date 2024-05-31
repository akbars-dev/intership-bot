import { Context, SessionFlavor } from "grammy";
import SessionData from "./session";

export type MyContext = Context & SessionFlavor<SessionData>;