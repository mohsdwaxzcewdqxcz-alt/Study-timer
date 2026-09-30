// القواميس للغات
const i18n = {
  ar: {
    main_title: "مؤقت المذاكرة والواجب الورقي",
    select_subject: "اختر المادة للبدء",
    select_session_instruction: "اختر نوع الجلسة التي تريد البدء فيها:",
    btn_homework: "واجب (120 دقيقة)",
    btn_study: "مذاكرة درس",
    btn_summary: "تلخيص مادة",
    btn_back: "العودة للقائمة الرئيسية",
    label_time: "المدة بالدقائق (من 1 إلى 120 دقيقة):",
    btn_start: "ابدأ الجلسة",
    btn_cancel: "إلغاء",
    timer_instruction: "قم بالعمل في الكشكول/الورق الآن!",
    btn_finish: "انتهاء (أنهيت العمل)",
    btn_abort: "إلغاء / حذف التجربة",
    btn_home: "العودة للقائمة الرئيسية",
    history_title: "سجل الإنجازات والمذاكرة",
    btn_clear_all: "مسح الكل",
    empty_history: "لا يوجد سجلات مسجلة بعد",
    subject_prefix: "مادة: ",
    study_prefix: "مذاكرة ",
    summary_prefix: "تلخيص ",
    homework_prefix: "واجب ",
    setup_title: "إعداد جلسة {type}: {subject}",
    study_topic_label: "موضوع / اسم الدرس للمذاكرة:",
    summary_topic_label: "موضوع التلخيص (عن ماذا تلخص؟):",
    study_placeholder: "مثال: درس القراءة، القواعد، الفصل الأول...",
    summary_placeholder: "مثال: تلخيص القواعد، ملخص الدرس الأول...",
    untitled: "بدون عنوان",
    topic_label: "الموضوع: ",
    result_title_success: "أحسنت! أتممت {type} 🎉",
    result_title_failed: "انتهى الوقت! ⏰",
    result_msg_success: "لقد أنهيت {type} <strong>{subject}</strong> {topic} في زمن قدره:<br><br><span style='font-size: 1.4rem; color: #3182ce;'>{time}</span>",
    result_msg_failed: "لم تتمكن من إنهاء {type} <strong>{subject}</strong> خلال الوقت المحدد ({minutes} دقيقة).<br>يرجى الإعادة والتجربة مرة أخرى!",
    time_taken_str: "{mins} دقيقة و {secs} ثانية",
    time_expired_str: "انتهى الوقت ({minutes} دقيقة)",
    completed_in: "تم الإنجاز في: ",
    status_failed: "الحالة: ",
    delete_btn: "حذف",
    confirm_clear_all: "هل أنت تأكد من مسح جميع السجلات؟",
    type_homework: "واجب",
    type_study: "مذاكرة",
    type_summary: "تلخيص",
    subjects: {
      english: "اللغة الإنجليزية",
      history: "التاريخ",
      programming: "البرمجة",
      arabic: "اللغة العربية"
    }
  },
  en: {
    main_title: "Study & Homework Timer",
    select_subject: "Select a Subject to Start",
    select_session_instruction: "Choose session type:",
    btn_homework: "Homework (120 min)",
    btn_study: "Study Lesson",
    btn_summary: "Summarize",
    btn_back: "Back to Main Menu",
    label_time: "Duration in minutes (1 to 120):",
    btn_start: "Start Session",
    btn_cancel: "Cancel",
    timer_instruction: "Work on your notebook/paper now!",
    btn_finish: "Finish (Task Completed)",
    btn_abort: "Cancel / Reset",
    btn_home: "Back to Main Menu",
    history_title: "Study & History Log",
    btn_clear_all: "Clear All",
    empty_history: "No history recorded yet",
    subject_prefix: "Subject: ",
    study_prefix: "Studying ",
    summary_prefix: "Summarizing ",
    homework_prefix: "Homework - ",
    setup_title: "Setup {type} Session: {subject}",
    study_topic_label: "Topic / Lesson Title:",
    summary_topic_label: "Summary Topic:",
    study_placeholder: "e.g., Grammar, Chapter 1...",
    summary_placeholder: "e.g., Summary of Unit 1...",
    untitled: "Untitled",
    topic_label: "Topic: ",
    result_title_success: "Great Job! Finished {type} 🎉",
    result_title_failed: "Time's Up! ⏰",
    result_msg_success: "You finished {type} for <strong>{subject}</strong> {topic} in:<br><br><span style='font-size: 1.4rem; color: #3182ce;'>{time}</span>",
    result_msg_failed: "You could not finish {type} for <strong>{subject}</strong> within the allotted time ({minutes} min).<br>Try again!",
    time_taken_str: "{mins} min and {secs} sec",
    time_expired_str: "Time expired ({minutes} min)",
    completed_in: "Completed in: ",
    status_failed: "Status: ",
    delete_btn: "Delete",
    confirm_clear_all: "Are you sure you want to clear all history?",
    type_homework: "Homework",
    type_study: "Study",
    type_summary: "Summary",
    subjects: {
      english: "English",
      history: "History",
      programming: "Programming",
      arabic: "Arabic"
    }
  }
};

const SUBJECT_KEYS = [
  { id: 'english', key: 'english' },
  { id: 'history', key: 'history' },
  { id: 'programming', key: 'programming' },
  { id: 'arabic', key: 'arabic' }
];

let timerInterval = null;
let secondsElapsed = 0;
let selectedSubjectKey = "arabic";
let sessionType = "واجب"; // "واجب" / "تلخيص" / "مذاكرة"
let currentTopic = "";
let allottedMinutes = 120;
let currentLang = "ar";

const $ = (id) => document.getElementById(id);
const historyList = $('history-list');

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initLanguage();
  renderSubjectButtons();
  renderHistory();
});

// إدارة الثيم
function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
}

// إدارة اللغة
function initLanguage() {
  currentLang = localStorage.getItem("lang") || "ar";
  applyLanguage(currentLang);
}

function toggleLanguage() {
  currentLang = currentLang === "ar" ? "en" : "ar";
  localStorage.setItem("lang", currentLang);
  applyLanguage(currentLang);
}

function applyLanguage(lang) {
  document.documentElement.setAttribute("lang", lang);
  document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
  $('lang-btn-text').textContent = lang === "ar" ? "EN" : "عربي";

  // ترجمة النصوص الثابتة
  document.querySelectorAll('[data-i18n]').forEach(elem => {
    const key = elem.getAttribute('data-i18n');
    if (i18n[lang][key]) {
      elem.textContent = i18n[lang][key];
    }
  });

  renderSubjectButtons();
  renderHistory();
}

function getSubjectName(key) {
  return i18n[currentLang].subjects[key] || key;
}

function getTranslatedType(type) {
  if (type === 'مذاكرة' || type === 'Study') return i18n[currentLang].type_study;
  if (type === 'تلخيص' || type === 'Summary') return i18n[currentLang].type_summary;
  return i18n[currentLang].type_homework;
}

// عرض أزرار المواد
function renderSubjectButtons() {
  const grid = $('subjects-grid');
  grid.innerHTML = SUBJECT_KEYS.map(item => 
    `<button class="btn subject-btn" onclick="handleSubjectClick('${item.key}')">${getSubjectName(item.key)}</button>`
  ).join('');
}

function handleSubjectClick(subjectKey) {
  selectedSubjectKey = subjectKey;
  $('selected-subject-title').textContent = `${i18n[currentLang].subject_prefix}${getSubjectName(selectedSubjectKey)}`;
  showScreen('session-type-screen');
}

// بدء واجب
function startHomeworkSession() {
  startTask(selectedSubjectKey, 120, 'واجب');
}

// إعداد خيار المذاكرة أو التلخيص
function showCustomSetup(type) {
  sessionType = type;
  const translatedType = getTranslatedType(type);
  const subjName = getSubjectName(selectedSubjectKey);
  
  $('custom-setup-title').textContent = i18n[currentLang].setup_title
    .replace('{type}', translatedType)
    .replace('{subject}', subjName);

  if (type === 'مذاكرة') {
    $('custom-topic-label').textContent = i18n[currentLang].study_topic_label;
    $('custom-topic').placeholder = i18n[currentLang].study_placeholder;
  } else {
    $('custom-topic-label').textContent = i18n[currentLang].summary_topic_label;
    $('custom-topic').placeholder = i18n[currentLang].summary_placeholder;
  }

  $('custom-topic').value = "";
  $('custom-time').value = "60";
  showScreen('custom-setup-screen');
}

// تأكيد البدء
function confirmCustomStart() {
  const topicInput = $('custom-topic').value.trim();
  let timeInput = parseInt($('custom-time').value);

  if (!timeInput || timeInput < 1) timeInput = 1;
  if (timeInput > 120) timeInput = 120;

  const topic = topicInput !== "" ? topicInput : i18n[currentLang].untitled;
  startTask(selectedSubjectKey, timeInput, sessionType, topic);
}

// التنقل بين الواجهات
function showScreen(screenId) {
  document.querySelectorAll('.view-screen').forEach(s => s.classList.add('hidden'));
  $(screenId).classList.remove('hidden');
}

// تشغيل العداد
function startTask(subjectKey, minutes = 120, type = 'واجب', topic = '') {
  sessionType = type;
  currentTopic = topic;
  allottedMinutes = minutes;
  secondsElapsed = 0;
  let totalSeconds = minutes * 60;

  const translatedType = getTranslatedType(type);
  $('current-subject-title').textContent = `${translatedType} - ${getSubjectName(subjectKey)}`;
  
  const detailElem = $('timer-topic-detail');
  if (topic) {
    detailElem.textContent = `${i18n[currentLang].topic_label}${topic}`;
    detailElem.classList.remove('hidden');
  } else {
    detailElem.classList.add('hidden');
  }

  updateTimerDisplay(totalSeconds);
  showScreen('timer-screen');

  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    totalSeconds--;
    secondsElapsed++;
    updateTimerDisplay(totalSeconds);

    if (totalSeconds <= 0) {
      clearInterval(timerInterval);
      completeTask(false);
    }
  }, 1000);
}

function updateTimerDisplay(seconds) {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  $('timer-display').textContent = `${mins}:${secs}`;
}

function cancelTask() {
  clearInterval(timerInterval);
  showScreen('subject-selection');
}

function finishTask() {
  clearInterval(timerInterval);
  completeTask(true);
}

// النتيجة وإغلاق الجلسة
function completeTask(isSuccess) {
  const minsTaken = Math.floor(secondsElapsed / 60);
  const secsTaken = secondsElapsed % 60;
  
  const timeStr = i18n[currentLang].time_taken_str
    .replace('{mins}', minsTaken)
    .replace('{secs}', secsTaken);

  const translatedType = getTranslatedType(sessionType);
  const subjName = getSubjectName(selectedSubjectKey);

  $('result-title').textContent = isSuccess 
    ? i18n[currentLang].result_title_success.replace('{type}', translatedType)
    : i18n[currentLang].result_title_failed;
  
  $('result-title').style.color = isSuccess ? "#38a169" : "#e53e3e";
  
  const topicFormatted = currentTopic ? `(${currentTopic})` : '';

  $('result-message').innerHTML = isSuccess 
    ? i18n[currentLang].result_msg_success
        .replace('{type}', translatedType)
        .replace('{subject}', subjName)
        .replace('{topic}', topicFormatted)
        .replace('{time}', timeStr)
    : i18n[currentLang].result_msg_failed
        .replace('{type}', translatedType)
        .replace('{subject}', subjName)
        .replace('{minutes}', allottedMinutes);

  saveHistoryRecord(
    selectedSubjectKey,
    sessionType,
    currentTopic,
    isSuccess ? timeStr : i18n[currentLang].time_expired_str.replace('{minutes}', allottedMinutes),
    isSuccess
  );
  showScreen('result-screen');
}

function getFormattedDate() {
  const d = new Date();
  const dateStr = `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`;
  let hours = d.getHours();
  const mins = String(d.getMinutes()).padStart(2, '0');
  const period = hours >= 12 ? (currentLang === 'ar' ? 'م' : 'PM') : (currentLang === 'ar' ? 'ص' : 'AM');
  hours = hours % 12 || 12;
  return `${dateStr} - ${hours}:${mins} ${period}`;
}

function getHistory() {
  return JSON.parse(localStorage.getItem("homework_history") || "[]");
}

function saveHistoryRecord(subjectKey, type, topic, timeText, isSuccess) {
  const history = getHistory();
  history.unshift({
    id: Date.now(),
    subjectKey,
    type,
    topic,
    timeText,
    dateText: getFormattedDate(),
    isSuccess
  });
  localStorage.setItem("homework_history", JSON.stringify(history));
  renderHistory();
}

function deleteHistoryRecord(id) {
  const history = getHistory().filter(item => item.id !== id);
  localStorage.setItem("homework_history", JSON.stringify(history));
  renderHistory();
}

function clearAllHistory() {
  if (confirm(i18n[currentLang].confirm_clear_all)) {
    localStorage.removeItem("homework_history");
    renderHistory();
  }
}

// عرض السجل الجانبي
function renderHistory() {
  const history = getHistory();
  if (history.length === 0) {
    historyList.innerHTML = `<li class="empty-msg">${i18n[currentLang].empty_history}</li>`;
    return;
  }

  historyList.innerHTML = history.map(item => {
    const subjName = getSubjectName(item.subjectKey || 'arabic');
    const typeTranslated = getTranslatedType(item.type || 'واجب');
    const statusPrefix = item.isSuccess ? i18n[currentLang].completed_in : i18n[currentLang].status_failed;

    return `
      <li class="history-item ${item.isSuccess ? '' : 'failed'}">
        <div class="history-info">
          <div class="subject-name">${subjName} (${typeTranslated})</div>
          ${item.topic ? `<div class="topic-info">📖 ${item.topic}</div>` : ''}
          <div class="time-info">${statusPrefix}${item.timeText}</div>
          <div class="date-info">📅 ${item.dateText}</div>
        </div>
        <button class="delete-item-btn" onclick="deleteHistoryRecord(${item.id})">${i18n[currentLang].delete_btn}</button>
      </li>
    `;
  }).join('');
}