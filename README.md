# ChaiShots

This project was developed as part of an assignment from ChaiShots, focused on rendering images in an optimized, efficient, and cached manner.

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Demo:


https://github.com/user-attachments/assets/0a45d32c-ab4d-4418-b0b0-593a6f86c2aa


## Optimisations:


1. **Virtualized List Rendering**  
   - Used `FlatList` with `onEndReachedThreshold` and `onEndReached` to window and paginate items rather than rendering all at once.

2. **Infinite Scroll Pagination**  
   - Simulated network fetch in pages (e.g. 10 items at a time) to avoid large payloads and keep initial load fast.

3. **State Persistence**  
   - **Redux Toolkit + redux‑persist** to bootstrap and cache feed data (`items`, `page`, `hasMore`) in AsyncStorage, enabling offline viewing on app restart.

4. **Efficient Image Caching**  
   - **react‑native‑fast‑image** with `cache: FastImage.cacheControl.immutable` (downloads once, then serves from disk) and `priority: FastImage.priority.high` to speed up visible thumbnails.

5. **Image Preloading**  
   - Preloaded the next page of thumbnails via `FastImage.preload()` immediately after fetching data, eliminating blank placeholders on scroll.

6. **Memoized Cards**  
   - Wrapped each card in `React.memo` with a custom props comparator (`item.id` + `shouldElevate`) to skip unnecessary re‑renders when unrelated props change.

7. **Key Extraction**  
    - Provided `keyExtractor={item => item.id}` on `FlatList` to help React maintain stable item identity and avoid reordering overhead.

8. **AsyncStorage Thunks**  
    - Encapsulated persistence logic in Redux thunks (`loadImages` / `persistImages`) via `extraArgument` middleware, keeping components free of I/O concerns.
  
9. **Memoized Callbacks**  
   - Used `useCallback` to wrap handlers (e.g., renderItem, press callbacks) so they’re not re‑created on every render, reducing child component updates.


## Quality:

1. **Leveraged TypeScript to enforce static typing and enhance overall code quality**

