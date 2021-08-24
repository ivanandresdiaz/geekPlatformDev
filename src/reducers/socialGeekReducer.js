;

const initialState = {
  news: [],
  choosingWeekStudent: false,
  rankingStudentsGeekyPuntos: [],
  myNews: [],
};

export const socialGeekReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'getFirestoreNewsCategory':
      return {
        ...state,
        news: action.payload,
      };
    case 'getFirestoreRankingStudentsGeekyPuntos':
      return {
        ...state,
        rankingStudentsGeekyPuntos: action.payload,
      };
    case 'getFirestoreMyNewsCategory': {
      return {
        ...state,
        myNews: action.payload,
      };
    }
    case 'getFirestoreNewsCategoryBlog':
      return {
        ...state,
        news: action.payload,
      };
    case 'createFirestoreNewBlog': {
      return {
        ...state,
        news: [...state.news, action.payload],
      };
    }
    case 'deleteFirestoreBlog': {
      const newNews = state.news.filter((item) => item.id !== action.payload);
      return {
        ...state,
        news: newNews,
      }; }
    default:
      return state;
  }
};

export const getNewsCategory = (state) => state.socialGeek.news;
export const getMyNewsCategory = (state) => state.socialGeek.myNews;
export const getRankingStudentsGeekyPuntos = (state) => state.socialGeek.rankingStudentsGeekyPuntos;
