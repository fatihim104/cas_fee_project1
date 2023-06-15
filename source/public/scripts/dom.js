const formSection = document.getElementById("form_section");
const listSection = document.getElementById("list_section");
const formButtons = document.getElementById("update_overwiev_buttons");
const overviewButton = document.getElementById("overwiev");
const createOverwievButton = document.getElementById("create_overwiev");

const themeButton = document.getElementById("theme-button");
const taskListElement = document.getElementById("todo-items");
const templateSource = document.getElementById('todo-list-templete').innerHTML;
const showFormButton = document.querySelector("#create-button")

// Form inputs
const form = document.getElementById("form-element");
const title = document.getElementById("title");
const description = document.getElementById("description");
const importance = document.getElementById("importance");
const duedate = document.getElementById("duedate");
const checked = document.getElementById("checked");

export {formSection, listSection, form, formButtons, overviewButton, createOverwievButton, themeButton, taskListElement, templateSource, showFormButton, title, description, importance, duedate, checked}

// , form, title, description, importance, duedate