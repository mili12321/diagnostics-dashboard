## 📊 Project Overview

This project is a responsive React dashboard that allows users to view, analyze, and manage diagnostic entries.

It includes:

A diagnostics table displaying all diagnostics, sorted with the following logic:

1. First by **date** (created_at), newest first.

2. Then by severity: **critical** → **alarm** → **healthy**.

3. If multiple entries share the same date and severity, the newest one (by timestamp) appears first.

A Fusion Trend Graph that visualizes the most severe diagnostic for each day.
If multiple entries have the same severity level on a given day, the most recent one is displayed.

The graph displays 14 days of data by default, starting from today and going backward.
Users can select a custom start date to view a 14-day window beginning from that date.

A form to add new diagnostic entries in real-time. The table and graph update immediately after submission.

## 🔍 Performance Considerations

- The diagnostics list is sorted using simple .sort() calls on each update — suitable for small to medium datasets.

- If working with large datasets or high-frequency real-time inserts, I would:
  - Use a balanced binary search tree (e.g., bintrees) for O(log n) inserts.

  - Virtualize the list (e.g., react-window) for efficient rendering.

## 🧠 Form State & Validation

For managing the form state and validation logic, I chose to use **react-hook-form** together with **zod**.

Why I chose react-hook-form instead of building form logic from scratch:

- Simplicity & readability: Even in relatively simple forms, manually managing useState for each field and validating on onChange or onSubmit can become verbose and error-prone.
  react-hook-form abstracts this well with a clean API.

- Built-in form state management: It handles dirty state, touched fields, errors, and revalidation logic with minimal setup.

- Performance: react-hook-form is optimized for performance and doesn't trigger unnecessary re-renders — especially useful in more complex forms with many fields.

- Scalability: This makes it easy to scale the form later (e.g., adding more fields, nested inputs, step-based wizards, etc.).

## 🧠 Assumptions

- The assignment specifies three severity levels: **critical**, **alarm**, and **healthy**.
  However, while working on the Fusion Trend Graph, I noticed a fourth level: **monitor**.
  Since this wasn't included in the instructions or form requirements, I chose not to support it in the UI.

## 🔍 Performance Considerations

This demo uses simple array sorting (`.sort()` on each update), which is sufficient for small or medium datasets.

If scaling to a much larger dataset or handling high-frequency inserts in real time, I would:

- Use a balanced binary search tree (e.g., `bintrees` library) for O(log n) insert performance.
- Or maintain a virtualized list for efficient rendering (e.g., `react-window`).

For this assignment, I prioritized simplicity and readability.

### 🛠️ Backend Simulation

I used **json-server** to simulate a RESTful API quickly and without writing custom server logic.

To start the mock server, run the following command in a separate terminal:

```bash
npx json-server -p 3500 -w data/db.json
```

## 🔧 Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the mock backend (in a separate terminal):

```bash
npx json-server -p 3500 -w data/db.json
```

3. Run the development server:

```bash
npm run dev
```

## 🐳 Run with Docker

To run the full app (frontend + mock API) using Docker:

1. Build and start the app:

```bash
docker-compose up --build
```

2. Open the app in your browser:

```bash
http://localhost:3000
```

3. To stop the app:

```bash
docker-compose down
```
