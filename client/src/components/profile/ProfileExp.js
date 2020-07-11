import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

const ProfileExp = ({
	experience: { company, title, location, current, to, from, description }
}) => {
	return (
		<div>
			<p style={{ display: 'flex', alignItems: 'baseline' }}>
				<h3 className="text-dark">{company}</h3>
				{location && <span> , {location}</span>}
			</p>
			<p>
				<Moment format="MMM YYYY">{from}</Moment>
				{' - '}
				{current ? 'Current' : <Moment format="MMM YYYY">{to}</Moment>}
			</p>
			<p>
				<strong>Position: </strong>
				{title}
			</p>
			{description && (
				<p>
					<strong>Description: </strong>
					{description}
				</p>
			)}
		</div>
	);
};

ProfileExp.propTypes = {
	profile: PropTypes.object.isRequired
};

export default ProfileExp;
