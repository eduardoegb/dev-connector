import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import { getPost } from '../../actions/post';

const Post = ({ post: { post, loading }, getPost, match }) => {
	useEffect(() => {
		getPost(match.params.id);
	}, [getPost, match.params.id]);

	return loading || !post ? (
		<Spinner />
	) : (
		<Fragment>
			<Link to="/posts" className="btn">
				Back To Posts
			</Link>
			<PostItem post={post} showActions={false} />
			<CommentForm postId={post._id} />
			{post.comments.map(comment => (
				<CommentItem key={comment._id} comment={comment} postId={post._id} />
			))}
		</Fragment>
	);
};

Post.propTypes = {
	post: PropTypes.object.isRequired,
	getPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);
