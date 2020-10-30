# Server Setup

## Development Environment

## Available Scripts

In the project directory, run the following commands step by step:

### `git clone git@github.com:mayankshar21/SWEN90013-2020-PS.git`

This command allows the developer to obtain a development copy. It is a one-time operation.<br />

### `npm install`

This command installs a package, and any packages that it depends on. The installation of the packages are driven by the package-lock file found in the server repository.<br />

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

## Production Environment

The GitHub repository is set up with a CI/CD pipeline to provide continuous integration to Heroku deployment via GitHub Actions. GitHub automatically deploys commits made for the server on the *production-server* branch to Heroku.<br />
The environment variables that the Heroku app uses is encrypted secrets that can be configured under Settings in GitHub.<br />

The server can be accessed at https://ssq-server.herokuapp.com/.<br />


