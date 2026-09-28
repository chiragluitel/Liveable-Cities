# Privacy Notice - `app name`
**Last updated**: 28/09/2026

**Project**: Swinburne University of Technology capstone 'Livable Cities' project in collaboration with the City of Casey

## 1. Introduction
`app name` is a walking route planing application developed by Swinburne University of Technology students for the City of Casey as part of a university capstone project.

This privacy notice explains how the application collects, uses, and handles information from when users plan walking routes, create accounts, and share custom walks.

The application allows users to view map data points, calculate walking routes from their current location to selected destinations, create custom routes passing several map data points and at a specified length, create accounts, track walks completed each week, view community walking routes, and upload custom routes to be shared with the public.

## 2. Information We Collect
The application handles the following types of information:
- Location data: A user's current location, when a route is being calculated
- Account information: A username and password used to authenticate users and allow custom route uploads
- Custom walking routes: Route coordinates, starting points, and destinations

Passwords are hashed before being stored by the application.

## 3. How We Use Information
Information collected is used to provide the applications core functionalities, including:
- Calculating walking routes between a user's current location and a selected destination
- Calculating walking routes of a specified distance including the selected map data points
- Authenticating registered users
- Allowing registered users to upload custom routes
- Making uploaded custom routes available for others to view

The application is designed to use the specified information for these functional purposes.

## 4. Location Data
When a user requests a new walking route, their current location information is sent to the application's backend server for route calculation.

Location data is used temporarily in the routing algorithm as the starting point and destination (unless a different destination is selected) and is discarded once the result has been produced. It is not intentionally retained in a persistent location history by the route planning functionality.

Users will be prompted to allow the application to access their location data when first opening the application. 

## 5. Publicly Shared Walking Routes
Registered users can upload custom walk routes to the backend server. Uploaded routes are accessible to anyone using the application, even those without and account.

A publicly shared route can reveal geographic information, such as the start and end location(s), route coordinates, and selected map data points. Users should consider this before uploading a route, particularly if it includes locations associated with their home, workplace, or other private locations.

Uploaded routes are will be shared publicly as part of the application's functionality. Users will be shown a confirmation pop-up when uploading a custom walk. Account information will not be publicly shown for uploaded walks; however, the username of the uploader will be logged in the backend database. 

Uploaded walks cannot be edited deleted by users. If a user wishes to remove an uploaded walk, they must contact the application backend host.

## 6. Account Information and Password Security
A username and password are required to create an account and upload custom walk routes. More functionalities requiring an account may be added in the future.

Passwords are hashed locally before they are sent to the backend database rather than being stored in plaintext. Passwords and password hashes are intended for authentication purposes and are not intended to be publicly accessible.

Accounts do not collect an email address, and as such will provide no account recovery methods.

The account and password system may be subject to change at a later date and be outsourced to a third party.

## 7. Data Storage and Security
The application uses a backend server to calculate routes, manage accounts, and store uploaded custom routes.

The project intends to handle account information and route data in a manner appropriate to their intended uses.

## 8. Data Retention and Deletion
Location data used for route calculation in intended to be temporary and discarded after processing.

Account information and uploaded routes are stored to support authentication and public route sharing. Uploaded routes cannot be deleted from within the application and deletion must be requested from the backend host.

## 9. Disclosure of Information
Uploaded custom routes are publiclly accessible to anyone using the application.

Account information is used for authentication and account management. It is not intended to be publicly displayed.

Location information is transmitted to the backend for route calculation and is intended to be discarded after that calculation.

## 10. Privacy Enquiries and Complaints
Users with questions, concerns, or requests regarding the handling of their personal information may contact:

`contact details here`

## 11. Changes to This Notice
This notice may be updated if the application's functionality of information-handling practices change.

The latest version will be made available at https://github.com/chiragluitel/Liveable-Cities/blob/main/PRIVACY.md.