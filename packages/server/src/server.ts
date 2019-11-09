import 'dotenv/config';
import { App } from './app';
import { CardController } from './api/card/card.controller';
// import AuthenticationController from './authentication/authentication.controller';
// import PostController from './post/post.controller';
// import ReportController from './report/report.controller';
// import UserController from './user/user.controller';
// import validateEnv from './utils/validateEnv';

// validateEnv();

const app = new App(
    [
        new CardController(),
        // new AuthenticationController(),
        // new UserController(),
        // new ReportController(),
    ],
);

app.listen();
