export class Color {
  red: number
  green: number
  blue: number

  constructor(red: number, green: number, blue: number) {
    this.red = red
    this.green = green
    this.blue = blue
  }

  add(color: Color): Color {
    return new Color(
      this.red + color.red,
      this.green + color.green,
      this.blue + color.blue
    )
  }

  subtract(color: Color): Color {
    return new Color(
      this.red - color.red,
      this.green - color.green,
      this.blue - color.blue
    )
  }

  multiplyByScalar(scalar: number): Color {
    if (scalar == 0) return new Color(0, 0, 0)
    return new Color(this.red * scalar, this.green * scalar, this.blue * scalar)
  }

  multiplyByColor(color: Color): Color {
    return new Color(
      this.red * color.red,
      this.green * color.green,
      this.blue * color.blue
    )
  }

  rgb(): Color {
    return new Color(
      Math.round(this.red * 255),
      Math.round(this.green * 255),
      Math.round(this.blue * 255)
    )
  }
}
