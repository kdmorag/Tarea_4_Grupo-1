class Mundo1 extends Phaser.Scene {
    constructor() {
        super("Mundo1");
    }

    // Carga las imágenes y spritesheets utilizados por el escenario y el jugador.
    preload() {
        this.load.image("fondo", "assets/img/fondotech.png");
        this.load.image("plataforma", "assets/img/plataforma.png");

        this.load.spritesheet("plataformas", "assets/img/plataformas.png", {
            frameWidth: 32,
            frameHeight: 16
        });

        this.load.spritesheet("items", "assets/img/ui.png", {
            frameWidth: 32,
            frameHeight: 32
        });

        // Spritesheet idle: 8x4 frames de 96x80 px
        this.load.spritesheet('idle_spritesheet',
            'assets/img/player/quieto/idle_80_80.png',
            { frameWidth: 96, frameHeight: 80 }
        );

        // Spritesheet correr: 8x4 frames de 96x80 px
        this.load.spritesheet('run_spritesheet',
            'assets/img/player/correr/run_80_80.png',
            { frameWidth: 96, frameHeight: 80 }
        );

        // Spritesheet ataque (referencia para jump): 8x4 frames de 96x80 px
        this.load.spritesheet('attack_spritesheet',
            'assets/img/player/ataque/attack_80_80.png',
            { frameWidth: 96, frameHeight: 80 }
        );
    }

    // Construye el nivel, registra físicas, recogidas, daño por fuego, cámara y HUD.
    create() {
        this.add.image(250, 250, "fondo");

        //  Crear animaciones del jugador
        this.crearAnimaciones();

        //Llamada al player
        this.player = new Player(this, -60, 420, "idle_spritesheet");

        //Llamada a Items
        this.itemsgroup = this.physics.add.staticGroup();
        this.itemsgroup.add(new Items(this, -195, 380, "items", "vida", 1));
        this.itemsgroup.add(new Items(this, 90, 385, "items", "moneda", 1));
        this.itemsgroup.add(new Items(this, -39, 345, "items", "moneda", 1));
        this.itemsgroup.add(new Items(this, -140, 285, "items", "moneda", 1));
        this.itemsgroup.add(new Items(this, -60, 225, "items", "moneda", 1));
        this.itemsgroup.add(new Items(this, -180, 185, "items", "moneda", 1));
        this.itemsgroup.add(new Items(this, -80, 125, "items", "moneda", 1));
        this.itemsgroup.add(new Items(this, 60, 165, "items", "moneda", 1));
        this.itemsgroup.add(new Items(this, -200, 83, "items", "llave", 1));
        this.itemsgroup.add(new Items(this, 90, 265, "items", "moneda", 1));
        this.itemsgroup.add(new Items(this, 180, 310, "items", "vida", 1));
        this.itemsgroup.add(new Items(this, 150, 125, "items", "moneda", 1));
        this.itemsgroup.add(new Items(this, 50, 75, "items", "vida", 1));
        this.itemsgroup.add(new Items(this, 200, 65, "items", "llave", 1));
        this.itemsgroup.add(new Items(this, 260, 425, "items", "moneda", 1));
        this.itemsgroup.add(new Items(this, 280, 305, "items", "moneda", 1));
        this.itemsgroup.add(new Items(this, 300, 195, "items", "moneda", 1));
        this.itemsgroup.add(new Items(this, 400, 245, "items", "moneda", 1));
        this.itemsgroup.add(new Items(this, 690, 385, "items", "moneda", 1));
        this.itemsgroup.add(new Items(this, 600, 345, "items", "moneda", 1));
        this.itemsgroup.add(new Items(this, 500, 295, "items", "vida", 1));
        this.itemsgroup.add(new Items(this, 690, 285, "items", "moneda", 1));
        this.itemsgroup.add(new Items(this, 600, 225, "items", "moneda", 1));
        this.itemsgroup.add(new Items(this, 690, 165, "items", "moneda", 1));
        this.itemsgroup.add(new Items(this, 600, 105, "items", "moneda", 1));
        this.itemsgroup.add(new Items(this, 690, 65, "items", "llave", 1));
        this.itemsgroup.add(new Items(this, 480, 145, "items", "vida", 1));
        this.itemsgroup.add(new Items(this, 350, 85, "items", "moneda", 1));

        //Piso
        this.suelos = this.physics.add.staticGroup();
        this.suelos.create(-35, 480, "plataforma");
        this.suelos.create(540, 480, "plataforma");
        this.crearFuegoCentro();

        //plataformas escalar
        this.suelos.create(-195, 400, "plataformas", 0);
        this.suelos.create(90, 400, "plataformas", 0);
        this.suelos.create(-40, 360, "plataformas", 0);
        this.suelos.create(-140, 300, "plataformas", 0);
        this.suelos.create(-60, 240, "plataformas", 0);
        this.suelos.create(-180, 200, "plataformas", 0);
        this.suelos.create(-80, 140, "plataformas", 0);
        this.suelos.create(-200, 100, "plataformas", 0);
        this.suelos.create(690, 400, "plataformas", 0);
        this.suelos.create(600, 360, "plataformas", 0);
        this.suelos.create(690, 300, "plataformas", 0);
        this.suelos.create(500, 310, "plataformas", 0);
        this.suelos.create(400, 260, "plataformas", 0);
        this.suelos.create(300, 210, "plataformas", 0);
        this.suelos.create(60, 180, "plataformas", 0);
        this.suelos.create(90, 280, "plataformas", 0);
        this.suelos.create(180, 330, "plataformas", 0);
        this.suelos.create(150, 140, "plataformas", 0);
        this.suelos.create(50, 90, "plataformas", 0);
        this.suelos.create(200, 80, "plataformas", 0);
        this.suelos.create(260, 440, "plataformas", 0);
        this.suelos.create(280, 320, "plataformas", 0);
        this.suelos.create(350, 100, "plataformas", 0);
        this.suelos.create(600, 240, "plataformas", 0);
        this.suelos.create(690, 180, "plataformas", 0);
        this.suelos.create(600, 120, "plataformas", 0);
        this.suelos.create(690, 80, "plataformas", 0);
        this.suelos.create(480, 160, "plataformas", 0);
        this.crearMuros();

        this.physics.add.collider(this.player, this.suelos);
        this.physics.add.collider(this.itemsgroup, this.suelos);

        // Recoge los items cuando el cuerpo del jugador entra en contacto con ellos.
        this.physics.add.overlap(this.player, this.itemsgroup,
            (player, item) => {
                item.collet(this.player);
            }
        );

        // Evita descontar varias vidas durante el mismo contacto con el fuego.
        let fireDamageCooldown = false;
        this.physics.add.overlap(this.player, this.fireZone, () => {
            if (fireDamageCooldown) return;

            fireDamageCooldown = true;
            this.hud.vida = Math.max(0, this.hud.vida - 1);
            this.hud.vidaText.setText('Vidas: ' + this.hud.vida);

            this.hud.vidaText.setColor('#ff4d4d');
            this.hud.scene.tweens.add({
                targets: this.hud.vidaText,
                scale: 1.5,
                duration: 120,
                yoyo: true,
                ease: 'Quad.easeOut',
                onComplete: () => this.hud.vidaText.setColor('#ffffff')
            });

            this.player.setTint(0xff0000);
            this.time.delayedCall(180, () => {
                this.player.clearTint();
                fireDamageCooldown = false;
            });
        });

        // Configura los límites físicos y visuales de la cámara.
        this.wordWidth = 1000;
        this.worldHeight = 500;
        this.cameras.main.startFollow(this.player);
        this.physics.world.setBounds(-250, 0, this.wordWidth, this.worldHeight);
        this.cameras.main.setBounds(-250, 0, this.wordWidth, this.worldHeight);

        this.hud = new Hud(this);
    }

    // Coloca las llamas en el hueco central y anima sus frames y transparencia.
    crearFuegoCentro() {
        const fireFrames = [42, 43, 44, 45, 46, 47];
        // Usa los bordes de los dos pisos para mantener el fuego dentro del hueco.
        const pisos = this.suelos.getChildren();
        const startX = pisos[0].getBounds().right;
        const endX = pisos[1].getBounds().left;
        const ancho = endX - startX;
        const cantidad = 5;
        const anchoLlama = ancho / cantidad;
        const altoLlama = 32 * 1.2;
        const y = 470;

        this.fireZone = this.add.zone((startX + endX) / 2, y, ancho, altoLlama);
        this.physics.add.existing(this.fireZone, true);

        for (let i = 0; i < cantidad; i++) {
            const fuego = this.add.sprite(startX + anchoLlama * (i + 0.5), y, "items", fireFrames[0]);
            fuego.setDepth(15);
            fuego.setDisplaySize(anchoLlama, altoLlama);

            let index = 0;
            this.time.addEvent({
                delay: 120,
                loop: true,
                callback: () => {
                    index = (index + 1) % fireFrames.length;
                    fuego.setFrame(fireFrames[index]);
                }
            });

            this.tweens.add({
                targets: fuego,
                alpha: { from: 0.7, to: 1 },
                duration: 260,
                yoyo: true,
                repeat: -1,
                delay: i * 40
            });
        }
    }

    // Construye los muros laterales y el límite superior del escenario.
    crearMuros() {
        //Nuro en Y
        let alto = 465;
        let ancho = 730;

        //lado derecho
        for (let i = 0; i < 22; i++) {
            alto -= 20;
            this.suelos.create(730, alto, "plataformas", 1)
        }
        //lado izquierdo
        alto = 465;
        for (let i = 0; i < 22; i++) {
            alto -= 20;
            this.suelos.create(-230, alto, "plataformas", 1)
        }

        for (let i = 0; i < 40; i++) {
            ancho -= 32;
            this.suelos.create(ancho, 24, "plataformas", 1)
        }
    }

    // Delega la actualización de movimiento y animación al jugador en cada frame.
    update() {
        this.player.update();
    }

    /**
     - Crea las tres animaciones del jugador:
     - idle (reposo), run (correr), jump (saltar).
     - Se usa la fila 0 del spritesheet (frente/abajo) para todas.
     - La orientación se gestiona con flipX en Player.js.
     */
    crearAnimaciones() {
        // Idle: frames 0-3 de la fila 0 (reposo, respiración)
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('idle_spritesheet',
                { start: 0, end: 3 }),
            frameRate: 6,
            repeat: -1
        });

        // Run: frames 0-7 de la fila 0 (correr)
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('run_spritesheet',
                { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        // Salto: frames 0-7 del spritesheet attack (poses dinámicas de ataque/salto)
        // Se reutiliza el spritesheet de ataque ya que muestra al personaje en movimiento
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('attack_spritesheet',
                { start: 0, end: 7 }),
            frameRate: 12,
            repeat: -1
        });
    }
}
