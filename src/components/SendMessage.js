import React, { useState, useContext } from "react";
import { Form, Input, Button, Select } from "antd";
import { Formik } from "formik";
import * as Yup from "yup";
import AppContext from "../AppContext";
import { Link } from "react-router-dom";

// Create an interface to allow the sending of the SMS via the REST API
const { TextArea } = Input;
const { Option } = Select;
const MULTIPART_MSG = "message will be sent as a multipart message";

function SendMessage() {
  const { dispatch } = useContext(AppContext);
  const appState = useContext(AppContext);
  const [selectedKey, setSelectedKey] = useState(
    appState.state.keys[0] ? appState.state.keys[0].name : null
  );
  const keyOptions = appState.state.keys.map((item, index) => {
    return (
      <Option key={index} value={item.name}>
        {item.name}
      </Option>
    );
  });

  if (!selectedKey) {
    return (
      <div>
        Please add key first{" "}
        <Button>
          <Link to="/setting">go to Setting</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h2>Send Message</h2>

      <Select
        style={{ width: 250 }}
        value={selectedKey}
        onChange={value => setSelectedKey(value)}
      >
        {keyOptions}
      </Select>

      <Formik
        initialValues={{ from: "", to: "", message: "" }}
        validationSchema={SendSMSSchema}
        onSubmit={async (values, { resetForm }) => {
          const key = appState.state.keys.filter(
            item => selectedKey === item.name
          );

          const sendEmailResponse = await sendEmail({
            ...values,
            sendWith: { key: key[0].key, secret: key[0].secret }
          });

          dispatch({
            type: "SENDSMS",
            payload: {
              ...values,
              date: new Date().toLocaleString(),
              sendWith: { key: key[0].key, secret: key[0].secret },
              status: sendEmailResponse
            }
          });
          resetForm();
        }}
      >
        {props => {
          const { values, handleChange, handleSubmit, errors, touched } = props;
          return (
            <Form onSubmit={handleSubmit}>
              <Form.Item
                label="From"
                help={errors.from && touched.from ? errors.from : null}
                validateStatus={
                  errors.from && touched.from ? "error" : "success"
                }
              >
                <Input
                  addonBefore={"+61"}
                  id="from"
                  value={values.from}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                label="To"
                help={errors.to && touched.to ? errors.to : null}
                validateStatus={errors.to && touched.to ? "error" : "success"}
              >
                <Input
                  addonBefore={"+61"}
                  id="to"
                  value={values.to}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                label={"Message"}
                help={errors.message && touched.message ? errors.message : null}
                validateStatus={
                  errors.message && touched.message ? "error" : "success"
                }
              >
                <TextArea
                  rows={4}
                  id="message"
                  value={values.message}
                  onChange={handleChange}
                />
                {values.message.length < 160 &&
                  160 - values.message.length + " characters left"}
                {values.message.length > 160 && MULTIPART_MSG}
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Send
                </Button>
              </Form.Item>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

const SendSMSSchema = Yup.object().shape({
  from: Yup.number()
    .typeError("Please enter valid number")
    .min(2, "Too Short!")
    .required("Required"),
  to: Yup.number()
    .typeError("Please enter valid number")
    .min(2, "Too Short!")
    .required("Required"),
  message: Yup.string()
    .min(2, "Too Short!")
    .required("Required")
});

const sendEmail = async values => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_SENDSMS_URL}` +
        `action=sendsms&` +
        `user=${values.sendWith.key}&` +
        `password=${values.sendWith.secret}&` +
        `from=${values.from}&` +
        `to=${values.to}&` +
        `text=${values.message}&` +
        `maxsplit=3`,
      {
        method: "POST"
      }
    );
    const body = await response.text();
    return body;
  } catch (err) {
    return err;
  }
};

export default SendMessage;
