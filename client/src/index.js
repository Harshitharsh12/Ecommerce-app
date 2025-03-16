import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./Styles/AuthStyle.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Auth } from "./Context/auth";
import "antd/dist/reset.css";
import { Search } from "./Context/search";
import { Cart } from "./Context/cart";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth>
    <Search>
      <Cart>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Cart>
    </Search>
  </Auth>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
