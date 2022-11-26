require('ts-node/register');

require('./src/database/database').migrator.runAsCLI();