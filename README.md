<!-- Logo and badges -->
<div align="center">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset=".github/images/icon-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset=".github/images/icon.svg">
  <img width="200" alt="Casey Walks icon showing a walking figure surrounded by a split ring" src=".github/images/icon.svg">
</picture>

<br />
<br />

[![React Native: 0.81.5](https://img.shields.io/badge/React_Native-0.81.5-blue?style=for-the-badge&logo=React)](https://reactnative.dev)
[![Expo: SDK 54](https://img.shields.io/badge/Expo-SDK_54-blue?style=for-the-badge&logo=Expo)](https://expo.dev)
[![TypeScript: 5.9.2](https://img.shields.io/badge/TypeScript-5.9.2-blue?style=for-the-badge&logo=TypeScript)](https://www.typescriptlang.org)  
[![GitHub License: MIT](https://img.shields.io/github/license/chiragluitel/Liveable-Cities?style=for-the-badge)](LICENSE)
[![GitHub Latest Release](https://img.shields.io/github/v/release/chiragluitel/Liveable-Cities?style=for-the-badge)](https://github.com/chiragluitel/Liveable-Cities/releases/latest)
![Language: English](https://img.shields.io/badge/lang-en-yellow?style=for-the-badge)

</div>

<!-- Title and summary -->
<div align="center">
    <h1>Casey Walks</h1>
    <h4>A simple walk planner for the City of Casey made for the Livable Cities Audit Swinburne capstone project.</h4>

<!--
[<img src=".github/images/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg" alt="Apple App Store download link" height="40" />](APP STORE URL HERE)
[<img src=".github/images/GetItOnGooglePlay_Badge_Web_color_English.svg" alt="Google Play Store download link" height="40" />](PLAY STORE URL HERE)
-->
</div>

<!-- Table of contents -->
<details>
    <summary>Table of Contents</summary>
    <ol>
        <li><a href="#overview">Overview</a></li>
        <li>
            <a href="#features">Features</a>
            <ul><li><a href="#screenshots">Screenshots</a></li></ul>
        </li>
        <li><a href="#getting-started">Getting Started</a></li>
        <li><a href="#usage">Usage</a></li>
        <li><a href="#build">Build</a></li>
        <li><a href="#privacy">Privacy</a></li>
        <li><a href="#license">License</a></li>
        <li><a href="#ai-usage-declaration">AI Usage</a></li>
        <li><a href="#acknowledgements">Acknowledgements</a></li>
    </ol>
</details>

## Overview
Casey Walks is a simple walk planning app for the City of Casey community to be able to plan and share walking routes in their local area. It allows people to view various public utilities, facilities, and features within the City of Casey and generate walking routes including these points of interest. The app also includes a simple walk counter and community sharing features.

This app was created for a Swinburne University of Technology capstone project which aimed to operationalise the data available in the City of Casey [Open Data Exchange](https://data.casey.vic.gov.au/), as well as encourage other developers to use this data in their own existing or new projects.

## Features
- A map of the City of Casey showing various amenities including:
    - Barbecues
    - Benches
    - Drinking fountains
    - Libraries
    - Public toilets
- Custom walk route creation featuring:
    - Custom walk titles
    - Custom walk distance
    - Selection of walk amenities filters
- A list of the closest nearby amenities
- Community shared walks
- Local weather display
- Weekly walks count tracker and goal
- Account creation for publicly sharing custom walks

<!--
### Screenshots
- main map page w/ bottom sheet at normal (light, dark)
- main map page w/ bottom sheet at up + 2 custom walks (light, dark)
- main map page w/ bottom sheet at up showing nearby + community walks (light, dark)
- profile page logged in (light, dark)
-->

## Getting Started
### Requirements
- Android 7+ or iOS 15.1+ smartphone
- Constant internet access (Wi-Fi or mobile data) while using the app

### Installing
<!--
The app can be installed from the Google Play Store or the Apple App Store. Click the App Store or Play Store badges at the top of the README to go to the store pages or scan the QR codes below:

<table id="qr-code-table">
  <tbody>
    <tr>
      <td align="center">

[Apple App Store](APP STORE URL HERE)
      </td>
      <td align="center">
[Google Play Store](GOOGLE PLAY URL HERE)
      </td>
    </tr>
    <tr>
      <td>
[<img src=".github/images/apple-app-store-qr-code.svg" alt="example QR code" width="250" />](APP STORE URL HERE)
      </td>
      <td>
[<img src=".github/images/google-play-qr-code.svg" alt="example QR code" width="250" />](GOOGLE PLAY URL HERE)
        </td>
    </tr>
  </tbody>
</table>

Additionally, t
-->
The application files for both Android and iOS can be downloaded from the [latest release](https://github.com/chiragluitel/Liveable-Cities/releases/latest). The Android APK can be installed without much issue, but the iOS IPA will require some form of workaround to install, such as jailbreaking your device. We are not responsible for any issues that arise from sideloading our app.

## Usage
### Exploring the map
The main screen shows nearby amenities on an interactive map, supporting standard gestures, along with a recenter and zoom buttons. The filter button opens a list of all possible amenity types and allows users to change which amenity types are visible on the map and in the nearby section.

The bottom sheet provides a search bar, custom walk route list and creation button, nearby amenities list, community walks list, and a report problem button.

### Creating a custom walk
Users can create custom walking routes with the `Create a Custom Walk` button. The walk creation page allows users to enter a title, desired length, and select which amenities the walk should try and include.

Created walks can be edited, deleted, shared publicly with the community.

### Community walks
A collection of existing walking routes and publicly uploaded custom walks from the community are available for users to view and add to their private walks list.

Users can share their custom walks; however, they should keep in mind to not share walks near any sensitive locations. While an account is required to be able to upload and share custom walks, usernames are not shared.

### Tracking weekly walks
Users are able to keep track of how many walks they have completed each week. The goal can be set on the profile page, and the count can be increased by a button on any of the walking route pages. This count will reset at the start of each week on Monday.

### Profile and settings
The profile page contains basic local weather information, the current weekly walk count, and settings for the walk count goal and walking speed (used for walk duration estimates). Users can also create and manage their account on this page.

The settings page contains:
- A theme selection (Auto, Light, or Dark)
- A reduced motion toggle
- Information about the project with relevant links
- A short privacy notice
- Version information
- A button to delete all locally stored data

## Build
> Building for iOS can only be done on macOS

> Using Docker is recommended if your system is supported

### Prerequisites
#### With Docker
- Docker Desktop
  - [macOS install requirements](https://docs.docker.com/desktop/setup/install/mac-install/#system-requirements)
  - [Windows install requirements](https://docs.docker.com/desktop/setup/install/windows-install/#system-requirements)
  - [Linux install requirements](https://docs.docker.com/desktop/setup/install/linux/)

#### Without Docker
- Android Studio + Android SDK for Android development
- macOS + Xcode for iOS development
- Node.js (LTS)
- .Net 9
- PostgreSQL 17

### Building
1. Clone the repository
2. Use the [instructions from Expo](https://docs.expo.dev/get-started/set-up-your-environment/) to install and setup the Expo development environment. We recommend using the development build without EAS.
3. Copy `.env.example` to `.env` and fill it with the correct values
4. Run `npm install` in the `/frontend` folder
5. Build and install the development phone client (in the `/frontend` folder):
    - Android emulator or physical device: `npx expo run:android`
        > For physical Android devices, ensure they are connected via USB with USB Debugging enabled. Use `adb devices` to list connected devices
    - iOS simulator: `npx expo run:ios`
    - Physical iOS device: `npx expo run:ios --device`
        > For physical iOS devices, make sure your device is connected and configured for development in Xcode

If using Docker, <ins>**stop the development server**</ins> and continue to the [With Docker](#with-docker-1) section. If you aren't using docker, <ins>**leave the development server running**</ins> and continue to the [Without Docker](#without-docker-1) section.

#### With Docker
1. Install and setup [Docker Desktop](https://www.docker.com/products/docker-desktop/)
2. Inside the project root folder, run `docker compose up --build`
3. Open the Expo development phone client and connect to the development server
    - If the client doesn't connect automatically, either enter the URL of the development server or scan the QR code
        > If the dev server URL contains `localhost`, replace it with the IP address of the device running the server, assuming the phone is on the same network

#### Without Docker
1. Install PostgeSQL 17 with `winget install PostgeSQL.PostgreSQL.17`
2. Install PostGIS 3.5 with the PostgreSQL Application Stack Builder (`Spatial Extensions -> PostGIS 3.5`)
3. Create a new database in the PostgreSQL server
4. Create a new Login/Group role
5. Update the new database to allow the new login to have full permissions
6. Update `DefaultConnection` in `/backend/CaseySmartHub.Api/appsettings.json` to reflect the new database and user values
7. Open a new terminal and navigate to the `/backend/CaseySmartHub.Api` folder
8. Run `dotnet run` to start the backend
    > The mobile app may need to be restarted to connect to the backend

## Privacy
This app uses your location data temporarily to calculate walking routes. Your location is discarded after route calculation.

If you create an account, your username and securely hashed password are stored to authenticate you and allow you to upload custom walking routes. Uploaded routes are publicly visible to anyone using the app.

For full details about how information is handled, see the full [Privacy Notice](PRIVACY.md).

## License
This application is distributed under the MIT License. See [LICENSE](LICENSE) for more information.

## AI Usage Declaration
Generative AI tools were used to assist with the development of this project, primarily for learning and understanding new tools and libraries, as well as assisting with debugging and resolving some merge conflicts. All AI-generated responses were reviewed, tested, and modified by the development team to ensure the quality of the code used in this project. Only a small amount of the code used in this project was entirely or mostly generated by AI.

## Acknowledgements
This project was developed for a Swinburne University of Technology capstone project in collaboration with the City of Casey.

We would like to thank both the City of Casey for maintaining their Open Data Portal and submitting this project as part of the Swinburne capstone program. We also thank Swinburne University of Technology for providing us the opportunity to work on this project and gain real world software development experience.

