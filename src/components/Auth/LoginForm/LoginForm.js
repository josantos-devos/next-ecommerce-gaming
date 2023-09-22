import { useFormik } from "formik";
import { Form } from "semantic-ui-react";

import { initialValues, validationSchema } from "./LoginForm.form";
import { Auth } from "@/api/auth";
import { useContext } from "react";
import { AuthContext } from "@/contexts";

const authCrtl = new Auth();

export default function LoginForm() {
  const { login } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      try {
        const response = await authCrtl.login(formValues);
        login(response.jwt);
      } catch (error) {
        throw error;
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Input
        name="identifier"
        type="text"
        placeholder="Correo electrónico o nombre de usuario"
        value={formik.values.identifier}
        onChange={formik.handleChange}
        error={formik.errors.identifier}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="Contraseña"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.errors.password}
      />

      <Form.Button type="submit" fluid loading={formik.isSubmitting}>
        Entrar
      </Form.Button>
    </Form>
  );
}
