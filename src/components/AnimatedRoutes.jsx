import { Routes, Route, useLocation } from "react-router";

function renderRoutes(routes) {
  return routes.map((route, index) => {
    if (route.children) {
      return (
        <Route element={route.element} key={index}>
          {renderRoutes(route.children)}
        </Route>
      );
    }

    return <Route key={index} path={route.path} element={route.element} />;
  });
}

function AnimatedRoutes({ routes }) {
  const location = useLocation();

  return <Routes location={location}>{renderRoutes(routes)}</Routes>;
}

export default AnimatedRoutes;
