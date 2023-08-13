# Royalti Blog

A simple backend blogging platform where users can write, edit, and publish blog posts. The application should allow users to view published posts, to manage posts and user accounts.

![Js](https://flat.badgen.net/badge/Built%20With/JavaScript/blue)
[![Last Commit](https://badgen.net/github/last-commit/St-Pardon/royalti-blog/main)](https://github.com/St-Pardon/royalti-blog/commit)
[![Stars](https://badgen.net/github/stars/St-Pardon/royalti-blog/)](https://github.com/St-Pardon/royalti-blog/commit)
[![License](https://badgen.net/github/license/St-Pardon/royalti-blog/)](https://github.com/St-Pardon/royalti-blog/license)

</div>

## Contents

- [About](#about)
- [Features](#features)
- [Purpose](#purpose)
- [Tools](#tools)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Set Up](#set-up)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Author(s)](#authors)
- [Licence](#license)

## About
Unlock Your Thoughts: Introducing the Innovative Royalti Blogging Platform

Discover the perfect avenue to express your ideas, insights, and stories with our cutting-edge blog application. Seamlessly create, manage, and share your content, whether you're a seasoned writer or a budding blogger. With intuitive features, an elegant interface, and powerful customization options, our platform empowers you to narrate your journey, inspire others, and establish your digital presence. Join our community of wordsmiths and embark on a captivating blogging experience today!
## Features
- **User authentication:** Individual, body or orgnization can create an account and publish blog articules
- **CRUD Operation:** Users can create, edit, and delete their own posts, and view other people posts authenticated or unauthenticated
- **Pagination:** Users can limit number of posts displayed by using the pagination feature to display a limited number of posts per page.
- **Sesrch:** Users can search for specific posts by their name, content tags etc.

## Purpose

The purpose of this project is for both learning and to fulfill the technical assessment requirement for the role of backend engineering at [Royalti.io](https://royalti.io/).

## Tools

The following tools were used in actualizing this project

- **IDE/Text editor:** Visual Code, VI
- **Source Control and Repository:** Git and Github
- **Language(s) and Framework(s):** JavaScript, Express, Node.
- **Libraries:** mongoose, Passportjs, helmet, bcrypt.
- **Database:** MongoDB
- **Testing:** Jest, Supertest, ThunderClient, Postman
- **Others:** npm, zsh terminal,

## Getting Started

To get started, follow the instructions below.

### Prerequisites

To run this project, the following tools must be installed on your machine:

- IDE/Text Editor: preferrably [VSCode](https://code.visualstudio.com/) but any other will surfice.
- Git: if not already installed, install from [here](https://git-scm.com/downloads)
- Terminal: for windows users, [Git Bash](https://git-scm.com/downloads) or [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) will do. Mac or Linux will users any terminal will do.
- API Platform: Application, extention or web base API Platform will do. check out [Postman](https://www.postman.com/) and [ThunderClient](https://www.thunderclient.com/)
- MongoDB: if not already installed, install from [here](https://www.mongodb.com/)

### Set Up

**`Step 1:`** Open your terminal on your computer and clone the code [repository](https://github.com/St-Pardon/royalti-blog.git).

```git
git clone https://github.com/St-Pardon/royalti-blog.git
```
**`Step 2:`** Change into the cloned respository and list the content to make sure the content are intact.
```sh
cd royalti-blog/
ls
...
```
**`Step 3:`** Install all dependencies from the [package.json](./package.json) file.
```sh
npm install
```
> This will install all packages needed for the application in the project directory, not globally.

**`Step 4:`** Start up your Mongo database service and Setup your environmental variables by creating a `.env` file and inputing the neccessary variable.
```sh
touch .env
```
Open the `.env` file on you text editor and create the variables using the this [sampledotenv](./sampledotenv)


**`Step 5:`** Start the application
```bash
npm run start
...
```

**`Step 6:`** Congratulation you have successfully started the application and now open your API Platform and test out the end points. To carefully expore and understand the endpoints see [API Documentation](#api-documentation) to get a list and demo of all the available endpoints and how to use them.
## API Documentation

The API Documentation is live on [Postman](https://documenter.getpostman.com/view/18352130/2s9Xy5MAcX). This contain the full list of the endpoints, their methods and some examples.

## Deployment

Application is live at [royalti-blog](https://royalti-blog.onrender.com) 🚀🚀🚀



## Author(s)

The people resonsible for bring this to live includes
<br/>
<a href = "https://github.com/Tanu-N-Prabhu/Python/graphs/contributors">
<img src = "https://contrib.rocks/image?repo=St-Pardon/royalti-blog"/>
</a>

## License

Project source code is licensed under the [MIT](./LICENSE) license. You are free to fork this repository, edit the code, share and use it both for non-commercial and commercial purposes
