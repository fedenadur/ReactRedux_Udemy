import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppFrame from '../components/AppFrame';
import { getCustomerByDni } from '../selectors/customers';
import { Route, withRouter } from 'react-router-dom';
import CustomerEdit from '../components/CustomerEdit';
import CustomerData from '../components/CustomerData';
import { fetchCustomers, } from '../actions/fetchCustomers';
import { updateCustomer } from '../actions/updateCustomer';
import { SubmissionError } from 'redux-form';



class CustomerContainer extends Component {
    componentDidMount() {
        if (!this.props.customer) {
            this.props.fetchCustomers();
        }
    }

    handleSubmit = values => {
        console.log(JSON.stringify(values));
        const { id } = values; 
        return this.props.updateCustomer(id, values)
        .then( r => {
            console.log(r);
            // if (r.error) {
            //     throw new SubmissionError(r.payload);
            // }
        });
    }

    handleOnBack = () => {
        this.props.history.goBack();
    }

    handleOnSubmitSuccess = () => {
        console.log("volve pa atras");
        this.props.history.goBack();
    }

    renderBody = () => (
        <Route
            path="/customers/:dni/edit"
            children={(
                { match }
            ) => {
                const CustomerControl = match ? CustomerEdit : CustomerData

                return <CustomerControl  {...this.props.customer}
                    onSubmit={this.handleSubmit}
                    onSubmitSuccess={this.handleOnSubmitSuccess}
                    onBack={this.handleOnBack} />

            }
            }>
        </Route>
    );

    render() {
        return (
            <div>
                <AppFrame
                    header={`Cliente ${this.props.dni}`}
                    // body={<p>Datos del cliente "{this.props.customer.name}" </p>}
                    body={this.renderBody()}
                ></AppFrame>
            </div>
        );
    }
}

CustomerContainer.propTypes = {
    dni: PropTypes.string.isRequired,
    customer: PropTypes.object,
    fetchCustomers: PropTypes.func.isRequired,
    updateCustomer: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
    // customer: state.customers.find(c => c.dni === props.dni)    
    customer: getCustomerByDni(state, props)
});

export default withRouter(connect(mapStateToProps, {
    fetchCustomers,
    updateCustomer
})(CustomerContainer));
