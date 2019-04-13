import { CONTENT_MAP } from "../utils/constants.js"


export const adminTools = (state={}, action) => {
  switch (action.type) {
    case 'USER_LOGGED_IN':
      return { ...state, isLoggedIn: true, user: action.user }
    case 'LOCK_FAILURE':
      return { ...state, isLoggedIn: false, error: action.err }
    case 'USER_LOGGED_OUT':
      return { ...state, isLoggedIn: false, isEditingPage: false }
    case 'TOGGLE_EDITING':
      return { ...state, isEditingPage: !state.isEditingPage }
    case 'TOGGLE_REGISTRATION_MODAL':
      return { ...state, showRegistrationModal: !state.showRegistrationModal }
    default:
      return state
  }
}

export const notifications = (state={}, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return {
        ...state,
        message: action.message,
        color: action.color
      }
    case 'CLOSE_NOTIFICATION':
      return {
          ...state,
          message: null,
          color: null
      }
    default:
      return state
  }
}

export const navigation = (state={}, action) => {
  switch (action.type) {
    case 'OPEN_MENU':
      return {
        ...state,
        showMenu: true
      }
    case 'CLOSE_MENU':
      return {
        ...state,
        showMenu: false
      }
    default:
      return state
  }
}

export const page = (state={}, action) => {
  console.log("page state", state)
  let newSectionArr, newSection, emptyContentItem;
  switch (action.type) {
    case 'LOAD_PAGE_DATA':
      return {
        ...state,
        data: action.data
      }
    case 'UPDATE_PAGE_DATA':
      return {
        ...state,
        data: {
          ...state.data,
          content: {
            ...state.data.content,
            [action.contentId]: action.content
          }
        }
      }
    case 'ADD_SECTION':
      newSectionArr = [...state.data.content.sections];
      newSection = { content: [] };
      newSectionArr.splice((action.sectionIndex + 1), 0, newSection);
      return {
        ...state,
        data: {
          ...state.data,
          content: {
            ...state.data.content,
            sections: newSectionArr
          }
        }
      }
    case 'DELETE_SECTION':
      newSectionArr = [...state.data.content.sections];
      newSectionArr.splice(action.sectionIndex, 1);

      return {
        ...state,
        data: {
          ...state.data,
          content: {
            ...state.data.content,
            sections: newSectionArr
          }
        }
      }
    case 'DUPLICATE_SECTION':
      newSectionArr = [...state.data.content.sections];
      newSection = { ...newSectionArr[action.sectionIndex] }
      newSectionArr.splice(action.sectionIndex, 0, newSection);

      return {
        ...state,
        data: {
          ...state.data,
          content: {
            ...state.data.content,
            sections: newSectionArr
          }
        }
      }

    case 'ADD_CONTENT_ITEM':
      newSection = { ...state.data.content.sections[action.sectionIndex] }
      emptyContentItem = CONTENT_MAP[action.contentType];
      newSection.content.push(emptyContentItem);
      console.log("new section", newSection)
      console.log("state.data.content.sections", state.data.content.sections)

      return {
        ...state,
        data: {
          ...state.data,
          content: {
            ...state.data.content,
            sections: [...state.data.content.sections].splice(action.sectionIndex, 1, newSection)
          }
        }
      }
    default:
      return state
  }
}


export const projectForm = (state={}, action) => {
  switch (action.type) {
    case 'UPDATE_PROJECT_FORM':
      return {
        ...state,
        ...action.data
      }
    case 'SUBMIT_PROJECT_FORM_SUCCESS':
      return {
        ...state,
        submitted: true,
      }
    default:
      return state
  }
}

export const projects = (state={}, action) => {
  switch (action.type) {
    case 'UPDATE_PROJECTS':
      return action.projects;
    case 'UPDATE_PROJECT':
      return {
        ...state,
        [action.projectId]: {
          ...state[action.projectId],
          ...action.projectData
        }
      }
    default:
      return state
  }
}

export const appReducers = (state = {}, action) => {
  return {
    notifications: notifications(state.notifications, action),
    adminTools: adminTools(state.adminTools, action),
    navigation: navigation(state.navigation, action),
    page: page(state.page, action),
    projectForm: projectForm(state.projectForm, action),
    projects: projects(state.projects, action),
  }
}

