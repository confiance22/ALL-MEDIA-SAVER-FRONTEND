# All Media Saver mobile app

A Flutter Android app that works like the All Media Saver website. No login, no registration, no setup screens. Paste a link and save the file.

## What it does

- Downloads from TikTok, Instagram, YouTube and X through the same backend as the website.
- Stores a local history of searches and downloads on the device. History is private and never uploaded.
- Light and dark themes, with the choice remembered between launches.
- Hands the finished file to the Android download manager, so the APK does not need storage permissions and the download uses the native progress UI.
- Curved Material 3 cards, buttons, chips and navigation.

## Backend connection

The production backend URL is compiled into the app in `lib/config.dart`:

```
https://media-saver-backend.fly.dev
```

That means a built APK keeps working after it leaves this machine. To point a build at another backend, pass a dart define:

```
flutter build apk --release --dart-define=BACKEND_URL=https://your-backend.example
```

The app calls `/extract` and `/stash`, then opens the returned `/download?token=...` link. The backend sends `Content-Disposition: attachment`, so Android saves the file.

## Build the APK

Flutter SDK 3.x with Android SDK 36 installed is required.

```
cd mobile
flutter pub get
flutter analyze
flutter test
flutter build apk --release
```

The APK is written to `build/app/outputs/flutter-apk/app-release.apk`.

If the Gradle wrapper files are missing on a fresh machine, run this once before building. It only adds missing files and keeps the existing Android configuration:

```
flutter create . --platforms=android
```

The release build uses debug signing so you can install the APK directly. Replace the signing config in `android/app/build.gradle` before publishing to a store.

## Automated APK build

The build workflow lives at `frontend/.github/workflows/build-apk.yml`. Every push to `main` builds the APK and publishes it as the `mobile-latest` GitHub release asset. The website button downloads that asset. The workflow passes the production backend with `--dart-define`, so the published APK keeps working after it leaves the build machine.

## Project layout

- `lib/config.dart` - backend URL and app name
- `lib/api.dart` - backend calls and error handling
- `lib/models.dart` - media, result and history models
- `lib/history_store.dart` - local history via SharedPreferences
- `lib/main.dart` - app, themes and tab navigation
- `lib/screens/home_screen.dart` - paste, resolve and download UI
- `lib/screens/history_screen.dart` - local history UI
- `lib/widgets/ui.dart` - shared curved components
- `android/` - Android project and launcher icons
