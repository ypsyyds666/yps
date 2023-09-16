let canvas = document.querySelector('#canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight;
let ctx = canvas.getContext('2d');
let textCanvas = document.createElement('canvas');
let tctx = textCanvas.getContext('2d');
let pixs = []
let index = 0;
let co1ors = ['#ffa502', '#ff6348', '#ff4757', '#2ed573', '#1e90ff', '#3742fa']
let strs = ['( •̀ ω •́ )✧','○(＾皿＾)っ']
let particalArr = []

let ch = str => {
    let span = document.createElement('span')
    span.className = 'check'
    span.textContent = str
    document.body.appendChild(span)
    let w = span.clientWidth
    let h = span.clientHeight
    document.body.removeChild(span)
    return [w, h]
}
let textdata = i => {
    let textarea = ch(strs[i])
    textCanvas.width = textarea[0]
    textCanvas.height = textarea[1]
    tctx.clearRect(0, 0, textCanvas.width, textCanvas.height)
    tctx.font = '40px Arial'
    tctx.fillText(strs[i], 0, 40)
    return tctx.getImageData(0, 0, textCanvas.width, textCanvas.height)
}

class Partical {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.vy = Math.random() - 1.5
        this.vx = 0.5 - Math.random()
        this.g = 0.05
        this.color = co1ors[Math.random() * co1ors.length | 0]
        this.wait = 40

    }
    update() {
        if (this.wait < 0) {
            this.x += this.vx * 2
            this.y += this.vy * 2
            this.vy += this.g

        }
        this.wait--
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = this.color;
        ctx.fill();
    }

}
let init = () => {
    pixs = textdata(index % strs.length)
    for (let i = 0; i < pixs.data.length / 4; i++) {
        if (pixs.data[i * 4 + 3] != 0) {
            x = (i % textCanvas.width) * 5 + (canvas.width - textCanvas.width * 5) / 2
            y = (i / textCanvas.width | 0) * 5 + (canvas.height - textCanvas.height * 5) / 2
            particalArr.push(new Partical(x, y))
        }
    }
    index++
}

let draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < particalArr.length; i++) {
        particalArr[i].update()
        particalArr[i].draw()
        if (particalArr[i].y > canvas.height) {
            particalArr.splice(i, 1)
        }
        if (particalArr.length == 0) {
            init()
        }
    }
    requestAnimationFrame(draw)
}
init()
// setInterval(draw,.1)
    requestAnimationFrame(draw)
