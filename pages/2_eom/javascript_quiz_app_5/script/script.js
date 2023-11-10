const anwserArr3 = ['верхние губки','нижние губки',   'глубиномер', 'нониусная шкала',  ];
// anwserArr3 - элементы соотвествуют ячейке. Слево направо, сверху вниз
// some1 - 1 кол 1 ячейка, some2 - 1 кол 2 ячейка, some5 - 2 кол 1 ячейка и т. д.
const pathImg = './content/03_01.png'; // путь к фотке

const leftColLength = 2; //кол-во колонн слева
const rightColLength = 2; //кол-во колонн справа

let numberOfQuestion = 5; 
let numberOfQuestionSum = 12;

let stepMarkerPlace = document.querySelector('.step_marker');
console.log("stepMarkerPlace")
for (let i = 0; i < numberOfQuestion; i++){
    let markers = document.createElement('img');
    markers.src = "./content/radio_button_blue.svg";
    stepMarkerPlace.appendChild(markers);
}

for (let i = 0; i < numberOfQuestionSum-numberOfQuestion; i++){
    let markers = document.createElement('img');
    markers.src = "./content/radio_button.svg";
    stepMarkerPlace.appendChild(markers);
}

let stepPlaceDescription = document.querySelector('.number_description');
stepPlaceDescription.innerHTML = numberOfQuestion + '/' + numberOfQuestionSum;

let leftCol = [];
let rightCol = [];
let fullList = [];

let realIndex = 0;

const row2 = document.getElementById('row2')
const leftColElem = document.getElementById('left-col')
const rightColElem = document.getElementById('right-col')

let dragElem2;
let startIndx;
let endIndx;

let rowList = [] 

window.onload = () => {
    calcImg();
}

createRow()
createFields()
createImg();


addEventListeners3();

function calcImg() {
    let heightImg = document.getElementById('img').clientHeight;

    document.getElementById('left-col').style.height = `${heightImg}px`;
    document.getElementById('right-col').style.height = `${heightImg}px`;
}

window.addEventListener('resize', calcImg);

function createImg() {
    const imgOuter = document.getElementById('img');
    
    const img = document.createElement('img');
    img.setAttribute('src', pathImg);
    img.setAttribute('alt', 'img');
    imgOuter.appendChild(img);
}

function createRow() {
    [...anwserArr3]
    .map(a => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
    .forEach((item, index) => {
        const rowItem = document.createElement('li')

        rowItem.setAttribute('id', index)
        rowItem.classList.add('item3')
        rowItem.draggable = 'true'
        rowItem.innerText = item

        rowList.push(rowItem)
        row2.appendChild(rowItem)

    })
}

function createFields() {
    for (let i = 0; i < leftColLength; i++) {
        const field = document.createElement('div')
        
        field.setAttribute('index', realIndex)
        field.classList.add('field')
        
        leftCol.push(field)
        leftColElem.appendChild(field)

        realIndex++
    }

    for (let i = 0; i < rightColLength; i++) {
        const field = document.createElement('div')
        
        field.setAttribute('index', realIndex)
        field.classList.add('field')
        
        rightCol.push(field)
        rightColElem.appendChild(field)

        realIndex++
    }

    fullList = [...leftCol, ...rightCol]
}

function dragStart2() {
    dragElem2 = this;
    if (this.parentNode.getAttribute('index') === 'row') {
        startIndx = this.parentNode.getAttribute('index')
    } else {
        startIndx = +this.closest('.field').getAttribute('index')
    }
}

function dragEnd2() {
    dragElem2 = null
}

function dragEnter2() {
    this.classList.add('over');
}

function dragLeave2() {
    this.classList.remove('over');
}

function dragOver2(e) {
    e.preventDefault();
}

function dragDrop2() {
    if (this.getAttribute('index') === 'row') {
        endIndx = this.getAttribute('index');
    } else {
        endIndx = +this.getAttribute('index');
    }
    
    const indexDragElem = +dragElem2.getAttribute('id')

    if (startIndx === 'row' && this.childNodes.length === 0) {
        this.append(dragElem2)
        dragElem2.classList.add('none-border')
    } else if (startIndx !== undefined && this.childNodes.length === 0) {
        this.append(dragElem2)
    } else if (startIndx === 'row' && this.childNodes.length !== 0) {
        swap(endIndx, indexDragElem)
    } else if (startIndx !== undefined && endIndx === 'row') {
        this.append(dragElem2)
        dragElem2.classList.remove('none-border')
    } else if (startIndx !== undefined && endIndx !== undefined) {
        swapItems2(startIndx, endIndx);
    }
    this.classList.remove('over');
}

function swap(end, start) {
    const itemOne = rowList[start]
    const itemTwo = fullList[end].querySelector('.item3')
    
    itemOne.classList.add('none-border')
    itemTwo.classList.remove('none-border')

    rowList[start].replaceWith(itemTwo)
    fullList[end].appendChild(itemOne)
}

function swapItems2(fromIndex, toIndex) {
    const itemOne = fullList[fromIndex].querySelector('.item3');
    const itemTwo = fullList[toIndex].querySelector('.item3');

    fullList[fromIndex].appendChild(itemTwo);
    fullList[toIndex].appendChild(itemOne);
}

function checkAnwser3() {
    fullList.forEach((item, index) => {
        answerBtn.classList.add('disabled_button')
        nextBtn.classList.remove('disabled_button')
        reloadBtn.classList.remove('disabled_button')
        if (item.querySelector('.item3')?.innerText.trim() === undefined) {
            item.classList.add('incorrect')
        } else {
            const itemName = item.querySelector('.item3').innerText.trim();

            if (itemName !== anwserArr3[index]) {
                localStorage.setItem('answer_'+numberOfQuestion, JSON.stringify({questionPlace: false}));
                item.classList.add('incorrect')
            } else {
                
                item.classList.remove('incorrect')
                item.classList.add('correct')
            }
        }
    })
}

function reloadPageFunc(){
    window.location.reload();
}

const answerBtn = document.querySelector('#check_button_1')
const reloadBtn = document.querySelector('#check_button_2')
const nextBtn = document.querySelector('#check_button_3')

function addEventListeners3() {
    const itemElem = document.querySelectorAll('.item3');
    const fieldsElem = document.querySelectorAll('.field');
    const rowElem = document.querySelectorAll('.row2');

    itemElem.forEach((item) => {
        item.draggable = true;
        item.addEventListener('dragstart', dragStart2);
        item.addEventListener('dragend', dragEnd2);
    });
    fieldsElem.forEach((elem) => {
        elem.addEventListener('dragover', dragOver2);
        elem.addEventListener('dragenter', dragEnter2);
        elem.addEventListener('dragleave', dragLeave2);
        elem.addEventListener('drop', dragDrop2);
    });
    rowElem.forEach((elem) => {
        elem.addEventListener('dragover', dragOver2);
        elem.addEventListener('dragenter', dragEnter2);
        elem.addEventListener('dragleave', dragLeave2);
        elem.addEventListener('drop', dragDrop2);
    })
}

function showPopUp(){
    let popUpWindow = document.querySelector('#popup2')
    popUpWindow.classList.remove('close')
}

function closePopUp(){
    let popUpWindow = document.querySelector('#popup2')
    popUpWindow.classList.add('close')
}

localStorage.setItem('answer_'+numberOfQuestion, JSON.stringify({questionPlace: true}));