const formSection = document.getElementById("form_section");
const listSection = document.getElementById("list_section");
const overviewButton = document.getElementById("overwiev");
const createOverwievButton = document.getElementById("create_overwiev");

const themeButton = document.getElementById("theme-button");
const taskListElement = document.getElementById("todo-items");
const showFormButton = document.querySelector("#create-button");

//HandleBars Source
const templateSource = document.getElementById("todo-list-templete").innerHTML;

//Filter Buttons
const sortButtons = document.querySelector("#sort_buttons");
const filterButton = document.querySelector("#filter-button")

// Form inputs
const form = document.getElementById("form-element");
const title = document.getElementById("title");
const description = document.getElementById("description");
const importance = document.getElementById("importance");
const duedate = document.getElementById("duedate");
const checked = document.getElementById("checked");

export {
  formSection,
  listSection,
  form,
  overviewButton,
  createOverwievButton,
  themeButton,
  sortButtons,
  filterButton, 
  taskListElement,
  templateSource,
  showFormButton,
  title,
  description,
  importance,
  duedate,
  checked,
};

