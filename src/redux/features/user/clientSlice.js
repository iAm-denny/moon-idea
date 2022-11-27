/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import api from '../../../config/api';

const initialState = {
  projects: {
    data: [],
  },
  questions: {
    data: [],
  },
  answers: {
    data: [],
  },
  notification: {
    data: [],
  },
  loading: false,
  loaderQuestion: false,
  loaderAnaswer: false,
  loaderNotification: true,
};

export const fetchProjectList = createAsyncThunk(
  'fetchProjectList',
  (accessToken) =>
    api
      .get(
        '/client/fetch-project',
        {},
        { accessToken, rftoken_id: localStorage.getItem('rftoken_id') }
      )
      .then((result) => result)
      .catch((err) => {
        console.log('err => -', err);
      })
);

export const fetchQuestionList = createAsyncThunk(
  'fetchQuestionList',
  (params) => {
    const { accessToken, post_id = '' } = params;
    return api
      .get(
        `/client/fetch-question`,
        { post_id },
        {
          accessToken,
          rftoken_id: localStorage.getItem('rftoken_id'),
        }
      )
      .then((result) => result)
      .catch((err) => {
        console.log('err => ', err);
      });
  }
);

export const fetchAnswerList = createAsyncThunk('fetchAnswerList', (params) => {
  const { accessToken, post_id } = params;
  return api
    .get(
      `/client/fetch-answer`,
      { post_id },
      {
        accessToken,
        rftoken_id: localStorage.getItem('rftoken_id'),
      }
    )
    .then((result) => result)
    .catch((err) => {
      console.log('err => ', err);
    });
});

export const fetchNotificationList = createAsyncThunk(
  'fetchNotificationList',
  (params) => {
    const { accessToken } = params;
    return api
      .get(
        `/client/fetch-notification`,
        {},
        {
          accessToken,
          rftoken_id: localStorage.getItem('rftoken_id'),
        }
      )
      .then((result) => {
        api
          .post('/client/read-notification', JSON.stringify({}), {
            accessToken,
            rftoken_id: localStorage.getItem('rftoken_id'),
          })
          .then((res) => {})
          .catch((err) => {
            console.log('err', err);
          });
        return result;
      })
      .catch((err) => {
        console.log('err => ', err);
      });
  }
);

export const clientSlice = createSlice({
  name: 'projects',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchProjectList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProjectList.fulfilled, (state, action) => {
      if (action.payload === 'Session timeout' && !action.payload.success) {
        localStorage.removeItem('rftoken_id');
        state.projects = {};
      } else {
        state.projects = action.payload;
      }
      state.loading = false;
    });
    builder.addCase(fetchProjectList.rejected, (state) => {
      state.loading = false;
    });
    // fetch question
    builder.addCase(fetchQuestionList.pending, (state) => {
      state.loaderQuestion = true;
    });
    builder.addCase(fetchQuestionList.fulfilled, (state, action) => {
      if (action.payload === 'Session timeout' && !action.payload.success) {
        localStorage.removeItem('rftoken_id');
        state.questions = {};
      } else {
        state.questions = action.payload;
      }
      state.loaderQuestion = false;
    });
    builder.addCase(fetchQuestionList.rejected, (state) => {
      state.loaderQuestion = false;
    });
    // fetch answer
    builder.addCase(fetchAnswerList.pending, (state) => {
      state.loaderAnaswer = true;
    });
    builder.addCase(fetchAnswerList.fulfilled, (state, action) => {
      if (action.payload === 'Session timeout' && !action.payload.success) {
        localStorage.removeItem('rftoken_id');
        state.answers = {};
      } else {
        state.answers = action.payload;
      }
      state.loaderAnaswer = false;
    });
    builder.addCase(fetchAnswerList.rejected, (state) => {
      state.loaderAnaswer = false;
    });
    // fetch notification
    builder.addCase(fetchNotificationList.pending, (state) => {
      state.loaderNotification = true;
    });
    builder.addCase(fetchNotificationList.fulfilled, (state, action) => {
      if (action.payload === 'Session timeout' && !action.payload.success) {
        localStorage.removeItem('rftoken_id');
        state.notification = {};
      } else {
        state.notification = action.payload;
      }
      state.loaderNotification = false;
    });
    builder.addCase(fetchNotificationList.rejected, (state) => {
      state.loaderNotification = false;
    });
  },
  reducers: {
    addNewProject: (state, action) => {
      state.projects = { data: [action.payload, ...state.projects.data] };
    },
    asynFunction: () => {
      createAsyncThunk();
    },
  },
});
export const { addNewProject } = clientSlice.actions;

export default clientSlice.reducer;
