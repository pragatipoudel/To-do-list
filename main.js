///State

let items = [
    {
        text: 'Get Groceries',
        checked: false,
    },
    {
        text: 'Check email',
        checked: true,
    },
    {
        text: 'Water plants',
        checked: false,
    },
];

function save(){
    let str = JSON.stringify(items);
    localStorage.setItem('items', str);

}
function load(){
    let str = localStorage.getItem('items');
    if (str){
     items = JSON.parse(str);
    }
}


///Display
let ul = document.getElementById("to-do-list");

function display() {
    ul.innerText = "";
    items.forEach((item, index) => {
        let li = document.createElement('li');
        ul.appendChild(li);

        li.innerText = item.text;

        let input = document.createElement('input');
        input.type = 'checkbox';
        input.checked = item.checked; 
        input.onclick = () => {
            item.checked = !item.checked;
            display();
        };
        if (item.checked){
            li.classList.add('checked');
        }
        li.prepend(input);

        let deleteButton = document.createElement('button');
        deleteButton.innerText = 'X';
        li.append(deleteButton);

        deleteButton.onclick = () => {
            items.splice(index,1);
            display();
        }
    })
    save();
}


let newInput = document.getElementById('new-item');
newInput.onkeyup = function(event) {
    if (event.key == 'Enter'){
        items.push({
            text: newInput.value,
            checked: false
        })
        display();
        newInput.value = "";
    }
}


load();
display();
