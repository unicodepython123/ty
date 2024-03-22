
// // fetch đã trả về môt promise (đã cài sẵn resolve, reject, chỉ việc .then)
// let data = fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
// data.then(function(res) {
//     res = res.json()
//     return res
// }).then(function(res) {
//     console.log(res)
//     return res
// }).then(function(res) {
//     console.log(res)
// })
let createbtn = document.querySelector('.createbtn')
let popup_create = document.querySelector('.popup_create')
let create_form = document.querySelector('.create')
let cards = document.querySelector('.cards-container')
let submitbtn = document.querySelector('.submitbtn')
let check = popup_create.classList.contains('active')
let data_poke = [
    {
        img: './image/7.svg',
        name: 'Squirtle',
        about: "Squirtle is a small, light-blue Pokémon with an appearance similar to a turtle. With its aerodynamic shape and grooved surface, Squirtle's shell helps it wade through the water very quickly. It also offers protection in battle.",
        HP: '45',
        attack: '49',
        defense: '50',
        evolution: ['Squirtle', 'Wartortle','Blastoise']
    },
    {
        img: './image/8.svg',
        name: 'Wartortle',
        about: "Its long, furry tail is a symbol of longevity, making it quite popular among older people. Its tail is large and covered with a rich, thick fur. The tail becomes increasingly deeper in color as Wartortle ages.",
        HP: '60',
        attack: '80',
        defense: '80',
        evolution: ['Squirtle', 'Wartortle','Blastoise']
    },
    {
        img: './image/9.svg',
        name: 'Blastoise',
        about: "Blastoise is a large, bipedal, reptilian Pokémon. It has a blue body with small purple eyes, a light brown belly, and a stubby tail. It has a large brown shell with two powerful water cannons on either side, which can be withdrawn.",
        HP: '80',
        attack: '90',
        defense: '95',
        evolution: ['Squirtle', 'Wartortle','Blastoise']
    },
    {
        img: './image/60.svg',
        name: 'Poliwag',
        about: "Poliwag is an amphibian Pokémon resembling a blue, spherical tadpole. It has large eyes and pink lips that can also act as suction cups for rocks. Its skin is very thin, but flexible and difficult to puncture.",
        HP: '40',
        attack: '40',
        defense: '45',
        evolution: ['Poliwag', 'Poliwhirl','Poliwharl']
    },
    {
        img: './image/61.svg',
        name: 'Poliwhirl',
        about: "The surface of Poliwhirl's body is always wet and slick with a slimy fluid. Because of this slippery covering, it can easily slip and slide out of the clutches of any enemy in battle.",
        HP: '60',
        attack: '55',
        defense: '60',
        evolution: ['Poliwag', 'Poliwhirl','Poliwharl']
    },
    {
        img: './image/62.svg',
        name: 'Poliwharl',
        about: "An adept swimmer at bath the front crawl and breast stroke. Easily overtakes the beast human swrimmers",
        HP: '80',
        attack: '80',
        defense: '80',
        evolution: ['Poliwag', 'Poliwhirl','Poliwharl']
    }
]

// render thep local
if (localStorage.getItem('data')) {
    var data = JSON.parse(localStorage.getItem('data'))
}
else {
    data = data_poke
}
// render
function render() {
    for (let i = 0; i < data.length; i = i + 1) {
        let new_poke = data.map(function(item, index) {
            return `
            <div class="card">
                <div class="card_header">
                    <!-- index  -->
                    <div class="index">#00<span>${index+1}</span></div>
                    <div class="btn">
                        <button class="infbtn">
                            <img src="./image/icon/FxemojiHeavyexclaimationmarksymbol.svg" alt="">
                        </button>
                        <!-- index  -->
                        <button class="editbtn">
                            <img onclick="edit_poke(${index})" src="./image/icon/MaterialSymbolsBoxEditRounded.svg" alt="">
                        </button>
                        <button  class="removebtn">
                            <img onclick="delete_poke(${index})" src="./image/icon/MaterialSymbolsBookmarkRemoveOutline.svg" alt="">
                        </button>
                    </div>
                </div>
                <div class="card_body">
                    <div class="poke">
                        <img src="${item.img}" alt="">
                        <h2 class="name">${item.name}</h2>
                    </div>
                    <!-- infomations -->
                    <div class="inf">
                        <div class="about" style ="overflow-wrap: break-word">
                            <strong>ABOUT:</strong> <br>
                            <p>${item.about}</p>
                        </div>
                        <div class="base-stats">
                            <div class="HP"><strong>HP:</strong> <span>${item.HP}</span></div>
                            <div class="Attack"><strong>ATTACK:</strong> <span>${item.attack}</span></div>
                            <div class="Defense"><strong>DEFENSE: </strong><span>${item.defense}</span></div>
                        </div>
                        <div class="evolution">
                            <strong>EVOLUTION:</strong> <br>
                            <span>${item.evolution[0]}</span>
                            <span>${item.evolution[1]}</span>
                            <span>${item.evolution[2]}</span>
                        </div>
                    </div>
                    <!-- infomations -->
                </div>
            </div>
            `
        })
    cards.innerHTML = new_poke.join("")
    }
}
render()
// mở popup
function create_poke() {
    // kiểm tra có class cần tìm trong ds class không  
    if (check) {
        popup_create.classList.remove('active')
    }
    else {
        popup_create.classList.add('active')
        document.querySelector('#field-name').value = ""
        document.querySelector('#field-img').value = ""
        document.querySelector('#field-about').value = ""
        document.querySelector('#field-HP').value = ""
        document.querySelector('#field-attack').value = ""
        document.querySelector('#field-defense').value = ""
        document.querySelector('#fresher-level').value = ""
        document.querySelector('#junior-level').value = ""
        document.querySelector('#senior-level').value = ""
    }
}
createbtn.addEventListener('click', create_poke)

// đóng popup
function close_poke(e) {
    if (e.target == create_form) {
        create_form.preventDefault()
    }
    else if (e.target == popup_create){
        popup_create.classList.remove('active')
    }
}
popup_create.addEventListener('click', close_poke)

// delete
function delete_poke (index) {
    console.log(index)
    data.splice(index,1)
    console.log(data.length)
    // if (data.length == 0) {
    //     data =[]
    //     render()
    // }
    // else {
    //     render()
    // }
    localStorage.setItem('data', JSON.stringify(data_poke))
    render()
    
}
let body = document.querySelector('body')

// popup height 


// submit 
function submit_poke () {
    let new_poke = {
        name: document.querySelector('#field-name').value,
        img:  document.querySelector('#field-img').value,
        about: document.querySelector('#field-about').value,
        HP: document.querySelector('#field-HP').value,
        attack: document.querySelector('#field-attack').value,
        defense: document.querySelector('#field-defense').value,
        evolution: 
        [document.querySelector('#fresher-level').value,
        document.querySelector('#junior-level').value,
        document.querySelector('#senior-level').value]
    }
    let check_number = 1
    for (key in new_poke)  {
        if (new_poke[key] == "") {
            check_number = 0
            break
        }
        else {
            check_number = 1
        }
    }
    if (check_number == 1) {
        console.log(check_number)
        data.push(new_poke)
        popup_create.classList.remove('active')
        render()
    }
    else if (check_number == 0 ) {
        console.log(check_number)
        alert("Vui lòng nhập chính xác và đầy đủ thông tin")
    }
}
submitbtn.addEventListener('click',submit_poke)

// edit

let editbtn = document.querySelector('.editbtn')
let popup_edit = document.querySelector('.popup_edit')
let edit_form = document.querySelector('.edit')
let check_edit = popup_edit.classList.contains('active')

// mở edit
function edit_poke(index) {
    if (check_edit) {
        popup_edit.classList.remove('active')
    }
    else {
        popup_edit.classList.add('active')
        document.querySelector('#field-name-edit').value = data[index].name
        document.querySelector('#field-img-edit').value = data[index].img
        document.querySelector('#field-about-edit').value = data[index].about
        document.querySelector('#field-HP-edit').value = data[index].HP
        document.querySelector('#field-attack-edit').value = data[index].attack
        document.querySelector('#field-defense-edit').value = data[index].defense
        document.querySelector('#fresher-level-edit').value = data[index].evolution[0]
        document.querySelector('#junior-level-edit').value = data[index].evolution[1]
        document.querySelector('#senior-level-edit').value = data[index].evolution[2]
        Object.assign(data[index],{key: 'edited'})
    }
}

// let index = editbtn.addEventListener('click',edit_poke)
let e = editbtn.addEventListener('click',edit_poke)
console.log(e)

// console.log(index)

// đóng edit
function close_edit (e) {
    if (e.target == popup_edit) {
        popup_edit.classList.remove('active')
    }
    else if (e.target == edit_form) {
        e.target.preventDefault()
        // edit_form.preventDefault()
    }
}
popup_edit.addEventListener('click', close_edit)

//lưu thông tin
let savebtn = document.querySelector('.savebtn')
function save_poke (index) {
    let poke_edited = {
        name: document.querySelector('#field-name-edit').value,
        img:  document.querySelector('#field-img-edit').value,
        about: document.querySelector('#field-about-edit').value,
        HP: document.querySelector('#field-HP-edit').value,
        attack: document.querySelector('#field-attack-edit').value,
        defense: document.querySelector('#field-defense-edit').value,
        evolution: 
        [document.querySelector('#fresher-level-edit').value,
        document.querySelector('#junior-level-edit').value,
        document.querySelector('#senior-level-edit').value]
    }
    let check_number = 1
    // for (key_check in poke_edited)  {
    //     console.log(key_check)
    //     console.log(poke_edited.key_check)
    if (poke_edited.name == "" || poke_edited.img == "" || poke_edited.about == "" || poke_edited.HP == "" || poke_edited.attack == "" || poke_edited.defense == "" || poke_edited.evolution == "") {
        check_number = 0
    }
    console.log(check_number)
    if (check_number == 1) {
        for (let i = 0; i < data.length; i = i + 1) {
            if (data[i].key == 'edited') {
                delete data[i].key
                for (let j = 0; j < 7; j = j + 1) {
                    data[i].name = poke_edited.name
                    data[i].img = poke_edited.img
                    data[i].about = poke_edited.about
                    data[i].HP = poke_edited.HP
                    data[i].attack = poke_edited.attack
                    data[i].defense = poke_edited.defense
                    data[i].evolution[0] = poke_edited.evolution[0]
                    data[i].evolution[1] = poke_edited.evolution[1]
                    data[i].evolution[2] = poke_edited.evolution[2]
                }
                popup_edit.classList.remove('active')
                render()
                break
            }
        }
    }
    else if (check_number == 0 ) {
        console.log(check_number)
        alert("Vui lòng chỉnh sửa chính xác và đầy đủ thông tin")
    }
}
savebtn.addEventListener('click', save_poke)
// lưu dữ liệu vào local

