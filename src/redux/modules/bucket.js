import { firestore } from "../../firebase";

const bucket_db = firestore.collection("bucket");

// Actions
const LOAD = "bucket/LOAD";
const CREATE = "bucket/CREATE";
const DELETE = "bucket/DELETE";
const UPDATE = "bucket/UPDATE";
const LOADED = "bucket/LOADED";

const initialState = {
  list: [
    { text: "영화관 가기", completed: false },
    { text: "매일 책읽기", completed: false },
    { text: "수영 배우기", completed: false },
  ],
  is_loaded: false,
};

// Action Creators
export const loadBucket = (bucket) => {
  return { type: LOAD, bucket };
};

export const createBucket = (bucket) => {
  return { type: CREATE, bucket };
};

export const deleteBucket = (bucket_index) => {
  return { type: DELETE, bucket_index };
};

export const updateBucket = (index) => {
  return { type: UPDATE, index };
};

export const isLoaded = (loaded) => {
  return { type: LOADED, loaded };
};

export const loadBucketFB = () => {
  return function (dispatch) {
    bucket_db.get().then((docs) => {
      let bucket_data = [];

      docs.forEach((doc) => {
        if (doc.exists) {
          bucket_data = [...bucket_data, { id: doc.id, ...doc.data() }];
        }
      });

      // console.log(bucket_data);
      dispatch(loadBucket(bucket_data));
    });
  };
};

export const addBucketFB = (bucket) => {
  return function (dispatch) {
    let bucket_data = {
      text: bucket,
      completed: false,
    };

    dispatch(isLoaded(false));

    bucket_db.add(bucket_data).then((docRef) => {
      bucket_data = { ...bucket_data, id: docRef.id };
      dispatch(createBucket(bucket_data));
      dispatch(isLoaded(true));
    });
  };
};

export const updateBucketFB = (bucket) => {
  return function (dispatch, getState) {
    dispatch(isLoaded(false));

    const old_bucket_data = getState().bucket.list[bucket];

    let bucket_data = {
      ...old_bucket_data,
      completed: true,
    };

    if (!bucket_data.id) {
      return;
    }

    bucket_db
      .doc(old_bucket_data.id)
      .update(bucket_data)
      .then((docRef) => {
        dispatch(updateBucket(bucket));
        dispatch(isLoaded(true));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteBucketFB = (bucket) => {
  return function (dispatch, getState) {
    dispatch(isLoaded(false));

    const old_bucket_data = getState().bucket.list[bucket];

    if (!old_bucket_data.id) {
      return;
    }

    bucket_db
      .doc(old_bucket_data.id)
      .delete()
      .then((docRef) => {
        dispatch(deleteBucket(bucket));
        dispatch(isLoaded(true));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // do reducer stuff
    case "bucket/LOAD":
      if (action.bucket.length > 0) {
        return { list: action.bucket, is_loaded: true };
      }
      return state;

    case "bucket/CREATE":
      const new_bucket_list = [...state.list, action.bucket];
      return { list: new_bucket_list };

    case "bucket/DELETE":
      const bucket_list = state.list.filter((l, i) => {
        if (i !== action.bucket_index) {
          return l;
        }
      });
      return { list: bucket_list };

    case "bucket/UPDATE": {
      const bucket_list = state.list.map((l, i) => {
        if (i === action.index) {
          return { ...l, completed: true };
        } else {
          return l;
        }
        return l;
      });
      return { list: bucket_list };
    }

    case "bucket/LOADED": {
      return { ...state, is_loaded: action.loaded };
    }

    default:
      return state;
  }
}
