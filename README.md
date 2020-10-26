# Client Setup

## Development Environment

## Available Scripts

In the project directory, run the following commands step by step:

### `git clone git@github.com:mayankshar21/SWEN90013-2020-PS.git`

This command allows the developer to obtain a development copy. It is a one-time operation.<br />

### `npm install`

This command installs a package, and any packages that it depends on. The installation of the packages are driven by the package-lock file found in the client repository.<br />

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Production Environment

The GitHub repository is set up with a CI/CD pipeline to provide continuous integration to Heroku deployment via GitHub Actions. GitHub automatically deploys commits made to production-client branch to Heroku for the client.<br />
The environment variables that the Heroku apps use are encrypted secrets that can be configured under Settings in GitHub.<br />
The link to the client can be accessed at https://ssq-client.herokuapp.com/.<br />


