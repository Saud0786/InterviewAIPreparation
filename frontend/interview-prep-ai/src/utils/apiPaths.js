export const BASE_URL = "http://localhost:8000"


export const API_PATHS = {
  AUTH:{
    REGISTER:"/api/auth/register",  // signup
    LOGIN:"/api/auth/login",        // login
    GET_PROFILE:"/api/auth/profile" // get user detail
  },

  IMAGE:{
    UPLOAD_IMAGE:"/api/auth/upload-image" // upload profile picture
  },

  AI:{
    GENERATE_QUESTIONS:"/api/ai/generate-questions", //generate question
    GENERATE_EXPLANATION:"/api/ai/generate-explanation"  // generete explaination
  }, 

  SESSION:{
    CREATE:"/api/sessions/create",  // create new session question
    GET_ALL:"/api/sessions/my-sessions", // get session
    GET_ONE:(id)=>`/api/sessions/${id}`, // get session with details
    DELETE:(id)=>`/api/sessions/${id}` // delete session
  },

  QUESTION:{
    ADD_TO_SESSION:"/api/questions/add", // add more question
    PIN:(id)=>`/api/questions/${id}/pin`, // pin the question
    UPDATE_NOTE: (id)=> `/api/questions/${id}/note` //update/add note to question

  }
}