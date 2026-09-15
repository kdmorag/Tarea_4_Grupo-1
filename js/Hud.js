class Hud {
    // Crea los contadores fijos de vidas, monedas y llaves y escucha las recogidas.
    constructor(scene) {
        this.scene = scene;
        this.vida = 10;
        this.moneda = 0;
        this.llave = 0;

        this.contenedor = scene.add.container(0, 0);
        this.contenedor.setScrollFactor(0);
        this.contenedor.setDepth(999);

        this.vidaText = this.scene.add.text(30, 32, 'Vidas: ' + this.vida, {
            fontSize: '16px',
            color: '#ffffff'
        });
        this.monedaText = this.scene.add.text(200, 32, 'Monedas: ' + this.moneda, {
            fontSize: '16px',
            color: '#ffffff'
        });
        this.llaveText = this.scene.add.text(380, 32, 'Llaves: ' + this.llave, {
            fontSize: '16px',
            color: '#ffffff'
        });
        this.monedaText.setScrollFactor(0);
        this.llaveText.setScrollFactor(0);
        this.contenedor.add(this.vidaText, this.monedaText, this.llaveText);
        this.scene.events.on('get-item', this.updateHud, this);
    };

    // Actualiza el contador correspondiente y aplica el efecto visual de cada tipo de item.
    updateHud(data) {
        const value = Number(data.valor) || 1;

        if (data.tipo == "vida") {
            this.vida += value;
            this.vidaText.setText('Vidas: ' + this.vida);

            this.scene.tweens.add({
                targets: this.vidaText,
                scale: 1.4,
                duration: 100,
                yoyo: true,
                ease: 'Quad.easeOut',
            });

            this.scene.tweens.add({
                targets: data.player,
                scaleX: 1.3,
                scaleY: 1.3,
                duration: 100,
                yoyo: true,
                ease: 'Quad.easeOut',
                onStart: () => {
                    data.player.setTint(0x00ff66);
                },
                onComplete: () => {
                    data.player.clearTint();
                }
            });
        } else if (data.tipo == "moneda") {
            this.moneda += value;
            this.monedaText.setText('Monedas: ' + this.moneda);

            // Efecto texto moneda
            this.scene.tweens.add({
                targets: this.monedaText,
                scale: 1.4,
                duration: 100,
                yoyo: true,
                ease: 'Quad.easeOut'
            });

            // Efecto player giro y tinte dorado
            this.scene.tweens.add({
                targets: data.player,
                angle: 360,
                duration: 250,
                ease: 'Linear',
                onStart: () => {
                    data.player.setTint(0xffd700);
                },
                onComplete: () => {
                    data.player.clearTint();
                    data.player.angle = 0;
                },
            });
        } else if (data.tipo == "llave") {
            this.llave += value;
            this.llaveText.setText('Llaves: ' + this.llave);

            // Efecto texto llave
            this.scene.tweens.add({
                targets: this.llaveText,
                scale: 1.4,
                duration: 100,
                yoyo: true,
                ease: 'Quad.easeOut'
            });

            // Efecto player estiramiento elástico y tinte cian
            this.scene.tweens.add({
                targets: data.player,
                scaleX: 0.8,
                scaleY: 1.4,
                duration: 120,
                yoyo: true,
                ease: 'Sine.easeInOut',
                onStart: () => data.player.setTint(0x00ffff),
                onComplete: () => data.player.clearTint(),
            });
        }
    }
}