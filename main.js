/* global data */
/* exported data */

const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const time = ['12:00 AM', '1:00 AM', '2:00 AM', '3:00 AM', '4:00 AM', '5:00 AM',
  '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
  '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM'];

const $addEntry = document.querySelector('.add-entry');
const $addEntryModal = document.querySelector('.add-entry-modal');
const $overlay = document.querySelector('.overlay');
const $buttonSubmit = document.querySelector('.button-submit');
const $text = document.querySelector('.text');
const $dayOfWeek = document.querySelector('#day-of-week');
const $time = document.querySelector('#time');

function handleClickAddEntry(event) {
  $addEntryModal.className = 'add-entry-modal';
  $overlay.className = 'overlay';

  for (let i = 0; i < dayOfWeek.length; i++) {
    newOptionWeekOfDayDOM(i);
  }

  for (let i = 0; i < time.length; i++) {
    newOptionTimeDOM(i);
  }

}

$addEntry.addEventListener('click', handleClickAddEntry);

function handleClickSubmit(event) {

  if (($dayOfWeek.value !== 'dayofweek') && ($time.value !== 'time')) {

    const entry = {
      dayOfWeek: $dayOfWeek.value,
      time: $time.value,
      description: $text.value,
      entryId: data.nextEntryId
    };

    data.entries.push(entry);
    data.nextEntryId = data.nextEntryId + 1;
  }

  $overlay.className = 'hidden';
  $addEntryModal.className = 'hidden';
  $dayOfWeek.value = 'dayofweek';
  $time.value = 'time';
  $text.value = 'Description';

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
