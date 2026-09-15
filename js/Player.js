class Player extends Phaser.Physics.Arcade.Sprite {
    // Inicializa el personaje, su física, controles y animación inicial.
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture, 0);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Configurar cuerpo de colisión alineado con los pies del sprite
        // Sprite es 96x80 px - la caja va desde los pies hacia arriba
        this.body.setSize(20, 32);
        this.body.setOffset(37, 28);

        // Activar gravedad para el personaje
        this.body.setAllowGravity(true);
        this.setCollideWorldBounds(true);

        // Teclas de input: flechas y espacio para salto
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.jumpKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Control de orientación horizontal del sprite
        this.isFacingRight = true;

        // Reproducir animación idle al iniciar
        this.play('idle');
    }

    // Lee los controles, mueve al personaje y selecciona su animación actual.
    update() {
        // Verificar si el jugador está en el suelo
        const onGround = this.body.blocked.down || this.body.touching.down;
        const vx = this.body.velocity.x;

        // --- Movimiento horizontal ---
        if (this.cursors.left.isDown) {
            this.setVelocityX(-160);
            this.setFlipX(true);
            this.isFacingRight = false;
        } else if (this.cursors.right.isDown) {
            this.setVelocityX(160);
            this.setFlipX(false);
            this.isFacingRight = true;
        } else {
            this.setVelocityX(0);
        }

        // --- Salto (solo permite un salto desde el suelo) ---
        if (Phaser.Input.Keyboard.JustDown(this.jumpKey) && onGround) {
            this.setVelocityY(-330);
        }
        if (Phaser.Input.Keyboard.JustDown(this.cursors.up) && onGround) {
            this.setVelocityY(-330);
        }

        // --- Transiciones de animación ---
        if (!onGround) {
            // En el aire → animación de salto
            if (this.anims.currentAnim.key !== 'jump') {
                this.play('jump');
            }
        } else if (Math.abs(vx) > 10) {
            // Movimiento horizontal en el suelo → animación de correr
            if (this.anims.currentAnim.key !== 'run') {
                this.play('run');
            }
        } else {
            // Sin movimiento en el suelo → animación idle
            if (this.anims.currentAnim.key !== 'idle') {
                this.play('idle');
            }
        }
    }
}
