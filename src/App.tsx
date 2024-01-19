import {
  DisplaySearchHistory,
  DisplayWeatherLocation,
  WeatherForm,
} from "./components";
import { useState } from "react";
import { WeatherOfLocation } from "./types";
import { Divider, Typography } from "antd";
import { Link } from "react-router-dom";

const { Title } = Typography;

function App() {
  const [displayData, setDisplayData] = useState<WeatherOfLocation | null>(
    null,
  );

  return (
    <div className={"p-3"}>
      <Link to={"/"}>
        <Title level={3}>Today's Weather</Title>
      </Link>
      <Divider />

      <WeatherForm setDisplayData={setDisplayData} />
      <DisplayWeatherLocation data={displayData} />

      <Title level={3}>Search History</Title>
      <Divider />
      <DisplaySearchHistory setDisplayData={setDisplayData} />
    </div>
  );
}

export default App;
