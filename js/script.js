const form = document.getElementById('formInput');
const taskInput = document.getElementById('task');
const dateInput = document.getElementById('date');
const btnSubmit = document.getElementById('submit');
const deleteBtn = document.getElementById('deleteBtn');
const notFound = document.getElementById('notFound');
const filter = document.getElementById('filter');
const tableBody = document.querySelector('#taskTable tbody');

// Cek apakah table kosong
function checkIfEmpty() {
    const rows = document.querySelectorAll('tbody tr:not(#noTaskRow)');
    if (rows.length <= 1) {
        notFound.style.display = '';
    }
}

// Tambah task baru
form.addEventListener("submit", function(e) {
    e.preventDefault();
    
    const task = taskInput.value;
    const date = dateInput.value;

    if (!task || !date) {
        alert("Please fill out all the fields.")
        return;
    }

    
    const row = document.createElement('tr');
    row.classList.add('pending');
    
    
    row.innerHTML = `
    <td>${task}</td>
    <td>${date}</td>
    <td id="statusTask">Pending</td>
    <td>
    <button class="taskBtn finishedTask" title="Finish Task"><i class="fa-solid fa-circle-check"></i></button>
    <button class="taskBtn deleteTask" title="Delete Task"><i class="fa-solid fa-trash"></i></button>
    </td>
    `;

    // merubah status pending menjadi finished
    row.querySelector(".finishedTask").addEventListener("click", function () {
        row.className = "finished";
        const status = row.querySelector('#statusTask');
        status.textContent = "Finished";
    })
    
    // menghapus task
    row.querySelector(".deleteTask").addEventListener("click", function() {
        row.remove();
        const rows = document.querySelectorAll('tbody tr:not(#noTaskRow)');
        checkIfEmpty();
    });

    // Mengatur filter
    filter.addEventListener("change", function () {
        const status = this.value;
        tableBody.classList.remove("show-finished", "show-pending");

        if (status === "finished") {
            if (row.classList.contains('finished')) {
                notFound.style.display = 'none';
            } else {
                notFound.style.display = '';
            }
            tableBody.classList.add('show-finished');
        } else if (status === "pending") {
            if (row.classList.contains('pending')) {
                notFound.style.display = 'none';
            } else {
                notFound.style.display = '';
            }
            tableBody.classList.add('show-pending');
        } else if (status === "all") {
            if (row.classList.contains('pending') || row.classList.contains('finished')) {
                notFound.style.display = 'none';
            } else {
                notFound.style.display = '';
            }
            tableBody.classList.remove('show-finished');
            tableBody.classList.remove('show-pending');
        }

    })

    notFound.style.display = 'none';
    tableBody.appendChild(row);
    
    form.reset();
})

// Menghapus semua task
deleteBtn.addEventListener("click", function(e) {
    e.preventDefault();
    const taskList = document.querySelectorAll('tbody tr:not(#notFound)');
    
    taskList.forEach(item => {
        item.remove();
    })
    notFound.style.display = '';
})


