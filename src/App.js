import logo from "./logo.svg";
import "./App.css";
import MainPage from "./pages/mainPage";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import "antd/dist/antd.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainPage />
        <ToastContainer  autoClose={700}/>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
