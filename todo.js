let inputValue=document.getElementById('task');
let addTask=document.getElementById('add');
let ul=document.getElementById('todoList');
let doneList=document.getElementById('doneList');

window.addEventListener('DOMContentLoaded',()=>{
    getTodo();
    getDone();
    delDone();
});


addTask.addEventListener('click',()=>{
   handleEntry();
});

inputValue.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
       handleEntry();
    }
});

function handleEntry(){
    let task=inputValue.value;
    let savedList=fetchList()||[];
    if(savedList.includes(task)){
        alert('Task already exists');
        inputValue.value='';
        return;
    }
    else{
        addTodo(task);
        saveTodo();
        inputValue.value='';
    }
}
function fetchList(){
    let savedList = JSON.parse(localStorage.getItem('todoList'));
    return savedList;
}
function getTodo(){
    let savedList = fetchList();
    if (savedList && Array.isArray(savedList)) {
        savedList.forEach((task) => {
            if (task.trim() !== '') {
                addTodo(task);
            }
        });
    }
};

function saveTodo(){
    let savedList = fetchList() || [];
    let task=inputValue.value;
    savedList.push(task);
    localStorage.setItem('todoList',JSON.stringify(savedList));
};

function addTodo(task){
    if (task.trim() === '') return;
    let li=document.createElement('li');
    
    let text=document.createElement('span');
    text.innerText=task;

    let btnDiv=document.createElement('div');
    btnDiv.className='btn-div';

    let checkBtn=document.createElement('input');
    checkBtn.type='checkbox';
    checkBtn.className='check-btn';
    checkBtn.addEventListener('click',()=>{
        if(checkBtn.checked){
            ul.removeChild(li);
            delTodo(task);
            showDone(task);
            saveDone(task);
        }
    });


    let deleteBtn=document.createElement('button');
    deleteBtn.innerText='Delete';
    deleteBtn.className='delete-btn';
    deleteBtn.addEventListener('click',(e)=>{
      ul.removeChild(li);
      delTodo(task);
    });

    btnDiv.appendChild(checkBtn);
    btnDiv.appendChild(deleteBtn);

    li.appendChild(text);
    li.appendChild(btnDiv);
    ul.appendChild(li);
    
};

function delTodo(task){ 
    let savedList=fetchList();
    savedList=savedList.filter((savedList)=>{return savedList!==task});
    localStorage.setItem('todoList',JSON.stringify(savedList));
}

function saveDone(task){
    let doneList=fetchDone()||[];
    doneList.push(task);
    localStorage.setItem('doneList',JSON.stringify(doneList));
}

function fetchDone(){
    let doneList = JSON.parse(localStorage.getItem('doneList'));
    return doneList;
}

function delDone() {
    let doneList = fetchDone();
    if (doneList && doneList.length > 10) {
        doneList = doneList.slice(-10); // Keep only the last 10 entries
        localStorage.setItem('doneList', JSON.stringify(doneList));
    }
}

function showDone(task){
    let doneTask=document.createElement('li');
    doneTask.innerText=task;
    doneTask.className='done';
    doneList.appendChild(doneTask);
}
function getDone(){
    let doneList = fetchDone();
    if (doneList && Array.isArray(doneList)) {
        doneList.forEach((task) => {
            if (task.trim() !== '') {
                showDone(task);
            }
        });
    }
};
