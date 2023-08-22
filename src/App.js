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
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";

// const router = createBrowserRouter(
//   createRoutesFromElements(<Route path="/" element={<Home />}></Route>)
// );

// const App = () => <RouterProvider router={router} />;

const App = () => (
  <Routes>
    <Route path="/" element={<Navigation />}>
      <Route index element={<Home />} />
      <Route path="shop/*" element={<Shop />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="auth" element={<SignIn />} />
    </Route>
  </Routes>
);

export default App;
