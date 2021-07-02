
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";
import axios from "axios"
import Pagination from "./components/Pagination"
import Route from "./components/Route";
import PokemonList from "./components/PokemonList"

import React, { useState, useEffect } from "react"







const API_KEY = "cebc5f548fbe1d30ebcf7ab76b28b1f6";



function App() {


  const [pokemon, setPokemon] = useState([])
  const [info, setInfo] = useState({})
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  )
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    let cancel
    axios
      .get(currentPageUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setLoading(false)
        setNextPageUrl(res.data.next)
        setPrevPageUrl(res.data.previous)
        setPokemon(res.data.results.map((p) => p.name))
      })

    return () => cancel()
  }, [currentPageUrl])

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }

  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl)
  }

  if (loading) return "Loading..."

  const getWeather = async (e) => {
    e.preventDefault(); // stops the page from doing a full refresh

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();

    if (city && country) {
      setInfo({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ''
      })
    } else {
      setInfo({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: '*Please enter a city and country.'
      })
    }

  }









  return (
    <div>

      <Route path="/">

        <div>
          <div className="wrapper">
            <div className="main">
              <div className="container">
                <div className="row">
                  <div className="col-xs-5 title-container">
                    <Titles />

                  </div>
                  <div className="col-xs-7 form-container">
                    <Form getWeather={getWeather} />
                    <Weather
                      temperature={info.temperature}
                      city={info.city}
                      country={info.country}
                      humidity={info.humidity}
                      description={info.description}
                      error={info.error}
                    />


                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>



      </Route>



      <Route path="/pokemon">
        <div>
          <PokemonList pokemon={pokemon} />
          <Pagination
            gotoNextPage={nextPageUrl && gotoNextPage}
            gotoPrevPage={prevPageUrl && gotoPrevPage}
          />
        </div>

      </Route>

    </div >
  );
}


export default App;