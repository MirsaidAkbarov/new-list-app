const items = document.querySelector(".items");
const clear = document.querySelector(".clear")
let selectFilter = document.querySelector("[name='status']");









const filterByStatus = (status) => {
    switch (status) {
        case "completed":
            return todos.filter((v) => v.isDone);
        case "proccess":
            return todos.filter((v) => !v.isDone);
        default:
            return todos;
    }
};

let currentStatus = "all";








let todos = JSON.parse(localStorage.getItem("todos")) || [];



const render = () => {
    localStorage.setItem("todos", JSON.stringify(todos));



    items.innerHTML = "";


    filterByStatus(currentStatus).forEach((v) => {



        const checkbox = v.isDone
            ? `<input checked type="checkbox" class="checkbox" />`
            : `<input type="checkbox" class="checkbox" />`;



        const input = v.isDone
            ? ` <input disabled class="todo completed" value="${v.todo}">`
            : `<input disabled class="todo" value="${v.todo}">`;



        const editButton = v.isDone
            ? ""
            : `   <button class="edit">
            <img src="./images/pencil.svg" alt="">
            </button>`;


        items.innerHTML += `
        <li class="item" id="${v.id}">

          ${checkbox}
          ${input}

          <div class="buttons">

         ${editButton}

            <button style="display:none" id="${v.id}" class="save">
            <img src="./images/112.svg" alt="">
            </button>


              <button style="display:none" id="${v.id}" class="cancel">
              <img src="./images/BxX.svg" alt="">
              </button>


            <button id="${v.id}" class="delete">
            <img src="./images/trash.svg" alt="">
            </button>
            
          </div>
        </li>
      `;
    });
};



render();


let form = document.querySelector(".form")
// const inputClass = document.querySelector(".input")

// inputClass.style.boxshadow = "0px 0px 7px red"
// console.log(inputClass);



form.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputValue = e.target.elements.todo.value;

    if (inputValue) {
        const newTodo = { id: "s" + new Date().getTime(), todo: inputValue };
        todos.unshift(newTodo);
        form.reset();
        render()
    } else {
        const dNone = document.querySelector('.empty__btn')
        const inp = document.querySelector('input')
        inp.classList.add('new__input')
        dNone.style.cssText = `display: inline-block; 
            `
        setTimeout(() => {
            dNone.style.cssText = `display: none
            `
            inp.classList.remove('new__input')
        }, 1000)
    }
})


clear.addEventListener("click", () => {

    todos = []
    render()
});





selectFilter.addEventListener("change", (e) => {
    currentStatus = e.target.value;
    render();
});






items.addEventListener("click", (e) => {
    const currentId = e.target.closest(".item")?.id;
    const currentItem = e.target.closest(".item");

    const selector = (classname) => `#${currentId} .${classname} `
    const saveButton = document.querySelector(selector("save"));
    const cancelButton = document.querySelector(selector("cancel"));
    const editButton = document.querySelector(selector("edit"));
    const currentInput = document.querySelector(selector("todo"));
    const deleteButton = document.querySelector(selector("delete"));



    if (e.target.closest(".delete-")) {
        currentItem.classList.add('delete__effect')
    }


    if (e.target.closest(".delete")) {
        todos = todos.filter((v) => v.id != currentId);
        render();
    }


    if (e.target.closest(".edit")) {
        saveButton.style.display = "block";
        cancelButton.style.display = "block";
        editButton.style.display = "none";

        currentInput.removeAttribute("disabled");
        currentInput.focus();

        const value = currentInput.value;
        currentInput.value = "";
        currentInput.value = value;

        deleteButton.classList = 'delete-'


        currentInput.addEventListener("blur", (e) => {
            setTimeout(() => {
                saveButton.style.display = "none";
                cancelButton.style.display = "none";
                editButton.style.display = "block";
                console.log('blur');
                render()
            }, 1000);
        });
    }
    if (e.target.closest(".save")) {
        // e.stopPropagation()
        console.log("save");
        saveButton.style.display = "none";
        cancelButton.style.display = "none";
        editButton.style.display = "block";
        currentInput.setAttribute("disabled", "");

        todos = todos.map((e) =>
            e.id === currentId ? { ...e, todo: currentInput.value } : e
        );

        render();
    }

    if (e.target.closest(".cancel")) {
        saveButton.style.display = "none";
        cancelButton.style.display = "none";
        editButton.style.display = "block";
        currentInput.setAttribute("disabled", "");
        render();
    }


    if (e.target.closest(".checkbox")) {
        // todos = todos.map((e) =>
        //     e.id == currentId ? { ...e, isDone: !e.isDone } : e
        // )

        const id = todos.findIndex((v) => v.id === currentId);
        todos[id].isDone = !todos[id].isDone;

        render();
    }

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape') {
            render();
        }
        if (e.code === 'Enter') {
            // saveButton.style.display = "none";
            // cancelButton.style.display = "none";
            // editButton.style.display = "block";
            // currentInput.setAttribute("disabled", "");

            // todos = todos.map((e) =>
            //     e.id === currentId ? { ...e, todo: currentInput.value } : e
            // );

            // render();
        }
    })


})


