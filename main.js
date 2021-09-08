/* global data */
/* exported data */

const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const time = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00',
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00',
  '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];

const $addEntry = document.querySelector('.add-entry');
const $addEntryModal = document.querySelector('.add-entry-modal');
const $overlay = document.querySelector('.overlay');
const $buttonSubmit = document.querySelector('.button-submit');
const $text = document.querySelector('.text');
const $dayOfWeek = document.querySelector('#day-of-week');
const $time = document.querySelector('#time');
const $dayList = document.querySelector('.day-list');
const $table = document.querySelector('table');
const $scheduledDay = document.querySelector('.scheduled-day');
const $tableOptions = document.querySelector('.table-options');
const $modalTitle = document.querySelector('.modal-title');

function handleClickAddEntry(event) {
  $addEntryModal.className = 'add-entry-modal';
  $overlay.className = 'overlay';
}

$addEntry.addEventListener('click', handleClickAddEntry);

function handleClickSubmit(event) {

  if (($dayOfWeek.value !== 'dayofweek') && ($time.value !== 'time')) {
    if (data.editing !== null) {
      for (let i = 0; i < data.entries.length; i++) {
        if (data.editing.entryId === data.entries[i].entryId) {
          data.entries[i].dayOfWeek = $dayOfWeek.value;
          data.entries[i].time = $time.value;
          data.entries[i].description = $text.value;
        }
      }

    } else {

      const entry = {
        dayOfWeek: $dayOfWeek.value,
        time: $time.value,
        description: $text.value,
        entryId: data.nextEntryId
      };

      data.entries.push(entry);
      data.nextEntryId = data.nextEntryId + 1;
    }
  }

  document.querySelector('tbody').innerHTML = '';

  orderData($dayOfWeek.value);

  $scheduledDay.textContent = $dayOfWeek.value;
  $overlay.className = 'hidden';
  $addEntryModal.className = 'hidden';
  $dayOfWeek.value = 'dayofweek';
  $time.value = 'time';
  $text.value = 'Description';
  data.editing = null;

}

$buttonSubmit.addEventListener('click', handleClickSubmit);

function newOptionWeekOfDayDOM(number) {
  const elementOption = document.createElement('option');
  elementOption.value = dayOfWeek[number];
  elementOption.textContent = dayOfWeek[number];
  document.querySelector('#day-of-week').appendChild(elementOption);
}

function newOptionTimeDOM(number) {
  const elementOption = document.createElement('option');
  elementOption.value = time[number];
  elementOption.textContent = time[number];
  document.querySelector('#time').appendChild(elementOption);
}

function handleClickTextArea(event) {
  if ($text.value === 'Description') {
    $text.value = '';
  }
}

$text.addEventListener('click', handleClickTextArea);

function newTableDom(time, day) {

  for (let i = 0; i < data.entries.length; i++) {
    if ((data.entries[i].dayOfWeek === day) && (data.entries[i].time === time)) {
      const elementTr = document.createElement('tr');
      const elementTdTime = document.createElement('td');
      const elementTdDescription = document.createElement('td');

      const elementButton = document.createElement('button');
      elementButton.setAttribute('class', 'update');
      elementButton.setAttribute('data-entry-id', data.entries[i].entryId);

      elementTdTime.textContent = data.entries[i].time;
      elementTdDescription.textContent = data.entries[i].description;
      elementButton.textContent = 'Update';

      document.querySelector('tbody').appendChild(elementTr);
      elementTr.appendChild(elementTdTime);
      elementTr.appendChild(elementTdDescription);
      elementTdDescription.appendChild(elementButton);
    }
  }
}

function handleClickDayList(event) {
  document.querySelector('tbody').innerHTML = '';
  var dataView = event.target.getAttribute('data-view');
  if (dataView !== null) {
    $scheduledDay.textContent = dataView;
  }
  orderData(dataView);
}

$dayList.addEventListener('click', handleClickDayList);

function orderData(dataView) {

  var scheduled = [];

  for (let i = 0; i < data.entries.length; i++) {
    var dayOfWeekSelected = data.entries[i].dayOfWeek;
    if (dayOfWeekSelected === dataView) {
      scheduled.push(data.entries[i]);
    }
  }

  if (scheduled.length === 0) {
    $table.className = 'hidden';
  } else {
    $table.className = '';
    var scheduleTime = [];
    for (let j = 0; j < scheduled.length; j++) {
      scheduleTime.push(scheduled[j].time);
    }

    var orderedScheduledTime = scheduleTime.sort();
    for (let i = 0; i < orderedScheduledTime.length; i++) {
      newTableDom(orderedScheduledTime[i], dataView);
    }
  }
}

function handleDOMContentLoaded(event) {
  for (let i = 0; i < dayOfWeek.length; i++) {
    newOptionWeekOfDayDOM(i);
  }

  for (let i = 0; i < time.length; i++) {
    newOptionTimeDOM(i);
  }

  orderData('Monday');
}

window.addEventListener('DOMContentLoaded', handleDOMContentLoaded);

function handleClickTableOptions(events) {
  if (event.target.tagName === 'BUTTON') {
    var index = event.target.getAttribute('data-entry-id');
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === parseInt(index)) {
        data.editing = data.entries[i];
        $modalTitle.textContent = 'Update Entry';
        $addEntryModal.className = 'add-entry-modal';
        $overlay.className = 'overlay';
        $dayOfWeek.value = data.entries[i].dayOfWeek;
        $time.value = data.entries[i].time;
        $text.value = data.entries[i].description;
      }
    }
  }
}

$tableOptions.addEventListener('click', handleClickTableOptions);
