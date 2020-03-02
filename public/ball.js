function Ball(x, y, color) {
    console.log(`(${x}, ${y}) - ${color}`)
    fill(color);
    ellipse(x, y, 20, 20);
}
