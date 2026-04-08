# City of Casey Livable Cities Audit
An app utilising the data available from the [City of Casey Open Data Exchange](https://data.casey.vic.gov.au/pages/home/)

## Development Environment Setup
First setup the development environment following the guide from React Native: https://reactnative.dev/docs/set-up-your-environment

In summary:

1. Install NodeJS and JDK (``choco install -y nodejs-lts microsoft-openjdk17``)
2. Setup the debugging environment
    1. For Android
        1. Install the latest version of [Android Studio](https://developer.android.com/studio), including (when available):
            - ``Android SDK``
            - ``Android SDK Platform``
            - ``Android Virtual Device``
        2. Install the Android SDK from ``More Actions -> SDK Manager``
            - ``SDK Platforms -> Android 15 (VanillaIceCream)``
                - ``Android SDK Platform 35``
                - ``Google APIs Intel x86_64 Atom System Image``
            - ``SDK Tools -> Android SDK Build-Tools``
                - ``36.0.0``
            - ``SDK Tools -> Android SDK Command-line Tools (latest)``
        3. Configure the ``ANDROID_HOME`` environment variable
        4. Add ``platform-tools`` to Path
        3. Prepare debugging 
            1. For a physical Android deivce
                1. Enable developer mode on the device
                2. Connect device via USB
                    - Confirm connection by running ``adb devices``
            2. For the virtual device
                1. Open Android Studio
                2. Click ``More Options -> Virtual Device Manager``
                3. Click ``Create Virtual Device``
                4. On the ``Add Device`` page, select the device you would like to emulate, then click ``Next``
                5. Set the API to ``API 35 "VanillaIceCream"; Android 15.0``
                6. Select the OS image to use
                    - ``Google APIs Intel x86_64 Atom System Image``

        Once the environment is set up, ensure the expo-dev-client is installed by running:
        ```console
        npx expo install expo-dev-client
        ```
        Then to run the app, run the following command in the project folder:
        ```console
        npm run android
        ```
        or 
        ```console
        npx expo run:android
        ```
    2. For IOS
        1. TODO


## Features
TODO

## Sources
- Settings Dropdown Arrow: https://www.svgrepo.com/svg/509905/dropdown-arrow

## TODO
### README file
- [ ] Expand description
- [ ] Add setup for IOS
- [ ] Add features section
- [ ] Add license information

## License
TODO
