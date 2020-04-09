import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AppFrame from '../components/AppFrame';
import CustomersActions from '../components/CustomersActions';

class HomeContainer extends Component {

    handleOnClick = () => {
        console.log("hola");

        this.props.history.push('/customers');
    }

    render() {
        return (
            <div>
                <AppFrame header="Home" body={
                    <div>
                        Esta es la pantalla incial
                        <CustomersActions>
                            <button onClick={this.handleOnClick}>
                                Listado de Clientes
                            </button>
                        </CustomersActions>
                    </div>}>

                </AppFrame>
            </div>
        );
    }
}

export default withRouter(HomeContainer);