import React from "react";
import axios from "axios";
import { IoArrowBack } from "react-icons/io5";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { searchByCountry } from "../config";
import { Button } from "../components/Button";
import { Info } from "../components/Info";

export const Details = () => {
  const goBack = useNavigate();
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  console.log(country);

  useEffect(() => {
    axios.get(searchByCountry(name)).then(({ data }) => setCountry(data[0]));
  }, [name]);

  return (
    <div>
      <Button onClick={() => goBack(-1)}>
        <IoArrowBack />
        Back
      </Button>
      {country && <Info {...country} />}
    </div>
  );
};
