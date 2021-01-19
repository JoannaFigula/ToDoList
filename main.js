let $todoInput; //główny input - wpisywanie treści zadania
let $alertInfo; // info o braku zadań/ możliwości dodania tekstu
let $addBtn; // przycisk ADD - dodaje nowe elementy do listy
let $ulList; // lista zadań
let $newTask; // nasz nowy li

let $popup; // pobrany popup
let $popupInfo; // alert w popup, jak doda sie pusty tekst
let $editedTodo; // edytowalnyTodo
let $popupInput; //tekst wpisany w inputa w popupie
let $addPopupBtn; //przycisk zatwierdz w popupie
let $closeTodoBtn; // przycisk do zamykania popupu

let $allTask;

let $idNumber = 0;

const main = () => {
    prepareDomElements();
    prepareDomEvents();
}

//pobieranie elementów
const prepareDomElements = () => {
    $todoInput = document.querySelector('.todoInput');
    $addBtn = document.querySelector('.addBtn');
    $alertInfo = document.querySelector('.alertInfo');
    $ulList = document.querySelector('.todoList ul');
    $popup = document.querySelector('.popup');

    $popup = document.querySelector('.popup');
    $popupInfo = document.querySelector('.popupInfo');
    $popupInput = document.querySelector('.popupInput');
    $addPopupBtn = document.querySelector('.accept');
    $closeTodoBtn = document.querySelector('.cancel');

    $allTask = $ulList.getElementsByTagName('li');
}

//nasłuchiwanie
const prepareDomEvents = () => {
    $addBtn.addEventListener("click", addNewTask);
    $ulList.addEventListener("click", checkClick);
    $closeTodoBtn.addEventListener('click', closePopup);
    $addPopupBtn.addEventListener('click', changeTodo);
    $todoInput.addEventListener('keydown', enterCheck);
}

const addNewTask = () => {
    if($todoInput.value !== "") {

        $idNumber++;

        $newTask = document.createElement('li');
        $newTask.style.textTransform='capitalize';
        $newTask.innerText = $todoInput.value;
        //ustawiamy id w każdym nowym li
        $newTask.setAttribute('id', `todo - ${$idNumber}`);
        $ulList.appendChild($newTask);
        $todoInput.value = '';
        $alertInfo.innerText = '';
        createToolsArea();
    } else {
        $alertInfo.innerText = `Wpisz treść zadania`;
    }
}

//tworzymy przyciski edycji, usuwania, i "gotowe"
const createToolsArea = () => {
    const toolPanel = document.createElement('div');
    toolPanel.classList.add("tools");
    $newTask.appendChild(toolPanel);

    const completedBtn = document.createElement('button');
    completedBtn.classList.add("complete");
    completedBtn.innerHTML = "<i class=\"fas fa-check\"></i>"

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit');
    editBtn.innerText = "EDIT"

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.innerHTML = "<i class=\"fas fa-times\"></i>";

    toolPanel.appendChild(completedBtn);
    toolPanel.appendChild(editBtn);
    toolPanel.appendChild(deleteBtn);
}

const checkClick = (e) => {
    if(e.target.closest('button').classList.contains('complete')){
        e.target.closest('li').classList.toggle('completed');
        e.target.closest("button").classList.toggle('completed');
    } else if(e.target.closest('button').className === 'edit') {
       editTask(e);
    } else if(e.target.closest('button').className === 'delete') {
        deleteTask(e);
    }
}

const editTask = (e) => {
    //e.target wskazuje dokładnie to co wciskamy
    const oldTodo = e.target.closest('li').id;
    $editedTodo = document.getElementById(oldTodo);

    //w inpucie pojawia się wartość tekstowa z klikniętego li
    $popupInput.value = $editedTodo.firstChild.textContent;
    // $popupInput.justifyContent = 'start-flex';
    $popup.style.display='block';
}

const deleteTask= (e) =>{
   const deleteTodo =  e.target.closest('li');
   deleteTodo.remove();
   if($allTask.length === 0){
       $alertInfo.innerText = "Brak zadań na liście.";
   }
}

const changeTodo = () => {
    if($popupInput.value !== ""){
        $editedTodo.firstChild.textContent = $popupInput.value;
        $popup.style.display = 'none';
        $popupInfo.innerText = '';
    } else {
        $popupInfo.innerText = "Musisz podać jakąś treść";
    }
}

const closePopup = (e) => {
    $popup.style.display='none';
}

// input na enter - https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code
// const enterCheck = (event) => {
//     if(event.key === 'Enter'){
//         addNewTask();
//     }
// }

const enterCheck = (event) => {
    if(event.keyCode === 13){
        addNewTask();
    }
}




document.addEventListener('DOMContentLoaded', main);