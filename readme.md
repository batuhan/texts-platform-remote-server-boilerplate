# Platform Remote Server Boilerplate

This is the server side boilerplate of remote platform integration for Texts. 

Client side boilerplate at https://github.com/batuhan/texts-platform-remote-client

## Prerequisites

Before you begin. ensure you have the following installed.

- [Node.js](https://nodejs.org/en)

## How to install

- Clone this repository and navigate into the project directory:
```bash
git clone https://github.com/batuhan/texts-platform-remote-server-boilerplate.git && cd texts-platform-remote-server-boilerplate
```
- Create an .env file with the following for a postgres db
```
DATABASE_URL=
PORT=
```
- Install dependencies and build the project:
```bash
npm install
npm build
```
- Start the server
```bash
npm start
```

## Customizing Integration

For most implementations you only need to change what is in the platform directory. 

Routes directory has the functions necessary for a Texts platform integration to work in remote format as routes. All of these routes recieve the same data as the functions from platform-sdk with current user ID added in to differentiate users on server side.

To send data back to user and/or perform any Server Events, platform remote uses a ws connection that you can access with the helper function `sendEvent(event: ServerEvent, userID: string)` which helps you to send events back to client.

And if you need to store some extra data about a user, platform remote uses a simple in memory map called extraMap, which is basically a map of `Map<UserID, any>` that you can use to map data using the user's ID. This map is set on login using the user credentials and on init using the session from client side. You can use `getExtra(userID: UserID)` helper function to get the extra associated with a user afterwards.

## Credits
This integration was built at [Pickled Works](https://pickled.works/) by [@alperdegre](https://github.com/alperdegre/) and it isn't an official integration by Texts.
