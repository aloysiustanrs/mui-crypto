import "./App.css";
import React, { useState, useEffect } from "react";
import Navbar from "./components/Nav/Navbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Home from "./components/Home/Home";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import CoinTable from "./components/Table/CoinTable";
import CoinPage from "./components/CoinPage/CoinInfo";
import { DataContext } from "./contexts/DataContext";
import Exchanges from "./components/ExchangesPage/Exchanges";
import { CoinList } from "./config/api";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  //Get Coins and pass to children using Context API
  const [coins, setCoins] = useState([]);
  const [coinTableLoading, setCoinTableLoading] = useState(false);

  const axios = require("axios");

  const fetchCoinList = async () => {
    setCoinTableLoading(true);
    const { data } = await axios.get(CoinList());
    setCoins(data);
    setCoinTableLoading(false);
  };

  useEffect(() => {
    fetchCoinList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <DataContext.Provider value={{ coins, setCoins, coinTableLoading }}>
        <div className="App">
          <Navbar>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Home />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/cryptocurrency"
                element={
                  <>
                    <CoinTable />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/exchanges"
                element={
                  <>
                    <Exchanges />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/coins/:id"
                element={
                  <>
                    <CoinPage />
                    <Footer />
                  </>
                }
              />
            </Routes>
          </Navbar>
        </div>
      </DataContext.Provider>
    </ThemeProvider>
  );
}

export default App;
