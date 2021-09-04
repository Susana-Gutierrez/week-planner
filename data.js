/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

const previousWeekPlannerJSON = localStorage.getItem('javascript-local-storage');

if (previousWeekPlannerJSON !== null) {
  data = JSON.parse(previousWeekPlannerJSON);
}

function handleBeforeUnload(event) {
  const WeekPlannerJSON = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', WeekPlannerJSON);
}

window.addEventListener('beforeunload', handleBeforeUnload);
