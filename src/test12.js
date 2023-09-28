const mainScene = new Phaser.Scene('MainScene');

mainScene.preload = function() {
    // スプライト画像の読み込み
    this.load.spritesheet('stars', './assets/images/stars.png',{
        frameWidth : 190,
        frameHeight : 190,
    });
    
    // スプライト画像の読み込み
    this.load.image('cloud', './assets/images/white_cloud.png');    
};

mainScene.create = function() {
    this.initialize();
    this.createFixedParticle();
    //this.createParticle();
};

mainScene.initialize = function() {
    // 画面幅
    this.width = this.game.config.width;
    // 画面高さ
    this.height = this.game.config.height;
};

mainScene.createParticle = function() {
    // 画面幅
    const width = this.game.config.width;
    // 画面高さ
    const height = this.game.config.height;

    // エミッターの領域は全画面
    const emitZone = new Phaser.Geom.Rectangle(0, 0, width, height);
    
    // パーティクル作成
    const particles = this.add.particles('cloud');
    // エミッター起動
    const emitter = particles.createEmitter({
        emitZone: { source: emitZone },
        speed: { min: -20, max: 20 },
        scale: { min: 0.4, max: 0.6 },
        alpha: { start: 1, end: 0 },
        frequency : 800,
        lifespan: 5000,
        blendMode: 'COLOR',
    });
};

mainScene.createFixedParticle = function() {
    this.index = 0;
    /*
    this.cloudData = [{
        x:this.width / 6, 
        y:this.height / 8, 
        text:"Python"
    },{
        x:(this.width / 4) * 3,
        y:(this.height / 4) * 3, 
        text:" Java "
    },{
        x: (this.width / 4) * 3, 
        y: (this.height / 4) * 1, 
        text:" C# "
    },{
        x:(this.width / 4) * 1,
        y:(this.height / 4) * 3,
        text:"Cloud"
    },{
        x:(this.width / 8) * 6, 
        y:(this.height / 8) * 4,
        text:"GAME"
    },];
    */
    this.cloudData = [
        {text:"Python"},
        {text:" Java "},
        {text:"  C#  "},
        {text:"Cloud"},
        {text:" Game "},
        {text:"Object"},
        {text:" Math "},
        {text:"Science"},
        {text:" Robot "},
        {text:"Big Data"},
    ];
    
    this.cloudTimer = this.time.addEvent({
        delay: 500,
        callback : this.createCloud,
        loop : true,
        callbackScope : this,
    });
};

mainScene.createCloud = function() {
    const {x, y, text} = this.cloudData[this.index];
    //this.index = this.index % this.cloudData.length
    this.index++;
    this.index = this.index % this.cloudData.length;
    
    const c1 = this.physics.add.image(0, 0, 'cloud');
    c1.setOrigin(0);
    c1.setScale(0.5);
    
    const t1 = this.add.text(100,100, text);
    t1.setOrigin(0);
    t1.setFontSize(40);
    t1.setFontFamily('M PLUS');
    t1.setFill('#708090');
    
    const cloudContainer = this.add.container();
    cloudContainer.setRandomPosition(0,0, this.width-c1.displayWidth, this.height-c1.displayHeight);
    //cloudContainer.setPosition(x, y);
    cloudContainer.add(c1);
    cloudContainer.add(t1);

    this.tweens.add({
        targets: cloudContainer,
        alpha: { from: 1, to: 0.0 },
        ease: 'Sine.InOut',
        duration: 2500,
        repeat: 0,
    });
    
    cloudContainer.timer = this.time.addEvent({
        delay: 2500,
        callback : this.destroyContainer,
        loop: false,
        callbackScope: this,
        args : [cloudContainer],
    });
};

mainScene.destroyContainer = function(container) {
    container.destroy();
};

const bodyList = document.getElementsByTagName('body');
const width = bodyList[0].clientWidth;

const config = {
    parent : 'root',
    type: Phaser.AUTO,
    width: width,
    height: window.innerHeight,
    backgroundColor: '#87CEFA',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
        }
    },
    scene: [mainScene],
};

const game = new Phaser.Game(config);

window.addEventListener("resize", (event) => {
    game.scale.resize(width, window.innerHeight);
},false);
