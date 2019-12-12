# happy-temp

Uses Node.JS/Typescript/AWS Lambda/API Gateway/SAM.

#### Endpoints

* [currenttempincovilha](https://3qww4coq8b.execute-api.eu-west-1.amazonaws.com/prod/currenttempincovilha)
* [avgtempinsfax](https://3qww4coq8b.execute-api.eu-west-1.amazonaws.com/prod/avgtempinsfax)

#### According to the assignment, has been done in this repository:

* `/currenttempincovilha` endpoint, under a cache layer set in the **API Gateway**
with a 120 seconds TTL, in order to save up on external API calls.
* `/avgtempinsfax` endpoint, under a cache layer set in the **API Gateway** with a
3660 seconds TTL, as this value won't change and theoretically is expensive to
compute.
* A complete CI/CD flow, done via **CodePipeline** and **SAM - CloudFormation**.
It will trigger on any push to the Github master branch, assert the linting of 
the codebase, run the test and verify it passes the coverage threshold, then 
deploy it.
* The build steps can be found in the `buildspec.yaml` file and the SAM 
configuration in `template.yaml`. A view of the CI/CD steps can be found on
[this screenshot](https://i.imgur.com/mGaWIro.png).
* Test suite using Jest.
* Linting, using the set of rules of one of my previous client. I do enjoy its
strictness and its Typescript compatibility, even though it was bit much for an
assignment and I therefore disabled a few rules.

#### Has not been done:

* A connection to the Mongo Atlas cluster. While quite simple, my spare time was
 unfortunately scarce and I had no time to add this final requirement. The 
 _/avgtempinsfax_ uses a set of data in a .json file instead, coming from
 _https://www.historique-meteo.net_
* Another idea would be to have **CloudWatch** schedule a crawler to get the
temperature of Covilha periodically and save it in a Mongo Atlas document, while
the _/currenttempincovilha_ endpoint would just read the latest value. But same,
no time to do that.

The temperatures are sent in Celsius because, let's be honest, Fahrenheit is an
absurdity.

## Usage
To run the app locally, installing `aws-sam-cli` will be a prerequisite.

First build it: `npm run build`.
The app will have to be rebuilt this way every time a new production dependency
is added.

Then run the app:

`sam local start-api --debug`

The endpoints can then be queried locally: 
`curl http://127.0.0.1:3000/avgtempinsfax`

To run the tests:
`npm run test`

Linting:
`npm run lint`