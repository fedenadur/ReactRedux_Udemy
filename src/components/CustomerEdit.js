import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { Prompt} from 'react-router-dom';
import { setPropsAsInitial } from '../helpers/setPropsAsInitial';
import CustomersActions from '../components/CustomersActions';

const isNumber = value => (
    isNaN(Number(value)) && "El campo debe ser un número"
)

const validate = values => {
    const error = {};

    if (!values.name) {
        error.name = "El campo Nombre es requerido";
    }

    if (!values.dni) {
        error.dni = "El campo Dni es requerido";
    }

    return error;
};

const MyField = ({ input, meta, type, name, label }) => (
    <div>
        <label htmlFor={name}>{label}</label>
        <input {...input} type={!type ? "text" : type} />
        {meta.error && meta.touched && <span>{meta.error}</span>}
    </div>
);

const toNumber = value => value && Number(value);

const toUpper = value => value && value.toUpperCase()

// const dateGreaterThan = (value, previousValue, values) => value && previousValue && (value > previousValue ? value : previousValue);

const CustomerEdit = ({ name, dni, age, handleSubmit, submitting, onBack, pristine, submitSucceeded}) => {
    return (
        <div>
            <h2>Edicion del cliente</h2>
            <form onSubmit={handleSubmit}>
                <Field
                    name="name"
                    label="Nombre"
                    component={MyField}
                    parse={toUpper}
                ></Field>
                <Field
                    name="dni"
                    label="Dni"
                    component={MyField}
                    validate={isNumber}
                ></Field>
                <Field
                    name="age"
                    label="Edad"
                    component={MyField}
                    type="number"
                    validate={isNumber}
                    parse={toNumber}
                    // normalize={dateGreaterThan}
                >  </Field>
                <CustomersActions >
                    <button type="submit" disabled={pristine || submitting}>Aceptar</button>
                    <button type="button" disabled={submitting} onClick={onBack}>Cancelar</button>
                </CustomersActions>
                <Prompt
                    when={!pristine && !submitSucceeded}
                    message="Se perderan los datos si continua"
                ></Prompt>
            </form>
        </div>
    );
};

CustomerEdit.propTypes = {
    name: PropTypes.string,
    dni: PropTypes.string,
    age: PropTypes.number,
    onBack: PropTypes.func.isRequired,
};

const CustomerEditForm = reduxForm({
    form: 'CustomerEdit',
    validate
})(CustomerEdit);

export default setPropsAsInitial(CustomerEditForm);