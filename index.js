let list = document.querySelector('.list')
let listGuess = document.querySelector('.guess')
let tex = document.querySelector('.tex')
let pop2 = document.querySelector('.pop2')
let pop = document.querySelector('.pop')
let newW = document.querySelector('.newW')
let fonPict = document.querySelector('.fonPict')
let abc = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
  'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
let words = ['bloodseeker', 'juggernaut','abaddon','phantom']
let creatTeg = function (teg, clas, tex) {
  let element = document.createElement(teg)
  element.classList.add(clas)
  if (tex) {
    element.textContent = tex
  }
  return element
}
let pict = {
  'bloodseeker': 0,
  'juggernaut': 1,
  'abaddon':2,
  'phantom':3,
}

// console.log(pict.juggernaut)
// let pic = creatTeg('img', 'pict')
//  pic.src = 'img/'+ pict[juggernaut] + '.jpg;'
//  fonPict.append(pic)

let gues
function reandWord() {
  let rStr = Math.floor(Math.random() * words.length)
  return rStr
}
let modul = {
  popitka: 3,
  noPopitka: function () {
    this.popitka -= 1
    pop2.textContent = this.popitka + ' попытки'

  },
  used: [],
  rStr: reandWord()
  ,
  hod: function (i) {
    let lowAbc = abcList[i].textContent.toLowerCase()
    let r1 = words[this.rStr].toLowerCase().indexOf(lowAbc)
    let d1 = creatTeg('div', 'line')



    if (r1 >= 0) {

      if (guesCheck(lowAbc)) {
        gues[r1].textContent = abcList[i].textContent
        abcList[i].append(d1)
      } else {
        modul.noPopitka()
      }
    } else {


      if (this.used.indexOf(lowAbc) < 0) {
        this.used.push(lowAbc)
        abcList[i].append(d1)
        modul.noPopitka()
      }

    }
  },


  newWord: function () {
    for (let i = 0; i < words[this.rStr].length; i++) {
      let r1 = creatTeg('div', 'cell')
      tex.textContent = words[this.rStr]
      listGuess.append(r1)

    }
    gues = document.querySelectorAll('.cell')
  },

}


modul.newWord()

newW.onclick = function () {

  let r1 = document.querySelectorAll('.line')
  for (let i = 0; i < r1.length; i++) {
    r1[i].remove()
  }

  let r2 = document.querySelector('.pict')
  r2.remove()

  modul.rStr = reandWord()
  let ss = modul.rStr
  let s1 = words[ss]
  let pic = creatTeg('img', 'pict')
  
  pic.src = 'img/' + pict[s1] + '.jpg'
  fonPict.append(pic)

  modul.popitka = 3
  pop2.textContent = modul.popitka + ' попытки'
  listGuess.innerHTML = ''
  
  modul.newWord()

}

pop2.textContent = modul.popitka + ' попытки'



for (let i = 0; i < abc.length; i++) {
  let r1 = creatTeg('button', 'abc', abc[i])
  list.append(r1)
}
let abcList = document.querySelectorAll('.abc')




let guesCheck = function (j) {
  for (let i = 0; i < gues.length; i++) {
    if (gues[i].textContent == j) {
      return false
    } else {
      return true
    }
  }
}
for (let i = 0; i < abcList.length; i++) {
  abcList[i].addEventListener('click', function () {
    if (modul.popitka > 1) {
      modul.hod(i)
    } else {
      pop.style.color = 'red'
      pop.style.fontWeight = '700'
      pop.textContent = 'Вы израсходовали все попытки Игра окончена'
    }
  })
}


