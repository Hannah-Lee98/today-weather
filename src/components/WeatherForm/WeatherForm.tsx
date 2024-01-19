import { Button, Form, Input, Space, Spin } from "antd";
import { FC, useCallback, useEffect, useState } from "react";
import { WeatherOfLocation } from "../../types";
import { message } from "antd/lib";
import { useNavigate } from "react-router-dom";
import { useGetQueryParams } from "../../hooks";
import { fetchWeather } from "./util.ts";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface IFormValue {
  cityName: string;
  countryCode: string;
}

interface IWeatherForm {
  setDisplayData: React.Dispatch<
    React.SetStateAction<WeatherOfLocation | null>
  >;
}

export const WeatherForm: FC<IWeatherForm> = (props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { setDisplayData } = props;

  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const params = useGetQueryParams<{ cityName?: string }>();

  const onFinish = useCallback(
    async (values: IFormValue) => {
      try {
        setIsLoading(true);
        const data = await fetchWeather(values);
        setDisplayData(data);
      } catch (e: unknown) {
        messageApi.open({
          type: "error",
          content: (e as Error).message,
        });
      } finally {
        setIsLoading(false);
      }

      navigate(`?cityName=${values.cityName}`);
    },
    [messageApi, navigate, setDisplayData],
  );

  const onReset = () => {
    form.resetFields();
  };

  useEffect(() => {
    const initValue = {
      cityName: params.cityName || "",
      countryCode: "",
    };
    if (params.cityName === form.getFieldValue("cityName")) return;

    form.setFieldsValue(initValue);
  }, [form, params, params.cityName]);

  return (
    <>
      {contextHolder}
      <Spin spinning={isLoading}>
        <Form
          {...layout}
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
        >
          <Form.Item name="cityName" label="City" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="countryCode" label="Country">
            <Input />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Space>
              <Button type="primary" htmlType="submit">
                Search
              </Button>
              <Button htmlType="button" onClick={onReset}>
                Clear
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
};
