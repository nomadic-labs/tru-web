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
    case 'TOGGLE_NEW_PAGE_MODAL':
      return { ...state, showNewPageModal: !state.showNewPageModal }
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
    case 'TOGGLE_MENU':
      return {
        ...state,
        showMenu: !state.showMenu
      }
    default:
      return state
  }
}

export const page = (state={}, action) => {
  let newSectionArr, newSection, emptyContentItem, newContentItem;
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

    case 'UPDATE_PAGE_TITLE':
      return {
        ...state,
        data: {
          ...state.data,
          title: action.title
        }
      }

    case 'UPDATE_PAGE_HEADER_IMAGE':
      return {
        ...state,
        data: {
          ...state.data,
          header_image: action.content
        }
      }

    case 'ADD_SECTION':
      newSectionArr = [...state.data.content.sections];
      newSection = { content: [], type: action.sectionType };
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
      newSectionArr = [...state.data.content.sections]
      newSectionArr.splice(action.sectionIndex, 1, newSection)

      console.log("action.sectionIndex", action.sectionIndex)
      console.log("state.data.content.sections", state.data.content.sections)

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

    case 'UPDATE_CONTENT_ITEM':
      newSection = { ...state.data.content.sections[action.sectionIndex] }
      newContentItem = { ...newSection.content[action.contentIndex], content: action.content }
      newSection.content.splice(action.contentIndex, 1, newContentItem);
      newSectionArr = [...state.data.content.sections]
      newSectionArr.splice(action.sectionIndex, 1, newSection)

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

    case 'DELETE_CONTENT_ITEM':
      newSection = { ...state.data.content.sections[action.sectionIndex] }
      newSection.content.splice(action.contentIndex, 1);
      newSectionArr = [...state.data.content.sections]
      newSectionArr.splice(action.sectionIndex, 1, newSection)

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

