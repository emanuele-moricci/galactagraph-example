const path = require("path");
const { firstLower, capital } = require("../../Utils/formatUtils");

module.exports = {
  description: "Add a new Micro-Service",
  prompts: [
    {
      type: "input",
      name: "ServiceName",
      message: "What should your service be called?",
      default: "federation-test",
      validate: (value) => {
        if (/.+/.test(value)) {
          return true;
        }

        return "The name is required";
      },
    },
    {
      type: "input",
      name: "ServicePort",
      message: "On which port will it be served?",
      default: "4200",
      validate: (value) => {
        if (/^\d+$/.test(value)) {
          return true;
        }

        return "The port is required and has to be a number";
      },
    },
    {
      type: "input",
      name: "ServiceDescription",
      message: "Write a small description",
      default:
        "GQL microservice project structure with prisma, codegen, apolloserver and typescript",
    },
  ],
  actions: (data) => {
    const cwd = process.cwd();

    const serviceName = (
      data.ServiceName.startsWith("federation-")
        ? data.ServiceName
        : `federation-${data.ServiceName}`
    ).toLowerCase();

    const rootPath = `${path.join(cwd, "/services")}`;
    const servicePath = `${rootPath}/${serviceName}`;
    const srcPath = `${servicePath}/src`;
    const configPath = `${servicePath}/src/config`;

    const actions = [
      // Adds the Prisma schema
      {
        type: "add",
        path: `${servicePath}/prisma/schema.prisma`,
        templateFile: `${__dirname}/prisma/Service.schema.prisma.hbs`,
        abortOnFail: true,
      },
      // Adds the Prisma DB Seeder
      {
        type: "add",
        path: `${servicePath}/prisma/db/seeder.ts`,
        templateFile: `${__dirname}/prisma/Service.seeder.ts.hbs`,
        abortOnFail: true,
      },
      // Adds a default Typescript configuration file
      {
        type: "add",
        path: `${servicePath}/tsconfig.json`,
        templateFile: `${__dirname}/main/Service.tsconfig.json.hbs`,
        abortOnFail: true,
      },
      // Adds a default Package configuration file
      {
        type: "add",
        path: `${servicePath}/package.json`,
        templateFile: `${__dirname}/main/Service.package.json.hbs`,
        abortOnFail: true,
        data: {
          parsedServiceName: serviceName,
        },
      },
      // Adds a default Nodemon configuration file
      {
        type: "add",
        path: `${servicePath}/nodemon.json`,
        templateFile: `${__dirname}/main/Service.nodemon.json.hbs`,
        abortOnFail: true,
      },
      // Adds a default Jest configuration file
      {
        type: "add",
        path: `${servicePath}/jest.config.js`,
        templateFile: `${__dirname}/main/Service.jest.config.js.hbs`,
        abortOnFail: true,
      },
      // Adds a default Env Example configuration file
      {
        type: "add",
        path: `${servicePath}/.env.example`,
        templateFile: `${__dirname}/main/Service.env.example.hbs`,
        abortOnFail: true,
      },
      // Adds a default Codegen configuration file
      {
        type: "add",
        path: `${servicePath}/codegen.yml`,
        templateFile: `${__dirname}/main/Service.codegen.yml.hbs`,
        abortOnFail: true,
      },
      // Adds the main micro-service index file
      {
        type: "add",
        path: `${srcPath}/index.ts`,
        templateFile: `${__dirname}/src/Service.index.ts.hbs`,
        abortOnFail: true,
      },
      // Adds the jest database mocker file
      {
        type: "add",
        path: `${srcPath}/__tests__/__mocks__/prismaMock.ts`,
        templateFile: `${__dirname}/src/tests/Service.prismaMock.ts.hbs`,
        abortOnFail: true,
      },
      // Adds the apollo&prisma config files
      {
        type: "add",
        path: `${configPath}/apollo/apolloServerContext.ts`,
        templateFile: `${__dirname}/src/config/apollo/Service.apolloServerContext.ts.hbs`,
        abortOnFail: true,
      },
      {
        type: "add",
        path: `${configPath}/apollo/apolloServerTestContext.ts`,
        templateFile: `${__dirname}/src/config/apollo/Service.apolloServerTestContext.ts.hbs`,
        abortOnFail: true,
      },
      {
        type: "add",
        path: `${configPath}/apollo/IApolloServerContext.ts`,
        templateFile: `${__dirname}/src/config/apollo/Service.IApolloServerContext.ts.hbs`,
        abortOnFail: true,
      },
      {
        type: "add",
        path: `${configPath}/prisma/IPrismaContext.ts`,
        templateFile: `${__dirname}/src/config/prisma/Service.IPrismaContext.ts.hbs`,
        abortOnFail: true,
      },
      {
        type: "add",
        path: `${configPath}/prisma/prismaClient.ts`,
        templateFile: `${__dirname}/src/config/prisma/Service.prismaClient.ts.hbs`,
        abortOnFail: true,
      },
      {
        type: "add",
        path: `${configPath}/prisma/prismaContext.ts`,
        templateFile: `${__dirname}/src/config/prisma/Service.prismaContext.ts.hbs`,
        abortOnFail: true,
      },
    ];

    actions.push({
      type: "prettify",
      data: { path: `${servicePath}/**` },
    });

    actions.push({
      type: "signalSuccess",
      data: {
        callToAction:
          "Your micro-service was created! Remember to create the .env files, generate the yarn packages/prisma context/db migration+seeding and publish the new apollo federation config.",
      },
    });

    return actions;
  },
};
