# AI-Powered Sentiment Analysis Tool (Frontend)

This is the frontend for the AI-Powered Sentiment Analysis Tool, built with **React** and **Vite**. It allows users to submit movie reviews and receive sentiment analysis results using both rule-based and GPT-4 powered AI models.

## Features

- Modern, responsive UI with Tailwind CSS
- Analyze movie reviews for sentiment (Positive, Negative, Neutral)
- Results from both rule-based and GPT-4 models
- Copy results to clipboard
- Instant feedback and error handling

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository and navigate to the `frontend` folder:

   ```sh
   git clone <your-repo-url>
   cd frontend
   ```

2. Install dependencies:

   ```sh
   npm install
   # or
   yarn install
   ```

3. Configure the backend URL in `.env`:

   ```
   VITE_BACKEND_URL=http://localhost:5000
   ```

### Running the App

Start the development server:

```sh
npm run dev
# or
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```sh
npm run build
# or
yarn build
```

### Linting

```sh
npm run lint
```

## Project Structure

- `src/` – Main source code
  - `pages/` – Home and Result pages
  - `assets/` – Static assets
  - `App.jsx` – Main app component
  - `main.jsx` – Entry point
- `public/` – Static files
- `index.html` – HTML template

## Environment Variables

- `VITE_BACKEND_URL` – URL of the backend API (default: `http://localhost:5000`)

## License

MIT

---

*Built with [Vite](https://vitejs.dev/) and [React](https://react.dev/).*
