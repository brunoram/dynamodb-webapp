//VISUALIZE TABLE
document.addEventListener('DOMContentLoaded', function () {
    fetch('https://i8fokyclsg.execute-api.eu-central-1.amazonaws.com/books').then(onResponse).then(onJSON);
}, false);

function onResponse(response) {
    return response.json();
}

function onJSON(json) {

    const x = json.Items;

    let table = document.querySelector("#table");
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');

    for (const [key, value] of Object.entries(x[0])) {
        const columns = `${key}`;
        const th = document.createElement('th');
        th.classList.add("th");
        th.textContent = columns;
        thead.appendChild(th);
    }
    const th_delete = document.createElement('th');
        th_delete.classList.add("th");
        th_delete.textContent = "Delete";
    const th_update = document.createElement('th');
        th_update.classList.add("th");
        th_update.textContent = "Update";
    thead.appendChild(th_delete);
    thead.appendChild(th_update);
    table.appendChild(thead);
    const tbody = document.createElement('tbody');


    for (let i = 0; i < x.length; i++) {    //create rows
        const tr = document.createElement('tr');
        for (const [key, value] of Object.entries(x[i])) {          //create cells depending on [key:value] from DB
            const values = `${value}`;
            const td = document.createElement('td');
            td.textContent = values;

            tr.appendChild(td);
        }

        //Create delete button:
        const td_delete = document.createElement('td');  
        const button_d=document.createElement('input');
        button_d.classList.add("btn_delete");
        button_d.type="button";
        button_d.addEventListener('click', deleteBook);
        button_d.name=x[i].id;
        button_d.textContent="Remove";
        td_delete.appendChild(button_d);
        tr.appendChild(td_delete);

         //Create update button:
         const td_update = document.createElement('td');  
         const button_u=document.createElement('input');
         button_u.classList.add("btn_update");
         button_u.type="button";
         button_u.addEventListener('click', function() { //showing form to modify data 
            const form = document.querySelector("#form");
            form.classList.remove("hidden");
            const category = document.querySelector("#category");
            const id = document.querySelector("#id");
            id.setAttribute("readonly", "true");
            const pages = document.querySelector("#pages");
            const title = document.querySelector("#title");
            const author = document.querySelector("#author");
            category.value = x[i].category;
            id.value = x[i].id;
            pages.value = x[i].pages;
            title.value = x[i].title;
            author.value = x[i].author;
            const submit = document.querySelector("#submit");
            submit.value = "Update"
            
            form.addEventListener('submit', updateBook);
         });
         
         button_u.textContent="Update";
         td_update.appendChild(button_u);
         tr.appendChild(td_update);
         tbody.appendChild(tr);
    }
    table.appendChild(tbody);
}

//FORM SHOWING
function addBook() {

    const form = document.querySelector("#form");
    form.classList.remove("hidden");
    form.reset();
    const submit = document.querySelector("#form");
    submit.addEventListener('submit', submitFunction);


}

//ADDING NEW BOOK PUT FUNCTION
function submitFunction(event) {
    event.preventDefault();
    console.log("PUT sent...");
    const data = new FormData(event.target);
    const formJSON = Object.fromEntries(data.entries());
    const json = JSON.stringify(formJSON);

    const url = "https://i8fokyclsg.execute-api.eu-central-1.amazonaws.com/books";
//PUT FETCHING
    var putMethod = {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: json
    }
    fetch(url, putMethod)
        .then(response => response.json())
        .then(() => {
            event.target.reset();
            window.location.reload();
        })

}

//DELETE Function
function deleteBook(event) {
    
    const url = 'https://i8fokyclsg.execute-api.eu-central-1.amazonaws.com/books/'+event.currentTarget.name;
    var delMethod = {
        method: 'DELETE'
    }
    fetch(url, delMethod) 
    .then(response => response.json())
    .then(() => {
        window.location.reload();
    });

}


//UPDATE PUT FUNCTION
function updateBook(event){
    event.preventDefault();
    console.log("PUT sent...");
    const data = new FormData(event.target);
    const formJSON = Object.fromEntries(data.entries());
    const json = JSON.stringify(formJSON);
   
    const url = "https://i8fokyclsg.execute-api.eu-central-1.amazonaws.com/books";
//PUT FETCHING
    var putMethod = {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: json
    }
    fetch(url, putMethod)
        .then(response => response.json())
        .then(() => {
            window.location.reload();
        })

}
