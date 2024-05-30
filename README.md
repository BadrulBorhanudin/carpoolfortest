## Title
CarPoolHub

## Description
This project uses everything I’ve learned throughout this course to create a MERN stack single-page application that works with real-world data to solve a real-world challenge, with a focus on data and user demand.

## About the Project
CarPoolHub simplifies ride-sharing, allowing you to effortlessly find or offer rides with just a few taps. By sharing rides, we can significantly reduce the number of cars on the road, leading to less traffic, lower emissions, and substantial savings on fuel costs.

### Built with:

[![MongoDB][MongoDB]][MongoDB-url]
[![Express.js][Express.js]][Express-url]
[![React][React.js]][React-url]
[![Node.js][Node.js]][Node-url]
[![ChakraUI][ChakraUI]][Chakra-url]
[![GraphQL][GraphQL]][GraphQL-url]

## Table of Contents
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installations](#installations)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)
- [Links](#links)

## Getting Started
[Download](https://github.com/BadrulBorhanudin/carpoolhub) the repository or:
```
git clone git@github.com:BadrulBorhanudin/carpoolhub.git
```

### Prerequisites
You need to have Node JS installed. [Find out more.](https://nodejs.org/en)

### Installations
Once the repo is downloaded to your local:

1. Create .env in /server that will contain the following:

```
JWT_SECRET="YOUR-SECRET-KEY"
JWT_EXPIRATION="YOUR-DESIRED-LENGTH E.G. 2HRS"
LOCATIONIQ_API_KEY="YOUR-LOCATIONIQ-API-KEY"
STRIPE_SECRET_KEY="YOUR-STRIPE-SECRET-KEY"
SUCCESS_URL="http://localhost:3000/success"
```
Note: This setup is configured ready to run in your local environment.

2. Get free [LocationIQ API Key](https://locationiq.com/) and [Stripe Test Keys](https://stripe.com/en-my) here.

3. Install NPM packages:

```
npm i
```

4. Load data seed (optional):

```
npm run seed
```

5. Build the application:

```
npm run build
```

6. Finally, get both client and server to run simultaneously:

```
npm run develop
```

## Usage
<!-- <img src="client/src/assets/images/screenshot-01.png" alt="project-logo-01" width="600"> -->

## License
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)  
This application is covered under the [ISC license.](https://opensource.org/licenses/ISC)


## Contributing
Give credit to Badrul Borhanudin.

## Tests
There are no tests associated with this project.

## Questions
If you have any questions, you can reach out to me via email at badrulborhanudin@gmail.com. You can also find more information about me and my other projects on my GitHub profile: [BadrulBorhanudin](https://github.com/BadrulBorhanudin)

## Links
* [The URL of the functional, deployed application.](https://www.youtube.com/watch?v=dQw4w9WgXcQ)
* [The URL of the GitHub repository, with a unique name and a README that describes the project.](https://github.com/BadrulBorhanudin/carpoolhub)

<!-- MARKDOWN LINKS & IMAGES -->

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[MongoDB]: https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://mongodb.com/
[Express.js]: https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://expressjs.com/
[Node.js]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
[Node-url]: https://nodejs.org/
[ChakraUI]: https://img.shields.io/badge/Chakra_UI-319795?style=for-the-badge&logo=chakraui&logoColor=white
[Chakra-url]: https://chakra-ui.com/
[GraphQL]: https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white
[GraphQL-url]: https://graphql.org/




