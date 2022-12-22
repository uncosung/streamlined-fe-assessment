# Streamlined Payments FE Assessment

This [React](https://reactjs.org/) application is rendered and can be spun up locally using [Next.js](https://nextjs.org/). Style is provided by [styled-components](https://styled-components.com/) and fonts are injected globally via `Next.js` in a `globals.css` file.

[React Hook Forms](https://react-hook-form.com/) is used to manage form state in nested components. The React Hook Forms methods can be accessed by any component in the application through the use of a `FormContextProvider`. Form validation is handled by a [Yup Resolver](https://www.npmjs.com/package/yup) passed to the React Hook Form provider. Form state can be updated and accessed in any component wrapped in the provider. Input fields are registered and can later be accessed via the `getValues` method.

Shared state management and functionality is provided via a custom context hook. Any component wrapped in the context provider has access to these pieces of state and the methods to update them.

## Running the app locally

### Installation

- If on GitHub, pull down this repository to a local directory
- Open a new terminal window and navigate to the directory where this README is found
- Run the command `npm install`
- Once packages are installed, run the command `npm run dev` to start the `Next.js` dev server

### Using the application

- Navigate to `localhost:3000` or the to the port provided by `Next.js` when the dev server is started
- Interact with the various fields and buttons
- Click the save button

Data is currently logged out to the console upon clicking the save button.

![](/streamlined.gif)