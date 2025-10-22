const calendarData = {
  2028: {
    7: {
      30: [{ text: "돌봄/생활 ", color: "purple" }],
    },
    8: {
      2: [{ text: "돌봄/생활 ", color: "purple" }],
      4: [
        { text: "돌봄/생활 ", color: "purple" },
        { text: "교육/재능", color: "blue" },
      ],
      6: [
        { text: "돌봄/생활 ", color: "purple" },
        { text: "교육/재능", color: "blue" },
      ],
      8: [{ text: "교육봉사", color: "purple" }],
      10: [
        { text: "돌봄/생활 ", color: "purple" },
        { text: "교육/재능", color: "blue" },
      ],
      12: [{ text: "돌봄/생활 ", color: "purple" }],
      14: [{ text: "교육/재능", color: "green" }],
      18: [{ text: "환경/지역", color: "blue" }],
      20: [
        { text: "돌봄/생활 ", color: "purple" },
        { text: "교육/재능", color: "green" },
        { text: "환경/지역", color: "blue" },
      ],
      21: [{ text: "돌봄/생활", color: "purple" }],
      24: [{ text: "교육/재능", color: "blue" }],
      25: [{ text: "환경/지역", color: "blue" }],
      26: [
        { text: "돌봄/생활 ", color: "purple" },
        { text: "교육/재능", color: "green" },
        { text: "환경/지역", color: "blue" },
      ],
      28: [
        { text: "돌봄/생활 ", color: "purple" },
        { text: "교육/재능", color: "green" },
        { text: "환경/지역", color: "blue" },
      ],
      31: [{ text: "교육/재능", color: "green" }],
    },
    9: {
      1: [{ text: "환경/지역", color: "blue" }],
      30: [{ text: "돌봄/생활 ", color: "purple" }],
    },
  },
};

let currentYear = 2028;
let currentMonth = 8;

/** 이벤트 HTML 생성 함수 */
const createEventBadges = (events = [], isFaded = false) =>
  events
    .map(
      (e) =>
        `<div class="event-badge badge-${e.color} ${
          isFaded ? "faded" : ""
        }"></div>`
    )
    .join("");

/** 셀 HTML 생성 함수 */
const createCell = (
  day,
  isOtherMonth = false,
  events = [],
  isFaded = false
) => {
  const isTargetDate = currentYear === 2028 && currentMonth === 8 && day === 26;

  return `
    <td class="${isOtherMonth ? "other-month" : ""}">
      <div class="date-number ${
        isTargetDate ? "highlight-day" : ""
      }">${day}</div>
      ${createEventBadges(events, isFaded)}
    </td>
  `;
};

/** 달력 렌더링 함수 */
function generateCalendar(year, month) {
  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const prevMonthDays = new Date(year, month - 1, 0).getDate();

  let html = "";
  let day = 1;
  let nextDay = 1;

  for (let week = 0; week < 6; week++) {
    let rowHtml = "<tr>";
    for (let weekday = 0; weekday < 7; weekday++) {
      if (week === 0 && weekday < firstDay) {
        // 이전 달
        const prevDay = prevMonthDays - firstDay + weekday + 1;
        const prevEvents =
          calendarData?.[year]?.[month - 1]?.[prevDay] ||
          (month === 1
            ? calendarData?.[year - 1]?.[12]?.[prevDay]
            : undefined) ||
          [];
        rowHtml += createCell(prevDay, true, prevEvents, true);
      } else if (day > daysInMonth) {
        // 다음 달
        const nextEvents =
          calendarData?.[year]?.[month + 1]?.[nextDay] ||
          (month === 12
            ? calendarData?.[year + 1]?.[1]?.[nextDay]
            : undefined) ||
          [];
        rowHtml += createCell(nextDay++, true, nextEvents, true);
      } else {
        // 이번 달
        const events = calendarData?.[year]?.[month]?.[day] || [];
        rowHtml += createCell(day++, false, events);
      }
    }
    rowHtml += "</tr>";
    html += rowHtml;
    if (day > daysInMonth) break;
  }

  document.getElementById("calendarBody").innerHTML = html;
  document.getElementById("currentMonth").textContent = `${year} . ${String(
    month
  ).padStart(2, "0")}`;
}

/** 월 변경 함수 */
function changeMonth(direction) {
  currentMonth += direction;
  if (currentMonth < 1) {
    currentMonth = 12;
    currentYear--;
  } else if (currentMonth > 12) {
    currentMonth = 1;
    currentYear++;
  }
  generateCalendar(currentYear, currentMonth);
}

/** 초기화 */
document
  .getElementById("prevMonth")
  .addEventListener("click", () => changeMonth(-1));
document
  .getElementById("nextMonth")
  .addEventListener("click", () => changeMonth(1));
generateCalendar(currentYear, currentMonth);
