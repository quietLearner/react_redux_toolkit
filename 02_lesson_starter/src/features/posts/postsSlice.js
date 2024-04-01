import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const initialState = [
  {
    id: "1",
    title: "Lorem ipsum dolor sit amet.",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, perspiciatis!",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
  {
    id: "2",
    title: "Lorem ipsum dolor sit amet.",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit, hic!",
    date: sub(new Date(), { minutes: 7311 }).toISOString(),
    reactions: {
      thumbsUp: 10,
      wow: 1,
      heart: 2,
      rocket: 3,
      coffee: 5,
    },
  },
];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded1(state, action) {
      state.push(action.payload);
    },

    postAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
            date: new Date().toISOString(),
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },

    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
});

/*
export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});
*/
export const selectAllPosts = (state) => {
  //console.log(state);
  return state.posts;
};

export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
