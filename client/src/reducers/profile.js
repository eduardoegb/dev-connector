import {
	GET_PROFILE,
	GET_PROFILES,
	PROFILE_ERROR,
	CLEAR_PROFILE,
	UPDATE_PROFILE,
	GET_REPOS,
	GET_PROFILE_BY_ID
} from '../actions/types';

const initialState = {
	profile: null,
	profiles: [],
	profileView: null,
	repos: [],
	loading: true,
	loadingProfile: true,
	loadingProfiles: true,
	error: {}
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_PROFILE:
		case UPDATE_PROFILE:
			return {
				...state,
				profile: payload,
				loading: false
			};
		case GET_PROFILE_BY_ID:
			return {
				...state,
				profileView: payload,
				profiles: [],
				loadingProfile: false,
				loading: false,
				loadingProfiles: false
			};
		case GET_PROFILES:
			return {
				...state,
				profiles: payload,
				loading: false,
				loadingProfiles: false
			};
		case GET_REPOS:
			return {
				...state,
				loading: false,
				repos: payload
			};
		case PROFILE_ERROR:
			return {
				...state,
				loading: false,
				error: payload
			};
		case CLEAR_PROFILE:
			return {
				...state,
				profile: null,
				repos: [],
				loading: false
			};
		default:
			return state;
	}
}
