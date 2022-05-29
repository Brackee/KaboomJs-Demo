import kaboom from 'kaboom'

kaboom({
    background: [134, 135, 246],
    width: 320,
    height: 240,
    scale: 2
})

loadRoot('https://i.imgur.com/')
loadSprite('coin', 'wbKxhcd.png')
loadSprite('evil-shroom', 'KPO3fR9.png')
loadSprite('brick', 'pogC9x5.png')
loadSprite('block', 'M6rwarW.png')
loadSprite('mario', 'Wb1qfhK.png')
loadSprite('mushroom', '0wMd92p.png')
loadSprite('surprise', 'gesQ1KP.png')
loadSprite('unboxed', 'bdrLpi6.png')
loadSprite('pipe-top-left', 'ReTPiWY.png')
loadSprite('pipe-top-right', 'hj2GK4n.png')
loadSprite('pipe-bottom-left', 'c1cYSbt.png')
loadSprite('pipe-bottom-right', 'nqQ79eI.png')
loadSprite('blue-block', 'fVscIbn.png')
loadSprite('blue-brick', '3e5YRQd.png')
loadSprite('blue-steel', 'gqVoI2b.png')
loadSprite('blue-evil-shroom', 'SvV4ueD.png')
loadSprite('blue-surprise', 'RMqCc1G.png')
loadSprite('cloud', 'Y0oHyRl.png')

const LEVELS = [
    [
        '                                      ',
        '                                      ',
        '                                      ',
        '                                      ',
        '                                      ',
        '                                      ',
        '    %   ~*~%~                         ',
        '                                      ',
        '                            -+        ',
        '                    ^   ^   ()        ',
        '==============================   =====',
        '==============================   =====',
    ],
    [
        '£                                       £',
        '£                                       £',
        '£                                       £',
        '£                                       £',
        '£                                       £',
        '£                                       £',
        '£                                       £',
        '£        @@@@@@              x x        £',
        '£                          x x x        £',
        '£                        x x x x  x   -+£',
        '£               z   z  x x x x x  x   ()£',
        '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
    ]
]

const levelConf = {
    width: 20,
    height: 20,
    '=': () => [
        sprite('block'),
        area(), 
        solid(),
    ],
    '~': () => [
        sprite('brick'),
        area(), 
        solid(),
    ],
    '$': () => [
        sprite('coin'), 
        'coin'
    ],
    '%': () => [
        sprite('surprise'), 
        area(), 
        solid(),
        'coin-surprise'
    ],
    '*': () => [
        sprite('surprise'), 
        area(), 
        solid(), 
        'mushroom-surprise'
    ],
    '}': () => [
        sprite('unboxed'), 
        area(), 
        solid()
    ],
    '(': () => [
        sprite('pipe-bottom-left'), 
        area(), 
        solid(), 
        scale(0.5)
    ],
    ')': () => [
        sprite('pipe-bottom-right'), 
        area(), 
        solid(), 
        scale(0.5)
    ],
    '-': () => [
        sprite('pipe-top-left'), 
        area(), 
        solid(), 
        scale(0.5), 
        'pipe'
    ],
    '+': () => [
        sprite('pipe-top-right'), 
        area(), 
        solid(), 
        scale(0.5), 
        'pipe'
    ],
    '^': () => [
        sprite('evil-shroom'), 
        area(), 
        solid(), 
        'dangerous'],
    '#': () => [
        sprite('mushroom'), 
        area(), 
        solid(), 
        'mushroom', 
        body()
    ],
    '!': () => [
        sprite('blue-block'),
        area(), 
        solid(), 
        scale(0.5)
    ],
    '£': () => [
        sprite('blue-brick'), 
        area(), 
        solid(), 
        scale(0.5)
    ],
    'z': () => [
        sprite('blue-evil-shroom'), 
        area(), 
        solid(), 
        scale(0.5), 
        'dangerous'
    ],
    '@': () => [
        sprite('blue-surprise'),
        area(),  
        solid(), 
        scale(0.5), 
        'coin-surprise'
    ],
    'x': () => [
        sprite('blue-steel'), 
        area(), 
        solid(), 
        scale(0.5)
    ],
  };
  
const SPEED = 120;

scene("start", () => {

    add([
      text("Press enter to start", { size: 24 }),
      pos(vec2(160, 120)),
      origin("center"),
      color(255, 255, 255),
    ]);
  
    onKeyRelease("enter", () => {
      go("game");
    })
});

go("start");
  
scene("game", (levelNumber = 0) => {

    layers([
        "bg",
        "game",
        "ui",
      ], "game");
    
    
      const level = addLevel(LEVELS[levelNumber], levelConf);
    
      add([
        sprite("cloud"),
        scale(0.3),
        pos(20, 50),
        layer("bg")
      ]);

      const player = add([
        sprite('mario'), 
        area(), 
        solid(),
        pos(30, 0),
        body(),
        origin('bot')
      ])

    onKeyDown("right", () => {
        player.flipX(false)
        player.move(SPEED, 0)
    })

    onKeyDown("left", () => {
        player.flipX(true)
        if(toScreen(player.pos).x > 20){
            player.move(-SPEED, 0)
        }
    })

    onKeyPress("space", () => {
        if(player.grounded()){
            player.jump();
        }
    })

    player.onUpdate(() => {
        var currCam = camPos()
        if(currCam.x < player.pos.x){
            camPos(player.pos.x, currCam.y)
        }
    })

    player.collides('pipe', () => {
        keyPress('down', () => {
          let nextLevel = levelNumber + 1
          go('game',nextLevel)
        })
      })

});