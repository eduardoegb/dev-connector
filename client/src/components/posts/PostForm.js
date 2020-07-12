import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createPost } from '../../actions/post';

const PostForm = ({ createPost }) => {
	const [text, setText] = useState('');

	return (
		<Fragment>
			<div className="post-form">
				<div className="bg-primary p">
					<h3>Say Something...</h3>
				</div>
				<form className="form my-1">
					<textarea
						name="text"
						cols="30"
						rows="5"
						placeholder="Create a post"
						value={text}
						onChange={e => setText(e.target.value)}
						required
					></textarea>
					<input
						type="submit"
						className="btn btn-dark my-1"
						value="Submit"
						onClick={e => {
							e.preventDefault();
							createPost({ text });
							setText('');
						}}
					/>
				</form>
			</div>
		</Fragment>
	);
};

PostForm.propTypes = { createPost: PropTypes.func.isRequired };

export default connect(null, { createPost })(PostForm);
