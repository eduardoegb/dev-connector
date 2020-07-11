import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({ profile }) => {
	const {
		user: { avatar, name, _id },
		status,
		company,
		location,
		skills
	} = profile;

	return (
		<Fragment>
			<div className="profile bg-light">
				<img className="round-img" src={avatar} alt="" />
				<div>
					<h2>{name}</h2>
					<p>
						{status} {company && <span>at {company}</span>}
					</p>
					<p>{location && <span>{location}</span>}</p>
					<Link to={`/profile/${_id}`} className="btn btn-primary">
						View Profile
					</Link>
				</div>

				<ul>
					{skills.length > 0 &&
						skills.slice(0, 4).map((skill, idx) => (
							<li key={idx} className="text-primary">
								<i className="fas fa-check"></i>
								{` ${skill}`}
							</li>
						))}
				</ul>
			</div>
		</Fragment>
	);
};

ProfileItem.propTypes = {
	profile: PropTypes.object.isRequired
};

export default ProfileItem;
