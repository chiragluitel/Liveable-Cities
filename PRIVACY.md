# Privacy Notice - Casey Walks
**Last updated**: 1/10/2026

**Project**: Swinburne University of Technology capstone 'Livable Cities' project in collaboration with the City of Casey

## 1. Introduction
Casey Walks is a walking route planning application developed by Swinburne University of Technology students for the City of Casey as part of a university capstone project.

This privacy notice explains how the application collects, uses, and handles information from when users plan walking routes, create accounts, and share custom walks.

The application allows users to view local amenities, calculate walking routes from their current location to selected destinations, create custom routes passing various amenities with a specified length, create accounts, track the number of walks completed each week, view community walking routes, and upload custom routes to be shared with the public.

## 2. Information We Collect
The application handles the following types of information:
- A user's current location, when a route is being calculated
- A username and password used to authenticate users and allow custom route uploads
- Custom walking route coordinates, starting points, and destinations

Passwords are hashed before being stored by the application.

## 3. How We Use Information
Any information collected by the application is used to provide the core functionalities, including:
- Calculating walking routes between a user's current location and a selected destination
- Calculating walking routes of a specified distance including the selected amenities
- Authenticating registered users
- Allowing registered users to upload custom routes
- Making uploaded custom routes available for others to view

## 4. Location Data
When a user requests a new walking route, their current location information is sent to the application's backend server for route calculation.

Location data is used temporarily in the routing algorithm as the starting point and destination (unless a different destination is selected) and is discarded once the result has been produced. It is not intentionally retained in a persistent location database by the route planning functionality.

Users will be prompted to allow the application to access their location data when first opening the application. Users can revoke this permission at any time in their devices settings menu.

## 5. Publicly Shared Walking Routes
Registered users can upload custom walk routes to the backend server. Uploaded routes are accessible to anyone using the application, even those without an account.

A publicly shared route can reveal geographic information, such as the start and end location(s), route coordinates, and selected map data points. Users should consider this before uploading a route, particularly if it includes locations associated with their home, workplace, or other private locations. Users are prompted with a confirmation pop-up when they choose to upload a custom walk.

Uploaded routes are shared publicly as part of the application's functionality. Account information will not be publicly shown for uploaded walks; however, the username of the uploader will be logged in the backend database. 

Uploaded walks cannot be edited or deleted by users. If a user wishes to remove an uploaded walk, they must contact the application backend host.

## 6. Account Information and Password Security
A username and password are required to create an account and upload custom walk routes. More functionalities requiring an account may be added in the future.

Passwords are hashed locally before they are sent to the backend database rather than being stored in plaintext. Passwords and password hashes are intended for authentication purposes and are not intended to be publicly accessible.

Accounts do not collect an email address, and as such will provide no account recovery methods.

The account and password system may be subject to change at a later date and be outsourced to a third-party system.

## 7. Data Storage and Security
The application uses a backend server to calculate routes, manage accounts, and store uploaded custom routes.

The project intends to handle account information and route data in a manner appropriate to their intended uses.

## 8. Data Retention and Deletion
Location data used for route calculation in intended to be temporary and discarded after processing.

Account information and uploaded routes are stored to support authentication and public route sharing. Uploaded routes cannot be deleted from within the application and deletion must be requested from the backend host.

## 9. Disclosure of Information
Uploaded custom routes are publicly accessible to anyone using the application.

Account information is used for authentication and account management. It is not intended to be publicly displayed.

Location information is transmitted to the backend for route calculation and is will be discarded after that calculation.

## 10. Privacy Enquiries and Complaints
Users with questions, concerns, or requests regarding the handling of their personal information may contact:

`contact details here`

## 11. Changes to This Notice
This notice may be updated if the application's functionality of information-handling practices change.

The latest version will be made available at https://github.com/chiragluitel/Liveable-Cities/blob/main/PRIVACY.md.

