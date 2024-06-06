
let todos = [ ];

const inputElement = document.querySelector('.inputBx'); 
const listElement = document.querySelector('.list'); 
const activeCountElement = document.getElementById('activeCount')  
let tab = document.querySelectorAll(".tab")
let currentView = 'all';
 
function addTodoItem(value) {
    todos.unshift({id: Date.now(), task: value, status: false}); //begining of array add
    const counts = todos.length;
    // document.getElementById("number").innerHTML = counts;
    console.log(counts);
    inputElement.value = "";
    renderTodoList();
    
}

function createTodoUIElement(item){
    // console.log(item);
    // checkedval = unckecked
    // if(item.done): checkedval = checked

    const checkedAttribute = item["status"] ? 'checked' : ''; // for checking check box is checked or not
    const lineThrough = item.status ? 'line-through' : 'none'; // for checking line through
    
    listElement.innerHTML += `<li>
        <input type="checkbox" onclick="completeTask(${item.id})" data="${item.id}" class="complete" ${checkedAttribute} > </input>
            <span style="text-decoration: ${lineThrough};" >${item.task}</span>
        <button class="cancel" onclick="deleteTask(${item.id})" data=${item.id}> &#x2715; </button> 
    </li>`  

    // in deleteTask the item id is paased
}

function renderTodoList() {
    listElement.innerHTML = " ";
    // const taskArrByview = getTaskByView(todos, currentView);
    todos.forEach(item => createTodoUIElement(item))
    updateActiveCount();
    updateHilightTab();
}

function updateActiveCount() {                                          // Function for find the count of the elements
    const activeCount = todos.filter(task => !task.status).length;
    activeCountElement.textContent = activeCount;
}

inputElement.addEventListener("keyup",function(e) {                      // Key press Enter Key
    if (e.key === "Enter") {
        if(inputElement.value === " " || inputElement.value === ""){
            alert("empty value!!")
        }
    else{
        addTodoItem(e.target.value);
    }
    }
});

    function deleteTask(id) {                                          // Delete the elements when by pressing X button
        // for finding the id of the clicked X button
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].id === id){
                todos.splice(i,1)
            }
        }
        renderTodoList();
        // console.log(todos)
    } 

    function completeTask(taskId) {                                    // Change the Status of the Task True / False
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].id === taskId) {
                todos[i].status = !todos[i].status;
                break;
            }
        }
        renderTodoList();
    }
    // console.log(todos)

    function selectAll() {                                              // Select All Function [Toggle Section]
        currentView = 'completed';
        const allSelected = todos.every(item => item.status);
        todos.forEach(item => {
            item.status = !allSelected;
        });
        renderTodoList();
    }
   
    function alll() {                                                   // Display all the Task
        currentView = 'all';
        
        renderTodoList();
        // todos = temp;
    }
     
    function active() {   
        currentView = 'active';                                              // Display the Active Tasks
        let temp = todos;
        todos = todos.filter(task => task["status"] === false);
        renderTodoList();
   
        todos = temp;
        // const counts = todos.length;
        // console.log(counts);
    }

    function complete() {                                               // Shows the Completed Task
        currentView = 'completed';
        let temp = todos;
        todos = todos.filter(task => task["status"] === true);
        renderTodoList();
        todos = temp;
        // const counts = todos.length;
        // console.log(counts);
    }

    function clearComplete() {                                                  // Clear the Completed Task
        todos = todos.filter((items) => !items.status); // remove completed task
        // todos = todos.filter(task => task["status"] === true);
        if(currentView=='all'){
            alll();
        }else if(currentView=='active'){
            active();
        }else{
           complete();
        }
        

        // renderTodoList();
        // 
        // const counts = todos.length;
        // console.log(counts);
    }
    // Count function called initially

    function updateHilightTab() {                                       // Highlight the All / Active / Completed
        tab.forEach(node => {
            const { tab } = node.dataset;
     
            if (tab === currentView) {
                node.classList.add('selected-border');
            } else {
                node.classList.remove('selected-border');
            }
        })
    }