console.log("script is runing");

/* --------- calender --------- */
//get all calendars in document
const calendars = document.querySelectorAll(".calendar");

//today date
const currentDate = new Date();

//months and weakdays in order
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weakDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

//current month and year
let month = currentDate.getMonth();
let year = currentDate.getFullYear();

//main calendar fn (get the calendar cause there is not one)
function renderCalendar(calendarEl) {
  //get month year
  const calendarMonth = calendarEl.querySelector(".calendar_month");
  const calendarYear = calendarEl.querySelector(".calendar_year");
  //get the days container and make an empthy var for days
  let calendarDays = calendarEl.querySelector(".calendar_days");
  let calendarDaysHtml = "";

  /* --- filling days in the calender --- */

  //set the month and year text to month and year
  calendarMonth.textContent = `${months[month]}`;
  calendarYear.textContent = `${year}`;

  //make the container emphty
  calendarDays.innerHTML = "";

  //start and endd current month
  const startMonth = new Date(year, month, 1).getDate();
  const endMonth = new Date(year, month + 1, 0).getDate();

  //what day month get started (sunday = 0)
  const startMonthDay = new Date(year, month, 1).getDay();
  //how many days last month had for rendering start days
  const endPrevMonth = new Date(year, month, 0).getDate();
  //which day next month get started with for rendering end days
  const nextMonthDay = new Date(year, month + 1, 0).getDay();

  //rendering weakdays
  for (let i = 0; i < weakDays.length; i++) {
    calendarDaysHtml += `<p>${weakDays[i]}</p>`;
  }

  /*  renderign prev month days
  (start month gets minus 1 every loop then its get
   minus from endprevmonth(31 - 4 , 31 - 3)) */
  for (let i = startMonthDay - 1; i >= 0; i--) {
    calendarDaysHtml += `<button type="button" class="inactive">${
      endPrevMonth - i
    }</button>`;
  }

  /* rendering all days and if it was current day it gest
   today class */
  for (let i = startMonth; i <= endMonth; i++) {
    let className =
      i === currentDate.getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear()
        ? ' class="today"'
        : "";
    calendarDaysHtml += `<button${className} type="button">${i}</button>`;
  }

  //set the buttons till now
  calendarDays.innerHTML = calendarDaysHtml;

  /* i wanted a fixed calendar so it doesent get shrinking
  so i added this part just for make it 42 days straight */
  //get buttons
  let totalButtons = calendarDays.querySelectorAll("button");
  //minus buttons from 42
  let extraDays = 42 - totalButtons.length;

  //render inactive buttons
  for (let i = 1; i <= extraDays; i++) {
    calendarDaysHtml += `<button type="button" class="inactive">${i}</button>`;
  }

  //set the inner html again
  calendarDays.innerHTML = calendarDaysHtml;

  /* buttons*/
  //get buttons
  const prevMonthBtn = calendarEl.querySelector(".calendar_btn_month_prev");
  const nextMonthBtn = calendarEl.querySelector(".calendar_btn_month_next");
  const nextYearBtn = calendarEl.querySelector(".calendar_btn_year_next");
  const prevYearBtn = calendarEl.querySelector(".calendar_btn_year_prev");

  //set on click event to them
  prevMonthBtn.onclick = () => changeMonth(-1);
  nextMonthBtn.onclick = () => changeMonth(1);
  if (nextYearBtn) {
    nextYearBtn.onclick = () => changeYear(1);
  }
  if (prevYearBtn) {
    prevYearBtn.onclick = () => changeYear(-1);
  }

  //write the fn
  function changeMonth(data) {
    month += data;
    //if month was < 0 go to prev month and minus year
    if (month < 0) {
      month = 11;
      year--;
      //if month was > 11 go to next year and make it 0 again
    } else if (month > 11) {
      month = 0;
      year++;
    }
    renderCalendar(calendarEl);
  }

  function changeYear(delta) {
    year += delta;
    renderCalendar(calendarEl);
  }

  //celandar buttons to dates
  const activeDaysDo = calendarDays.querySelectorAll(
    ".calendar--primary button:not(.inactive)",
  );
  const activeDaysDont = calendarDays.querySelectorAll(
    ".calendar--secoundry button:not(.inactive)",
  );
  const overlay = document.querySelector(".blur--background--0-1");
  const calendarDo = document.querySelector(".calendar--primary");
  const calendarDont = document.querySelector(".calendar--secoundry");

  activeDaysDo.forEach((btn) => {
    btn.addEventListener("click", () => {
      const day = btn.textContent;
      const dayFormatted = String(day).padStart(2, "0");
      const monthFormatted = String(month + 1).padStart(2, "0");

      const formattedDate = `${year}-${monthFormatted}-${dayFormatted}`;

      if (activeInputDo) {
        activeInputDo.value = formattedDate;
      }

      if (calendarDo && overlay) {
        calendarDo.classList.remove("show");
        overlay.classList.remove("show");
      }
    });
  });

  activeDaysDont.forEach((btn) => {
    btn.addEventListener("click", () => {
      const day = btn.textContent;
      const dayFormatted = String(day).padStart(2, "0");
      const monthFormatted = String(month + 1).padStart(2, "0");

      const formattedDate = `${year}-${monthFormatted}-${dayFormatted}`;

      if (activeInputDont) {
        activeInputDont.value = formattedDate;
      }

      if (calendarDo && overlay) {
        calendarDont.classList.remove("show");
        overlay.classList.remove("show");
      }
    });
  });

  /* cell today button animation */
  //get all days btns
  const days = calendarDays.querySelectorAll("button");
  //go through them and look for the one with today class
  days.forEach((btn, indx) => {
    if (btn.className === "today") {
      //get today
      const today = calendarDays.querySelector(".today");
      //get 4 sides index
      const topElIndex = indx - 7;
      const downElIndex = indx + 7;
      const rightElIndex = indx + 1;
      const leftElIndex = indx - 1;
      //set top and down el
      const topEl = days[topElIndex];
      const downEl = days[downElIndex];
      const rightEl = days[rightElIndex];
      const leftEl = days[leftElIndex];
      //add event listener to them
      //if it has inactive class dont select it
      if (
        rightEl.className !== "inactive" &&
        rightElIndex !== 35 &&
        rightElIndex !== 7 &&
        rightElIndex !== 14 &&
        rightElIndex !== 21 &&
        rightElIndex !== 28
      ) {
        rightEl.addEventListener("mouseenter", () => {
          today.style.borderBottomRightRadius = "0px";
          today.style.borderTopRightRadius = "0px";
        });
        rightEl.addEventListener("mouseleave", () => {
          today.style.borderRadius = "";
        });
      }
      if (
        leftEl.className !== "inactive" &&
        leftElIndex !== 6 &&
        leftElIndex !== 13 &&
        leftElIndex !== 20 &&
        leftElIndex !== 27 &&
        leftElIndex !== 34
      ) {
        leftEl.addEventListener("mouseenter", () => {
          today.style.borderBottomLeftRadius = "0px";
          today.style.borderTopLeftRadius = "0px";
        });
        leftEl.addEventListener("mouseleave", () => {
          today.style.borderRadius = "";
        });
      }
      if (topEl ? topEl.className !== "inactive" : "") {
        topEl.addEventListener("mouseenter", () => {
          today.style.borderTopLeftRadius = "0px";
          today.style.borderTopRightRadius = "0px";
        });
        topEl.addEventListener("mouseleave", () => {
          today.style.borderRadius = "";
        });
      }
      if (downEl ? downEl.className !== "inactive" : "") {
        downEl.addEventListener("mouseenter", () => {
          today.style.borderBottomLeftRadius = "0px";
          today.style.borderBottomRightRadius = "0px";
        });
        downEl.addEventListener("mouseleave", () => {
          today.style.borderRadius = "";
        });
      }
    }
  });
}

calendars.forEach((cal) => renderCalendar(cal));

/* video background slowing */
const videos = document.querySelectorAll(".video--slower");
videos.forEach((video) => (video.playbackRate = 0.5));

/* Chart rendering */
//get all charts in document
const charts = document.querySelectorAll(".chart--primary , .chart--secoundry");

function chartsFn(char) {
  //get canvas for chart.js out of it
  const ctx = char.querySelector("canvas");
  //make cahrt an instance to update it later
  const chartInstance = new Chart(ctx, {
    //type of chart
    type: "line",
    data: {
      //default for numbers in down
      labels: [1, 2, 2, 3, 4],
      datasets: [
        {
          label: char.classList.contains("chart--primary")
            ? "Do tasks that completed"
            : "Dont tasks that completed",
          //data that will replaced with api
          data: [4, 7, 6, 11, 9, 5, 20],
          borderWidth: 2,
          //color of the line (render it base on the chart)
          borderColor: char.classList.contains("chart--primary")
            ? "#9810fa"
            : "#4f39f6",
          //color of the bg points (render it base on the chart)
          backgroundColor: char.classList.contains("chart--primary")
            ? "#c27aff"
            : "#7c86ff",
          tension: 0.4,
        },
      ],
    },
    options: {
      scales: {
        //x chart lines numbders color(base on condition)
        x: {
          ticks: {
            color: char.classList.contains("chart--primary")
              ? "#9810fa"
              : "#4f39f6",
          },
        },
        //y chart lines numbders color (base on condition)
        y: {
          ticks: {
            color: char.classList.contains("chart--primary")
              ? "#9810fa"
              : "#4f39f6",
          },
        },
      },
      responsive: true,
      plugins: {
        title: {
          display: false,
        },
        legend: {
          display: false,
        },
      },
    },
  });
  ///there is a bug tho when we change the days or weaks it
  //gets more in width

  //get buttons of the charts
  const buttons = char.querySelectorAll(".chart__header__btns button");
  let dataLables = [];
  //change datalables base on the btn that user clicked
  buttons.forEach((btn) =>
    btn.addEventListener("click", () => {
      if (btn.textContent == "D") {
        dataLables = Array.from({ length: 24 }, (_, i) => i + 1);
      } else if (btn.textContent == "W") {
        dataLables = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
      } else if (btn.textContent == "M") {
        const currentDate = new Date();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        const daysInMonth = new Date(year, month, 0).getDate();
        dataLables = Array.from({ length: daysInMonth }, (_, i) => i + 1);
      }
      //update labels and upadate instance
      chartInstance.data.labels = dataLables;
      chartInstance.update();
    }),
  );
}

charts.forEach((char) => chartsFn(char));

//history back btn
const header__right__icon = document.querySelector("#header__right__icon");
if (header__right__icon) {
  header__right__icon.addEventListener("click", () => {
    window.location.href = "home.html";
  });
}

//new--task--modals
//openModalDoMakeTask
function newTaskModalToggleDo() {
  const newTaskModalDo = document.querySelector(".new--task--modal--primary");
  const openModalDo = document.getElementById("openModalAddDo");
  const closeModalDo = document.getElementById("closeModalAddDo");
  const overlay = document.querySelector(".blur--background--0-2");
  const inputs = newTaskModalDo
    ? newTaskModalDo.querySelectorAll("input")
    : null;
  const nameInputTxt = newTaskModalDo
    ? newTaskModalDo.querySelector("#nameInputTxt")
    : null;
  if (!newTaskModalDo) return;

  if (openModalDo && newTaskModalDo && overlay) {
    openModalDo.addEventListener("click", () => {
      newTaskModalDo.classList.add("show");
      overlay.classList.add("show");
      nameInputTxt.textContent = 50;
    });
  }
  if (closeModalDo && newTaskModalDo && overlay) {
    closeModalDo.addEventListener("click", () => {
      newTaskModalDo.classList.remove("show");
      overlay.classList.remove("show");
      inputs.forEach((input) => {
        nameInputTxt.textContent = 50;
        input.value = "";
      });
    });
  }
  if (overlay && newTaskModalDo) {
    overlay.addEventListener("click", () => {
      newTaskModalDo.classList.remove("show");
      overlay.classList.remove("show");
      inputs.forEach((input) => {
        nameInputTxt.textContent = 50;
        input.value = "";
      });
    });
  }
}
//openModalDontMakeTask
function newTaskModalToggleDont() {
  //get the dom element we need
  const newTaskModalDont = document.querySelector(
    ".new--task--modal--secoundry",
  );
  if (!newTaskModalDont) return;
  //btns
  const openModalDont = document.getElementById("openModalAddDont");
  const closeModalDont = document.getElementById("closeModalAddDont");
  const overlay = document.querySelector(".blur--background--0-2");
  //inputs
  const inputs = newTaskModalDont
    ? newTaskModalDont.querySelectorAll("input")
    : null;
  const nameInputTxt = newTaskModalDont
    ? newTaskModalDont.querySelector("#nameInputTxt")
    : null;

  //check if they are there for not having error
  //treat them as a button whos add and remove classes
  if (openModalDont && newTaskModalDont && overlay) {
    openModalDont.addEventListener("click", () => {
      newTaskModalDont.classList.add("show");
      overlay.classList.add("show");
      nameInputTxt.textContent = 50;
    });
  }
  if (closeModalDont && newTaskModalDont && overlay) {
    closeModalDont.addEventListener("click", () => {
      newTaskModalDont.classList.remove("show");
      overlay.classList.remove("show");
      inputs.forEach((input) => {
        nameInputTxt.textContent = 50;
        input.value = "";
      });
    });
  }
  if (overlay && newTaskModalDont) {
    overlay.addEventListener("click", () => {
      newTaskModalDont.classList.remove("show");
      overlay.classList.remove("show");
      inputs.forEach((input) => {
        nameInputTxt.textContent = 50;
        input.value = "";
      });
    });
  }
}
newTaskModalToggleDont();
newTaskModalToggleDo();
function deleteTaskDo() {
  //get teh tasknames that user selected

  //overlay and delete task modal
  const deleteTaskModal = document.querySelector(
    ".primary--delete--task--modal",
  );
  const overlay = document.querySelector(".blur--background--0-2");
  //logged in and sign up
  const primaryTasks = document.querySelector(".primary--tasks");

  const checkboxInput = primaryTasks.querySelectorAll(
    ".checkbox__input:checked",
  );

  const checkboxInputParrent = [...checkboxInput].map((checkbox) =>
    checkbox.closest("div"),
  );
  const tasksName = checkboxInputParrent.map((div) => {
    return div.querySelector("span").textContent.trim();
  });
  //btns
  const dontAskAgainDelete = document.getElementById("dontAskAgainDelete");

  //if tasks was zero retutn and do nothing
  if (tasksName.length == 0) {
    return;
  }
  //delete tasks
  checkboxInputParrent.forEach((div) => div.remove());
  //dont show the modal
  deleteTaskModal.classList.remove("show");
  overlay.classList.remove("show");
}
if (document.getElementById("deleteTaskDont")) {
  document.getElementById("deleteTaskDont").addEventListener("click", () => {
    deleteTaskDont();
  });
}
if (document.getElementById("completeTaskDont")) {
  document.getElementById("completeTaskDont").addEventListener("click", () => {
    deleteTaskDont();
  });
}

//openDeleteTasks
function deleteTasksModalToggleDo() {
  //toggle to delete task
  const deleteTaskModal = document.querySelector(
    ".primary--delete--task--modal",
  );

  if (!deleteTaskModal) return;
  const openDeleteModalDo = document.getElementById("openDeleteModalDo");
  const closeDeleteModalDo = document.getElementById("closeDeleteModalDo");
  const overlay = document.querySelector(".blur--background--0-2");

  //open delete task
  if (deleteTaskModal && openDeleteModalDo && overlay) {
    openDeleteModalDo.addEventListener("click", () => {
      //dont ask again = true then dont open modal

      if (localStorage.getItem("dontAskAgainDelete") == "true") {
        deleteTaskDo();
        return;
      }

      //get the elements in the modal
      const tasksThatShouldBeDeletedDiv = document.getElementById(
        "tasksThatShouldBeDeleted",
      );
      const tasksThatShouldBeDeletedUl =
        tasksThatShouldBeDeletedDiv.querySelector("ul");
      let tasksThatShouldBeDeletedP =
        tasksThatShouldBeDeletedDiv.querySelector("p");

      let tasksThatShouldBeDeleted = "";
      //getting the tasks
      const primaryTasks = document.querySelector(".primary--tasks");
      const checkboxInput = primaryTasks.querySelectorAll(
        ".checkbox__input:checked",
      );
      const checkboxInputNotChecked =
        primaryTasks.querySelectorAll(".checkbox__input");
      //getting the tasks parrent
      const checkboxInputParrent = [...checkboxInput].map((checkbox) =>
        checkbox.closest("div"),
      );
      //get teh tasknames that user selected
      const tasksName = checkboxInputParrent.map((div) => {
        return div.querySelector("span").textContent.trim();
      });

      //showing modal
      deleteTaskModal.classList.add("show");
      overlay.classList.add("show");
      //change the names in the delete menue
      const maxDisplay = 3;
      tasksThatShouldBeDeleted = tasksName
        .slice(0, maxDisplay)
        .map((name) => `<li>${name}</li>`)
        .join("");

      if (tasksName.length > maxDisplay) {
        tasksThatShouldBeDeleted += `<li>...</li>`;
      }

      tasksThatShouldBeDeletedUl.innerHTML = tasksThatShouldBeDeleted;

      //change the numbers in delete menue
      tasksThatShouldBeDeletedP.innerHTML = `Selected tasks (selected ${checkboxInput.length} of ${checkboxInputNotChecked.length}):`;

      //if there was no tasks error
      if (tasksName.length == 0) {
        tasksThatShouldBeDeletedP.innerHTML = `<p style="font-weight: 700; font-size: 1.2rem; color: red">No tasks selected.</p>`;
        tasksThatShouldBeDeletedP.classList.add("warning");
      }
    });
  }
  if (deleteTaskModal && closeDeleteModalDo && overlay) {
    closeDeleteModalDo.addEventListener("click", () => {
      deleteTaskModal.classList.remove("show");
      overlay.classList.remove("show");
    });
  }
  if (deleteTaskModal && overlay) {
    overlay.addEventListener("click", () => {
      deleteTaskModal.classList.remove("show");
      overlay.classList.remove("show");
    });
  }

  //delete task toggle infos
}
deleteTasksModalToggleDo();
function deleteTaskDont() {
  //get teh tasknames that user selected

  //overlay and delete task modal
  const deleteTaskModal = document.querySelector(
    ".secondary--delete--task--modal",
  );
  const overlay = document.querySelector(".blur--background--0-2");
  //logged in and sign up
  const primaryTasks = document.querySelector(".secondary--tasks");

  const checkboxInput = primaryTasks.querySelectorAll(
    ".checkbox__input:checked",
  );

  const checkboxInputParrent = [...checkboxInput].map((checkbox) =>
    checkbox.closest("div"),
  );
  const tasksName = checkboxInputParrent.map((div) => {
    return div.querySelector("span").textContent.trim();
  });

  //if tasks was zero retutn and do nothing
  if (tasksName.length == 0) {
    return;
  }
  //delete tasks
  checkboxInputParrent.forEach((div) => div.remove());
  //dont show the modal
  deleteTaskModal.classList.remove("show");
  overlay.classList.remove("show");
}
if (document.getElementById("deleteTaskDo")) {
  document.getElementById("deleteTaskDo").addEventListener("click", () => {
    deleteTaskDo();
  });
}
if (document.getElementById("completeTaskDo")) {
  document.getElementById("completeTaskDo").addEventListener("click", () => {
    deleteTaskDo();
  });
}

function deleteTasksModalToggleDont() {
  const deleteTaskModal = document.querySelector(
    ".secondary--delete--task--modal",
  );
  if (!deleteTaskModal) return;
  const openDeleteModalDont = document.getElementById("openDeleteModalDont");
  const closeDeleteModalDont = document.getElementById("closeDeleteModalDont");
  const overlay = document.querySelector(".blur--background--0-2");

  if (deleteTaskModal && openDeleteModalDont && overlay) {
    openDeleteModalDont.addEventListener("click", () => {
      if (localStorage.getItem("dontAskAgainDeleteDont") == "true") {
        deleteTaskDont();
        return;
      }

      //get the elements in the modal
      const tasksThatShouldBeDeletedDiv = document.getElementById(
        "tasksThatShouldBeDeletedDont",
      );
      const tasksThatShouldBeDeletedUl =
        tasksThatShouldBeDeletedDiv.querySelector("ul");
      let tasksThatShouldBeDeletedP =
        tasksThatShouldBeDeletedDiv.querySelector("p");

      let tasksThatShouldBeDeleted = "";
      //getting the tasks
      const primaryTasks = document.querySelector(".secondary--tasks");
      const checkboxInput = primaryTasks.querySelectorAll(
        ".checkbox__input:checked",
      );
      const checkboxInputNotChecked =
        primaryTasks.querySelectorAll(".checkbox__input");
      //getting the tasks parrent
      const checkboxInputParrent = [...checkboxInput].map((checkbox) =>
        checkbox.closest("div"),
      );
      //get teh tasknames that user selected
      const tasksName = checkboxInputParrent.map((div) => {
        return div.querySelector("span").textContent.trim();
      });

      //showing modal
      deleteTaskModal.classList.add("show");
      overlay.classList.add("show");
      //change the names in the delete menue
      const maxDisplay = 3;
      tasksThatShouldBeDeleted = tasksName
        .slice(0, maxDisplay)
        .map((name) => `<li>${name}</li>`)
        .join("");

      if (tasksName.length > maxDisplay) {
        tasksThatShouldBeDeleted += `<li>...</li>`;
      }

      tasksThatShouldBeDeletedUl.innerHTML = tasksThatShouldBeDeleted;

      //change the numbers in delete menue
      tasksThatShouldBeDeletedP.innerHTML = `Selected tasks (selected ${checkboxInput.length} of ${checkboxInputNotChecked.length}):`;

      //if there was no tasks error
      if (tasksName.length == 0) {
        tasksThatShouldBeDeletedP.innerHTML = `<p style="font-weight: 700; font-size: 1.2rem; color: red">No tasks selected.</p>`;
        tasksThatShouldBeDeletedP.classList.add("warning");
      }
    });
  }
  if (deleteTaskModal && closeDeleteModalDont && overlay) {
    closeDeleteModalDont.addEventListener("click", () => {
      deleteTaskModal.classList.remove("show");
      overlay.classList.remove("show");
    });
  }
  if (deleteTaskModal && overlay) {
    overlay.addEventListener("click", () => {
      deleteTaskModal.classList.remove("show");
      overlay.classList.remove("show");
    });
  }
}
deleteTasksModalToggleDont();

//which input is active in new task add do and dont
let activeInputDo = null;
//open calendar modal
function calendarFunctionDo() {
  const calendarDo = document.querySelector(".calendar--primary");

  if (!calendarDo) return;
  const overlay = document.querySelector(".blur--background--0-1");
  const openCalendar = document.querySelectorAll("#openCalendarDo");

  openCalendar.forEach((btn) => {
    btn.addEventListener("click", () => {
      //btn.dataset.target gives the id of the input and this way we have the input that is selected
      activeInputDo = document.getElementById(btn.dataset.target);

      let rect = btn.getBoundingClientRect();
      calendarDo.classList.add("show");
      overlay.classList.add("show");
      calendarDo.style.top = `${rect.top + window.scrollY}px`;
      calendarDo.style.left = `${rect.left + window.scrollX + 220}px`;
    });
  });
  overlay.addEventListener("click", () => {
    calendarDo.classList.remove("show");
    overlay.classList.remove("show");
  });
}

//which input is active in new task add do and dont
let activeInputDont = null;
function calendarFunctionDont() {
  const clenderDont = document.querySelector(".calendar--secoundry");
  if (!clenderDont) return;
  const overlay = document.querySelector(".blur--background--0-1");
  const openCalendar = document.querySelectorAll("#openCalendarDont");

  openCalendar.forEach((btn) => {
    btn.addEventListener("click", () => {
      let rect = btn.getBoundingClientRect();
      activeInputDont = document.getElementById(btn.dataset.target);
      clenderDont.classList.add("show");
      overlay.classList.add("show");

      clenderDont.style.top = `${rect.top + window.scrollY}px`;
      clenderDont.style.left = `${rect.left + window.scrollX + 220}px`;
    });
  });
  overlay.addEventListener("click", () => {
    clenderDont.classList.remove("show");
    overlay.classList.remove("show");
  });
}
calendarFunctionDont();
calendarFunctionDo();

function nameInputAmountCheck() {
  const nameInput = document.querySelectorAll("#nameInput");
  const nameCountSpan = document.querySelectorAll("#nameInputTxt");
  if (!nameInput) return;

  nameInput.forEach((input) => {
    input.addEventListener("input", () => {
      nameCountSpan.forEach((span) => {
        span.textContent = 50 - input.value.length;
      });
    });
  });
}

nameInputAmountCheck();

function makeNewTaskDont() {
  //modal
  const newTaskModalDont = document.querySelector(
    ".new--task--modal--secoundry",
  );
  const submitBotton = document.getElementById("addTaskSubmitBtnDont");
  const cancelBtn = document.getElementById("closeModalAddDont");
  //inputs
  const nameInput = newTaskModalDont
    ? newTaskModalDont.querySelector("#nameInput")
    : null;
  const startDateInput = document.getElementById("startDateDont");
  const finishDateInput = document.getElementById("finishDateDont");
  const nameCountSpan = document.querySelectorAll("#nameInputTxt");
  //overlay
  const overlay = document.querySelector(".blur--background--0-2");
  //tasks
  const secoundryTasks = document.querySelector(".secondary--tasks");
  const taskContainer = secoundryTasks
    ? secoundryTasks.querySelector(".tasks__column")
    : null;
  //descriptions
  const addNewTaskDescStart = document.getElementById("descriptionDontStart");
  const addNewTaskDescFinish = document.getElementById("descriptionDontfinish");
  const addNewTaskDescName = document.getElementById("descriptionDontName");

  //helper functions
  function errorHandler(element, message) {
    element.classList.add("warning");
    element.innerHTML = message;
  }

  //error handlesr remover
  function errorRemover(element) {
    element.classList.remove("warning");
  }

  if (overlay) {
    overlay.addEventListener("click", () => {
      errorRemover(addNewTaskDescFinish);
      errorRemover(addNewTaskDescStart);
      errorRemover(addNewTaskDescName);
      addNewTaskDescFinish.innerHTML =
        'Tap the <i class="fa-regular fa-calendar"></i> icon to choose a date';
      addNewTaskDescName.innerHTML = "Place a text here for description";
      addNewTaskDescStart.innerHTML =
        'Tap the <i class="fa-regular fa-calendar"></i> icon to choose a date';
    });
  }
  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      errorRemover(addNewTaskDescFinish);
      errorRemover(addNewTaskDescStart);
      errorRemover(addNewTaskDescName);
      addNewTaskDescFinish.innerHTML =
        'Tap the <i class="fa-regular fa-calendar"></i> icon to choose a date';
      addNewTaskDescName.innerHTML = "Place a text here for description";
      addNewTaskDescStart.innerHTML =
        'Tap the <i class="fa-regular fa-calendar"></i> icon to choose a date';
    });
  }

  if (submitBotton) {
    submitBotton.addEventListener("click", (e) => {
      const name = nameInput.value;
      const startDate = startDateInput.value;
      const finishDate = finishDateInput.value;

      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

      //error handlesr
      let hasError = false;

      //if the inputs was empthy
      if (startDate == "") {
        errorHandler(
          addNewTaskDescStart,
          "This field cannot be empty. Please select a date.",
        );
        hasError = true;
      } else if (!dateRegex.test(startDate)) {
        errorHandler(addNewTaskDescStart, "Please choose a valid date.");
        hasError = true;
      } else {
        errorRemover(addNewTaskDescStart);
        addNewTaskDescStart.innerHTML = "";
      }

      if (finishDate == "") {
        errorHandler(
          addNewTaskDescFinish,
          "This field cannot be empty. Please select a date.",
        );
        hasError = true;
      } else if (!dateRegex.test(finishDate)) {
        errorHandler(addNewTaskDescFinish, "Please choose a valid date.");
        hasError = true;
      } else {
        errorRemover(addNewTaskDescFinish);
        addNewTaskDescFinish.innerHTML = "";
      }

      if (name == "") {
        errorHandler(addNewTaskDescName, "Name cannot be empthy");
        hasError = true;
      }

      if (hasError) return;

      //make the task
      const tasksRow = document.createElement("div");
      tasksRow.className = "tasks__row";
      tasksRow.innerHTML = `
              <span>${name}</span>
              <span>${startDate}</span>
              <span>${finishDate}</span>
              <label class="checkbox--secoundry">
                <input class="checkbox__input" type="checkbox" />
                <span class="checkbox__box"></span>
              </label>
               
  `;

      //prevent new checkbox from default behavior
      taskContainer.addEventListener("click", (e) => {
        const label = e.target.closest(".checkbox--secoundry");
        if (!label) return;

        e.preventDefault();
        const input = label.querySelector('input[type="checkbox"]');
        input.checked = !input.checked;
      });

      //append the task that we made to the row
      taskContainer.append(tasksRow);

      //back to defualt
      nameInput.value = "";
      startDateInput.value = "";
      finishDateInput.value = "";
      nameCountSpan.forEach((span) => {
        span.textContent = 50;
      });

      addNewTaskDescFinish.innerHTML =
        'Tap the <i class="fa-regular fa-calendar"></i> icon to choose a date';
      addNewTaskDescName.innerHTML = "Place a text here for description";
      addNewTaskDescStart.innerHTML =
        'Tap the <i class="fa-regular fa-calendar"></i> icon to choose a date';

      newTaskModalDont.classList.remove("show");
      overlay.classList.remove("show");
    });
  }
}
makeNewTaskDont();

// function makeNewTaskDo() {
//   //modal
//   const newTaskModalDo = document.querySelector(".new--task--modal--primary");
//   const submitBotton = document.getElementById("addTaskSubmitBtn");
//   const nameCountSpan = document.querySelectorAll("#nameInputTxt");
//   //inputs
//   const nameInput = newTaskModalDo
//     ? newTaskModalDo.querySelector("#nameInput")
//     : null;
//   const startDateInput = document.getElementById("startDateDo");
//   const finishDateInput = document.getElementById("finishDateDo");
//   //overlay
//   const overlay = document.querySelector(".blur--background--0-2");
//   //tasks
//   const primaryTasks = document.querySelector(".primary--tasks");
//   const taskContainer = primaryTasks
//     ? primaryTasks.querySelector(".tasks__column")
//     : null;
//   //descriptions
//   const addNewTaskDescStart = document.getElementById("descriptionDoStart");
//   const addNewTaskDescFinish = document.getElementById("descriptionDofinish");
//   const addNewTaskDescName = document.getElementById("descriptionDoName");

//   if (submitBotton) {
//     submitBotton.addEventListener("click", (e) => {
//       const name = nameInput.value;
//       const startDate = startDateInput.value;
//       const finishDate = finishDateInput.value;

//       const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

//       //error handlesr
//       let hasErrorStart = false;
//       let hasErrorfinish = false;
//       let hasErrorStartEmpthy = false;
//       let hasErrorfinishEmpthy = false;
//       let hasErrorName = false;

//       //if the inputs was empthy
//       if (startDate == "") {
//         addNewTaskDescStart.innerHTML =
//           "This field cannot be empty. Please select a date.";
//         addNewTaskDescStart.classList.add("warning");
//         hasErrorStartEmpthy = true;
//       }

//       if (finishDate == "") {
//         addNewTaskDescFinish.innerHTML =
//           "This field cannot be empty. Please select a date.";
//         addNewTaskDescFinish.classList.add("warning");
//         hasErrorfinishEmpthy = true;
//       }

//       if (name == "") {
//         addNewTaskDescName.innerHTML = "Name cannot be empty.";
//         addNewTaskDescName.classList.add("warning");
//         hasErrorName = true;
//       }

//       //if the inputs was full get regex
//       if (startDate !== "") {
//         const result = dateRegex.test(startDate);
//         console.log(result, startDate);
//         if (!result) {
//           addNewTaskDescStart.innerHTML = "Please choose a valid date.";
//           addNewTaskDescStart.classList.add("warning");
//           hasErrorStart = true;
//         }
//       }

//       if (finishDate !== "") {
//         const result = dateRegex.test(finishDate);
//         if (!result) {
//           addNewTaskDescFinish.innerHTML = "Please choose a valid date.";
//           addNewTaskDescFinish.classList.add("warning");
//           hasErrorfinish = true;
//         }
//       }

//       //go to default
//       if (
//         hasErrorStart ||
//         hasErrorfinish ||
//         hasErrorName ||
//         hasErrorStartEmpthy ||
//         hasErrorfinishEmpthy
//       ) {
//         setTimeout(() => {
//           addNewTaskDescFinish.innerHTML =
//             'Tap the <i class="fa-regular fa-calendar"></i> icon to choose a date';
//           addNewTaskDescStart.innerHTML =
//             'Tap the <i class="fa-regular fa-calendar"></i> icon to choose a date';
//           addNewTaskDescName.innerHTML = "Place a text here for description";

//           addNewTaskDescName.classList.remove("warning");
//           addNewTaskDescStart.classList.remove("warning");
//           addNewTaskDescFinish.classList.remove("warning");
//           hasErrorfinish = false;
//           hasErrorStart = false;
//         }, 6000);
//         return;
//       }

//       //make the task
//       const tasksRow = document.createElement("div");
//       tasksRow.className = "tasks__row";
//       tasksRow.innerHTML = `
//               <span>${name}</span>
//               <span>${startDate}</span>
//               <span>${finishDate}</span>
//               <label class="checkbox--primary">
//                 <input class="checkbox__input" type="checkbox" />
//                 <span class="checkbox__box"></span>
//               </label>

//   `;

//       //prevent new checkbox from default behavior
//       taskContainer.addEventListener("click", (e) => {
//         const label = e.target.closest(".checkbox--primary");
//         if (!label) return;

//         e.preventDefault();
//         const input = label.querySelector('input[type="checkbox"]');
//         input.checked = !input.checked;
//       });

//       //append the task that we made to the row
//       taskContainer.append(tasksRow);

//       //back to defualt
//       nameInput.value = "";
//       startDateInput.value = "";
//       finishDateInput.value = "";
//       nameCountSpan.forEach((span) => {
//         span.textContent = 50;
//       });

//       newTaskModalDo.classList.remove("show");
//       overlay.classList.remove("show");
//     });
//   }
// }
// makeNewTaskDo();

function makeNewTaskDo() {
  //modal
  const newTaskModalDo = document.querySelector(".new--task--modal--primary");
  const submitBotton = document.getElementById("addTaskSubmitBtn");
  const nameCountSpan = document.querySelectorAll("#nameInputTxt");
  const cancelBtn = document.getElementById("closeModalAddDo");
  //inputs
  const nameInput = newTaskModalDo
    ? newTaskModalDo.querySelector("#nameInput")
    : null;
  const startDateInput = document.getElementById("startDateDo");
  const finishDateInput = document.getElementById("finishDateDo");
  //overlay
  const overlay = document.querySelector(".blur--background--0-2");
  //tasks
  const primaryTasks = document.querySelector(".primary--tasks");
  const taskContainer = primaryTasks
    ? primaryTasks.querySelector(".tasks__column")
    : null;
  //descriptions
  const addNewTaskDescStart = document.getElementById("descriptionDoStart");
  const addNewTaskDescFinish = document.getElementById("descriptionDofinish");
  const addNewTaskDescName = document.getElementById("descriptionDoName");

  //helper functions
  function errorHandler(element, message) {
    element.classList.add("warning");
    element.innerHTML = message;
  }

  //helper functions
  function errorRemover(element) {
    element.classList.remove("warning");
  }

  if (overlay) {
    overlay.addEventListener("click", () => {
      errorRemover(addNewTaskDescFinish);
      errorRemover(addNewTaskDescStart);
      errorRemover(addNewTaskDescName);
      addNewTaskDescFinish.innerHTML =
        'Tap the <i class="fa-regular fa-calendar"></i> icon to choose a date';
      addNewTaskDescName.innerHTML = "Place a text here for description";
      addNewTaskDescStart.innerHTML =
        'Tap the <i class="fa-regular fa-calendar"></i> icon to choose a date';
    });
  }
  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      errorRemover(addNewTaskDescFinish);
      errorRemover(addNewTaskDescStart);
      errorRemover(addNewTaskDescName);
      addNewTaskDescFinish.innerHTML =
        'Tap the <i class="fa-regular fa-calendar"></i> icon to choose a date';
      addNewTaskDescName.innerHTML = "Place a text here for description";
      addNewTaskDescStart.innerHTML =
        'Tap the <i class="fa-regular fa-calendar"></i> icon to choose a date';
    });
  }

  if (taskContainer) {
    taskContainer.addEventListener("click", (e) => {
      const label = e.target.closest(".checkbox--primary");
      if (!label) return;

      e.preventDefault();
      const input = label.querySelector('input[type="checkbox"]');
      input.checked = !input.checked;
    });
  }

  if (submitBotton) {
    submitBotton.addEventListener("click", (e) => {
      const name = nameInput.value;
      const startDate = startDateInput.value;
      const finishDate = finishDateInput.value;

      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

      let hasError = false;

      //error handler
      if (startDate == "") {
        errorHandler(
          addNewTaskDescStart,
          "This field cannot be empty. Please select a date.",
        );
        hasError = true;
      } else if (!dateRegex.test(startDate)) {
        errorHandler(addNewTaskDescStart, "Please choose a valid date.");
        hasError = true;
      } else {
        errorRemover(addNewTaskDescStart);
        addNewTaskDescStart.innerHTML = "";
      }

      if (finishDate == "") {
        errorHandler(
          addNewTaskDescFinish,
          "This field cannot be empty. Please select a date.",
        );
        hasError = true;
      } else if (!dateRegex.test(finishDate)) {
        errorHandler(addNewTaskDescFinish, "Please choose a valid date.");
        hasError = true;
      } else {
        errorRemover(addNewTaskDescFinish);
        addNewTaskDescFinish.innerHTML = "";
      }

      if (name == "") {
        errorHandler(addNewTaskDescName, "Name cannot be empty.");
        hasError = true;
      } else {
        errorRemover(addNewTaskDescName);
        addNewTaskDescName.innerHTML = "";
      }

      if (hasError) return;

      //make the task
      const tasksRow = document.createElement("div");
      tasksRow.className = "tasks__row";
      tasksRow.innerHTML = `
              <span>${name}</span>
              <span>${startDate}</span>
              <span>${finishDate}</span>
              <label class="checkbox--primary">
                <input class="checkbox__input" type="checkbox" />
                <span class="checkbox__box"></span>
              </label>
               
  `;

      //append the task that we made to the row
      taskContainer.append(tasksRow);

      //back to defualt
      nameInput.value = "";
      startDateInput.value = "";
      finishDateInput.value = "";
      nameCountSpan.forEach((span) => {
        span.textContent = 50;
      });

      addNewTaskDescFinish.innerHTML =
        'Tap the <i class="fa-regular fa-calendar"></i> icon to choose a date';
      addNewTaskDescName.innerHTML = "Place a text here for description";
      addNewTaskDescStart.innerHTML =
        'Tap the <i class="fa-regular fa-calendar"></i> icon to choose a date';

      newTaskModalDo.classList.remove("show");
      overlay.classList.remove("show");
    });
  }
}
makeNewTaskDo();

function login() {
  //loginform
  const loginForm = document.querySelector(".login--form");
  if (!loginForm) return;
  // inputs
  const emailInput = document.getElementById("emailInputLogin");
  const passwordInputLogin = document.getElementById("passwordInputLogin");
  const rememberMeLogin = document.getElementById("rememberMeLogin");

  // buttons
  const submitBtnLogin = document.getElementById("submitBtnLogin");
  const eyeBtn = document.getElementById("eyeBtn");

  // descriptions
  const passwordDesc = document.getElementById("PasswordDesc");
  const emailDesc = document.getElementById("emailDesc");

  if (!window.location.pathname.endsWith("login.html")) return;

  // helper functions
  function errorHandling(element, message) {
    element.innerHTML = message;
    element.classList.add("warning");
  }

  function errorClear(element) {
    element.innerHTML = "";
    element.classList.remove("warning");
  }

  function clearAllErrors() {
    errorClear(emailDesc);
    errorClear(passwordDesc);
  }

  // eye button
  if (eyeBtn) {
    eyeBtn.addEventListener("click", () => {
      const isPassword = passwordInputLogin.type === "password";
      passwordInputLogin.type = isPassword ? "text" : "password";
      eyeBtn.innerHTML = isPassword
        ? '<i class="fa-regular fa-eye eye-noslash"></i>'
        : '<i class="fa-regular fa-eye-slash eye-slash"></i>';
    });
  }

  if (submitBtnLogin) {
    submitBtnLogin.addEventListener("click", (e) => {
      e.preventDefault();
      clearAllErrors();

      const email = emailInput.value.trim();
      const password = passwordInputLogin.value.trim();
      const rememberMe = rememberMeLogin.checked;

      let hasError = false;

      // empty validation
      if (!email) {
        errorHandling(emailDesc, "Email cannot be empty.");
        hasError = true;
      }

      if (!password) {
        errorHandling(passwordDesc, "Password cannot be empty.");
        hasError = true;
      }

      if (hasError) return;

      // success
      if (rememberMe) {
        localStorage.setItem("isLoggedIn", "true");
      } else if (!rememberMe) {
        sessionStorage.setItem("isLoggedIn", "true");
      }

      //prevent multiple submit
      submitBtnLogin.disabled = true;
      submitBtnLogin.innerText = "Submitting...";

      //go to home
      loginForm.submit();
      window.location.href = "home.html";
    });
  }
}

login();

function signup() {
  const signupFormId = document.querySelector("#signupForm");
  if (!signupFormId) return;
  const signupForm = document.querySelector(".signup--form");
  //inputs
  const nameInput = document.getElementById("nameInput");
  const emailInput = document.getElementById("emailInput");
  const passwordInput = document.getElementById("passwordInput");
  const confrimPasswordInput = document.getElementById("confrimPasswordInput");
  //descriptions
  const nameDesc = document.getElementById("nameDesc");
  const emailDesc = document.getElementById("emailDesc");
  const passwordDesc = document.getElementById("passwordDesc");
  const confirmPasswordDesc = document.getElementById("confirmPasswordDesc");
  //btn
  const submitBtn = document.getElementById("submitBtn");
  const googleBtn = document.getElementById("googleBtn");
  const githubBtn = document.getElementById("githubBtn");
  const eyeBtns = document.querySelectorAll("#eyeBtn");

  //regexes
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

  //error handling
  function errorHandler(element, message) {
    element.classList.add("warning");
    element.innerHTML = message;
  }

  //error handling
  function errorRemover(element) {
    element.innerHTML = "";
    element.classList.remove("warning");
  }

  //eyebtn fn
  eyeBtns.forEach((eyeBtn) => {
    eyeBtn.addEventListener("click", () => {
      const input = eyeBtn
        .closest(".text--input--secondary")
        .querySelector("input");

      if (input.type === "password") {
        input.type = "text";
        eyeBtn.innerHTML = '<i class="fa-regular fa-eye"></i>';
      } else {
        input.type = "password";
        eyeBtn.innerHTML = '<i class="fa-regular fa-eye-slash"></i>';
      }
    });
  });

  //submitbtn
  if (submitBtn) {
    submitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      //input values
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const password1 = passwordInput.value.trim();
      const password2 = confrimPasswordInput.value.trim();

      let hasError = false;
      //name error handling
      if (!name) {
        errorHandler(nameDesc, "Name cannot be empty.");
        hasError = true;
      } else {
        errorRemover(nameDesc);
      }

      //email error handling
      if (!email) {
        errorHandler(emailDesc, "Email cannot be empty.");
        hasError = true;
      } else if (!emailRegex.test(email)) {
        errorHandler(
          emailDesc,
          "Please enter a valid email address. Example: user@example.com",
        );
        hasError = true;
      } else {
        errorRemover(emailDesc);
      }

      //password error handling
      if (!password1) {
        errorHandler(passwordDesc, "Password cannot be empty.");
        hasError = true;
      } else if (!passwordRegex.test(password1)) {
        errorHandler(
          passwordDesc,
          "Password must be at least 8 characters long and include uppercase, lowercase, number, and a special character.",
        );
        hasError = true;
      } else {
        errorRemover(passwordDesc);
      }

      if (!password2) {
        errorHandler(confirmPasswordDesc, "Confirm password cannot be empty.");
        hasError = true;
      } else if (password1 !== password2) {
        errorHandler(confirmPasswordDesc, "Passwords do not match.");
        hasError = true;
      } else {
        errorRemover(confirmPasswordDesc);
      }

      //error handling
      if (hasError) return;

      //prevent multiple submit
      submitBtn.disabled = true;
      submitBtn.innerText = "Submitting...";

      //go to home
      localStorage.setItem("isLoggedIn", "true");
      signupForm.submit();
      window.location.href = "home.html";
    });
  }
}
signup();

//this is just for frontend not for backend
function logout() {
  const logoutBtn = document.querySelector("#logout");
  const DeleteAccount = document.querySelector("#DeleteAccount");
  if (!logoutBtn) return;
  logoutBtn.addEventListener("click", () => {
    localStorage.setItem("isLoggedIn", "false");
    sessionStorage.setItem("isLoggedIn", "false");
    window.location.href = "home.html";
  });
  DeleteAccount.addEventListener("click", () => {
    localStorage.setItem("isLoggedIn", "false");
    sessionStorage.setItem("isLoggedIn", "false");
    window.location.href = "home.html";
  });
}
logout();

function ConditionalRenderingFn() {
  const isLoggedIn =
    sessionStorage.getItem("isLoggedIn") === "true" ||
    localStorage.getItem("isLoggedIn") === "true";

  //conditionaly rendering links

  //conditionaly rendering header
  const headerByCondition = document.getElementById("headerByCondition");

  if (!headerByCondition) return;
  const theAddress = window.location.pathname.split("/")[3].split(".")[0];
  const cap = theAddress.charAt(0).toUpperCase() + theAddress.slice(1);

  if (isLoggedIn) {
    headerByCondition.innerHTML = `<section class="header">
        <header>
          <h3>${cap}</h3>
          <i class="fa-solid fa-${
            theAddress == "about-us" ? "circle-info" : theAddress
          }"></i>
        </header>
        <div class="button_and_left_icon">
        <a href="./dashboard.html">
          <img src="../assets/images/trophy-pic/Goodies Happy Flame.png" alt="Goodies Happy Flame" />
        </a>
        </div>
      </section>`;
  } else {
    headerByCondition.innerHTML = `<section class="header">
        <header>
          <h3>${cap}</h3>
          <i class="fa-solid fa-${theAddress}"></i>
        </header>

        <a
        href="login.html"
        style="padding: 0 0; margin: 0 0; border: none; width: 160px"
        class="btn btn--video--bg"
      >
        <div class="btn__container">
          <div class="btn__text">
            <span>Login / Signup</span>
            <span class="btn__icon">
              <i class="fa-solid fa-user"></i>
            </span>
          </div>
        </div>

        <video class="btn__video" muted loop autoplay playsinline>
          <source
            src="../assets/video/primary-secondary/Last_one_i_rendred.mp4"
            type="video/mp4"
          />
          your browser doesent support video
        </video>
      </a>
      </section>`;
  }

  const trophyBtn = document.getElementById("trophyBtn");
  if (!trophyBtn) return;
  trophyBtn.href = isLoggedIn ? "trophy-details.html" : "signup.html";
}
ConditionalRenderingFn();

/* --------- live bg btn --------- */
const btn = document.querySelector(".btn--video--bg");

if (btn) {
  const video = document.querySelector(".btn--video--bg .btn__video");

  btn.addEventListener("mouseenter", () => {
    video.playbackRate = 3;
    console.log("button is here");
  });
  btn.addEventListener("mouseleave", () => {
    video.playbackRate = 1;
    console.log("button is here");
  });
}

//trippyes
const tooltips = document.querySelectorAll("[data-tooltip]");

if (tooltips.length > 0) {
  tippy(tooltips, {
    content(reference) {
      return reference.dataset.tooltip;
    },
    placement: "top",
    arrow: false,
    animation: "fade",
    theme: "natural",
  });
}

function accountSettingToggle() {
  const info__cards__btnbox = document.querySelector(".info--cards--btnbox");
  if (!info__cards__btnbox) return;
  const btn = info__cards__btnbox.querySelector("button");
  const xMark = info__cards__btnbox.querySelector("i");
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    info__cards__btnbox.classList.add("is_open");
    info__cards__btnbox.style.alignItems = "start";
  });
  xMark.addEventListener("click", () => {
    info__cards__btnbox.classList.remove("is_open");
    info__cards__btnbox.style.alignItems = "center";
  });
}
accountSettingToggle();

function changePassword() {
  //form
  const changePassword = document.querySelector("#changePassword");
  if (!changePassword) return;
  const changePassForm = document.querySelector(".password--reset--form");
  //inputs
  const inputs = changePassForm.querySelectorAll("input");
  //btns
  const submitBtn = changePassForm.querySelector("button");
  const eyeBtns = changePassForm.querySelectorAll("#eyeBtn");
  //descriptions
  const currentPasswordDesc = document.querySelector("#currentPasswordDesc");
  const newPasswordDesc = document.querySelector("#newPasswordDesc");
  const newPasswordConfrimDesc = document.querySelector(
    "#newPasswordConfrimDesc",
  );
  //regex
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  //functions
  function errorHandling(element, message) {
    element.classList.add("warning");
    element.innerHTML = message;
  }
  function errorRemover(element) {
    element.classList.remove("warning");
    element.innerHTML = "";
  }

  //eyebtns
  eyeBtns.forEach((eyeBtn) => {
    eyeBtn.addEventListener("click", () => {
      const input = eyeBtn
        .closest(".text--input--natural")
        .querySelector("input");

      if (input.type === "password") {
        input.type = "text";
        eyeBtn.innerHTML = '<i class="fa-regular fa-eye"></i>';
      } else {
        input.type = "password";
        eyeBtn.innerHTML = '<i class="fa-regular fa-eye-slash"></i>';
      }
    });
  });

  //submitbtn
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const currentPassword = inputs[0].value.trim();
    const newPassword = inputs[1].value.trim();
    const confirmNewPassword = inputs[2].value.trim();

    //error handling
    //currentPassword error handling
    let hasError = false;
    if (!currentPassword) {
      errorHandling(currentPasswordDesc, "Current password cannot be empty.");
      hasError = true;
    } else {
      errorRemover(currentPasswordDesc);
    }

    //newPassword error handling
    if (!newPassword) {
      errorHandling(newPasswordDesc, "New password cannot be empty.");
      hasError = true;
    } else if (!passwordRegex.test(newPassword)) {
      errorHandling(
        newPasswordDesc,
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.",
      );
      hasError = true;
    } else if (newPassword === currentPassword) {
      errorHandling(
        newPasswordDesc,
        "New password cannot be the same as current password.",
      );
      hasError = true;
    } else {
      errorRemover(newPasswordDesc);
    }

    //confirmNewPassword

    if (!confirmNewPassword) {
      errorHandling(
        newPasswordConfrimDesc,
        "Please confirm your new password.",
      );
      hasError = true;
    } else if (confirmNewPassword !== newPassword) {
      errorHandling(newPasswordConfrimDesc, "Passwords do not match.");
      hasError = true;
    } else {
      errorRemover(newPasswordConfrimDesc);
    }

    //if we had an error stop
    if (hasError) return;

    //user cant do multiple submit
    submitBtn.disabled = true;
    submitBtn.innerText = "Submitting...";

    //if we dont have an error continue
    changePassForm.submit();
    window.location.href = "home.html";
  });
}
changePassword();

function passwordResetConfirm() {
  //forms
  const resetPassword = document.querySelector("#resetPassword");
  if (!resetPassword) return;
  const resetPasswordForm = document.querySelector(".password--reset--form");
  //inputs
  const inputs = resetPasswordForm.querySelectorAll("input");

  //descriptions
  const passwordDesc = resetPasswordForm.querySelector("#password");
  const confirmPasswordDesc =
    resetPasswordForm.querySelector("#confirmPassword");
  //btns
  const submitBtn = resetPasswordForm.querySelector("button");
  const eyeBtns = resetPasswordForm.querySelectorAll("#eyeBtn");

  //regex
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

  //functions
  function errorHandling(element, message) {
    element.classList.add("warning");
    element.innerHTML = message;
  }
  function errorRemover(element) {
    element.classList.remove("warning");
    element.innerHTML = "";
  }

  eyeBtns.forEach((eyeBtn) => {
    eyeBtn.addEventListener("click", () => {
      const input = eyeBtn
        .closest(".text--input--natural")
        .querySelector("input");

      if (input.type === "password") {
        input.type = "text";
        eyeBtn.innerHTML = '<i class="fa-regular fa-eye"></i>';
      } else {
        input.type = "password";
        eyeBtn.innerHTML = '<i class="fa-regular fa-eye-slash"></i>';
      }
    });
  });

  //submitbtn
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    //inputs values
    const password = inputs[0].value.trim();
    const confirmPassword = inputs[1].value.trim();

    //error handling
    let hasError = false;

    if (!password) {
      errorHandling(passwordDesc, "password cannot be empty.");
      hasError = true;
    } else if (!passwordRegex.test(password)) {
      errorHandling(
        passwordDesc,
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.",
      );
      hasError = true;
    } else {
      errorRemover(passwordDesc);
    }

    if (!confirmPassword) {
      errorHandling(confirmPasswordDesc, "Confirm password cannot be empty.");
      hasError = true;
    } else if (confirmPassword !== password) {
      errorHandling(confirmPasswordDesc, "Passwords do not match.");
      hasError = true;
    } else {
      errorRemover(confirmPasswordDesc);
    }

    //if haserror true
    if (hasError) return;

    //user cant do multiple submit
    submitBtn.disabled = true;
    submitBtn.innerText = "Submitting...";

    //if we dont have an error continue
    resetPassword.submit();
  });
}
passwordResetConfirm();

function passwordReset() {
  //form
  const passwordResetConfirm = document.querySelector("#passwordResetConfirm");
  if (!passwordResetConfirm) return;
  const passwordResetConfirmForm = document.querySelector(
    ".password--reset--form",
  );
  //input
  const emailField = passwordResetConfirmForm.querySelector("input");
  //descriptions
  const emailDesc = passwordResetConfirmForm.querySelector("#emailDesc");
  //btn
  const submitBtn = passwordResetConfirmForm.querySelector("button");
  //regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //functions
  function errorHandling(element, message) {
    element.classList.add("warning");
    element.innerHTML = message;
  }
  function errorRemover(element) {
    element.classList.remove("warning");
    element.innerHTML = "";
  }

  //submitbtn
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const email = emailField.value.trim();
    console.log(email);

    //error handling
    let hasError = false;
    if (!email) {
      errorHandling(emailDesc, "Email cannot be empty.");
      hasError = true;
    } else if (!emailRegex.test(email)) {
      errorHandling(
        emailDesc,
        "Please enter a valid email address. Example: user@example.com",
      );
      hasError = true;
    } else {
      errorRemover(emailDesc);
    }

    //if we had error
    if (hasError) return;

    //user cant do multiple submit
    submitBtn.disabled = true;
    submitBtn.innerText = "Submitting...";

    //if we dont have an error continue
    passwordResetConfirmForm.submit();
    window.location.href = "password-reset-done-success.html";
  });
}
passwordReset();

//fn for category btns
function categoryButtons() {
  const btns = document.querySelectorAll(".small--buttons--v2");

  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const isActive = btn.classList.contains("active");

      //delete all active classes
      btns.forEach((b) => b.classList.remove("active"));

      //if there was no active add it
      if (!isActive) {
        btn.classList.add("active");
      }
    });
  });
}

categoryButtons();

function conditionalyRenderingDeleteModal() {
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";
  const isAuthenticatedSession =
    sessionStorage.getItem("isLoggedIn") === "true";
  const isLoggedIn = isAuthenticated || isAuthenticatedSession;
  const completeButtonDo = document.getElementById("completeTaskDo");
  if (!completeButtonDo) return;
  const completeButtonDont = document.getElementById("completeTaskDont");
  if (!isLoggedIn) {
    completeButtonDo.classList.add("hide");
    completeButtonDont.classList.add("hide");
  }
}
conditionalyRenderingDeleteModal();

function conditionalyRenderingTrophyPage() {
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";
  const isAuthenticatedSession =
    sessionStorage.getItem("isLoggedIn") === "true";
  const isLoggedIn = isAuthenticated || isAuthenticatedSession;
  const navbarItem = document.querySelectorAll(".navbar__item");
  const lastItem = navbarItem[navbarItem.length - 1];
  if (navbarItem.length === 0) return;

  if (!isLoggedIn) {
    lastItem.href = "login.html";
    console.log("not login");
  } else {
    lastItem.href = "trophy.html";
    console.log("login");
  }
}
conditionalyRenderingTrophyPage();
