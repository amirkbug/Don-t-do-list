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
//chart data out of chartdatael
const chartDataElement = document.getElementById("chart-data");

const chartData = chartDataElement
  ? JSON.parse(chartDataElement.textContent)
  : null;

function chartsFn(char, chartData) {
  //chart header
  const chartHeader = char.querySelector(".chart__header");
  //chart header span
  const span = chartHeader.querySelector("span");
  //get canvas for chart.js out of it
  const ctx = char.querySelector("canvas");
  const defaultLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  //default data for every chart
  let defaultData = [];
  if (char.classList.contains("chart--primary")) {
    if (span.classList.contains("neutral")) {
      defaultData = chartData.weekly.do.created;
    } else if (span.classList.contains("success")) {
      defaultData = chartData.weekly.do.completed;
    } else if (span.classList.contains("warning")) {
      defaultData = chartData.weekly.do.deleted;
    }
  } else if (char.classList.contains("chart--secoundry")) {
    if (span.classList.contains("neutral")) {
      defaultData = chartData.weekly.dont.created;
    } else if (span.classList.contains("success")) {
      defaultData = chartData.weekly.dont.completed;
    } else if (span.classList.contains("warning")) {
      defaultData = chartData.weekly.dont.deleted;
    }
  }
  //finding what should be the lable
  let chartLabel = "";
  if (char.classList.contains("chart--primary")) {
    if (span.classList.contains("neutral")) {
      chartLabel = "Do tasks that created";
    } else if (span.classList.contains("success")) {
      chartLabel = "Do tasks that completed";
    } else if (span.classList.contains("warning")) {
      chartLabel = "Do tasks that deleted";
    }
  } else if (char.classList.contains("chart--secoundry")) {
    if (span.classList.contains("neutral")) {
      chartLabel = "Dont tasks that created";
    } else if (span.classList.contains("success")) {
      chartLabel = "Dont tasks that completed";
    } else if (span.classList.contains("warning")) {
      chartLabel = "Dont tasks that deleted";
    }
  }
  //data we need for the datasets.data
  //make cahrt an instance to update it later
  const chartInstance = new Chart(ctx, {
    //type of chart
    type: "line",
    data: {
      //default for numbers in down
      labels: defaultLabels,
      datasets: [
        {
          label: chartLabel,
          //data that will replaced with api
          data: defaultData,
          borderWidth: 2,
          //color of the line (render it base on the chart)
          borderColor: char.classList.contains("chart--primary")
            ? "#9810fa"
            : "#4f39f6",
          //color of the bg points (render it base on the chart)
          backgroundColor: char.classList.contains("chart--primary")
            ? "#c27aff"
            : "#ffffff",
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
          beginAtZero: true,
          min: 0,
          max: 100,
          ticks: {
            stepSize: 10,
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
  let data = [];
  //change datalables base on the btn that user clicked
  buttons.forEach((btn) =>
    btn.addEventListener("click", () => {
      if (btn.textContent == "W") {
        dataLables = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        if (char.classList.contains("chart--primary")) {
          if (span.classList.contains("neutral")) {
            data = chartData.weekly.do.created;
          } else if (span.classList.contains("success")) {
            data = chartData.weekly.do.completed;
          } else if (span.classList.contains("warning")) {
            data = chartData.weekly.do.deleted;
          }
        } else if (char.classList.contains("chart--secoundry")) {
          if (span.classList.contains("neutral")) {
            data = chartData.weekly.dont.created;
          } else if (span.classList.contains("success")) {
            data = chartData.weekly.dont.completed;
          } else if (span.classList.contains("warning")) {
            data = chartData.weekly.dont.deleted;
          }
        }
      } else if (btn.textContent == "M") {
        const currentDate = new Date();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        const daysInMonth = new Date(year, month, 0).getDate();
        dataLables = Array.from({ length: daysInMonth }, (_, i) => i + 1);
        if (char.classList.contains("chart--primary")) {
          if (span.classList.contains("neutral")) {
            data = chartData.monthly.do.created;
          } else if (span.classList.contains("success")) {
            data = chartData.monthly.do.completed;
          } else if (span.classList.contains("warning")) {
            data = chartData.monthly.do.deleted;
          }
        } else if (char.classList.contains("chart--secoundry")) {
          if (span.classList.contains("neutral")) {
            data = chartData.monthly.dont.created;
          } else if (span.classList.contains("success")) {
            data = chartData.monthly.dont.completed;
          } else if (span.classList.contains("warning")) {
            data = chartData.monthly.dont.deleted;
          }
        }
      }
      console.log(dataLables.length);
      console.log(data.length);
      console.log(data);
      //update labels and upadate instance
      chartInstance.data.labels = dataLables;
      chartInstance.data.datasets[0].data = data;
      chartInstance.update();
    }),
  );
}

charts.forEach((char) => chartsFn(char, chartData));

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
  //get the hidden form for deleting tasks from database
  const deleteTasksFormDo = document.getElementById("deleteTasksFormDo");
  const deleteTasksFormDoMinus = document.getElementById(
    "deleteTasksFormDoMinus",
  );
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
    checkbox.closest(".tasks__row"),
  );
  const tasksName = checkboxInputParrent.map((div) => {
    return div.querySelector("span").textContent.trim();
  });
  //get task ids
  const taskIdsDo = checkboxInputParrent.map((div) => div.dataset.id);

  //btns
  const dontAskAgainDelete = document.getElementById("dontAskAgainDelete");
  //django
  const taskContainerdiv = document.querySelector(".tasks__container");
  const isAuthenticated = taskContainerdiv
    ? taskContainerdiv.dataset.auth === "true"
    : null;
  //if tasks was zero retutn and do nothing
  if (tasksName.length == 0) {
    return;
  }

  //localstorage delete
  if (!isAuthenticated) {
    const guestTasks = JSON.parse(localStorage.getItem("guestTasks") || "[]");

    const filteredTasks = guestTasks.filter(
      (task) => !taskIdsDo.includes(task.id),
    );

    localStorage.setItem("guestTasks", JSON.stringify(filteredTasks));

    checkboxInputParrent.forEach((div) => {
      div.remove();
    });

    deleteTaskModal.classList.remove("show");
    overlay.classList.remove("show");

    return;
  }

  //base on ids put the inputs in form for deleting in database
  taskIdsDo.forEach((id) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = "selected_tasks";
    input.value = id;
    deleteTasksFormDo.appendChild(input);
  });
  if (isAuthenticated) {
    deleteTasksFormDo.submit();
  }
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
      tasksThatShouldBeDeletedP.innerHTML = `Selected tasks (showing ${checkboxInput.length} of ${checkboxInputNotChecked.length}):`;

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
  //get the hidden form for deleting tasks from database
  const deleteTasksFormDont = document.getElementById("deleteTasksFormDont");
  const deleteTasksFormDontMinus = document.getElementById(
    "deleteTasksFormDontMinus",
  );
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
  //btns
  const dontAskAgainDelete = document.getElementById("dontAskAgainDeleteDont");

  //take tasks ids
  const tasksIdsDont = checkboxInputParrent.map((div) => div.dataset.id);

  //django
  const taskContainerdiv = document.querySelector(".tasks__container");
  const isAuthenticated = taskContainerdiv
    ? taskContainerdiv.dataset.auth === "true"
    : null;

  //if tasks was zero retutn and do nothing
  if (tasksName.length == 0) {
    return;
  }

  //localstorage delete
  if (!isAuthenticated) {
    const guestTasks = JSON.parse(localStorage.getItem("guestTasks") || "[]");

    const filteredTasks = guestTasks.filter(
      (task) => !tasksIdsDont.includes(task.id),
    );

    localStorage.setItem("guestTasks", JSON.stringify(filteredTasks));

    checkboxInputParrent.forEach((div) => {
      div.remove();
    });

    deleteTaskModal.classList.remove("show");
    overlay.classList.remove("show");

    return;
  }

  //put the tasks in a form for deleting them
  tasksIdsDont.forEach((id) => {
    const input = document.createElement("input");
    input.name = "selected_tasks";
    input.type = "hidden";
    input.value = id;
    deleteTasksFormDont.append(input);
    if (isAuthenticated) {
      deleteTasksFormDont.submit();
    }
  });
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
      tasksThatShouldBeDeletedP.innerHTML = `Selected tasks (showing ${checkboxInput.length} of ${checkboxInputNotChecked.length}):`;

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
  const taskContainerdiv = document.querySelector(".tasks__container");
  const taskContainer = secoundryTasks
    ? secoundryTasks.querySelector(".tasks__column")
    : null;
  //descriptions
  const addNewTaskDescStart = document.getElementById("descriptionDontStart");
  const addNewTaskDescFinish = document.getElementById("descriptionDontfinish");
  const addNewTaskDescName = document.getElementById("descriptionDontName");

  //see the user if login or no
  const isAuthenticated = taskContainerdiv
    ? taskContainerdiv.dataset.auth === "true"
    : null;

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
        addNewTaskDescStart.innerHTML =
          'Tap the <i class="fa-regular fa-calendar"></i> icon to choose a date';
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
        addNewTaskDescFinish.innerHTML =
          'Tap the <i class="fa-regular fa-calendar"></i> icon to choose a date';
      }

      if (name == "") {
        errorHandler(addNewTaskDescName, "Name cannot be empthy");
        hasError = true;
      } else {
        errorRemover(addNewTaskDescName);
        addNewTaskDescName.innerHTML = "Place a text here for description";
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

        const input = label.querySelector('input[type="checkbox"]');
        input.checked = !input.checked;
      });

      if (!isAuthenticated) {
        //tasks in an object form
        const datasWeNeed = {
          id: crypto.randomUUID(),
          name,
          startDate,
          finishDate,
          type: "DONT",
        };
        //get the guest tasks in the localstorage
        const tasks = JSON.parse(localStorage.getItem("guestTasks") || "[]");

        if (tasks.length >= 5) {
          console.log(tasks.length);
          Toastify({
            text: "Guest accounts can create up to 5 tasks. Sign in to add more.",
            duration: 4000,
            gravity: "top", // بالا
            position: "center", // وسط
            style: {
              background: "#E7000B",
              fontFamily: "Poppins, sans-serif",
              fontWeight: "400",
            },
          }).showToast();
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

          return;
        }
        //push them into array of objects
        tasks.push(datasWeNeed);
        //set the tasks in localstorage
        localStorage.setItem("guestTasks", JSON.stringify(tasks));

        //load the tasks
        taskLoader(datasWeNeed);
      } else {
        taskContainer.append(tasksRow);
        newTaskModalDont.submit();
      }
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

function taskLoader(task) {
  //get where the tasks are
  const primaryTasks = document.querySelector(".primary--tasks");
  const secoundryTasks = document.querySelector(".secondary--tasks");
  //set the checkbox class
  const checkboxClass =
    task.type === "DO" ? "checkbox--primary" : "checkbox--secoundry";
  //get the right column for rendering tasks in
  const tasksContainer =
    task.type == "DO"
      ? primaryTasks.querySelector(".tasks__column")
      : secoundryTasks.querySelector(".tasks__column");
  //make the task row
  const taskRow = document.createElement("div");
  taskRow.className = "tasks__row";
  taskRow.dataset.id = task.id;
  taskRow.innerHTML = `
    <span>${task.name}</span>
    <span>${task.startDate}</span>
    <span>${task.finishDate}</span>
    <label class="${checkboxClass}">
      <input class="checkbox__input" type="checkbox" />
      <span class="checkbox__box"></span>
    </label>
  `;

  //append it to the column
  tasksContainer.append(taskRow);
}

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
  const taskContainerdiv = document.querySelector(".tasks__container");
  const taskContainer = primaryTasks
    ? primaryTasks.querySelector(".tasks__column")
    : null;
  //descriptions
  const addNewTaskDescStart = document.getElementById("descriptionDoStart");
  const addNewTaskDescFinish = document.getElementById("descriptionDofinish");
  const addNewTaskDescName = document.getElementById("descriptionDoName");

  //django
  const isAuthenticated = taskContainerdiv
    ? taskContainerdiv.dataset.auth === "true"
    : null;

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
        addNewTaskDescStart.innerHTML =
          'Tap the <i class="fa-regular fa-calendar"></i> icon to choose a date';
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
        addNewTaskDescFinish.innerHTML =
          'Tap the <i class="fa-regular fa-calendar"></i> icon to choose a date';
      }

      if (name == "") {
        errorHandler(addNewTaskDescName, "Name cannot be empty.");
        hasError = true;
      } else {
        errorRemover(addNewTaskDescName);
        addNewTaskDescName.innerHTML = "Place a text here for description";
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

      //prevent new checkbox from default behavior
      taskContainer.addEventListener("click", (e) => {
        const label = e.target.closest(".checkbox--primary");
        if (!label) return;

        const input = label.querySelector('input[type="checkbox"]');
        input.checked = !input.checked;
      });

      if (!isAuthenticated) {
        //tasks in an object form
        const datasWeNeed = {
          id: crypto.randomUUID(),
          name,
          startDate,
          finishDate,
          type: "DO",
        };
        //get the guest tasks in the localstorage
        const tasks = JSON.parse(localStorage.getItem("guestTasks") || "[]");
        if (tasks.length >= 5) {
          console.log(tasks.length);
          Toastify({
            text: "Guest accounts can create up to 5 tasks. Sign in to add more.",
            duration: 4000,
            gravity: "top", // بالا
            position: "center", // وسط
            style: {
              background: "#E7000B",
              fontFamily: "Poppins, sans-serif",
              fontWeight: "400",
            },
          }).showToast();
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

          return;
        }
        //push them into array of objects
        tasks.push(datasWeNeed);
        //set the tasks in localstorage
        localStorage.setItem("guestTasks", JSON.stringify(tasks));

        //load the tasks
        taskLoader(datasWeNeed);
      } else {
        taskContainer.append(tasksRow);
        newTaskModalDo.submit();
      }
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

function loadGuestTasks() {
  const tasks = JSON.parse(localStorage.getItem("guestTasks") || "[]");

  tasks.forEach((task) => {
    taskLoader(task);
  });
}

function login() {
  const loginFormId = document.querySelector("#loginForm");
  if (!loginFormId) return;
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

  //regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
      } else if (!emailRegex.test(email)) {
        errorHandling(
          emailDesc,
          "Please enter a valid email address. Example: user@example.com",
        );
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
    });
  }
}
signup();

function backInHistory() {
  //forms
  const loginFormId = document.querySelector("#loginForm");
  const signupFormId = document.querySelector("#signupForm");
  const dashboardId = document.querySelector("#dashboardId");
  //btn
  const headerRightIcon = document.querySelector("#header__right__icon");
  if (!headerRightIcon) return;
  headerRightIcon.addEventListener("click", () => {
    if (loginFormId || signupFormId || dashboardId) {
      window.location.href = "/";
    } else {
      window.history.back();
    }
  });
}
backInHistory();

//trippyes
const tooltips = document.querySelectorAll("[data-tooltip]");

if (tooltips.length > 0) {
  tippy("[data-tooltip]", {
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

function changePassword() {
  //form
  const changePassword = document.querySelector("#changePassword");
  if (!changePassword) return;
  const changePassForm = document.querySelector(".password--reset--form");
  //inputs
  const inputs = changePassForm.querySelectorAll("input");
  const confirmNewPassword = changePassForm.querySelector(
    "#confirmNewPassword",
  );
  const newPassword = changePassForm.querySelector("#newPassword");
  const currentPassword = changePassForm.querySelector("#currentPassword");
  //btns
  const submitBtn = changePassForm.querySelector("button");
  const eyeBtns = changePassForm.querySelectorAll(".eyeBtn");
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
    const currentPasswordValue = currentPassword.value.trim();
    const newPasswordValue = newPassword.value.trim();
    const confirmNewPasswordValue = confirmNewPassword.value.trim();

    //error handling
    //currentPassword error handling
    let hasError = false;
    if (!currentPasswordValue) {
      errorHandling(currentPasswordDesc, "Current password cannot be empty.");
      hasError = true;
    } else {
      errorRemover(currentPasswordDesc);
    }

    //newPassword error handling
    if (!newPasswordValue) {
      errorHandling(newPasswordDesc, "New password cannot be empty.");
      hasError = true;
    } else if (!passwordRegex.test(newPasswordValue)) {
      errorHandling(
        newPasswordDesc,
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.",
      );
      hasError = true;
    } else if (newPasswordValue === currentPasswordValue) {
      errorHandling(
        newPasswordDesc,
        "New password cannot be the same as current password.",
      );
      hasError = true;
    } else {
      errorRemover(newPasswordDesc);
    }

    //confirmNewPassword

    if (!confirmNewPasswordValue) {
      errorHandling(
        newPasswordConfrimDesc,
        "Please confirm your new password.",
      );
      hasError = true;
    } else if (confirmNewPasswordValue !== newPasswordValue) {
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
  });
}
changePassword();

function passwordReset() {
  //form
  const passwordResetConfirm = document.querySelector("#passwordResetConfirm");
  if (!passwordResetConfirm) return;
  const passwordResetConfirmForm = document.querySelector(
    ".password--reset--form",
  );
  //input
  const emailField = passwordResetConfirmForm.querySelector("#emailInput");
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
  });
}
passwordReset();

function passwordResetConfirm() {
  //forms
  const resetPassword = document.querySelector("#resetPassword");
  if (!resetPassword) return;
  const resetPasswordForm = document.querySelector(".password--reset--form");
  //inputs
  const newPassword = resetPasswordForm.querySelector("#newPassword");
  const confirmPassword = resetPasswordForm.querySelector("#confirmPassword");
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
    const passwordValue = newPassword.value.trim();
    const confirmPasswordValue = confirmPassword.value.trim();

    //error handling
    let hasError = false;

    if (!passwordValue) {
      errorHandling(passwordDesc, "password cannot be empty.");
      hasError = true;
    } else if (!passwordRegex.test(passwordValue)) {
      errorHandling(
        passwordDesc,
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.",
      );
      hasError = true;
    } else {
      errorRemover(passwordDesc);
    }

    if (!confirmPasswordValue) {
      errorHandling(confirmPasswordDesc, "Confirm password cannot be empty.");
      hasError = true;
    } else if (confirmPasswordValue !== passwordValue) {
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

//load the  tasks in the page
function loadTasksInPage() {
  const primaryTasks = document.querySelector(".primary--tasks");
  if (primaryTasks) {
    document.addEventListener("DOMContentLoaded", () => loadGuestTasks());
  }
}
loadTasksInPage();


//send tasks to django
// document.addEventListener("DOMContentLoaded", () => {
//   sendTasksToDjango();
// });
