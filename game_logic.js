const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const MAX_LEVEL = 10;
let scoreValue = document.getElementById('score')
let level = document.getElementById('level')
let bestRecord = [1,0]
let record = document.getElementById('best_score')

function saveRecord(level,score) {
    if (bestRecord[0] < level) {
        bestRecord[0] = level
    }
    if (bestRecord[1] < score) {
        bestRecord[1] = score
    }
}

class Juego {
    constructor() {
        this.inicializar()
        this.generate()
        this.showSecuence()
    }

    inicializar() {
        this.toogleBtnEmpezar()
        this.level = 1
        this.showSecuence = this.showSecuence.bind(this)
        this.chooseColor = this.chooseColor.bind(this)
        this.count = 0
        this.scoreCount = 0
        level.innerHTML = this.level
    }

    toogleBtnEmpezar(){
        if (btnEmpezar.classList.contains('hide')) {
            btnEmpezar.classList.remove('hide')
        } else{
            btnEmpezar.classList.add('hide')
        }
    }

    generate() {
        this.secuence = new Array(MAX_LEVEL).fill(0).map(n => Math.floor(Math.random()*4))
        this.pices = [celeste,violeta,naranja,verde]
    }

    showSecuence(){
        setTimeout(() => {
            for (let i = 0; i < this.level; i++) {
                this.iluminateColor(this.pices[this.secuence[i]], 1000*i, 360)
            }
            this.addEvents()
        },700)
    }

    addEvents(){
        for (let i = 0; i < this.pices.length; i++) {
            this.pices[i].addEventListener('click',this.chooseColor)
        }
    }

    removeEvents(){
        for (let i = 0; i < this.pices.length; i++) {
            this.pices[i].removeEventListener('click',this.chooseColor)
        }
    }

    chooseColor(ev){
        const colorSelected = ev.target
        if(colorSelected === this.pices[this.secuence[this.count]]){
            this.count +=1
            this.iluminateColor(colorSelected, 10, 360)
            scoreValue.innerHTML = this.count + this.scoreCount
            // when level up
            if (this.count === this.level) {
                this.scoreCount = this.count
                this.count = 0
                this.level +=1
                level.innerHTML = this.level
                this.removeEvents()
                if(MAX_LEVEL + 1 === this.level){
                    saveRecord(this.level,this.scoreCount)
                    record.innerHTML = `Lv. ${bestRecord[0]} - ${bestRecord[1]}`
                    this.gameWonit()
                } else{
                    this.showSecuence()
                }
            }
        }else{
            saveRecord(this.level,this.scoreCount)
            record.innerHTML = `Lv. ${bestRecord[0]} - ${bestRecord[1]}`
            this.removeEvents();
            this.gameOver()
            level.innerHTML = 0
            scoreValue.innerHTML = 0
        }
    }

    iluminateColor(color, timeIn, timeOut){
        setTimeout(() => {
            color.classList.add('light')
            setTimeout(() => color.classList.remove('light'),timeOut)
        },timeIn)
    }
    gameWonit(){
        swal('Game Won It','Do you want to play again', 'success',{
            button: "Play again",
            })
            .then((value) => {
                this.toogleBtnEmpezar()
            });
    }
    gameOver(){
        swal('Game Over','Do you want to play again', 'error',{
            button: "Play again",
            })
            .then((value) => {
                this.toogleBtnEmpezar()
            });
    }

}

function empezarJuego() {
    window.juego = new Juego()
}
