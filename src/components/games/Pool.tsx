"use client";

import { useEffect, useRef } from "react";
import * as Phaser from "phaser";

export default function Game() {
  const gameRef = useRef<HTMLDivElement>(null);
  const phaserGame = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (!gameRef.current) return;

    const createGame = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width,
        height,
        parent: gameRef.current!,
        physics: {
          default: "arcade",
          arcade: {
            gravity: { x: 0, y: 0 },
            debug: false,
          },
        },
        scene: {
          preload,
          create,
          update,
        },
        scale: {
          mode: Phaser.Scale.RESIZE,
          autoCenter: Phaser.Scale.CENTER_BOTH,
        },
      };

      phaserGame.current = new Phaser.Game(config);
    };

    createGame();

    function preload(this: Phaser.Scene) {
      this.load.image("table", "/assets/pool/table.png");
      this.load.image("cueball", "/assets/pool/cue.png");

      for (let i = 1; i <= 15; i++) {
        this.load.image(`ball${i}`, `/assets/pool/ball_${i}.png`);
      }
    }

    let cueBall: Phaser.Physics.Arcade.Image;

    function create(this: Phaser.Scene) {
      const { width, height } = this.scale;

      this.add
        .image(width / 2, height / 2, "table")
        .setDisplaySize(width, height);

      const balls: Phaser.Physics.Arcade.Image[] = [];
      const ballRadius = 15;
      const offset = ballRadius * 2 + 2;
      const rackStartX = width / 2;
      const rackStartY = height / 4;

      let ballIndex = 1;
      for (let row = 0; row < 5; row++) {
        for (let col = 0; col <= row; col++) {
          const x = rackStartX + (col - row / 2) * offset;
          const y = rackStartY + row * (offset - 4);
          const ball = this.physics.add
            .image(x, y, `ball${ballIndex}`)
            .setCircle(ballRadius)
            .setBounce(1)
            .setCollideWorldBounds(true);
          balls.push(ball);
          ballIndex++;
          if (ballIndex > 15) break;
        }
      }

      cueBall = this.physics.add
        .image(width / 2, height * 0.75, "cueball")
        .setCircle(ballRadius)
        .setBounce(1)
        .setCollideWorldBounds(true);

      this.physics.add.collider(balls, balls);
      balls.forEach((ball) => {
        this.physics.add.collider(ball, cueBall);
      });

      this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
        const angle = Phaser.Math.Angle.Between(
          cueBall.x,
          cueBall.y,
          pointer.x,
          pointer.y
        );
        const force = 600;
        cueBall.setVelocity(Math.cos(angle) * force, Math.sin(angle) * force);
      });
    }

    function update(this: Phaser.Scene) {}

    const handleResize = () => {
      phaserGame.current?.scale.resize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      phaserGame.current?.destroy(true);
    };
  }, []);

  return <div ref={gameRef} className="w-full h-full mb-20" />;
}
