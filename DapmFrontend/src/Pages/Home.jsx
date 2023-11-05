import React, { useContext, useEffect, useState } from "react";

import axios from "axios";

import { auth } from "../Firebase/firebaseConfig";
import { signOut } from "firebase/auth";

import { UserContext } from "../context/AuthContext";
const Home = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const { setUser } = useContext(UserContext);
  const Logout = async () => {
    try {
      await signOut(auth);
      setUser(false);
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  async function fetchData() {
    try {
      const response = await axios.get(
        "https://fbc.pythonanywhere.com/api/all/1/"
      );
      console.log(response.data.results);
      setData(response.data.results);
      setError("");
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  }

  // const fetchData = () => {
  //   fetch('https://fbc.pythonanywhere.com/api/all/1/')
  //   .then((response) => response.json())
  //   .then((data) => {
  //     setData(data);
  //     setError("");
  //     console.log(data.results)
  //   })
  //   .catch((error) => {
  //     setError(error.message)
  //     console.error("Error fetching data:", error);
  //   });
  // }

  useEffect(() => {
    fetchData();
    console.log("page rendered");
  }, []);

  return (
    <div>
      <nav className="flex flex-wrap justify-center gap-4 sm:justify-evenly p-2 items-center border-b-2 w-full">
        <h1 className=" text-blue-400 font-bold">Dapm</h1>
        <div className="flex px-3 shrink border items-center rounded-md ">
          <input
            className="bg-transparent shrink p-2 outline-none"
            placeholder="Enter a prompt"
            type="search"
          />
          <button className="bg-blue-400 rounded h-[30px] text-base px-2">
            Search
          </button>
        </div>
        <button
          onClick={Logout}
          className="bg-blue-400 rounded h-[30px] text-base px-2"
        >
          Logout
        </button>
      </nav>
      <h3 className="text-red-500 text-center">{error}</h3>
      <div className="flex mt-9 justify-center items-center flex-wrap gap-4">
        {data.map((movie) => {
          return (
            <div
              key={movie.id}
              className="w-[300px] relative h-[350px] border overflow-hidden bg-slate-900 rounded-md"
            >
              {movie.primaryImage && movie.primaryImage.url ? (
                <div className="relative h-[350px]">
                  <img
                    className="w-full h-full object-cover"
                    src={movie.primaryImage.url}
                    alt={movie.titleText.text}
                  />
                  <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-black opacity-90" />
                </div>
              ) : (
                <p>No image available</p>
              )}
              <div className="absolute z-20 p-3 inset-0 flex flex-col justify-end items-center">
                <h2 className="text-white font-bold text-xl">
                  {movie.titleText.text}
                </h2>
                <h5 className="text-white font-semibold">{`Release year: ${movie.releaseYear.year}`}</h5>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
