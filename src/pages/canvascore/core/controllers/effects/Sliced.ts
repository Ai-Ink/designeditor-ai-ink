import {fabric} from 'fabric';

const Sliced = function (text) {
  // Create a Fabric.js Textbox object
  const fabricText = new fabric.Text(text, {
    left: 100,
    top: 100,
    fontFamily: 'Bebas Neue',
    fontWeight: 'bold',
    fontSize: 100,
    fill: 'black',
  });

  // Create a fabric.js Rect object as the clipping path
  const clipPoly = new fabric.Polygon(
    [
      {x: fabricText.left, y: fabricText.top},
      {x: fabricText.left, y: fabricText.top + fabricText.height * 0.58},
      {
        x: fabricText.left + fabricText.width,
        y: fabricText.top + fabricText.height * 0.48,
      },
      {x: fabricText.left + fabricText.width, y: fabricText.top},
    ],
    {
      fill: 'green',
    },
  );

  fabricText.set({
    clipPath: clipPoly,
  });

  //   // Apply the clipping path to the text object
  //   fabricText.clipPath = (ctx: CanvasRenderingContext2D) => {
  //     clipPoly.render(ctx);
  //   };

  var group = new fabric.Group(fabricText, {
    left: 100,
    top: 100,
  });

  //   return group;
  return clipPoly;
};

export default Sliced;
