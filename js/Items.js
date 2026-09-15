class Items extends Phaser.Physics.Arcade.Sprite {
    // Crea un item con su sprite, efecto visual y comportamiento animado según el tipo.
    constructor(scene, x, y, texture, tipo, valor) {
        let tipoItem = tipo ?? "moneda";

        let frameIndex = 0;
        let coinFrames = [4, 5, 6, 7];
        let keyFrames = [12, 13, 14, 15];

        switch (tipoItem) {
            case "vida":
                frameIndex = 0;
                break;
            case "moneda":
                frameIndex = coinFrames[0];
                break;
            case "llave":
                frameIndex = keyFrames[0];
                break;
            default:
                frameIndex = 0;
        }

        super(scene, x, y, texture, frameIndex);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.tipo = tipoItem;
        this.valor = 1;
        this.collected = false;
        this.baseScale = this.tipo === "moneda" ? 0.6 : this.tipo === "llave" ? 0.48 : 0.4;
        this.setScale(this.baseScale);
        this.setDepth(10);

        if (this.tipo === "moneda") {
            this.coinFrames = coinFrames;
            this.coinFrameIndex = 0;
            this.scene.time.addEvent({
                delay: 170,
                loop: true,
                callback: () => {
                    this.coinFrameIndex = (this.coinFrameIndex + 1) % this.coinFrames.length;
                    this.setFrame(this.coinFrames[this.coinFrameIndex]);
                }
            });
        }

        if (this.tipo === "llave") {
            this.keyFrames = keyFrames;
            this.keyFrameIndex = 0;
            this.scene.time.addEvent({
                delay: 170,
                loop: true,
                callback: () => {
                    this.keyFrameIndex = (this.keyFrameIndex + 1) % this.keyFrames.length;
                    this.setFrame(this.keyFrames[this.keyFrameIndex]);
                }
            });

            this.scene.tweens.add({
                targets: this,
                scaleX: this.baseScale * 1.25,
                scaleY: this.baseScale * 1.25,
                duration: 700,
                ease: 'Sine.easeInOut',
                yoyo: true,
                repeat: -1
            });

            this.scene.tweens.add({
                targets: this,
                y: this.y - 6,
                duration: 700,
                ease: 'Sine.easeInOut',
                yoyo: true,
                repeat: -1
            });

            this.setTint(0xffd93d);
        }

        const tintByType = {
            vida: 0xff5c7a,
            moneda: 0xffd166,
            llave: 0xffd93d
        };

        this.setTint(tintByType[this.tipo] ?? 0xffffff);

        if (this.tipo === "vida") {
            this.scene.tweens.add({
                targets: this,
                scaleX: this.baseScale * 1.2,
                scaleY: this.baseScale * 1.2,
                duration: 500,
                ease: 'Sine.easeInOut',
                yoyo: true,
                repeat: -1
            });
        }
    }

    // Emite la recogida una sola vez, desactiva la colisión y reproduce el desvanecimiento.
    collet(player) {
        if (this.collected) return;

        this.collected = true;
        this.scene.events.emit('get-item', {
            tipo: this.tipo,
            valor: this.valor,
            player: player
        });

        this.setActive(false);
        this.setVisible(false);
        if (this.body) {
            this.body.enable = false;
        }

        this.scene.tweens.add({
            targets: this,
            scaleX: this.baseScale * 1.5,
            scaleY: this.baseScale * 1.5,
            alpha: 0,
            duration: 120,
            ease: 'Cubic.easeOut',
            onComplete: () => this.destroy()
        });
    }
}