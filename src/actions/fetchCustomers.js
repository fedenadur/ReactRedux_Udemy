import { FETCH_CUSTOMERS } from '../constants';
import { createAction } from 'redux-actions';
import { GET_CUSTOMERS}  from '../api/urls';
import { apiGet } from '../api/index';

export const fetchCustomers = createAction(FETCH_CUSTOMERS, apiGet(GET_CUSTOMERS));