const items = document.querySelector(".items");
const input = document.querySelector(".input")
const add = document.querySelector(".add")
const clear = document.querySelector(".clear")
const todos = [
  { todo: 'Reading books' },
  { todo: 'Play footbal' },
  { todo: 'Watch TV' },
  { todo: 'Coding' }
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

    



add.addEventListener("click", () => {
    const value = input.value
    if(value) {
        todos.unshift({task: value}) 
        input.value = ""
    } else {
        alert("kiriting")
    }
    render()
})



clear.addEventListener("click", () => {

    const one = todos.length
    todos.splice(0, one)

    render()

})



render()

