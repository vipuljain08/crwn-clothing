// import {
//   Route,
//   RouterProvider,
//   createBrowserRouter,
//   createRoutesFromElements,
// } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import SignIn from "./routes/authentication/authentication.component";

// const router = createBrowserRouter(
//   createRoutesFromElements(<Route path="/" element={<Home />}></Route>)
// );

// const App = () => <RouterProvider router={router} />;

const Shop = () => {
  return <div>I am the SHOP</div>;
};

const App = () => (
  <Routes>
    <Route path="/" element={<Navigation />}>
      <Route index element={<Home />} />
      <Route path="shop" element={<Shop />} />
      <Route path="auth" element={<SignIn />} />
    </Route>
  </Routes>
);

export default App;
