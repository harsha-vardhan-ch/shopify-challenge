# Shopify - Fall 2022 Backend Challenge

Welcome to my submission for the fall 2022 backend challenge! 👋

You can view the demo app on [Replit](https://shopify-challenge.harshach23.repl.co)

- [Shopify - Fall 2022 Backend Challenge](#shopify---fall-2022-backend-challenge)

# System requirements
- [Nodejs]
- [Yarn]

# Replit
- The testing sometimes may timeout because replit is super slow but everything should run properly on
- This application was designed with Node >=18 in mind but Replit can only install up to Node 16

# Description
A detailed description of the challenge can be viewed [here](https://docs.google.com/document/d/1PoxpoaJymXmFB3iCMhGL6js-ibht7GO_DkCF2elCySU/edit).

TL;DR: Build an inventory tracking web application for a logistics company where you can `create`, `edit` and `delete` products and you can also `assign` those products to different warehouses/locations that you can also `create`, `update` and `delete` them.

# Getting started
First things first, make sure you have nodejs >= 16 installed.

```bash
# Clone the app

git clone https://github.com/harsha-vardhan-ch/shopify-challenge.git

# Enter the folder
cd Shopify-F22-backend

# Install all dependencies
yarn install

# Run the application in dev mode
yarn dev
```

# Areas for future improvement & development

There are a lot of things that could be improved, such as persisting data with a database instead of just persisting it in memory. But I think, overall, this code has little tech debt being the vast majority of them relying on dependencies but it is an inevitable evil.

