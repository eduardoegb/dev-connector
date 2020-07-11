import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { getProfiles } from '../../actions/profile';
import ProfileItem from './ProfileItem';

const Profiles = ({
	profile: { profiles, loading, loadingProfiles },
	getProfiles
}) => {
	useEffect(() => {
		getProfiles();
	}, [getProfiles]);

	return (
		<Fragment>
			{loading || loadingProfiles ? (
				<Spinner />
			) : (
				<Fragment>
					<h1 className="large text-primary">Developers</h1>
					<p className="lead">
						<i className="fab fa-connectdevelop"></i> Browse and connect with
						developers
					</p>
					<div className="profiles">
						{profiles.length > 0 ? (
							profiles.map(profile => (
								<ProfileItem profile={profile} key={profile._id} />
							))
						) : (
							<h4>No profiles found</h4>
						)}
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

Profiles.propTypes = {
	profile: PropTypes.object.isRequired,
	getProfiles: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile
});

const mapDispatchToProps = { getProfiles };

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
