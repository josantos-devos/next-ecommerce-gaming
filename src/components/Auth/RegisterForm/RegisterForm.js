import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { initialValues, validationSchema } from "./RegisterForm.form";
import { Auth } from "@/api/auth";

const authCrtl = new Auth();

export function RegisterForm() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      try {
        console.log(formValues);
        await authCrtl.register(formValues);
        router.push("/join/sign-in");
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group widths="equal">
        <Form.Input
          name="email"
          type="text"
          placeholder="Correo electrónico"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email}
        />
        <Form.Input
          name="username"
          type="text"
          placeholder="Nombre de usuario"
          onChange={formik.handleChange}
          value={formik.values.username}
          error={formik.errors.username}
        />
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Input
          name="name"
          type="text"
          placeholder="Nombre y apellido"
          onChange={formik.handleChange}
          value={formik.values.name}
          error={formik.errors.name}
        />
        <Form.Input
          name="password"
          type="password"
          placeholder="Password"
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.errors.password}
        />
      </Form.Group>

      <Form.Button type="submit" fluid loading={formik.isSubmitting}>
        Registrarse
      </Form.Button>
    </Form>
  );
}
