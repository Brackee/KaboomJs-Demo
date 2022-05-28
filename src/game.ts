import kaboom from 'kaboom'

kaboom();

loadSprite("bean", "src/assets/bean.png")

var score;

// Scene of which determine the game.
scene("game", () => {

    score = 0;
    
    //Player
    const bean = add([
        sprite("bean"),
        pos(80, 40),
        area(),
        body(),
    ])

    //Collider, what happens when bean collides with an obstacle.
    bean.onCollide("obstacle", () => {
        addKaboom(bean.pos)
        shake()
        go("lose")
    })

    // .jump() when "space" key is pressed
    // Jump can only be run if the game object contains a body, and are thus affected by gravity.
    onKeyPress("space", () => {
        if(bean.isGrounded()){
            bean.jump()
        }
    })

    // onUpdate triggers every frame
    onUpdate(() => {
        score++;
        scoreLabel.text = score
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

    //Score
    const scoreLabel = add([
        text(score),
        pos(24,24)
    ])
})

scene("lose", () => {
    add([
        text("Game Over"),
        pos(center()),
        origin("center")
    ])
    add([
        text(`Final score: ${score}`,{
            size: 34
        }),
        pos(center().x, center().y + 64),
        origin("center")
    ])

    // go back to game with space is pressed
    onKeyPress("space", () => go("game"));
    onClick(() => go("game"));
})

go("game")