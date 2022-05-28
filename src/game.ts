import kaboom from 'kaboom'

kaboom();

loadSprite("bean", "src/assets/bean.png")

//Player
const bean = add([
    sprite("bean"),
    pos(80, 40),
    area(),
    body(),
])

//Collider, what happens when bean collides with an obstacle.
bean.onCollide("obstacle", () => {
    addKaboom(bean.pos);
    shake();
})

// .jump() when "space" key is pressed
// Jump can only be run if the game object contains a body, and are thus affected by gravity.
onKeyPress("space", () => {
    if(bean.isGrounded()){
        bean.jump()
    }
})


//Floor
add([
    rect(width(), 64),
    pos(0, height() - 48),
    outline(4),
    area(),
    solid(),
    color(127, 200, 255)
])

//Obstacle loop every x second
loop(1, () => {
    //Obstacle
    add([
        rect(48,64),
        area(),
        outline(4),
        pos(width(), height() -48),
        origin("botleft"),
        color(255, 180, 255),
        move(LEFT,240),
        "obstacle"
    ])
})
