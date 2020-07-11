import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

const ProfileEdu = ({
	education: { school, degree, fieldofstudy, from, current, to, description }
}) => {
	return (
		<div>
			<h3>{school}</h3>
			<p>
				<Moment format="MMM YYYY">{from}</Moment>
				{' - '}
				{current ? 'Current' : <Moment format="MMM YYYY">{to}</Moment>}
			</p>
			<p>
				<strong>Degree: </strong>
				{degree}
			</p>
			{fieldofstudy && (
				<p>
					<strong>Field Of Study: </strong>
					{fieldofstudy}
				</p>
			)}
			{description && (
				<p>
					<strong>Description: </strong>
					{description}
				</p>
			)}
		</div>
	);
};

ProfileEdu.propTypes = {
	profile: PropTypes.object.isRequired
};

export default ProfileEdu;
