// Router.tsx

import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../pages/Layout";
import { HomePage } from "../pages/HomePage";
import { SearchJobsPage } from "../pages/SearchJobsPage";
import { JobsDetailPage } from "../pages/JobDetailPage";
import { UserPage } from "../pages/UserPage";
import { ErrorPage } from "../pages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    errorElement: <ErrorPage />, 
    children: [
      {
        path: "/", // Root path
        element: <HomePage />,
      },
      {
        path: "/jobs", // All jobs
        element: <SearchJobsPage />,
      },
      {
        path: "/jobs/:jobId", // Jobdetail
        element: <JobsDetailPage />,
      },
      {
        path: "/user", // Saved jobs
        element: <UserPage />,
      },
      {
        path: "/404", // Error page 404
        element: <ErrorPage />,
      },
    ],
  },
]);
