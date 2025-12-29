console.log("script is runing");

/* --------- live bg btn --------- */
const btn = document.querySelector(".btn--video--bg");

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".btn--video--bg");
  if (btn) {
    const video = btn.querySelector(".btn__video");
    btn.addEventListener("mouseenter", () => {
      video.playbackRate = 3;
    });
    btn.addEventListener("mouseleave", () => {
      video.playbackRate = 1;
    });
  }
});

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
    ".calendar--primary button:not(.inactive)"
  );
  const activeDaysDont = calendarDays.querySelectorAll(
    ".calendar--secoundry button:not(.inactive)"
  );
  const overlay = document.querySelector(".blur--background--0-1");
  const calendarDo = document.querySelector(".calendar--primary");
  const calendarDont = document.querySelector(".calendar--secoundry");

  activeDaysDo.forEach((btn) => {
    btn.addEventListener("click", () => {
      const day = btn.textContent;
      const formattedDate = `${year}-${month + 1}-${day.padStart(2, "0")}`;

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
      const formattedDate = `${year}-${month + 1}-${day.padStart(2, "0")}`;

      console.log(activeInputDont);
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
      responsive: false,
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
    })
  );
}

charts.forEach((char) => chartsFn(char));

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
    ".new--task--modal--secoundry"
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
    ".primary--delete--task--modal"
  );
  const overlay = document.querySelector(".blur--background--0-2");
  //logged in and sign up
  const primaryTasks = document.querySelector(".primary--tasks");

  const checkboxInput = primaryTasks.querySelectorAll(
    ".checkbox__input:checked"
  );

  const checkboxInputParrent = [...checkboxInput].map((checkbox) =>
    checkbox.closest("div")
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
  //local storage
  localStorage.setItem("dontAskAgainDelete", `${dontAskAgainDelete.checked}`);
  //delete tasks
  checkboxInputParrent.forEach((div) => div.remove());
  //dont show the modal
  deleteTaskModal.classList.remove("show");
  overlay.classList.remove("show");
}
if (document.getElementById("deleteTaskDont")) {
  document.getElementById("deleteTaskDont").addEventListener("click", () => {
    const dontAskAgainDelete = document.getElementById(
      "dontAskAgainDeleteDont"
    );

    // save only when modal is opened and user clicks delete
    localStorage.setItem(
      "dontAskAgainDeleteDont",
      `${dontAskAgainDelete.checked}`
    );

    deleteTaskDont();
  });
}

//openDeleteTasks
function deleteTasksModalToggleDo() {
  //toggle to delete task
  const deleteTaskModal = document.querySelector(
    ".primary--delete--task--modal"
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
        "tasksThatShouldBeDeleted"
      );
      const tasksThatShouldBeDeletedUl =
        tasksThatShouldBeDeletedDiv.querySelector("ul");
      let tasksThatShouldBeDeletedP =
        tasksThatShouldBeDeletedDiv.querySelector("p");

      let tasksThatShouldBeDeleted = "";
      //getting the tasks
      const primaryTasks = document.querySelector(".primary--tasks");
      const checkboxInput = primaryTasks.querySelectorAll(
        ".checkbox__input:checked"
      );
      const checkboxInputNotChecked =
        primaryTasks.querySelectorAll(".checkbox__input");
      //getting the tasks parrent
      const checkboxInputParrent = [...checkboxInput].map((checkbox) =>
        checkbox.closest("div")
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
      tasksThatShouldBeDeletedP.innerHTML = `Tasks to be deleted (showing ${checkboxInput.length} of ${checkboxInputNotChecked.length}):`;

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
    ".secondary--delete--task--modal"
  );
  const overlay = document.querySelector(".blur--background--0-2");
  //logged in and sign up
  const primaryTasks = document.querySelector(".secondary--tasks");

  const checkboxInput = primaryTasks.querySelectorAll(
    ".checkbox__input:checked"
  );

  const checkboxInputParrent = [...checkboxInput].map((checkbox) =>
    checkbox.closest("div")
  );
  const tasksName = checkboxInputParrent.map((div) => {
    return div.querySelector("span").textContent.trim();
  });
  //btns
  const dontAskAgainDelete = document.getElementById("dontAskAgainDeleteDont");

  //if tasks was zero retutn and do nothing
  if (tasksName.length == 0) {
    return;
  }
  //local storage
  localStorage.setItem(
    "dontAskAgainDeleteDont",
    `${dontAskAgainDelete.checked}`
  );
  //delete tasks
  checkboxInputParrent.forEach((div) => div.remove());
  //dont show the modal
  deleteTaskModal.classList.remove("show");
  overlay.classList.remove("show");
}
if (document.getElementById("deleteTaskDo")) {
  document.getElementById("deleteTaskDo").addEventListener("click", () => {
    const dontAskAgainDelete = document.getElementById("dontAskAgainDelete");

    // save only when modal is opened and user clicks delete
    localStorage.setItem("dontAskAgainDelete", `${dontAskAgainDelete.checked}`);

    deleteTaskDo();
  });
}

function deleteTasksModalToggleDont() {
  const deleteTaskModal = document.querySelector(
    ".secondary--delete--task--modal"
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
        "tasksThatShouldBeDeletedDont"
      );
      const tasksThatShouldBeDeletedUl =
        tasksThatShouldBeDeletedDiv.querySelector("ul");
      let tasksThatShouldBeDeletedP =
        tasksThatShouldBeDeletedDiv.querySelector("p");

      let tasksThatShouldBeDeleted = "";
      //getting the tasks
      const primaryTasks = document.querySelector(".secondary--tasks");
      const checkboxInput = primaryTasks.querySelectorAll(
        ".checkbox__input:checked"
      );
      const checkboxInputNotChecked =
        primaryTasks.querySelectorAll(".checkbox__input");
      //getting the tasks parrent
      const checkboxInputParrent = [...checkboxInput].map((checkbox) =>
        checkbox.closest("div")
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
      tasksThatShouldBeDeletedP.innerHTML = `Tasks to be deleted (showing ${checkboxInput.length} of ${checkboxInputNotChecked.length}):`;

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
    ".new--task--modal--secoundry"
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
          "This field cannot be empty. Please select a date."
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
          "This field cannot be empty. Please select a date."
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
      newTaskModalDont.submit();
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
          "This field cannot be empty. Please select a date."
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
          "This field cannot be empty. Please select a date."
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
      newTaskModalDo.submit();
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
  const loginForm = document.querySelector(".login--signup--form__content");
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

  if (!submitBtnLogin) return;

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

      loginForm.submit();
      
    });
  }
}

login();

function signup() {
  //inputs
  const nameInput = document.getElementById("nameInput");
  const emailInput = document.getElementById("emailInput");
  const passwordInput = document.getElementById("passwordInput");
  //descriptions
  const nameDesc = document.getElementById("nameDesc");
  const emailDesc = document.getElementById("emailDesc");
  const passwordDesc = document.getElementById("passwordDesc");
  //btn
  const submitBtn = document.getElementById("submitBtn");
  const googleBtn = document.getElementById("googleBtn");
  const githubBtn = document.getElementById("githubBtn");
  const eyeBtn = document.getElementById("eyeBtn");
  const rememberMeInput = document.getElementById("rememberMeSignup");

  //regexes
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  //haserror

  //checks if the page is signup
  if (!window.location.pathname.endsWith("signup.html")) {
    return;
  }

  //error handling
  function errorHandler(element, message) {
    element.classList.add("warning");
    element.innerHTML = message;
  }

  //error handling
  function errorRemover(element) {
    element.classList.remove("warning");
  }

  //eyebtn fn
  if (eyeBtn) {
    eyeBtn.addEventListener("click", () => {
      if (passwordInput.type == "password") {
        passwordInput.type = "text";
        eyeBtn.innerHTML = '<i class="fa-regular fa-eye eye-noslash"></i>';
      } else if (passwordInput.type == "text") {
        eyeBtn.innerHTML = '<i class="fa-regular fa-eye-slash eye-slash"></i>';
        passwordInput.type = "password";
      }
    });
  }

  //submitbtn
  if (submitBtn) {
    submitBtn.addEventListener("click", () => {
      //input values
      const name = nameInput.value;
      const email = emailInput.value;
      const password = passwordInput.value;
      const rememberMe = rememberMeInput.checked;

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
          "Please enter a valid email address. Example: user@example.com"
        );
        hasError = true;
      } else if (
        email === localStorage.getItem("email") ||
        email === sessionStorage.getItem("email")
      ) {
        errorHandler(emailDesc, "You already have an account");
        hasError = true;
      } else {
        errorRemover(emailDesc);
      }

      //password error handling
      if (!password) {
        errorHandler(passwordDesc, "Password cannot be empty.");
        hasError = true;
      } else if (!passwordRegex.test(password)) {
        errorHandler(
          passwordDesc,
          "Password must be at least 8 characters long and include uppercase, lowercase, number, and a special character."
        );
        hasError = true;
      } else {
        passwordDesc.innerHTML = "";
        errorRemover(passwordDesc);
      }

      //error handling
      if (hasError) return;

      //if everything was ok set the keys and values
      if (rememberMe) {
        localStorage.setItem("name", `${name}`);
        localStorage.setItem("password", `${password}`);
        localStorage.setItem("email", `${email}`);
        localStorage.setItem("isLoggedIn", "true");
      } else if (!rememberMe) {
        sessionStorage.setItem("name", `${name}`);
        sessionStorage.setItem("password", `${password}`);
        sessionStorage.setItem("email", `${email}`);
        sessionStorage.setItem("isLoggedIn", "true");
      }

      //go to home
      window.location.href = "home.html";
    });
  }
}
signup();

//we can use django conditional rendering insted
// function ConditionalRenderingFn() {
//   const isLoggedIn =
//     sessionStorage.getItem("isLoggedIn") === "true" ||
//     localStorage.getItem("isLoggedIn") === "true";

//   //conditionaly rendering links

//   //conditionaly rendering header
//   const headerByCondition = document.getElementById("headerByCondition");

//   console.log(window.location.pathname);
//   if (!headerByCondition) return;

//   const pathParts = window.location.pathname.split("/").filter(Boolean);
//   //what should icon be?
//   let whatShouldIconBe = "circle-question";
//   //if the address has 0 chars == home
//   let theAddress;
//   if (pathParts.length === 0) {
//     theAddress = "home";
//   } else if (pathParts.length > 0) {
//     theAddress = pathParts[pathParts.length - 1].split(".")[0];
//   }
//   //header icon
//   if (theAddress === "home") {
//     whatShouldIconBe = "home";
//   } else if (theAddress === "About-us") {
//     whatShouldIconBe = "circle-info";
//   } else if (theAddress === "Login" || theAddress === "sign-up") {
//     whatShouldIconBe = "user";
//   } else if (!isNaN(Number(theAddress))) {
//     whatShouldIconBe = "trophy";
//     theAddress = `Trophy details`;
//   } else if (theAddress === "trophies") {
//     whatShouldIconBe = "trophy";
//   }

//   //header h3
//   const cap = theAddress.charAt(0).toUpperCase() + theAddress.slice(1);
//   //getting login page link
//   const loginLink = document.getElementById("loginLink");
//   const loginUrl = loginLink.dataset.loginUrl;

//   if (isLoggedIn) {
//     headerByCondition.innerHTML = `<section class="header">
//         <header>
//           <h3>${cap}</h3>
//           <i class="fa-solid fa-${whatShouldIconBe}"></i>
//         </header>
        
//         <img src="/static/assets/images/trophy-pic/Goodies Happy Flame.png" alt="Goodies Happy Flame" />
        
//       </section>`;
//   } else {
//     headerByCondition.innerHTML = `<section class="header">
//         <header>
//           <h3>${cap}</h3>
//           <i class="fa-solid fa-${whatShouldIconBe}"></i>
//         </header>

//         <a href="${loginUrl}">
//           <button
//             style="padding: 0 0; margin: 0 0; border: none"
//             class="btn btn--video--bg"
//           >
//             <div class="btn__container">
//               <div class="btn__text">
//                 <span>Login / Signup</span>
//                 <span class="btn__icon">
//                   <i class="fa-solid fa-user"></i>
//                 </span>
//               </div>
//             </div>

//             <video class="btn__video" muted loop autoplay playsinline>
//               <source
//                 src="/static/assets/video/primary-secondary/Last_one_i_rendred.mp4"
//                 type="video/mp4"
//               />
//               your browser doesent support video
//             </video>
//           </button>
//         </a>
//       </section>`;
//   }

//   const trophyBtn = document.getElementById("trophyBtn");
//   if (!trophyBtn) return;
//   const trohpyDetailsUrl = trophyBtn.dataset.trohpydetailsUrl;
//   const signupUrl = trophyBtn.dataset.signupUrl;
//   trophyBtn.href = isLoggedIn ? trohpyDetailsUrl : signupUrl;
// }
// ConditionalRenderingFn();

function toast() {
  document.querySelectorAll(".toast").forEach((el) => {
    Toastify({
      text: el.dataset.text,
      duration: 4000,
      gravity: "top", // بالا
      position: "center", // وسط
      style: {
        background:
          el.dataset.type === "error"
            ? "#E7000B"
            : el.dataset.type === "success"
            ? "#00C950"
            : "#333",
        fontFamily: "Poppins, sans-serif",
        fontWeight: "400",
      },
    }).showToast();
  });
}
toast();
