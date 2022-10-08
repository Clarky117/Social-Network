# Social Network

![None](https://img.shields.io/badge/license-None-blue)
  
## Table of Contents
1. [Description](#description)
2. [Skills Used](#skills-used)
3. [Installation](#installation)
4. [Readme Visual](#visuals)
5. [Repository and Youtube Video](#links-to-repository-and-deployed-video)
  
## Description

Built the back end components of a Social Network using NoSql.

MongoDB is is a popular choice for many social networks due to be able to deal with large amount of data and its flexibility storing it in an unstructured environment. This sets the foundation to build a full stack application in future.

In this particular api users can share their thoughts, react to friends thoughts, and create a friends list.

## Skills Used

This assignment is set up from scratch with no starter code. First created server.js and ran npm init to create a package.json file. In this file I have entered the dependancies that are required for this particular app, including mongoose to handle our models, and are installed by running `npm i` on the command line.

In these models I have created User.js to handle the user schema, and Thought.js to handle the thought and reaction schemas. After setting up the connection via our config file, and seeding a small amount of data, we can now write some routes to test our end points.

All routes for GET, POST, PUT and DELETE are tested through Insomnia and all acceptance requirements are adhered to.

# Installation

- clone repository
- open folder in VS Code
- open terminal and run `npm i`
- run `npm run seed`
- run `npm run start` on the command line 
- open Insomnia at localhost:3001 to test api routes

## Visuals

VS Code Layout
![vs code layout](/assets/img/1-folder-layout.png)

Insomnia Requests
![insomnia requests](/assets/img/2-insomnia-requests.png)

## Links to Repository and Deployed Video

- Repository - [Clarky's Repo](https://github.com/Clarky117/Social-Network)
- Live Video - [Social Network Back End](https://youtu.be/tSVVmA1S6N8)
