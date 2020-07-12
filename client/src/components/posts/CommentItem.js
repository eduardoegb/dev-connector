import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/post';
import { Link } from 'react-router-dom';

const CommentItem = ({
	comment: { _id, text, name, avatar, user, date },
	postId,
	auth,
	deleteComment
}) => {
	return (
		<div className="post bg-white p-1 my-1">
			<div>
				<Link to={`/profile/${user}`}>
					<img className="round-img" src={avatar} alt="" />
					<h4>{name}</h4>
				</Link>
			</div>
			<div>
				<p className="my-1">{text}</p>
				<p className="post-date">
					Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
				</p>
				{!auth.loading && user === auth.user._id && (
					<button
						type="button"
						className="btn btn-danger"
						onClick={e => deleteComment(postId, _id)}
					>
						<i className="fas fa-times"></i>
					</button>
				)}
			</div>
		</div>
	);
};

CommentItem.propTypes = {
	comment: PropTypes.object.isRequired,
	postId: PropTypes.string.isRequired,
	auth: PropTypes.object.isRequired,
	deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

const mapDispatchToProps = { deleteComment };

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem);
