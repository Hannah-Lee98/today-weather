import { FC, useCallback, useEffect, useState } from "react";
import {
  LOCAL_STORAGE_KEYS,
  SearchHistoryItemType,
  TIME_FORMAT,
  WeatherOfLocation,
} from "../../types";
import { Button, List, Spin } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { SearchIcon, TrashIcon } from "../../icons";
import { fetchWeather } from "../WeatherForm/util.ts";
import { message } from "antd/lib";

interface IDisplaySearchHistory {
  setDisplayData: React.Dispatch<
    React.SetStateAction<WeatherOfLocation | null>
  >;
}
export const DisplaySearchHistory: FC<IDisplaySearchHistory> = (props) => {
  const { setDisplayData } = props;
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItemType[]>(
    [],
  );

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleDeleteRecord = useCallback(
    (record: SearchHistoryItemType) => {
      const x = searchHistory.filter((i) => i.createdAt !== record.createdAt);

      localStorage.setItem(
        LOCAL_STORAGE_KEYS.SEARCH_HISTORY,
        JSON.stringify(x),
      );

      window.dispatchEvent(new Event("storage"));
    },
    [searchHistory],
  );

  const [messageApi, contextHolder] = message.useMessage();

  const handleSearchItem = useCallback(
    async (record: SearchHistoryItemType) => {
      try {
        setIsLoading(true);
        const data = await fetchWeather({ cityName: record.location.name });
        setDisplayData(data);
      } catch (e: unknown) {
        messageApi.open({
          type: "error",
          content: (e as Error).message,
        });
      } finally {
        setIsLoading(false);
      }

      navigate(`?cityName=${record.location.name}`);
    },
    [messageApi, navigate, setDisplayData],
  );

  const updateData = useCallback(() => {
    const values = localStorage.getItem(LOCAL_STORAGE_KEYS.SEARCH_HISTORY);
    if (!values) return;

    const items = JSON.parse(values);
    if (items) {
      setSearchHistory(items);
    }
  }, []);

  useEffect(() => {
    updateData();

    window.addEventListener("storage", updateData);

    return () => {
      window.removeEventListener("storage", updateData);
    };
  }, [updateData]);

  return (
    <Spin spinning={isLoading}>
      {contextHolder}
      <List
        itemLayout="horizontal"
        dataSource={searchHistory}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <Button
                shape="circle"
                onClick={() => {
                  handleSearchItem(item);
                }}
                icon={<SearchIcon className={"w-[18px]"} />}
              />,

              <Button
                shape="circle"
                onClick={() => {
                  handleDeleteRecord(item);
                }}
                icon={<TrashIcon className={"w-[20px]"} />}
              />,
            ]}
          >
            <List.Item.Meta
              title={`${index + 1}. ${item.location.name},${
                item.location.country
              }`}
            />
            <div>
              {item.createdAt
                ? dayjs(item.createdAt).format(TIME_FORMAT.TIME_ONLY)
                : ""}
            </div>
          </List.Item>
        )}
      />
    </Spin>
  );
};
