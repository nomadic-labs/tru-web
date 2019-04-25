import axios from "axios";
import firebase from "../firebase/init";
import slugify from "slugify";
import { NOTIFICATION_MESSAGES } from "../utils/constants";


// AUTHENTICATION ------------------------

export function userLoggedIn(user = null) {
  return { type: "USER_LOGGED_IN", user };
}

export function userLoggedOut() {
  return { type: "USER_LOGGED_OUT" };
}

export function toggleRegistrationModal() {
  return { type: "TOGGLE_REGISTRATION_MODAL" };
}

// NOTIFICATIONS ------------------------

export function showNotification(message, color="success") {
  return { type: "SHOW_NOTIFICATION", message, color };
}

export function closeNotification() {
  return { type: "CLOSE_NOTIFICATION" };
}

export function showNotificationByName(name) {
  return dispatch => {
    const message = NOTIFICATION_MESSAGES[name];
    dispatch( (message, "success"));
  };
}

// PAGE EDITING ------------------------


export function updateSectionContent(sectionIndex, contentIndex, newContent) {
  return {
    type: "UPDATE_SECTION_CONTENT",
    sectionIndex,
    contentIndex,
    newContent
  };
}

export function addSection(sectionIndex, sectionType=null) {
  return { type: "ADD_SECTION", sectionIndex, sectionType };
}

export function duplicateSection(sectionIndex) {
  return { type: "DUPLICATE_SECTION", sectionIndex };
}

export function deleteSection(sectionIndex) {
  return { type: "DELETE_SECTION", sectionIndex };
}

export function addContentItem(sectionIndex, contentType) {
  return { type: "ADD_CONTENT_ITEM", sectionIndex, contentType };
}

export function updateContentItem(sectionIndex, contentIndex, content) {
  return { type: "UPDATE_CONTENT_ITEM", sectionIndex, contentIndex , content};
}

export function deleteContentItem(sectionIndex, contentIndex) {
  return { type: "DELETE_CONTENT_ITEM", sectionIndex, contentIndex };
}

export function toggleEditing() {
  return { type: "TOGGLE_EDITING" };
}

export function toggleNewPageModal() {
  return { type: "TOGGLE_NEW_PAGE_MODAL" };
}

export function updatePageTitle(title) {
  return { type: "UPDATE_PAGE_TITLE", title };
}

export function updatePageHeaderImage(content) {
  return { type: "UPDATE_PAGE_HEADER_IMAGE", content };
}

export function createPage(pageData, pageId) {
  return dispatch => {
    const db = firebase.database();
    db
      .ref(`pages/${pageId}/`)
      .set(pageData)
      .then(snap => {
        dispatch(toggleNewPageModal());
        dispatch(
          showNotification(
            "Your page has been saved. Publish your changes to view and edit your new page.",
            "success"
          )
        );
      });
  };
}


// rename to updateContent
export function updatePage(pageId, contentId, content) {
  return dispatch => {
    const db = firebase.database();

    db.ref(`pages/${pageId}/content/${contentId}/`).update(content, error => {
      if (error) {
        return dispatch(
          showNotification(
            `There was an error saving your changes: ${error}`,
            "success"
          )
        );
      }

      dispatch(updatePageData(contentId, content));
      dispatch(
        showNotification(
          "Your changes have been saved. Publish your changes to make them public.",
          "success"
        )
      );
    });
  };
}

export function updateTitle(title) {
  return (dispatch, getState) => {
    const db = firebase.database();
    const pageId = getState().page.data.id;

    db.ref(`pages/${pageId}/`).update({ title }, error => {
      if (error) {
        return dispatch(
          showNotification(
            `There was an error saving your changes: ${error}`,
            "success"
          )
        );
      }

      dispatch(updatePageTitle(title));
      dispatch(
        showNotification(
          "Your changes have been saved. Publish your changes to make them public.",
          "success"
        )
      );
    });
  };
}

export function updateHeaderImage(content) {
  return (dispatch, getState) => {
    const db = firebase.database();
    const pageId = getState().page.data.id;

    console.log("header image", content)

    db.ref(`pages/${pageId}/`).update({ "header-image": content }, error => {
      if (error) {
        return dispatch(
          showNotification(
            `There was an error saving your changes: ${error}`,
            "success"
          )
        );
      }

      dispatch(updatePageHeaderImage(content));
      dispatch(
        showNotification(
          "Your changes have been saved. Publish your changes to make them public.",
          "success"
        )
      );
    });
  };
}

export function savePageContent(innerFunction) {
  return (dispatch, getState) => {
    Promise.resolve(dispatch(innerFunction)).then(() => {
      const content = getState().page.data.content;
      const pageId = getState().page.data.id;

      const db = firebase.database();

      db.ref(`pages/${pageId}/content/`).update(content, error => {
        if (error) {
          return dispatch(
            showNotification(
              `There was an error saving your changes: ${error}`,
              "success"
            )
          );
        }

        dispatch(
          showNotification(
            "Your changes have been saved. Publish your changes to make them public.",
            "success"
          )
        );
      });
    });
  };
}

export function deploy() {
  return dispatch => {
    const url = `${process.env.GATSBY_DEPLOY_ENDPOINT}`;
    console.log(`Deploy command sent to ${url}`);

    firebase
      .auth()
      .currentUser.getIdToken(/* forceRefresh */ true)
      .then(token => {
        return axios.get(url, {
          headers: { Authorization: "Bearer " + token }
        });
      })
      .then(res => {
        console.log(res);
        if (res.data.status === "success") {
          dispatch(
            showNotification(
              "The website is being published - this will take a few minutes. Time to go grab a coffee :)",
              "success"
            )
          );
        } else {
          dispatch(
            showNotification(
              `There was an error deploying the site: ${res.data.message}`,
              "danger"
            )
          );
        }
      })
      .catch(err => {
        dispatch(
          showNotification(
            `There was an error deploying the site: ${err}`,
            "danger"
          )
        );
      });
  };
}

export function loadPageData(data) {
  return { type: "LOAD_PAGE_DATA", data };
}

export function updatePageData(contentId, content) {
  console.log("updating", contentId);
  console.log("content", content);
  return { type: "UPDATE_PAGE_DATA", contentId, content };
}

// NAVIGATION ------------------------

export function openMenu() {
  return { type: "OPEN_MENU" };
}

export function closeMenu() {
  return { type: "CLOSE_MENU" };
}

export function toggleMenu() {
  return { type: "TOGGLE_MENU" };
}

// FORMS ------------------------

export function submitProjectFormSuccess() {
  return { type: "SUBMIT_PROJECT_FORM_SUCCESS" };
}

export function submitProjectFormError(error) {
  return { type: "SUBMIT_PROJECT_FORM_ERROR" };
}

export function updateForm(data) {
  return { type: "UPDATE_PROJECT_FORM", data };
}

export function submitProjectForm(formData, e) {
  return dispatch => {
    const db = firebase.database();
    const user = slugify(formData.name);
    const date = new Date();
    const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getTime()}`;
    const submissionId = `${user}-${dateString}`;
    const status = "pending";

    const data = {
      ...formData,
      "submitted-on": date.toString(),
      status
    };

    db.ref(`projectSubmissions/${submissionId}`).update(data, error => {
      if (error) {
        console.log("Error submitting form", error);
        dispatch(submitProjectFormError(error));

        return dispatch(
          showNotification(
            `There was an error submitting your form: ${error}`,
            "success"
          )
        );
      }

      dispatch(submitProjectFormSuccess());
      e.target.submit();
    });
  };
}


// TOPICS ------------------------

export function selectTopic(selected) {
  return { type: "SELECT_TOPIC", selected };
}

export function removeTopic(selected) {
  return { type: "REMOVE_TOPIC", selected };
}
