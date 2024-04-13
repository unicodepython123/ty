if (!localStorage.getItem('OK') && !localStorage.getItem('OKE')) {
    window.location.href = '../login_page/index.html'
}

// render data and push data
let now = new Date();

// Lấy ngày, tháng và năm
let ngay = now.getDate();
let thang = now.getMonth() + 1; // JavaScript đếm tháng từ 0, nên cần cộng thêm 1
let nam = now.getFullYear();
function formatDate() {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    for (let i = 0; i < 12; i = i + 1) {
        if (thang == i + 1) {
            thang = months[i]
            break
        }
    }
    return thang
}
let thangnew = formatDate()
let todo = [
    {
        kindofwork: "Marketing",
        nameofwork: "Write something",
        text: "Son Tung MTP yes sir, Messi Ronaldo",
        time: {
            day: ngay, 
            month: thang,
            year: nam
        }
    },
    {
        kindofwork: "Marketing",
        nameofwork: "rịoigjoitgj",
        text: "ẻifoeirfoierfiherfihe",
        time: {
            day: ngay, 
            month: thangnew,
            year: nam
        }
    }
]
let doing = [
    {
        kindofwork: "Lap trinh",
        nameofwork: "Write something",
        text: "Java python js",
        time: {
            day: ngay, 
            month: thangnew,
            year: nam
        }
    }
]
let completed = [
    {
        kindofwork: "Marketing",
        nameofwork: "Write something",
        text: "Son Tung MTP yes sir, Messi Ronaldo",
        time: {
            day: ngay, 
            month: thangnew,
            year: nam
        }
    }
]
let blocked = [
    {
        kindofwork: "Marketing",
        nameofwork: "Write something",
        text: "Son Tung MTP yes sir, Messi Ronaldo",
        time: {
            day: ngay, 
            month: thangnew,
            year: nam
        }
    }
]
let data = [todo, doing, completed, blocked]
let todo_task = document.querySelector('#todo')
let doing_task = document.querySelector('#doing')
let completed_task = document.querySelector('#completed')
let blocked_task = document.querySelector('#blocked')
let task_todo_tagname = document.querySelector('.task_todo_tagname')
let task_doing_tagname = document.querySelector('.task_doing_tagname')
let task_completed_tagname = document.querySelector('.task_completed_tagname')
let task_blocked_tagname = document.querySelector('.task_blocked_tagname')


// lưu vào local
// let data_getted = [123]
// function store_local() {
//     if (localStorage.getItem('data')) {
//         data_getted = JSON.parse(localStorage.getItem('data'))
//     }
//     else {
//         localStorage.setItem('data', JSON.stringify(data))
//         data_getted = JSON.parse(localStorage.getItem('data'))
        
//     }
// }
// console.log(data_getted)
// store_data()

function render() {
    // console.log(todo)
    // console.log(data)
    localStorage.setItem('data_local', JSON.stringify(data))
    let data_local = JSON.parse(localStorage.getItem('data_local'))
    // console.log(data_local)
    let newdatachild
    data_local.forEach(function(items, index) {
        newdatachild = items.map(function(item, indexchild) {
            return `
            <div class="task_card" draggable="true" ondragstart="dragstart(${index},${indexchild})" id="${index}_${indexchild}">
                <div class="task_header">
                    <div class="kindofwork">${item.kindofwork}</div>
                    <div class="btn">
                        <button class="edit_btn" onclick="open_popup_edit_task(${index}, ${indexchild})"><img src="../image/icon/Edit.png" alt=""></button>
                        <button class="delete_btn" onclick="delete_task(${index}, ${indexchild})"><img src="../image/icon/Delete.png" alt=""></button>
                    </div>
                </div>
                <div class="nameofwork">${item.nameofwork}</div>
                <div class="text">${item.text}</div>
                <div class="timecreate">
                    <img class="clock" src="../image/icon/clock.png" alt="">
                    <div class="time">${item.time.day} ${item.time.month} ${item.time.year}</div>
                </div>  
            </div>  
            `
        })
        if (index == 0) {
            todo_task.innerHTML = newdatachild.join("")
            task_todo_tagname.innerHTML = `To do <div class="number_todo">${newdatachild.length}</div>`
        }
        else if (index == 1) {
            doing_task.innerHTML = newdatachild.join("")
            task_doing_tagname.innerHTML = `Doing <div class="number_doing">${newdatachild.length}</div>`
        }
        else if (index == 2) {
            completed_task.innerHTML = newdatachild.join("")
            task_completed_tagname.innerHTML = `Completed <div class="number_completed">${newdatachild.length}</div>`
        }
        else if (index == 3) {
            blocked_task.innerHTML = newdatachild.join("")
            task_blocked_tagname.innerHTML = `Blocked <div class="number_blocked">${newdatachild.length}</div>`
        }
    })
}
if (localStorage.getItem('data_local')) {
    data = JSON.parse(localStorage.getItem('data_local'))
    render()
}
else {
    localStorage.setItem('data_local', JSON.stringify(data))
    render()
}

// open-close new task form 
let new_task_form = document.querySelector('.form_new_task')
let popup_new_task = document.querySelector('.popup_new_task')
let new_task_btn = document.querySelector('.new_task_btn')
let submit_btn_new_form = document.querySelector('.submit_btn_new_form')
let input_kindofwork_form = document.querySelector('.kindofwork_new_form')
let input_title_new_form = document.querySelector('.title_new_form')
let input_content_new_form = document.querySelector('.content_new_form')
let check_form = [input_kindofwork_form, input_title_new_form, input_content_new_form]
function open_popup_new_task() {
    if (popup_new_task.classList.contains('active')) {
        popup_new_task.classList.remove('active')
        check_form.forEach(function(item) {
            item.value = ''
            item.style.border = "solid 1px black";
            item.style.boxShadow = "0 0 0 black"
        })
    }
    else {
        popup_new_task.classList.add('active')
    }
}
new_task_btn.addEventListener("click", open_popup_new_task)

function close_popup_new_task(e) {
    if (e.target == popup_new_task) {
        popup_new_task.classList.add('active')
    } 
}
popup_new_task.addEventListener("click",close_popup_new_task)
function check_change() {
    check_form.forEach(function(item) {
        item.addEventListener('change',function() {
            if (item.value == "") {
                item.style.border = "solid 1px red";
                item.style.boxShadow = "0 0 5px red"
            }
            else {
                item.style.border = "solid 1px green";
                item.style.boxShadow = "0 0 5px green"
            }
        })
    })
}
check_change()
function submit_btn_click() {
    let i = 0
    check_form.forEach(function(item) {
        if (item.value == "") {
            item.style.border = "solid 1px red";
            item.style.boxShadow = "0 0 5px red"
            i = 0
        }
        else {
            item.style.border = "solid 1px green";
            item.style.boxShadow = "0 0 5px green"
            i = i + 1
        }
    })
    if (i == 3) {
        data[0].push(
            {
                kindofwork: input_kindofwork_form.value,
                nameofwork: input_title_new_form.value,
                text: input_content_new_form.value,
                time: {
                    day: ngay, 
                    month: thangnew,
                    year: nam
                }
            }
        )
        popup_new_task.classList.add('active')
        render()
    }
}
submit_btn_new_form.addEventListener("click", submit_btn_click)


// open-close edit task form 
let popup_edit_task = document.querySelector('.popup_edit_task')
console.log(popup_edit_task)
let edit_task_form = document.querySelector('.form_edit_task')
console.log(edit_task_form)
let edit_btn = document.querySelector('.edit_btn')
let kindofwork_edit_form = document.querySelector('.kindofwork_edit_form')
let tile_edit_form = document.querySelector('.tile_edit_form')
let content_edit_form = document.querySelector('.content_edit_form')
let radio_input = document.querySelectorAll('.radio_input')
let submit_btn_edit_form = document.querySelector('.submit_btn_edit_form')
check_form_edit = [kindofwork_edit_form,tile_edit_form,content_edit_form]
function check_change_edit() {
    check_form_edit.forEach(function(item) {
        item.addEventListener('change',function() {
            if (item.value == "") {
                item.style.border = "solid 1px red";
                item.style.boxShadow = "0 0 5px red"
            }
            else {
                item.style.border = "solid 1px green";
                item.style.boxShadow = "0 0 5px green"
            }
        })
    })
}
check_change_edit()

function open_popup_edit_task(index, indexchild) {
    popup_edit_task.classList.toggle('active')
    kindofwork_edit_form.value = data[index][indexchild].kindofwork
    tile_edit_form.value = data[index][indexchild].nameofwork
    content_edit_form.value = data[index][indexchild].text
    radio_input[index].checked = true
    last_radio_choice = radio_input[index].checked
    check_form_edit.forEach(function(item) {
        item.style.border = "solid 1px black";
        item.style.boxShadow = "0 0 0 black"
    })
    data[index][indexchild].edited = "edited"
    // console.log(data[index])
    // console.log(data[index].length)
}

function close_popup_edit_task(e) {
    if (e.target == popup_edit_task) {
        for (let i = 0; i < 4; i = i + 1) {
            for (let j = 0; j < data[i].length; j = j + 1) {
                // console.log(data[i][j])
                if (data[i][j] == 'edited') {
                    delete data[i][j].edited
                    // console.log(data[i])
                    break
                }
            }
        }
        popup_edit_task.classList.add('active')
    } 
}
popup_edit_task.addEventListener("click", close_popup_edit_task)

function change_submit() {
    let index
    let indexchild
    let kiem = 0
    check_form_edit.forEach(function(item) {
        if (item.value == "") {
            item.style.border = "solid 1px red";
            item.style.boxShadow = "0 0 5px red"
            kiem = 0
        }
        else {
            item.style.border = "solid 1px green";
            item.style.boxShadow = "0 0 5px green"
            kiem = kiem + 1
        }
    })
    if (kiem == 3) {
        for (let i = 0; i < 4; i = i + 1) {
            for (let j = 0; j < data[i].length; j = j + 1) {
                // console.log(data[i][j])
                if (data[i][j].edited == 'edited') {
                    index = i
                    indexchild = j
                    console.log(indexchild)
                    delete data[i][j].edited
                    console.log(data[i])
                    break
                }
            }
        }
        for (let k = 0; k < radio_input.length; k = k + 1) {
            if (radio_input[k].checked) {
                if (k == index) {
                    console.log(kindofwork_edit_form.value)
                    console.log(index,indexchild)
                    console.log(data[index][indexchild])
                    data[index][indexchild].kindofwork = kindofwork_edit_form.value
                    data[index][indexchild].nameofwork = tile_edit_form.value
                    data[index][indexchild].text = content_edit_form.value  
                }
                else {
                    data[index].splice(indexchild,1)
                    data[k].push(
                        {
                            kindofwork: kindofwork_edit_form.value,
                            nameofwork: tile_edit_form.value,
                            text: content_edit_form.value,
                            time: {
                                day: ngay, 
                                month: thangnew,
                                year: nam
                            }
                        }
                    )
                }
            }
        }
        render()
        popup_edit_task.classList.add('active')
    }
}
submit_btn_edit_form.addEventListener("click",change_submit)

let delete_btn = document.querySelector('.delete_btn')
function delete_task(index, indexchild) {
    data[index].splice(indexchild,1)
    render()
}

let cards = document.querySelectorAll('.task_card')
let boxs = document.querySelectorAll('.task_cards')
let selected = 1
let index = 0
let indexchild = 0
let store_data = 0
function dragstart(a, b) {
    index = a
    indexchild = b
    // store_data = data[a][b] 
    // data[index].splice(indexchild,1)
}
for (let box of boxs) {
    box.ondragover = function dragover(e) {
        // console.log(e)
        e.preventDefault()
    }
}
for (let box of boxs) {
    box.ondrop = function drop(e) {
        box.children.preventDefault
        console.log(e.target)
        if (e.target.id == 'todo') {
            data[0].push(data[index][indexchild])
            data[index].splice(indexchild,1)
            render()
        }
        else if (e.target.id == 'doing') {
            data[1].push(data[index][indexchild])
            data[index].splice(indexchild,1)
            render()
        }
        else if (e.target.id == 'completed') {
            data[2].push(data[index][indexchild])
            data[index].splice(indexchild,1)
            render()
        }
        else if (e.target.id == 'blocked') {
            data[3].push(data[index][indexchild])
            data[index].splice(indexchild,1)
            render()
        }
        else {
            console.log('12345')
            let k = e.target.parentNode
            console.log(k)
             while (true) {
                if (k.parentNode.classList.contains('task_card')) {
                    console.log('QUang Nguyễn')
                    break
                }
                k = k.parentNode
            }
            console.log(k)
        }
    } 
}
















