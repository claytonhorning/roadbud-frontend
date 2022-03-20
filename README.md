# Roadbud

# Folder structure

A very simple project structure:

- `android`: This folder is specific for the android version code.
- `ios`: This folder is specific for the ios version code.
- `src`: This folder is the main container of all the code inside your application.
  - `assets`: Asset folder to store all images, vectors, etc.
  - `components`: Folder to store any common component that you use through your app (such as a generic button).
  - `configs`: Folder to store any common component that you use through your app (such as a generic button).
  - `hooks`: This folder contains all actions that can be dispatched to redux, state and any memoization that is helpful on any given context.
  - `navigation`: Folder to store the navigators.
  - `screens`: Folder that contains all your application screens/features.
    - `Screen`: Each screen should be stored inside it's own folder, and inside it a file for its code and a separate one for the styles.
      - `index.js`
      - `styles.js`
  - `store`: Folder to put all redux middlewares and the store.
  - `styles`: Folder to put all generic styles.
  - `utils`: Folder to store all the styling concerns related to the application theme.
  - `App.js`: Main component that starts your whole app.

