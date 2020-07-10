import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({
	component: Component,
	isAuthenticated,
	loading,
	...rest
}) => (
	<Route
		{...rest}
		render={props =>
			!isAuthenticated && !loading ? (
				<Redirect to="/login" />
			) : (
				<Component {...props} />
			)
		}
	/>
);

PrivateRoute.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
	loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
	loading: state.auth.loading
});

export default connect(mapStateToProps)(PrivateRoute);
