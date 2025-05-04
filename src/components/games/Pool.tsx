"use client";

import { useEffect, useRef } from "react";
import * as Phaser from "phaser";

class MainScene extends Phaser.Scene {
  balls!: Phaser.Physics.Arcade.Group;
  cueBall!: Phaser.GameObjects.Arc;
  cueStick!: Phaser.GameObjects.Rectangle;
  cueLine!: Phaser.GameObjects.Line;
  powerBar!: Phaser.GameObjects.Rectangle;
  powerIndicator!: Phaser.GameObjects.Rectangle;
  isDragging: boolean = false;
  isSettingPower: boolean = false;
  dragStart: { x: number; y: number } = { x: 0, y: 0 };
  power: number = 0;
  score: number = 0;
  scoreText!: Phaser.GameObjects.Text;

  constructor() {
    super("MainScene");
  }

  preload() {
    // لود منابع (می‌توانید تصاویر چوب یا توپ‌ها را اینجا اضافه کنید)
  }

  create() {
    // میز بیلیارد (عمودی)
    this.add.rectangle(200, 400, 350, 700, 0x006400); // سبز تیره
    this.add
      .rectangle(200, 400, 370, 720, 0xffffff, 0)
      .setStrokeStyle(10, 0x8b4513); // حاشیه قهوه‌ای

    // دیواره‌ها (فیزیکی و گرافیکی)
    const walls = this.physics.add.staticGroup();

    // دیواره بالا
    const wallTop = walls.create(200, 50, undefined) as Phaser.GameObjects.Rectangle;
    wallTop.setSize(350, 20).setDisplaySize(350, 20);
    this.add.rectangle(200, 50, 350, 20, 0x8b4513); // گرافیک
    if (wallTop.body) {
      const staticBody = wallTop.body as Phaser.Physics.Arcade.StaticBody;
      staticBody.bounce.set(1); // Correct property usage
      staticBody.immovable = true;
    }

    // دیواره پایین
    const wallBottom = walls.create(
      200,
      750,
      undefined
    ) as Phaser.GameObjects.Rectangle;
    wallBottom.setSize(350, 20).setDisplaySize(350, 20);
    this.add.rectangle(200, 750, 350, 20, 0x8b4513);
    if (wallBottom.body) {
      const staticBody = wallBottom.body as Phaser.Physics.Arcade.StaticBody;
      staticBody.bounce.set(1); // Correct property usage
      staticBody.immovable = true;
    }

    // دیواره چپ
    const wallLeft = walls.create(
      25,
      400,
      undefined
    ) as Phaser.GameObjects.Rectangle;
    wallLeft.setSize(20, 700).setDisplaySize(20, 700);
    this.add.rectangle(25, 400, 20, 700, 0x8b4513);
    if (wallLeft.body) {
      const staticBody = wallLeft.body as Phaser.Physics.Arcade.StaticBody;
      staticBody.bounce.set(1);
      staticBody.immovable = true;
    }

    // دیواره راست
    const wallRight = walls.create(
      375,
      400,
      undefined
    ) as Phaser.GameObjects.Rectangle;
    wallRight.setSize(20, 700).setDisplaySize(20, 700);
    this.add.rectangle(375, 400, 20, 700, 0x8b4513);
    if (wallRight.body) {
      const staticBody = wallRight.body as Phaser.Physics.Arcade.StaticBody;
      staticBody.bounce.set(1);
      staticBody.immovable = true;
    }

    // توپ‌ها
    this.balls = this.physics.add.group();
    this.cueBall = this.add.circle(200, 600, 10, 0xffffff); // توپ سفید
    this.physics.add.existing(this.cueBall);
    (this.cueBall.body as Phaser.Physics.Arcade.Body)
      .setCircle(10)
      .setBounce(0.9)
      .setDamping(true)
      .setDrag(0.99);
    this.balls.add(this.cueBall);

    const colors = [0xff0000, 0x0000ff, 0xffff00, 0x800080]; // قرمز، آبی، زرد، بنفش
    colors.forEach((color, index) => {
      const ball = this.add.circle(200, 200 + index * 30, 10, color);
      this.physics.add.existing(ball);
      (ball.body as Phaser.Physics.Arcade.Body)
        .setCircle(10)
        .setBounce(0.9)
        .setDamping(true)
        .setDrag(0.99);
      this.balls.add(ball);
    });

    this.physics.add.collider(this.balls, this.balls);
    this.physics.add.collider(this.balls, walls);

    // سوراخ‌ها (گرافیکی و حسگر)
    const pockets = this.physics.add.staticGroup();
    const pocketPositions = [
      { x: 25, y: 50 }, // بالا-چپ
      { x: 375, y: 50 }, // بالا-راست
      { x: 25, y: 400 }, // وسط-چپ
      { x: 375, y: 400 }, // وسط-راست
      { x: 25, y: 750 }, // پایین-چپ
      { x: 375, y: 750 }, // پایین-راست
    ];
    pocketPositions.forEach((pos) => {
      this.add.circle(pos.x, pos.y, 12, 0x000000); // سوراخ گرافیکی
      const pocket = pockets
        .create(pos.x, pos.y, undefined)
        .setDisplaySize(20, 20)
        .setVisible(false);
      pocket.body!.setCircle(10);
      pocket.setData("isPocket", true);
    });
    this.physics.add.overlap(
      this.balls,
      pockets,
      this.handlePocketCollision,
      undefined,
      this 
    );

    // چوب بیلیارد
    this.cueStick = this.add
      .rectangle(200, 600, 100, 4, 0x8b4513)
      .setOrigin(0, 0.5)
      .setVisible(false);

    // خط نشانه‌گیری
    this.cueLine = this.add
      .line(0, 0, 0, 0, 0, 0, 0xffffff)
      .setOrigin(0)
      .setVisible(false);

    // نوار قدرت
    this.powerBar = this.add
      .rectangle(390, 400, 10, 300, 0x333333)
      .setOrigin(0.5);
    this.powerIndicator = this.add
      .rectangle(390, 550, 10, 10, 0xff0000)
      .setOrigin(0.5);
    this.power = 0;

    // امتیاز
    this.scoreText = this.add
      .text(200, 20, "امتیاز: 0", { fontSize: "20px", color: "#fff" })
      .setOrigin(0.5);

    // کنترل لمسی
    this.input.on("pointerdown", this.startDrag, this);
    this.input.on("pointermove", this.updateDrag, this);
    this.input.on("pointerup", this.endDrag, this);
  }

  startDrag(pointer: Phaser.Input.Pointer) {
    if (
      pointer.x > 380 &&
      pointer.x < 400 &&
      pointer.y > 250 &&
      pointer.y < 550
    ) {
      // لمس روی نوار قدرت
      this.isSettingPower = true;
    } else {
      // لمس برای تنظیم جهت
      this.isDragging = true;
      this.dragStart = { x: pointer.x, y: pointer.y };
      this.cueStick.setVisible(true);
      this.cueLine.setVisible(true);
    }
  }

  updateDrag(pointer: Phaser.Input.Pointer) {
    if (this.isDragging) {
      // تنظیم جهت چوب و خط نشانه‌گیری
      const angle = Phaser.Math.Angle.Between(
        this.cueBall.x,
        this.cueBall.y,
        pointer.x,
        pointer.y
      );
      this.cueStick.setAngle(Phaser.Math.RadToDeg(angle));
      this.cueLine.setTo(this.cueBall.x, this.cueBall.y, pointer.x, pointer.y);
    } else if (this.isSettingPower) {
      // تنظیم قدرت
      const y = Phaser.Math.Clamp(pointer.y, 250, 550);
      this.powerIndicator.setY(y);
      this.power = ((550 - y) / 300) * 600; // قدرت بین 0 تا 600
    }
  }

  endDrag(pointer: Phaser.Input.Pointer) {
    if (this.isDragging) {
      this.isDragging = false;
      this.cueStick.setVisible(false);
      this.cueLine.setVisible(false);
    } else if (this.isSettingPower) {
      this.isSettingPower = false;
      // اعمال ضربه
      const angle = Phaser.Math.DegToRad(this.cueStick.angle);
      this.physics.velocityFromRotation(
        angle,
        this.power,
        (this.cueBall.body as Phaser.Physics.Arcade.Body).velocity
      );
    }
  }

  handlePocketCollision(
    ball: any,
    pocket: any
  ) {
    // if (ball === this.cueBall) {
    //   // توپ سفید به موقعیت اولیه برمی‌گردد
    //   ball.setPosition(200, 600);
    //   (ball.body as Phaser.Physics.Arcade.Body).setVelocity(0, 0);
    //   this.scoreText.setText("توپ سفید افتاد! امتیاز: " + this.score);
    // } else {
    //   // حذف توپ رنگی و افزایش امتیاز
    //   ball.destroy();
    //   this.score += 10;
    //   this.scoreText.setText("امتیاز: " + this.score);
    // }
  }

  update() {
    // توقف توپ‌ها اگر سرعتشان خیلی کم باشد
    this.balls.getChildren().forEach((ball) => {
      const body = ball.body as Phaser.Physics.Arcade.Body;
      if (body.speed < 10) {
        body.setVelocity(0, 0);
      }
    });
  }
}

export default function Game() {
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 400,
      height: 800,
      parent: "game-container",
      physics: {
        default: "arcade",
        arcade: {
          gravity: { x: 0, y: 0 },
          debug: true, // برای دیباگ موقت فعال شده
        },
      },
      scene: [MainScene],
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
    };

    gameRef.current = new Phaser.Game(config);

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
      }
    };
  }, []);

  return <div id="game-container" style={{ width: "100%", height: "100vh" }} />;
}
