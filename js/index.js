$(document).ready(function () {
    appendTask = (task) => {
        const item = `
        <div class="col-md-4 ${!task.status ? 'done' : ''}">
        <div class="card mb-4 shadow-sm">
            <div class="card-body">
            <p class="card-text">${task.descricao}</p>
            <div class="d-flex justify-content-between align-items-center">
                <small class="text-muted">${task.dt}</small>
                <div class="btn-group">
                <button type="button" name="concluir" data-id="${task.id}" class="btn btn-sm btn-outline-secondary">
                Concluir
                </button>
                </div>
            </div>
            </div>
        </div>
        `;
        $('#list-tasks').append(item);
    }

    let tasks = [];
    createList = () => {
        $('#list-tasks').html('');
        tasks = localStorage['tasks'] ? JSON.parse(localStorage['tasks']) : [];
        tasks.forEach((task) => {
            appendTask(task);
        });
    }

    createList();

    addTask = () => {
        const item = {
            id: new Date().getTime(),
            descricao: $('#tarefa').val(),
            dt: $('#tarefa-data').val(),
            status: true,
        }

        tasks.push(item);

        localStorage["tasks"] = JSON.stringify(tasks);

        appendTask(item);


        alert("Tarefa adicionada com sucesso!")
        document.getElementById('add-tasks').reset();

    }

    $('#bt-cadastrar').click(addTask);
    $('button[name=concluir]').on('click', function () {
        const id = $(this).data('id');
        const i = tasks.findIndex(item => item.id == id);
        console.log(i)
        if (i >= 0) {
            tasks[i].status = false;
            localStorage["tasks"] = JSON.stringify(tasks);
        }

        createList();
    });

});