import { useFormik } from "formik";
import { Form } from "semantic-ui-react";

import styles from "./ChangeEmailForm.module.scss";
import { initialValues, validationSchema } from "./ChangeEmailForm.form";
import { User } from "@/api";
import { useAuth } from "@/hooks";

const userCrtl = new User();

export function ChangeEmailForm() {
  const { user, updateUser } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await userCrtl.updateMe(user.id, { email: formValue.email });
        updateUser("email", formValue.email);
        formik.handleReset();
      } catch (error) {
        throw error;
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className={styles.form}>
      <label>Cambiar correo electrónico</label>

      <Form.Input
        name="email"
        placeholder="Nuevo correo electrónico"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.errors.email}
      />
      <Form.Input
        name="repeatEmail"
        placeholder="Repetir correo electrónico"
        value={formik.values.repeatEmail}
        onChange={formik.handleChange}
        error={formik.errors.repeatEmail}
      />
      <Form.Button type="submit" loading={formik.isSubmitting}>
        Enviar
      </Form.Button>
    </Form>
  );
}
