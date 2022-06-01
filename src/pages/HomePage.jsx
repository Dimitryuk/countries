import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Controls } from "../components/Controls";
import { useEffect } from "react";
import { ALL_COUNTRIES } from "../config";
import { List } from "../components/List";
import { Card } from "../components/Card";
import { useState } from "react";

export const HomePage = ({ countries, setCountries }) => {
  const navigate = useNavigate();
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const handleSearch = (search, region) => {
    let data = [...countries];
    if (region) {
      data = data.filter((c) => c.region.includes(region));
    }
    if (search) {
      data = data.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilteredCountries(data);
  };

  useEffect(() => {
    if (!countries.length)
      axios.get(ALL_COUNTRIES).then(({ data }) => setCountries(data));
  }, []);

  useEffect(() => {
    handleSearch();
  }, [countries]);
  return (
    <>
      <Controls onSearch={handleSearch} />
      <List>
        {filteredCountries.map((c) => {
          const countryInfo = {
            img: c.flags.png,
            name: c.name,
            info: [
              {
                title: "Population",
                description: c.population,
              },
              {
                title: "Region",
                description: c.region,
              },
              {
                title: "Capital",
                description: c.capital,
              },
            ],
          };

          return (
            <Card
              key={c.name}
              {...countryInfo}
              onClick={() => navigate(`/country/${c.name}`)}
            />
          );
        })}
      </List>
    </>
  );
};
