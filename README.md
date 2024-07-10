# Serverless Node.js Application Deployment with AWS Lambda

This repository contains a Serverless Framework configuration for deploying a Node.js application on AWS Lambda, utilizing TypeScript and integrating with AWS services.

## Prerequisites

- Node.js (>= 14.x)
- npm or yarn
- AWS CLI configured with appropriate permissions
- Serverless Framework installed globally (`npm install -g serverless`)

## Project Structure

```
├── src
│   ├── handlers
│   │   └── lambda.ts
│   └── app.ts
├── .gitignore
├── package.json
├── serverless.yml
├── tsconfig.json
└── README.md
```

## Setup

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Compile TypeScript**:

   ```bash
   npm run build
   ```

3. **Environment Variables**:
   Create a `.env` file in the root of your project with the following required variables:

   ```
   MONGO_URI=your_mongodb_uri_here
   ```

   Replace `your_mongodb_uri_here` with your MongoDB connection URI.

4. **Deploy to AWS**:
   ```bash
   serverless deploy
   ```

## Running Locally

To run your Serverless application locally, follow these steps:

1. **Start Local Serverless Environment**:

   ```bash
   npm run offline
   ```

   This command starts a local Serverless environment using the `serverless offline` plugin. It emulates AWS Lambda and API Gateway locally, allowing you to test your application without deploying it to AWS.

2. **Access Your Local Application**:
   Open your browser or use tools like `curl` to access endpoints defined in your `serverless.yml`, typically at `http://localhost:3000` if using default settings.

3. **Testing Endpoints**:
   Use HTTP clients like `curl` or tools like Postman to test your API endpoints locally. For example:

   ```bash
   curl http://localhost:3000/
   ```

   Adjust the endpoint URL (`http://localhost:3000/`) based on your defined routes in `serverless.yml`.

## Serverless Configuration

### `serverless.yml`

```yaml
org: dedeard
service: demo

provider:
  name: aws
  runtime: nodejs20.x

functions:
  api:
    handler: dist/lambda.handler
    events:
      - httpApi: '*' # or use 'http' for REST API Gateway
    layers:
      - arn:aws:lambda:us-east-1:730335295088:layer:common:2 # Example layer ARN

plugins:
  - serverless-dotenv-plugin
  - serverless-offline

build:
  esbuild:
    bundle: true
    external:
      - '@aws-sdk/*'
      - 'sharp'
    exclude:
      - '@aws-sdk/*'
      - 'sharp'
    packages: external
```

### Scripts in `package.json`

The following scripts are available for linting, formatting, building, deploying, and running your application:

```json
"scripts": {
  "lint": "eslint '*.ts' --quiet --fix",
  "format": "prettier --write '*.ts' '*.json'",
  "build": "npm run format && rm -rf dist && tsc",
  "deploy": "npm run build && serverless deploy",
  "offline": "npm run build && serverless offline"
}
```

- **lint**: Runs ESLint to lint TypeScript files (`*.ts`) quietly (`--quiet`) with auto-fixing (`--fix`).
- **format**: Formats TypeScript (`*.ts`) and JSON (`*.json`) files using Prettier.
- **build**: Cleans the `dist` directory, formats TypeScript and JSON files (`npm run format`), and then compiles TypeScript (`tsc`).
- **deploy**: Builds the project (`npm run build`) and deploys it using Serverless Framework (`serverless deploy`).
- **offline**: Similar to `deploy`, but starts a local serverless environment (`serverless offline`) for testing.

These scripts help streamline development, testing, and deployment processes for your serverless application. Adjust them based on your specific project requirements and environment configurations.

## Environment Variables

To run your application locally or deploy it to AWS Lambda, you need to set up a `.env` file in the root of your project. This file should contain sensitive information such as API keys or database connection strings. In this case, the `.env` file is used to store the `MONGO_URI` variable required for connecting to MongoDB.

Make sure to replace `your_mongodb_uri_here` with your actual MongoDB connection URI in the `.env` file before running or deploying your application.

## License

This project is licensed under the MIT License.
