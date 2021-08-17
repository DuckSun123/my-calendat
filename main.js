const date = new Date();

let currentMonth = date.getMonth() + 1;
let currentYear = date.getFullYear();
let currentDay = date.getDate();

let year = currentYear;
let month = currentMonth;

let dayOfChoice = currentDay;
let monthOfChoice = currentMonth;
let yearOfChoice = currentYear;

const dayCount = document.querySelector(".day-count");
const ym = document.querySelector(".ym");

let clickEventArr = [];

function leapYear(year) {
  return year % 4 == 0 && (year % 400 == 0 || year % 100 != 0);
}

function getDayOfMonth(month, year) {
  if (
    month === 1 ||
    month === 3 ||
    month === 5 ||
    month === 7 ||
    month === 8 ||
    month === 10 ||
    month === 12
  ) {
    return 31;
  } else if (month === 2) {
    return leapYear(year) ? 29 : 28;
  } else {
    return 30;
  }
}

// 현재 월, 일 나타내기
function getDay(year, month, date) {
  const conYMD = year + "-" + month + "-" + date;
  return new Date(conYMD).getDay();
}

function makeCalendar(year, month, day) {
  clickEventArr = [];
  // 전 달 box 만들기
  dayCount.innerHTML = "";
  let firstDay = getDay(year, month, 1);
  let preMonth;
  if (currentMonth - 1 < 0) {
    preMonth = 12;
  } else {
    preMonth = currentMonth - 1;
  }
  const getDayOfPreMonth = getDayOfMonth(month - 1, year);
  for (let i = firstDay; i > 0; i--) {
    const listPre = document.createElement("li");
    listPre.textContent = `${getDayOfPreMonth - (i - 1)}`;
    listPre.style.opacity = "0.5";
    dayCount.appendChild(listPre);
  }
  console.log(firstDay);
  let lastDay = new Date(year, month, 0).getDate();
  console.log(lastDay);

  // 이번달 box 만들기
  for (let i = 1; i <= day; i++) {
    if (i === currentDay && year === currentYear && month === currentMonth) {
      const onlyOneList = document.createElement("li");
      onlyOneList.textContent = `${i}`;

      if (
        currentYear === yearOfChoice &&
        currentMonth === monthOfChoice &&
        currentDay === dayOfChoice
      ) {
        onlyOneList.style.border = "3px solid red";
      } else {
        onlyOneList.style.border = "3px solid black";
      }

      if (0 === getDay(year, month, i)) {
        onlyOneList.style.color = "red";
      } else if (6 == getDay(year, month, i)) {
        onlyOneList.style.color = "blue";
      }

      dayCount.addEventListener("click", (event) => {
        if (event.target !== onlyOneList) {
          onlyOneList.style.border = "3px solid black";
        }
      });

      dayCount.appendChild(onlyOneList);
      continue;
    }

    const list = document.createElement("li");
    list.textContent = `${i}`;
    if (i === dayOfChoice && year === yearOfChoice && month === monthOfChoice) {
      list.style.border = "3px solid red";
      dayCount.addEventListener("click", (event) => {
        if (event.target !== list) {
          list.style.border = "none";
        }
      });
    }

    // 일요일 토요일 색
    if (0 === getDay(year, month, i)) {
      list.style.color = "red";
    } else if (6 === getDay(year, month, i)) {
      list.style.color = "blue";
    }

    dayCount.appendChild(list);
  }
}

function setYmthTitle(year, month) {
  ym.textContent = `${year}.${month}`;
}

// 다음 달
function nextYm() {
  if (month === 12) {
    year = year + 1;
    month = 1;
  } else {
    month += 1;
  }
  setYmthTitle(year, month);
  makeCalendar(year, month, getDayOfMonth(month, year));
}

// 전 달
function preYm() {
  if (month === 1) {
    year -= 1;
    month = 12;
  } else {
    month -= 1;
  }
  setYmthTitle(year, month);
  makeCalendar(year, month, getDayOfMonth(month, year));
}

const todoFiled = document.querySelector(".todo");
const todoList = document.querySelector(".todo-list");
const todoTitle = document.querySelector(".todo-title");

const input = document.querySelector('input[type="text"]');
const add = document.querySelector(".add");
const reset = document.querySelector(".reset");
const allReset = document.querySelector(".allreset");

let storeTodo = [];

function todoOnDay() {
  todoList.innerHTML = "";
  const YMD = year + "-" + month + "-" + dayOfChoice;
  let arrayTodo;
  const elementTodo = document.createElement("li");
  if (!localStorage.getItem(YMD)) {
    return;
  }
  if (localStorage.getItem(YMD).includes(",")) {
    arrayTodo = localStorage.getItem(YMD).split(",");
    arrayTodo.forEach((value) => {
      const deleteBtn = document.createElement("button");
      deleteBtn.setAttribute("class", "deleteBtn");
      deleteBtn.innerHTML = '<p class="del">delete</p>';
      const elementTodo = document.createElement("li");

      elementTodo.innerText = value;
      elementTodo.appendChild(deleteBtn);

      elementTodo.scrollTo();

      todoList.appendChild(elementTodo);
    });
  } else {
    const deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("class", "deleteBtn");
    deleteBtn.innerHTML = '<p class="del">delete</p>';

    elementTodo.textContent = localStorage.getItem(YMD);
    elementTodo.appendChild(deleteBtn);
    todoList.appendChild(elementTodo);
  }
}

function clearEvent() {
  clickEventArr.forEach((value) => {
    value.style.border = "none";
  });
}

dayCount.addEventListener("click", (event) => {
  if (event.target.tagName === "UL") return;
  if (event.target.className !== "disabled") {
    clearEvent();
    todoTitle.textContent = `To Do List ${year}.${month}.${event.target.textContent} 🧐`;
    event.target.style.border = "3px solid red";
    dayOfChoice = event.target.textContent * 1;
    monthOfChoice = month;
    yearOfChoice = year;

    todoOnDay();
    clickEventArr.push(event.target);
    console.log(clickEventArr);
    input.focus();
  }
});

function keepStore() {
  const YMD = year + "-" + month + "-" + dayOfChoice;
  let arrayTodo;
  let arr = new Array();
  const elementTodo = document.createElement("li");
  if (!localStorage.getItem(YMD)) {
    return arr;
  }
  if (localStorage.getItem(YMD).includes(",")) {
    arrayTodo = localStorage.getItem(YMD).split(",");
    arrayTodo.forEach((value) => {
      arr.push(value);
    });
  } else {
    arr.push(localStorage.getItem(YMD));
  }
  return arr;
}

function addTodoList() {
  if (input.value === "") {
    alert("please input you are going to do");
    return;
  }

  storeTodo = keepStore();
  storeTodo.push(input.value);

  const YMD = year + "-" + month + "-" + dayOfChoice;
  localStorage.setItem(YMD, storeTodo);

  todoOnDay();
  input.value = "";
  input.focus();
}

add.addEventListener("click", (event) => {
  addTodoList();
});

input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTodoList();
  }
});

reset.addEventListener("click", () => {
  const result = prompt(
    `Do you really want to reset ${year} ${month} ${dayOfChoice}? Enter (y/n)`
  );
  const YMD = year + "-" + month + "-" + dayOfChoice;
  if (result === "y") {
    localStorage.removeItem(YMD);
    todoOnDay();
  }
});

allReset.addEventListener("click", () => {
  const result = prompt(`Do you really want to clear all? Enter (y/n)`);
  if (result === "y") {
    localStorage.clear();
    todoOnDay();
  }
});

todoList.addEventListener("click", (event) => {
  if (event.target.className === "del") {
    console.log("a: " + event.target.parentNode.parentNode.textContent);

    const YMD = year + "-" + month + "-" + dayOfChoice;

    if (localStorage.getItem(YMD).includes(",")) {
      let array = localStorage.getItem(YMD).split(",");
      let copyArray = [];
      array.forEach((value) => {
        if (value !== event.target.parentNode.parentNode.textContent) {
          copyArray.push(value);
        }
      });
      localStorage.setItem(YMD, copyArray);
    } else {
      localStorage.removeItem(YMD);
    }

    todoList.removeChild(event.target.parentNode.parentNode);
  }
});

function main() {
  setYmthTitle(year, month);
  makeCalendar(year, month, getDayOfMonth(month, year));
  todoTitle.textContent = `To Do List ${year}.${month}.${currentDay} 🧐`;
  todoOnDay();
}

main();
