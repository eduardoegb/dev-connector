import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExp from './ProfileExp';
import ProfileEdu from './ProfileEdu';
import ProfileGithub from './ProfileGithub';
import { getProfileById } from '../../actions/profile';

const Profile = ({
	match: { params },
	auth,
	profile: { profileView, loadingProfile },
	getProfileById
}) => {
	useEffect(() => {
		getProfileById(params.id);
	}, [getProfileById, params.id]);

	return (
		<Fragment>
			{profileView === null || loadingProfile ? (
				<Spinner />
			) : (
				<Fragment>
					{/* Buttons */}
					<Link to="/profiles" className="btn btn-light">
						Back To Profiles
					</Link>

					{auth.user && auth.user._id === profileView.user._id && (
						<Link to="/edit-profile" className="btn btn-dark">
							Edit Profile
						</Link>
					)}

					{/* Profile info */}
					<div className="profile-grid my-1">
						{/* Top */}
						<ProfileTop profile={profileView} />
						{/* About */}
						<ProfileAbout profile={profileView} />
						{/* Experience */}
						<div className="profile-exp bg-white p-2">
							<h2 className="text-primary">Experience</h2>
							{profileView.experience.length > 0 ? (
								profileView.experience.map((exp, idx) => (
									<ProfileExp experience={exp} key={idx} />
								))
							) : (
								<h4>No experience credentials</h4>
							)}
						</div>
						{/* Education */}
						<div className="profile-edu bg-white p-2">
							<h2 className="text-primary">Education</h2>
							{profileView.education.length > 0 ? (
								profileView.education.map((edu, idx) => (
									<ProfileEdu education={edu} key={idx} />
								))
							) : (
								<h4>No education credentials</h4>
							)}
						</div>
						{/* Github */}
						{profileView.githubusername && (
							<ProfileGithub username={profileView.githubusername} />
						)}
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

Profile.propTypes = {
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	getProfileById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	profile: state.profile
});

const mapDispatchToProps = { getProfileById };

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
