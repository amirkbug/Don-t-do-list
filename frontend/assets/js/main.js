console.log("script is runing");

/* --------- live bg btn --------- */
const btn = document.querySelector(".btn--video--bg");

if (btn) {
  const video = document.querySelector(".btn--video--bg .btn__video");

  btn.addEventListener("mouseenter", () => {
    video.playbackRate = 3;
  });
  btn.addEventListener("mouseleave", () => {
    video.playbackRate = 1;
  });
}

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
    calendarDaysHtml += `<button class="inactive">${endPrevMonth - i}</button>`;
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
    calendarDaysHtml += `<button${className}>${i}</button>`;
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
    calendarDaysHtml += `<button class="inactive">${i}</button>`;
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
  if (!newTaskModalDo) return;

  if (openModalDo && newTaskModalDo && overlay) {
    openModalDo.addEventListener("click", () => {
      newTaskModalDo.classList.add("show");
      overlay.classList.add("show");
    });
  }
  if (closeModalDo && newTaskModalDo && overlay) {
    closeModalDo.addEventListener("click", () => {
      newTaskModalDo.classList.remove("show");
      overlay.classList.remove("show");
    });
  }
  if (overlay && newTaskModalDo) {
    overlay.addEventListener("click", () => {
      newTaskModalDo.classList.remove("show");
      overlay.classList.remove("show");
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
  const openModalDont = document.getElementById("openModalAddDont");
  const closeModalDont = document.getElementById("closeModalAddDont");
  const overlay = document.querySelector(".blur--background--0-2");
  const inputs = newTaskModalDont.querySelectorAll("input");
  const nameInputTxt = newTaskModalDont.querySelector("#nameInputTxt");

  //check if they are there for not having error
  //treat them as a button whos add and remove classes
  if (openModalDont && newTaskModalDont && overlay) {
    openModalDont.addEventListener("click", () => {
      newTaskModalDont.classList.add("show");
      overlay.classList.add("show");
    });
  }
  if (closeModalDont && newTaskModalDont && overlay) {
    closeModalDont.addEventListener("click", () => {
      newTaskModalDont.classList.remove("show");
      overlay.classList.remove("show");
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

//openDeleteTasks
function deleteTasksModalToggleDo() {
  const deleteTaskModal = document.querySelector(
    ".primary--delete--task--modal"
  );
  if (!deleteTaskModal) return;
  const openDeleteModalDo = document.getElementById("openDeleteModalDo");
  const closeDeleteModalDo = document.getElementById("closeDeleteModalDo");
  const overlay = document.querySelector(".blur--background--0-2");

  if (deleteTaskModal && openDeleteModalDo && overlay) {
    openDeleteModalDo.addEventListener("click", () => {
      deleteTaskModal.classList.add("show");
      overlay.classList.add("show");
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
      deleteTaskModal.classList.add("show");
      overlay.classList.add("show");
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
deleteTasksModalToggleDo();
deleteTasksModalToggleDont();

//open calendar modal
function calendarFunctionDo() {
  const calendarDo = document.querySelector(".calendar--primary");

  if (!calendarDo) return;
  const overlay = document.querySelector(".blur--background--0-1");
  const openCalendar = document.querySelectorAll("#openCalendarDo");

  openCalendar.forEach((btn) => {
    btn.addEventListener("click", () => {
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

function calendarFunctionDont() {
  const clenderDont = document.querySelector(".calendar--secoundry");
  if (!clenderDont) return;
  const overlay = document.querySelector(".blur--background--0-1");
  const openCalendar = document.querySelectorAll("#openCalendarDont");

  openCalendar.forEach((btn) => {
    btn.addEventListener("click", () => {
      let rect = btn.getBoundingClientRect();
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

//input amount check
// function nameInputAmountCheck() {
//   const nameInput = document.getElementById("nameInput");
//   const nameCountSpan = document.getElementById("nameInputTxt");

//   nameInput.addEventListener("input", () => {
//     const remaining = 50 - nameInput.value.length;
//     nameCountSpan.textContent = remaining;
//   });
// }

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
