# graphql-serverless-dynamodb

> An example NodeJS API (GraphQL) with lambda handler backed by DynamoDB using the DataMapper lib. Includes CloudFormation template for resources and GitHub Workflows for CI/CD.

## Why

This is a contrived example, intended to demonstrate things you'd normally only incorporate into a larger bespoke app, such as:

-   Configuration supporting multiple environments and environment variable based config
-   Dependency Injection (DI) supporting app and request scoped containers
-   Logging
-   GraphQL using ApolloServer with both standalone and lambda entry points
-   Testing using mocha and chai, using Test Explorer for local dev
    -   Unit tests
    -   Integration tests
    -   Approval tests
-   Launch configurations:
    -   Step through debug the app via ts-node (without compiling JS first)
    -   Run utility tasks in debug mode
-   Build / Deploy:
    -   Building, both for a lambda target (using webpack) and as a standalone NodeJS server application (not using webpack)
    -   Deployment to CloudFormation with YAML based templates
    -   Github CI/CD workflows

> I agree with doing things the simplest way. Ideally you'd just use AWS AppSync or Amplify frameworks instead of what I have put together here. However, if you have reasons why you defer to bespoke coding, I'd personally prefer to stick to patterns I've successfully used before.

## Getting Started

## Stack

## Build / Deploy

## Status

![CI Status](https://github.com/cuzzlor/graphql-serverless-dynamodb/workflows/.github/workflows/ci.yml/badge.svg)
![CD Status](https://github.com/cuzzlor/graphql-serverless-dynamodb/workflows/.github/workflows/cd.yml/badge.svg)
