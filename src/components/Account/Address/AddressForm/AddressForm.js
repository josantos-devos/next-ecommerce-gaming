import { useFormik } from "formik";
import { Form } from "semantic-ui-react";
import { initialValues, validationSchema } from "./AddressForm.form";
import { Address } from "@/api/address";
import { useAuth } from "@/hooks";

const addressCrtl = new Address();

export function AddressForm(props) {
  const { onClose, onReload, addressId, address } = props;
  const { user } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(address),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (addressId) {
          addressCrtl.update(formValue, addressId);
        } else {
          addressCrtl.create(formValue, user.id);
        }
        formik.handleReset();
        onReload();
        onClose();
      } catch (error) {
        throw error;
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Input
        name="title"
        placeholder="Título de la dirección"
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.errors.title}
      />

      <Form.Group widths="equal">
        <Form.Input
          name="name"
          placeholder="Nombre y apellido"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.errors.name}
        />
        <Form.Input
          name="address"
          placeholder="Dirección"
          value={formik.values.address}
          onChange={formik.handleChange}
          error={formik.errors.address}
        />
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Input
          name="state"
          placeholder="Provincia"
          value={formik.values.state}
          onChange={formik.handleChange}
          error={formik.errors.state}
        />
        <Form.Input
          name="city"
          placeholder="Cíudad"
          value={formik.values.city}
          onChange={formik.handleChange}
          error={formik.errors.city}
        />
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Input
          name="postal_code"
          placeholder="Código Postal"
          value={formik.values.postal_code}
          onChange={formik.handleChange}
          error={formik.errors.postal_code}
        />
        <Form.Input
          name="phone"
          placeholder="Teléfono"
          value={formik.values.phone}
          onChange={formik.handleChange}
          error={formik.errors.phone}
        />
      </Form.Group>

      <Form.Button type="submit" fluid loading={formik.isSubmitting}>
        Enviar
      </Form.Button>
    </Form>
  );
}
