import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import figlet from 'figlet';
import gradient from 'gradient-string';
import ratelimit from 'express-rate-limit';

import Log from './utils/Log';
import Twitch from './routes/Twitch';
import Discord from './routes/Discord';
import PetPet from './routes/PetPet';

console.log(gradient.pastel(figlet.textSync('STRINGY', 'Univers')));
dotenv.config();

const app = express();
app.set('trust proxy', 1);
app.use(helmet());
app.use(cors());

const limiter = ratelimit({
  windowMs: 5 * 1000, // 5 second
  max: 5,
  message: JSON.stringify({success: false, ratelimited: true}),
});

const l = new Log({prefix: 'API', color: 'magenta'});
const twitch = new Twitch();
const discord = new Discord();
const petpet = new PetPet();

/*
    ROUTES
*/

app.get('/', (req: Request, res: Response) => res.json({success: true, nyaa: 'owo'}));
app.get('/twitch/:channel', limiter, (req: Request, res: Response) => twitch.getChannel(req, res));
app.get('/discord/user/:id', limiter, (req: Request, res: Response) => discord.getUserRoute(req, res));
app.get('/pet/:id', (req: Request, res: Response) => petpet.generateGif(req, res));
app.get('/misc/naniactivation/:orderId/:email/:idk', (req: Request, res: Response) => {
  console.log(req.body);
  res.json({body: 'owo', validated: true});
});

app.listen(9090, () => {
  l.log(`Stringy Software API up`);
});

export {
  discord,
  twitch,
  app,
};
