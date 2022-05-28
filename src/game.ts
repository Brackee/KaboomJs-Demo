import kaboom from 'kaboom'

kaboom();

loadSprite("bean", "sprites/bean.png")

const bean = add([
    sprite("bean"),
    pos(80, 40),
    area(),
    body(),
])

// .jump() when "space" key is pressed
onKeyPress("space", () => {[
    bean.jump()
]})