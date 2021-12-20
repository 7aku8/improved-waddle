const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let particles = []

const mouse = {
  active: false,
  x: null,
  y: null,
  radius: 250
}

window.onmousemove = ({ x, y }) => {
  mouse.x = x
  mouse.y = y
}

document.onmouseenter = () => mouse.active = true
document.onmouseleave = () => mouse.active = false

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

    const forceDirectionX = dx / distance
    const forceDirectionY = dy / distance

    const maxDistance = mouse.radius
    const force = (maxDistance - distance) / maxDistance

    const directionX = forceDirectionX * force * this.density
    const directionY = forceDirectionY * force * this.density

    if (distance < mouse.radius) {
      this.size = 3 + (mouse.radius - distance) / 50
    } else {
      this.size = 3
    }

    if (distance < mouse.radius) {
      this.x -= directionX
      this.y -= directionY
    } else {
      if (this.x !== this.baseX) {
        const dx = this.x - this.baseX
        this.x -= dx / 10
      }
      if (this.y !== this.baseY) {
        const dy = this.y - this.baseY
        this.y -= dy / 10
      }
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

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  particles.forEach(x => {
    x.draw()

    if (mouse.active) {
      x.update()
    }
  })

  requestAnimationFrame(animate)
}
animate()
