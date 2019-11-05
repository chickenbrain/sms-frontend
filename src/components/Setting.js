import React, { useState, useContext } from "react";
import { Form, Input, Button, Table } from "antd";
import { Formik } from "formik";
import * as Yup from "yup";
import AppContext from "../AppContext";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "Key",
    dataIndex: "key",
    key: "key"
  },
  {
    title: "Secret",
    dataIndex: "secret",
    key: "secret"
  }
];

const SignupSchema = Yup.object().shape({
  key: Yup.string()
    .min(2, "Too Short!")
    .required("Required"),
  secret: Yup.string()
    .min(2, "Too Short!")
    .required("Required"),
  name: Yup.string()
    .min(2, "Too Short!")
    .required("Required")
});

function Setting() {
  const [isClicked, setIsClicked] = useState(false);
  const { dispatch } = useContext(AppContext);
  const appState = useContext(AppContext);

  return (
    <div>
      <h2>Setting</h2>

      {!isClicked && (
        <>
          <Button type="primary" icon="plus" onClick={() => setIsClicked(true)}>
            Add new key
          </Button>

          <Table
            dataSource={appState.state.keys}
            columns={columns}
            pagination={false}
          />
        </>
      )}
      {isClicked && (
        <Formik
          initialValues={{ key: "", secret: "", name: "" }}
          validationSchema={SignupSchema}
          onSubmit={(values, { resetForm }) => {
            dispatch({
              type: "NEWKEY",
              payload: values
            });
            resetForm();
            setIsClicked(false);
          }}
        >
          {props => {
            const {
              values,
              handleChange,
              handleSubmit,
              errors,
              touched
            } = props;
            return (
              <Form onSubmit={handleSubmit}>
                <Form.Item
                  label="Display Name"
                  help={errors.name && touched.name ? errors.name : null}
                  validateStatus={
                    errors.name && touched.name ? "error" : "success"
                  }
                >
                  <Input
                    id="name"
                    value={values.name}
                    onChange={handleChange}
                  />
                </Form.Item>
                <Form.Item
                  label="API Key"
                  help={errors.key && touched.key ? errors.key : null}
                  validateStatus={
                    errors.key && touched.key ? "error" : "success"
                  }
                >
                  <Input id="key" value={values.key} onChange={handleChange} />
                </Form.Item>
                <Form.Item
                  label="API Secret"
                  help={errors.secret && touched.secret ? errors.secret : null}
                  validateStatus={
                    errors.secret && touched.secret ? "error" : "success"
                  }
                >
                  <Input
                    id="secret"
                    value={values.secret}
                    onChange={handleChange}
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Add
                  </Button>
                </Form.Item>
              </Form>
            );
          }}
        </Formik>
      )}
    </div>
  );
}

export default Setting;
