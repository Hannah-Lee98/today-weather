import { TIME_FORMAT, WeatherOfLocation } from "../../types";
import { FC } from "react";
import dayjs from "dayjs";
import { Typography } from "antd";

interface IDisplayWeatherLocation {
  data: WeatherOfLocation | null;
}
type ItemProps = { label: string; value: string };
const Item: FC<ItemProps> = (props) => {
  const { label, value } = props;
  return (
    <>
      <span>{label}:</span>
      <span className={"font-bold"}>{value}</span>
    </>
  );
};

export const DisplayWeatherLocation: FC<IDisplayWeatherLocation> = (props) => {
  if (!props.data) {
    return;
  }
  const { location, weather } = props.data;

  const data: Array<ItemProps> = [
    {
      label: "Description",
      value: weather.weather.description,
    },
    {
      label: "Temperature",
      value: `${weather.main.temp_min}°C ~ ${weather.main.temp_max}°C`,
    },
    {
      label: "Humidity",
      value: `${weather.main.humidity || "unknown"}%`,
    },
    {
      label: "Time",
      value: dayjs().format(TIME_FORMAT.FULL_DATE_TIME),
    },
  ];

  return (
    <div className={"w-fit"}>
      <Typography className={"font-bold"}>
        {location.name}, {location.country}
      </Typography>
      <div className={"grid grid-cols-2 justify-start"}>
        <Typography className={"font-bold text-6xl py-1.5"}>
          {weather.weather.main}
        </Typography>
        <span></span>

        {data.map((i) => (
          <Item key={i.label} label={i.label} value={i.value} />
        ))}
      </div>
    </div>
  );
};
