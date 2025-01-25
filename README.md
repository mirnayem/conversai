# Conversai Chat Application

This is a simple chat application built with Next.js, TypeScript, Tailwindcss, Shadcn, ai, gemini, etc, utilizing various components like `MessageRenderer`, `LoadingSpinner`, and `ErrorRetry` to handle message display, loading states, and error retries. The application is designed to provide a seamless and interactive chat experience with Markdown support for message formatting.

## Features
- **Prompt System or Contextual System Instruction**: Provides instructions about how the assistant should respond.
- **Markdown Support**: Use `ReactMarkdown` to render messages with Markdown syntax.
- **Error Handling**: Retry mechanism implemented for failed operations.
- **Loading Indicator**: A spinner indicates loading states.
- **Editable Messages**: Users can edit their sent messages inline.

### Brief Explanation of Implementation

- **Next.js with App Router**: The project uses the App Router (`/src/app`) to take advantage of file-based routing and server components.  
- **TypeScript**: Ensures type safety and better developer experience.  
- **Components**:  
  - `MessageRenderer.tsx`: Displays the chat messages.  
  - `LoadingSpinner.tsx`: Handles loading states.  
  - `ErrorRetry.tsx`: Implements retry functionality for failed API requests.  
- **Styling**: Global styles are included in `globals.css`.  
- **Environment Variables**: The application requires a `GOOGLE_API_KEY` to interact with external services.

---

## Repository
[GitHub Repository](https://github.com/your-username/chat-application)

## How to Run the Project Locally

### Prerequisites
- Node.js (v16+ or latest version)
- npm or yarn

### Steps
1. **Clone the Repository**  
   ```bash
   git clone <your-repository-link>
   cd conversai
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Create `.env.local` File**  
   Inside the root directory, create a file named `.env.local` and add the following environment variable:  
   ```env
   GOOGLE_API_KEY=<Your_Google_API_Key_From_Gemini>
   ```  
   Replace `<Your_Google_API_Key_From_Gemini>` with the actual API key.

4. **Start the Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The application will be available at `http://localhost:3000`.

5. **Build for Production** (Optional)
   To create a production build, run:
   ```bash
   npm run build
   # or
   yarn build
   ```
   The optimized build will be in the `build` directory.

## Implementation

### MessageRenderer
- Displays chat messages with Markdown rendering.
- Allows inline editing of messages with a save/cancel option.
- Uses `useState` for editable states and manages inputs dynamically.

### LoadingSpinner
- A visually appealing spinner created using the `lucide-react` icon library.
- Used to indicate ongoing loading states.

### ErrorRetry
- Handles error states gracefully.
- Displays an error message and a retry button styled using `lucide-react`.
- Callback-based retry mechanism ensures modularity and reuse.

## Folder Structure
```
conversai/
├── src/
│   ├── app/                       # App directory for Next.js routing
│   │   ├── layout.tsx             # Root layout for the application
│   │   ├── page.tsx               # Main entry point (root page)
│   │   ├── globals.css            # Global styles for the application
│   │   ├── components/            # Reusable components
│   │   │   ├── MessageRenderer.tsx # Component to render chat messages
│   │   │   ├── LoadingSpinner.tsx  # Component for loading spinner
│   │   │   └── ErrorRetry.tsx      # Component for error retry
│   │   ├── api/                   # API routes for Next.js
│   │       ├──chat
                ├── route.ts           # Example API route
├── public/
│   ├── favicon.ico                # Favicon for the application
├── .next/                         # Auto-generated build folder
├── node_modules/                  # Installed dependencies
├── .gitignore                     # Git ignore file
├── next-env.d.ts                  # TypeScript types for Next.js
├── next.config.js                 # Next.js configuration file
├── tsconfig.json                  # TypeScript configuration file
├── package.json                   # Project dependencies and scripts
├── README.md                      # Project documentation
└── package-lock.json  # Dependency lock file

```

## License
This project is licensed under the MIT License. See the LICENSE file for more information.

---
Feel free to contribute, report issues, or suggest features by submitting an issue or pull request on the GitHub repository!


