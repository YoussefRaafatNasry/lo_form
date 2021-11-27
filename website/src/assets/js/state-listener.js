var isInitialized = false;

window.addEventListener("message", (e) => {
  const state = JSON.parse(e.data);
  stateToTable(state);
  initView();
});

const initView = () => {
  if (isInitialized) return;

  const loadingClass = "card--loading";

  const formCard = document.getElementById("form-card");
  formCard.classList.remove(loadingClass);

  const tableCard = document.getElementById("table-card");
  tableCard.classList.remove(loadingClass);

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
    cell1.appendChild(statusToSpan(field.status));

    const cell2 = row.insertCell(2);
    cell2.innerHTML = field.initialValue;

    const cell3 = row.insertCell(3);
    cell3.innerHTML = field.touched ? "✅" : "❌";
  }

  // Form row
  const tfoot = table.getElementsByTagName("tfoot")[0];

  if (isInitialized) tfoot.deleteRow(0);

  const row = tfoot.insertRow(0);
  const cell0 = row.insertCell(0);
  cell0.innerHTML = "Form";

  const cell1 = row.insertCell(1);
  cell1.appendChild(statusToSpan(state.status));

  row.insertCell(2);
  row.insertCell(3);
};

const statusToSpan = (status) => {
  const span = document.createElement("span");
  span.classList.add(`status--${status}`);
  return span;
};
