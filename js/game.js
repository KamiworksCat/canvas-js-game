let movement = {
  up: false,
  down: false,
  left: false,
  right: false
}
document.addEventListener('keydown', function(event) {
  switch (event.key) {
    case "a": // A
      movement.left = true;
      break;
    case "w": // W
      movement.up = true;
      break;
    case "d": // D
      movement.right = true;
      break;
    case "s": // S
      movement.down = true;
      break;
  }
});
document.addEventListener('keyup', function(event) {
  switch (event.key) {
    case "a": // A
      movement.left = false;
      break;
    case "w": // W
      movement.up = false;
      break;
    case "d": // D
      movement.right = false;
      break;
    case "s": // S
      movement.down = false;
      break;
  }
});
