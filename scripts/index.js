const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let particles = []

const mouse = {
  x: null,
  y: null,
  radius: 150
}

window.onmousemove = ({ x, y }) => {
  mouse.x = x
  mouse.y = y
}

ctx.font = '30px Roboto Mono'
ctx.fillText('A', 40, 40)

const data = ctx.getImageData(0, 0, 100, 100)

class Particle {
  constructor(x, y) {
    this.x = x
    this.y = y

    this.size = 3
    this.baseX = this.x
    this.baseY = this.y

    this.density = Math.random() * 30 + 1
  }

  draw() {
    ctx.fillStyle = 'black'
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.fill()
  }

  update() {
    const dx = mouse.x - this.x
    const dy = mouse.y - this.y

    const distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))

    if (distance < 150) {
      this.size = 3 + (150-distance) * .09
    } else {
      this.size = 3
    }
  }
}

const init = () => {
  particles = []

  for (let i = 0; i < 1000; i++) {
    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height

    particles.push(new Particle(x, y))
  }
}
init()

console.log(particles)

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  particles.forEach(x => {
    x.draw()
    x.update()
  })

  requestAnimationFrame(animate)
}
animate()
