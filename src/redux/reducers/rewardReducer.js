import { rewardConstants } from "../actions/constants";

const initialState = {
    loading: false,
    rewards: [],
    history: [],
    points: 0,
    error: null,
};

export const rewardReducer = (state, action) => {
    if (state === undefined) {
        state = initialState;
    }
    switch (action.type) {
        case rewardConstants.FETCH_REWARDS_REQUEST:
        case rewardConstants.FETCH_REWARD_HISTORY_REQUEST:
        case rewardConstants.FETCH_USER_POINTS_REQUEST:
            return { ...state, loading: true, error: null };

        case rewardConstants.FETCH_REWARDS_SUCCESS:
            return { ...state, loading: false, rewards: action.payload };

        case rewardConstants.FETCH_REWARD_HISTORY_SUCCESS:
            return { ...state, loading: false, history: action.payload };

        case rewardConstants.FETCH_USER_POINTS_SUCCESS:
            return { ...state, loading: false, points: action.payload };

        case rewardConstants.FETCH_REWARDS_FAILURE:
        case rewardConstants.FETCH_REWARD_HISTORY_FAILURE:
        case rewardConstants.FETCH_USER_POINTS_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};
