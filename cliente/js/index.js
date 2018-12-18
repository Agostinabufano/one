$("#save").on("click", function (e) {
    if (name() && surname() && telephone() && mail()) {
        return true;
    }
    e.preventDefault();
})

function name() {
    var nameI = $("#name").val();
    if (nameI !== "" && nameI.length <= 30) {
        return true;
    } else {
        $("#name").parent().append(`<p>Es necesario ingresar un nombre</p>`);
        return false;
    }
}

function surname() {
    var surnameI = $("#surname").val();
    if (surnameI !== "" && surnameI.length <= 30) {
        return true;
    } else {
        $("#surname").parent().append(`<p>Es necesario ingresar un apellido</p>`);
        return false;
    }
}

function telephone() {
    var telI = $("#tel").val();
    if (telI !== "" && /[0-9]/.test(telI)) {
        return true;
    } else {
        $("#tel").parent().append(`<p>Es necesario ingresar un número de teléfono</p>`);
        return false;
    }
}

function mail() {
    var emailI = $("#mail").val();
    if (emailI !== "" && /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/.test(emailI)) {
        return true;
    } else {
        $("#mail").parent().append(`<p>Es necesario ingresar una dirección de mail</p>`);
        return false;
    }
}

$.ajax("http://localhost:3000/api/users").done(function (data) {
    var users = JSON.parse(data);
    for (var i = 0; i < users.length; i++) {
        var aux = users[i];
        $("#users").append(createUserDiv(users[i]))
        $(`#deleteUser${users[i].id}`).on("click", function () {
            $.ajax({
                url: `http://localhost:3000/api/users/${aux.id}`,
                type: 'DELETE',
                success: function (result) {
                    if (result == "OK") {
                        $(`#${aux.id}`).remove();
                    }
                }
            });
        })
        // console.log(users[i]);
    }
})

$("#filtro").on("click", function () {
    var filtroVal = $("#filtroVal").val();
    $.ajax(`http://localhost:3000/api/users?search=${filtroVal}`).done(function (data) {
        $("#users").children().remove()
        var filteredUsers = JSON.parse(data);
        for (var i = 0; i < filteredUsers.length; i++) {
            var aux = filteredUsers[i];
            $("#users").append(createUserDiv(filteredUsers[i]))
            $(`#deleteUser${filteredUsers[i].id}`).on("click", function () {
                $.ajax({
                    url: `http://localhost:3000/api/users/${aux.id}`,
                    type: 'DELETE',
                    success: function (result) {
                        if (result == "OK") {
                            $(`#${aux.id}`).remove();
                        }
                    }
                });
            })
        }
    })
})

function createUserDiv(user) {
    return `<div id=${user.id}>
    <div class="nameContainer">${user.name}</div>
    <div class= "surnameContainer">${user.surname}</div>
    <div class="telContainer">${user.tel}</div>
    <div class="mailContainer">${user.mail}</div>
    <div class="buttonContainer">
    <button id="editUser${user.id}">Editar</button>
    <button id="deleteUser${user.id}">Eliminar</button>
    </div>
    </div>`;
}

$(`.editUser${user.id}`).on("click", `editUser${user.id}`, function () {
    `<a href= "../html/edit.html"></a>`;
    $.ajax(`http://localhost:3000/api/users/${aux.id}`).done(function (data) {
        var obtainedUsers = JSON.parse(data);
        var data = obtainedUsers[i];
        $("#editUser").append(`<form action="http://localhost:3000/api/user" method= "POST"><p>Nombre:</p><input type:"text id="editedName">${data.name}
        <p>Apellido:</p><input type:"text" id="editedSurname">${data.surname}
        <p>Telefono:</p><input type:"text" id="editedTel">${data.tel}
        <p>Email:</p><input type:"text" id="editedMail">${data.mail}
        <button id=""saveEdition>Guardar</button></form>`);
        $("#saveEdition").on("click", "saveEdition", function () {
            var newName = $("#editedName").val();
            var newSurname = $("#editedSurname").val();
            var newTel = $("#editedTel").val();
            var newMail = $("#editedMail").val();
            $.ajax({               
                url: `http://localhost:3000/api/users/${data.id}`,
                type: 'PUT',
                data: `name=${newName}&surname=${newSurname}&tel=${newTel}&mail=${newMail}`,
                // succes: function () {
                    
                // }
            })
        })
    })
})
