import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { deleteEducation } from '../../actions/profile';

const Education = ({ education, deleteEducation }) => {
	const educationList = education.map(edu => (
		<tr key={edu._id}>
			<td>{edu.school}</td>
			<td className="hide-sm">{edu.degree}</td>
			<td className="hide-sm">
				<Moment format="YYYY/MM/DD">{edu.from}</Moment>
				{' - '}
				{edu.to === null ? (
					'Now'
				) : (
					<Moment format="YYYY/MM/DD">{edu.to}</Moment>
				)}
			</td>
			<td>
				<button
					className="btn btn-danger"
					onClick={() => deleteEducation(edu._id)}
				>
					Delete
				</button>
			</td>
		</tr>
	));

	return (
		<Fragment>
			<h2 className="my-2">Education Credentials</h2>
			{education.length > 0 ? (
				<table className="table">
					<thead>
						<tr>
							<th>School</th>
							<th className="hide-sm">Degree</th>
							<th className="hide-sm">Years</th>
							<th></th>
						</tr>
					</thead>
					<tbody>{educationList}</tbody>
				</table>
			) : (
				<h4>No education credentials</h4>
			)}
		</Fragment>
	);
};

Education.propTypes = {
	education: PropTypes.array.isRequired,
	deleteEducation: PropTypes.func.isRequired
};

export default connect(null, { deleteEducation })(Education);
