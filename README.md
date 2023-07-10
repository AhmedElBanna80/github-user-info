# Github User Card

This project allows you to search for Github users and view their information.
the project is build using the following

- ([Remix.run](https://remix.run/)) using ([epic stack](https://www.epicweb.dev/epic-stack/)) template.
- ([shadcn ui](https://ui.shadcn.com/)).
- ([tailwind css](https://tailwindcss.com/)).
- and vitest, playwright for testing.

## Prerequisites

- Node.js version 18 or higher \<!-- Specify the required Node.js version -->

## Installation

Clone the repository and install the dependencies:

````bash
git clone 
cd <repository-directory> 
npm install 
````

\## Running the App

To start the development server, run:

```bash
npm run dev 
```

The application will be available at `http://localhost:3000`.

## File Structure

The main changes to the application are in the following files:

- `app/root.tsx` \<!-- Main application file -->
- All files in the `app/routes/userInfo` directory \<!-- User information routes -->

## Running Tests

To run the unit tests:

```bash
npm run test \<!-- Run the unit tests -->
```

To run the Playwright end-to-end tests:

```bash
npm run test:e2e:dev \<!-- Run the end-to-end tests -->
```

## New Tests

New tests have been added in the following file:

- `tests/e2e/home.test.ts`
