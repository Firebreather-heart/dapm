import React, { useContext, useEffect, useState } from "react";

import axios from "axios";

import { auth } from "../Firebase/firebaseConfig";
import { signOut } from "firebase/auth";

import { UserContext } from "../context/AuthContext";
import Skeleton from "../components/Skeleton";
const Home = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [isloading, setIsloading] = useState(true);
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

  const handleInput = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://fbc.pythonanywhere.com/api/search/${searchValue}/`
      );
      console.log(response.data.results);
      setIsloading(false);
      setData(response.data.results);
      setPagination(false);
      setError("");
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  const handleEnterSearch = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const fetchData = async (pageNumber) => {
    try {
      const response = await axios.get(
        `https://fbc.pythonanywhere.com/api/all/${pageNumber}/`
      );
      console.log(response.data.results);
      setIsloading(false);
      setData(response.data.results);
      setError("");
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData(1);
    console.log("page rendered");
  }, []);

  return (
    <div>
      <nav className="flex fixed top-0 bg-[#242424] z-50 flex-wrap justify-center gap-4 sm:justify-evenly p-2 items-center border-b-2 w-full">
        <h1 className=" text-blue-400 font-bold">Dapm</h1>
        <div className="flex px-3 shrink border items-center rounded-md ">
          <input
            className="bg-transparent shrink p-2 outline-none"
            placeholder="Enter a prompt"
            type="search"
            value={searchValue}
            onChange={handleInput}
            onKeyDown={handleEnterSearch}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-400 rounded h-[30px] text-base px-2"
          >
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
      <div className="flex mt-[200px] sm:mt-[100px] justify-center items-center flex-wrap gap-4">
        {isloading ? (
          <Skeleton item={10} />
        ) : data.length > 0 ? (
          data.map((movie) => {
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
                  <p className="text-center p-2">No image available</p>
                )}
                <div className="absolute z-20 p-3 inset-0 flex flex-col justify-end items-center">
                  <h2 className="text-white font-bold text-xl">
                    {movie.titleText.text}
                  </h2>
                  {movie.releaseYear && movie.releaseYear.year ? (
                    <h5 className="text-white font-semibold">
                      {`Release year: ${movie.releaseYear.year}`}
                    </h5>
                  ) : (
                    <p>Not found</p>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p>No Data Found</p>
        )}
      </div>
      <div className="flex w-full p-10 gap-4 items-center justify-center">
        {pagination && (
          <ul className="flex items-center gap-10 justify-center">
            <li className="cursor-pointer" onClick={() => fetchData(1)}>
              1
            </li>
            <li className="cursor-pointer" onClick={() => fetchData(2)}>
              2
            </li>
            <li className="cursor-pointer" onClick={() => fetchData(3)}>
              3
            </li>
            <li className="cursor-pointer" onClick={() => fetchData(4)}>
              4
            </li>
            <li className="cursor-pointer" onClick={() => fetchData(5)}>
              5
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
