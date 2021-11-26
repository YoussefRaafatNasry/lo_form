var isInitialized = false;

window.addEventListener("message", (e) => {
  const state = JSON.parse(e.data);
  stateToTable(state);
  initView();
});

const initView = () => {
  if (isInitialized) return;

  const app = document.getElementsByTagName("flutter-app")[0];
  const appPlaceholder = document.getElementById("flutter-app-placeholder");
  appPlaceholder.classList.add("hidden");
  app.classList.remove("hidden");

  const table = document.getElementById("state-table");
  const tablePlaceHolder = document.getElementById("state-table-placeholder");
  tablePlaceHolder.classList.add("hidden");
  table.classList.remove("hidden");

  isInitialized = true;
};

const stateToTable = (state) => {
  const table = document.getElementById("state-table");
  const tbody = table.getElementsByTagName("tbody")[0];

  // Field rows
  for (var i = 0; i < state.fields.length; i++) {
    if (isInitialized) tbody.deleteRow(i);

    const field = state.fields[i];
    const row = tbody.insertRow(i);

    const cell0 = row.insertCell(0);
    cell0.innerHTML = field.name;

    const cell1 = row.insertCell(1);
    cell1.innerHTML = field.status;

    const cell2 = row.insertCell(2);
    cell2.innerHTML = field.initialValue;

    const cell3 = row.insertCell(3);
    cell3.innerHTML = field.touched;
  }

  // Form row
  const lastIndex = state.fields.length;

  if (isInitialized) tbody.deleteRow(lastIndex);
  const lastRow = tbody.insertRow(lastIndex);

  const cell0 = lastRow.insertCell(0);
  cell0.innerHTML = "Form";

  const cell1 = lastRow.insertCell(1);
  cell1.innerHTML = state.status;
};
