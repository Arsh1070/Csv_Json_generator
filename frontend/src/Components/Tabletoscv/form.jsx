import React from "react";
import { Row, Col, Input, Form, DatePicker, Button, message } from "antd";
import apiClient from "../../util/apiClient";
const { Item: FormItem } = Form;

const API_CONFIG = {
  POST_FORM_DATA: {
    method: "post",
    url: "/firstPage/",
    data: {},
  },
};

const MyForm = ({ OnReceivedData }) => {
  const [form] = Form.useForm();

  const onFormSubmit = (formData) => {
    const { name, email, dob, country, address } = formData;

    const body = {
      name: name,
      email: email,
      dob: dob,
      country: country,
      address: address,
    };
    let apiPayload = { ...API_CONFIG.POST_FORM_DATA };
    apiPayload.data = body;
    apiClient(apiPayload)
      .then((result) => {
        message.success(result?.data?.status);
        OnReceivedData(result?.data?.status);
      })
      .catch((err) => {
        message.error("Some error occurred !");
      });
    form.resetFields();
  };

  return (
    <Row justify="center">
      <h1>Save Information</h1>
      <Col span={22}>
        <Form
          className="form"
          layout="vertical"
          form={form}
          onFinish={onFormSubmit}
        >
          <Row justify="center" align="middle" gutter={[32, 0]}>
            <Col span={10}>
              <FormItem label="Name" name="name">
                <Input
                  type="text"
                  placeholder="Enter your name"
                  size="medium"
                />
              </FormItem>
            </Col>
            <Col span={10}>
              <FormItem label="Email" name="email">
                <Input
                  type="text"
                  placeholder="Enter your email"
                  size="medium"
                />
              </FormItem>
            </Col>
            <Col span={10}>
              <FormItem label="Country" name="country">
                <Input
                  type="text"
                  placeholder="Enter your country"
                  size="medium"
                />
              </FormItem>
            </Col>
            <Col span={10}>
              <FormItem label="Address" name="address">
                <Input
                  type="text"
                  placeholder="Enter your address"
                  size="medium"
                />
              </FormItem>
            </Col>
            <Col span={10}>
              <FormItem label="DOB" name="dob">
                <DatePicker
                  format={"DD-MM-YYYY"}
                  placeholder="Select date"
                  size="medium"
                  style={{ width: "100%" }}
                />
              </FormItem>
            </Col>
            <Col span={10}></Col>
            <Col span={10}>
              <Button type="primary" htmlType="submit" size="medium">
                Save
              </Button>
            </Col>
            <Col span={10}></Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default MyForm;
