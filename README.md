# Resource Page for Foleon

This project is test assignment for Fullstack position in Foleon

## Getting Started

### Installation and run

    yarn install
    yarn build && node  --experimental-modules ./server/server.js

## Testing

### Cypress - integration tests

`yarn cy:open` - opens Cypress to select which tests to run. Make sure your application is running before launching `yarn cy:open`.

### Jest - unit and React component tests

**`yarn test`** - executes all tests and re-runs affected tests when you change project files.

## Folder structure

    |--cypress              // cypress tests
    |--server               // server part of application
    |--src                  // All components and functionality
    |----components         // Components of the application
    |----Resources          // API to get resources from server

## Translation

You can specify language and add your trnslation to the file `locales`

## Description of the solution

When you first time open resource page all projects are called from server and added to tabs objects. It is done to be able to filter publications related with specific project

Also first 20 publications are loaded and displayed at All Publications tab. If you want to load more you can scroll down and more publications will be loaded

You can filter by name loaded publications using search input
