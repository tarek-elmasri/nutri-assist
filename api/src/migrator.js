require('ts-node/register');

require('./database/database').migrator.runAsCLI();