# Keewee

React Native App that shows you the public washrooms nearby. Build with [Mapbox Maps SDK for React Native](https://github.com/mapbox/react-native-mapbox-gl).

## Setting up environment
- Mapbox API token - Find instructions to get one [here](https://www.mapbox.com/help/how-access-tokens-work/)
- Follow the steps as mentioned in **Getting Started** section of [react-native website](http://facebook.github.io/react-native/docs/getting-started.html) in the **Build with native code** tab

## Clone repository and running on emulator

Clone source code

```sh
git clone https://github.com/buyunwang/keewee.git
cd Keewee
yarn
```
Alternatively you can use:
```npm install``` (to install project dependencies)

After replacing the `MAPBOX_ACCESS_TOKEN`:

```sh
yarn start:ios
or
react-native run-ios
```

## Restify API

> RESTful API is built with Node.js, Restify, Mongoose and JWT. 

## Quick Start

```bash
# Install dependencies
npm install

# Serve on localhost:3000
npm start
```

## API Endpoints

#### Washroom Routes

- GET /washrooms

### TODO:
- [x] Nodejs+MongoDB Backend
- [x] Redux
- [x] Display washrooms in Mapview
- [x] Popup Modal Card
- [x] Navigation on Google Maps
- [ ] Mapbox Directions(Route Preview)
- [ ] Update doc with how to run local server
