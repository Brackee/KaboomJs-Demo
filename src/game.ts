import kaboom from 'kaboom'

kaboom();

loadSprite("bean", "src/assets/bean.png")

const bean = add([
    sprite("bean"),
    pos(80, 40),
    area(),
    body(),
])

// .jump() when "space" key is pressed
// Jump can only be run if the game object contains a body, and are thus affected by gravity.
onKeyPress("space", () => {[
    bean.jump()
]})