import {fabric} from 'fabric';

const Vibes = function (text, repetitions, colors) {
  if (colors === null || colors === undefined) {
    colors = [
      '#fefefe',
      '#ff9b00',
      '#ff3434',
      '#db38f0',
      '#0096fb',
      '#00c500',
      '#ffd200',
    ];
  }

  console.log(colors);

  var objects = [];

  for (var i = repetitions; i >= 0; i--) {
    var txt = new fabric.Text(text, {
      fontFamily: 'Bebas Neue',
      fontSize: 100,
      shadow: 'rgba(0,0,0,0.3) 5px 5px 5px',
      fill: colors[i],
      stroke: 'black', // Set the border color
      strokeWidth: 2, // Set the border width
      left: 100 + i * 10,
      top: 100 - i * 10,
    });
    objects.push(txt);
  }

  console.log(objects);

  objects.forEach(function (obj) {
    console.log(obj.left, ',' + obj.top);
  });

  var group = new fabric.Group(objects, {
    left: 100,
    top: 100,
  });

  return group;
};

export default Vibes;
