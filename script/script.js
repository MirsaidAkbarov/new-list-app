const items = document.querySelector(".items");
const input = document.querySelector(".input")
const add = document.querySelector(".add")
const clear = document.querySelector(".clear")
const todos = [
  { todo: 'Reading books' },
  { todo: 'Play footbal' },
  { todo: 'Watch TV' },
  { todo: 'Coding' },
];

const render = () => {
    items.innerHTML = ""

    todos.forEach((v) => {
        items.innerHTML += `
        <li class="item">
        <p class="todo">${v.todo}</p>
        <div class="buttons">
        <button class="edit">
        <i class='bx bx-sm bxs-pencil' ></i>
        </button>
        <button class="delete">
        <i class='bx bx-md bx-x' ></i>
        </button>
        
        </div>
        </li>` ;
        
    })    

    const del = document.querySelectorAll(".delete")

    for(let i = 0 ; i < del.length; i++) {

        del[i].addEventListener("click",  () => {

            todos.splice(i, 1)
            render()
            })
            
    }

}


render()

const form = document.querySelector(".form")

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const imputValue = e.target.elements.todo.value;
    const newTodo = { todo: imputValue};
    todos.unshift(newTodo);
    console.log(todos);
    form.reset();

    
})


clear.addEventListener("click", () => {

    const one = todos.length
    todos.splice(0, one)

    render()

})





