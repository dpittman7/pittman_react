import React from 'react';
import { Home } from "./components/Home.js";
import { Projects } from "./components/Projects.js";
import { Resume } from "./components/Resume.js";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/project',
    element: <Projects />
  },
  {
      path: '/resume',
      element: <Resume />
  },
    //{
    //    path: '/three',
    //    element: <ThreeFiber />
    //},


];

export default AppRoutes;
