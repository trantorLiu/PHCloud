var phcloud = {
  color: color
};

var colors = [
  [80, 81, 79],
  [242, 95, 92],
  [255, 224, 102],
  [36, 123, 160],
  [112, 193, 179],
  [222, 239, 183],
  [152, 223, 175],
  [95, 180, 156],
  [65, 66, 136],
  [104, 45, 99],
  [237, 175, 184],
  [247, 225, 215],
  [222, 219, 210],
  [176, 196, 177],
  [74, 87, 89],
  [237, 106, 90],
  [244, 241, 187],
  [155, 193, 188],
  [230, 235, 224],
  [54, 201, 198],
];

function color(i, opacity) {
  var rgba;

  opacity = opacity || 1;

  rgba = colors[i % colors.length];

  return "rgba(" + rgba.concat([opacity]).join(', ') + ")";
}

Chart.defaults.global.responsive = true;