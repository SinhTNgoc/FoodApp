import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Header, MainContainer, CreateContainer } from "./components";
import { getItems } from "./utils/firebaseFuncs";
import { actionType } from "./context/actionType";
import { useEffect} from "react";
import {useStateValue } from "./context/StateProvider";

function App() {
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    const fetchData = async () => {
      await getItems().then((data) => {
        dispatch({ type: actionType.SET_FOOD_ITEMS, foodItems: data });
      });
    };
    fetchData();
  }, [dispatch]);

  return (
    <AnimatePresence exitBeforeEnter>
      <div className="w-screen h-auto flex flex-col ">
        <Header />
        <main className="mt-16 md:mt-20 px-4 md:px-16 py-4 w-full ">
          <Routes>
            <Route path="/*" element={<MainContainer />} />
            <Route path="/createItem" element={<CreateContainer />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
