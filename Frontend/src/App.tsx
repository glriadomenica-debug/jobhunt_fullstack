import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";

function App() {
  console.log("App loaded");
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
export default App;
