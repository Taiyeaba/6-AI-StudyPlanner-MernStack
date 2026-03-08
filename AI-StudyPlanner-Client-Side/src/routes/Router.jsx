import { createBrowserRouter } from "react-router";
import MainLayout from "../LayOut.jsx/MainLayout";
import Home from "../pages/Home";
import Error from "../pages/Error";
import Blog from "../Withoutloginfile/Blog";
import About from "../Withoutloginfile/About";
import Features from "../Withoutloginfile/Features";
import Pricing from "../Withoutloginfile/Pricing";
import Dashboard from "../LoginFile/Dashboard";
import MyPlans from "../LoginFile/MyPlans";
import Calendar from "../LoginFile/Calendar";
import Analytics from "../LoginFile/Analytics";
import BlogPost from "../Withoutloginfile/BlogPost";
import BlogDetails from "../Withoutloginfile/BlogDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/blog',
        element: <Blog />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/features',
        element: <Features />,
      },
      {
        path: '/pricing',
        element: <Pricing />,
      },

      {
        path: '/dashboard',
        element: <Dashboard />,
      },

      {
        path: '/plans',
        element: <MyPlans />,
      },

      {
        path: '/calendar',
        element: <Calendar />,
      },
      {
        path: '/analytics',
        element: <Analytics />,
      },

      {
        path: "/blog/:slug",
        element: <BlogPost />,
      },
      {
        path: "/blog/all",
        element: <BlogDetails />,
      },




       

    ]
  },
]);