import {fabric} from 'fabric';

(function (global) {
  'use strict';

  if (fabric.CurvedText) {
    fabric.warn('fabric.CurvedText is already defined');
    return;
  }

  fabric.CurvedText = fabric.util.createClass(fabric.Text, {
    type: 'curvedText',
    radius: 50,
    range: 5,
    smallFont: 10,
    largeFont: 30,
    effect: 'curved',
    spacing: 20,

    stateProperties: fabric.Text.prototype.stateProperties.concat([
      'radius',
      'spacing',
      'reverse',
      'effect',
      'range',
      'largeFont',
      'smallFont',
    ]),

    delegatedProperties: fabric.Group.prototype.delegatedProperties,

    _dimensionAffectingProps: fabric.util.object.extend(
      {},
      fabric.Text.prototype._dimensionAffectingProps,
      {
        radius: true,
        spacing: true,
        reverse: true,
        fill: true,
        effect: true,
        width: true,
        height: true,
        range: true,
        fontSize: true,
        shadow: true,
        largeFont: true,
        smallFont: true,
      },
    ),

    _isRendering: 0,

    complexity: function () {
      this.callSuper('complexity');
    },

    initialize: function (text, options) {
      this.extend = fabric.util.object.extend;
      this.clone = fabric.util.object.clone;

      options = options || {};
      this.letters = new fabric.Group([], {
        selectable: false,
        padding: 0,
      });
      this.__skipDimension = true;
      this.setOptions(options);
      this.__skipDimension = false;

      if (parseFloat(fabric.version) >= 2) {
        this.callSuper('initialize', text, options);
      }

      this.setText(text);
      this._render();
    },

    setText: function (text) {
      if (this.letters) {
        while (text.length !== 0 && this.letters.size() >= text.length) {
          this.letters.remove(this.letters.item(this.letters.size() - 1));
        }
        for (var i = 0; i < text.length; i++) {
          //I need to pass the options from the main options
          if (this.letters.item(i) === undefined) {
            this.letters.add(new fabric.Text(text[i]));
          } else {
            this.letters.item(i).setText(text[i]);
          }
        }
      }
      this.callSuper('setText', text);
      this._render();
    },

    _getTextDimensions: function (text, font) {
      // Create a temporary canvas element
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');

      // Set the font properties
      context.font = font;

      // Measure the width and height of the text
      var metrics = context.measureText(text);
      var width = metrics.width;
      var height =
        metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

      // Clean up the temporary canvas
      context.clearRect(0, 0, canvas.width, canvas.height);
      canvas = null;

      return {
        width: width,
        height: height,
      };
    },
    _initDimensions: function (ctx) {
      // from fabric.Text.prototype._initDimensions
      // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
      if (this.__skipDimension) {
        return;
      }
      if (!ctx) {
        ctx = fabric.util.createCanvasElement().getContext('2d');
        this._setTextStyles(ctx);
      }
      this._textLines = this.text.split(this._reNewline);
      this._clearCache();
      var currentTextAlign = this.textAlign;
      this.textAlign = 'left';
      this.textAlign = currentTextAlign;

      var dimensions = this._getTextDimensions(this.text, this.font);
      this.width = dimensions.width;
      this.height = dimensions.height;

      // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
      this._render(ctx);
    },
    _setAngleForLetters: function (letters, angle) {
      console.log(letters);
      letters.forEachObject(function (letter) {
        letter.set({angle: angle});
      });
    },

    _render: function () {
      var renderingCode = fabric.util.getRandomInt(100, 999);
      this._isRendering = renderingCode;
      if (this.letters) {
        var curAngle = 0,
          curAngleRotation = 0,
          angleRadians = 0,
          align = 0,
          textWidth = 0,
          space = parseInt(this.spacing),
          fixedLetterAngle = 0;

        //get text width
        if (this.effect === 'curved') {
          for (var i = 0, len = this.text.length; i < len; i++) {
            textWidth += this.letters.item(i).width + space;
          }
          textWidth -= space;
        } else if (this.effect === 'arc') {
          fixedLetterAngle =
            (this.letters.item(0).fontSize + space) /
            this.radius /
            (Math.PI / 180);
          textWidth =
            (this.text.length + 1) * (this.letters.item(0).fontSize + space);
        }
        // Text align
        if (this.get('textAlign') === 'right') {
          curAngle = 90 - textWidth / 2 / this.radius / (Math.PI / 180);
        } else if (this.get('textAlign') === 'left') {
          curAngle = -90 - textWidth / 2 / this.radius / (Math.PI / 180);
        } else {
          curAngle = -(textWidth / 2 / this.radius / (Math.PI / 180));
        }
        if (this.reverse) curAngle = -curAngle;

        var width = 0,
          multiplier = this.reverse ? -1 : 1,
          thisLetterAngle = 0,
          lastLetterAngle = 0;

        for (var i = 0, len = this.text.length; i < len; i++) {
          if (renderingCode !== this._isRendering) return;

          for (var key in this.delegatedProperties) {
            this.letters.item(i).set(key, this.get(key));
          }

          this.letters.item(i).set('left', width);
          this.letters.item(i).set('top', 0);
          this._setAngleForLetters(this.letters, 0);
          this.letters.item(i).set('padding', 0);

          if (this.effect === 'curved') {
            thisLetterAngle =
              (this.letters.item(i).width + space) /
              this.radius /
              (Math.PI / 180);
            curAngle = multiplier * (multiplier * curAngle + lastLetterAngle);
            angleRadians = curAngle * (Math.PI / 180);
            lastLetterAngle = thisLetterAngle;

            this._setAngleForLetters(this.letters, curAngle);
            this.letters
              .item(i)
              .set(
                'top',
                multiplier * -1 * (Math.cos(angleRadians) * this.radius),
              );
            this.letters
              .item(i)
              .set('left', multiplier * (Math.sin(angleRadians) * this.radius));
            this.letters.item(i).set('padding', 0);
            this.letters.item(i).set('selectable', false);
          } else if (this.effect === 'arc') {
            //arc
            curAngle = multiplier * (multiplier * curAngle + fixedLetterAngle);
            angleRadians = curAngle * (Math.PI / 180);

            this.letters
              .item(i)
              .set(
                'top',
                multiplier * -1 * (Math.cos(angleRadians) * this.radius),
              );
            this.letters
              .item(i)
              .set('left', multiplier * (Math.sin(angleRadians) * this.radius));
            this.letters.item(i).set('padding', 0);
            this.letters.item(i).set('selectable', false);
          } else if (this.effect === 'STRAIGHT') {
            //STRAIGHT
            this.letters.item(i).set('left', width);
            this.letters.item(i).set('top', 0);
            this._setAngleForLetters(this.letters, 0);
            width += this.letters.item(i).get('width');
            this.letters.item(i).set('padding', 0);
            this.letters.item(i).set({
              borderColor: 'red',
              cornerColor: 'green',
              cornerSize: 6,
              transparentCorners: false,
            });
            this.letters.item(i).set('selectable', false);
          } else if (this.effect === 'smallToLarge') {
            //smallToLarge
            var small = parseInt(this.smallFont);
            var large = parseInt(this.largeFont);
            var difference = large - small;
            var center = Math.ceil(this.text.length / 2);
            var step = difference / this.text.length;
            var newfont = small + i * step;

            this.letters.item(i).set('fontSize', newfont);

            this.letters.item(i).set('left', width);
            width += this.letters.item(i).get('width');
            this.letters.item(i).set('padding', 0);
            this.letters.item(i).set('selectable', false);
            this.letters
              .item(i)
              .set('top', -1 * this.letters.item(i).get('fontSize') + i);
          } else if (this.effect === 'largeToSmallTop') {
            //largeToSmallTop
            var small = parseInt(this.largeFont);
            var large = parseInt(this.smallFont);
            var difference = large - small;
            var center = Math.ceil(this.text.length / 2);
            var step = difference / this.text.length;
            var newfont = small + i * step;
            this.letters.item(i).set('fontSize', newfont);
            this.letters.item(i).set('left', width);
            width += this.letters.item(i).get('width');
            this.letters.item(i).set('padding', 0);
            this.letters.item(i).set({
              borderColor: 'red',
              cornerColor: 'green',
              cornerSize: 6,
              transparentCorners: false,
            });
            this.letters.item(i).set('padding', 0);
            this.letters.item(i).set('selectable', false);
            this.letters.item(i).top =
              -1 * this.letters.item(i).get('fontSize') + i / this.text.length;
          } else if (this.effect === 'largeToSmallBottom') {
            var small = parseInt(this.largeFont);
            var large = parseInt(this.smallFont);
            var difference = large - small;
            var center = Math.ceil(this.text.length / 2);
            var step = difference / this.text.length;
            var newfont = small + i * step;
            this.letters.item(i).set('fontSize', newfont);
            this.letters.item(i).set('left', width);
            width += this.letters.item(i).get('width');
            this.letters.item(i).set('padding', 0);
            this.letters.item(i).set({
              borderColor: 'red',
              cornerColor: 'green',
              cornerSize: 6,
              transparentCorners: false,
            });
            this.letters.item(i).set('padding', 0);
            this.letters.item(i).set('selectable', false);
            this.letters.item(i).top =
              -1 * this.letters.item(i).get('fontSize') - i;
          } else if (this.effect === 'bulge') {
            //bulge
            var small = parseInt(this.smallFont);
            var large = parseInt(this.largeFont);
            var difference = large - small;
            var center = Math.ceil(this.text.length / 2);
            var step = difference / (this.text.length - center);
            if (i < center) var newfont = small + i * step;
            else var newfont = large - (i - center + 1) * step;
            this.letters.item(i).set('fontSize', newfont);

            this.letters.item(i).set('left', width);
            width += this.letters.item(i).get('width');

            this.letters.item(i).set('padding', 0);
            this.letters.item(i).set('selectable', false);

            this.letters
              .item(i)
              .set('top', (-1 * this.letters.item(i).get('height')) / 2);
          }
        }

        var scaleX = this.letters.get('scaleX');
        var scaleY = this.letters.get('scaleY');
        var angle = this.letters.get('angle');

        this.letters.set('scaleX', 1);
        this.letters.set('scaleY', 1);
        this.letters.set('angle', 0);

        // Update group coords
        this.letters._calcBounds();
        this.letters._updateObjectsCoords();
        this.letters.set('scaleX', scaleX);
        this.letters.set('scaleY', scaleY);
        this.letters.set('angle', angle);

        this.width = this.letters.width;
        this.height = this.letters.height;
        this.letters.left = -(this.letters.width / 2);
        this.letters.top = -(this.letters.height / 2);
      }
    },

    _toObject: function (propertiesToInclude) {
      return fabric.util.object.extend(
        this.callSuper('_toObject', propertiesToInclude),
        {
          radius: this.get('radius'),
          spacing: this.get('spacing'),
          reverse: this.get('reverse'),
          effect: this.get('effect'),
          range: this.get('range'),
          largeFont: this.get('largeFont'),
          smallFont: this.get('smallFont'),
        },
      );
    },

    /**
     * @private
     */
    _set: function (key, value) {
      this.callSuper('_set', key, value);
      if (this.letters) {
        this.letters.set(key, value);
        if (key in this._dimensionAffectingProps) {
          this._initDimensions();
          this.setCoords();
        }
      }
    },
    toObject: function (propertiesToInclude) {
      var object = this.extend(
        this.callSuper('toObject', propertiesToInclude),
        {
          radius: this.radius,
          spacing: this.spacing,
          reverse: this.reverse,
          effect: this.effect,
          range: this.range,
          smallFont: this.smallFont,
          largeFont: this.largeFont,
          //letters: this.letters	//No need to pass this, the letters are recreated on the fly every time when initiated
        },
      );

      if (!this.includeDefaultValues) {
        this._removeDefaultValues(object);
      }
      return object;
    },

    render: function (ctx, noTransform) {
      // do not render if object is not visible
      if (!this.visible) return;
      if (!this.letters) return;

      ctx.save();
      this.transform(ctx);

      var groupScaleFactor = Math.max(this.scaleX, this.scaleY);

      this.clipTo && fabric.util.clipContext(this, ctx);

      //The array is now sorted in order of highest first, so start from end.
      for (var i = 0, len = this.letters.size(); i < len; i++) {
        var object = this.letters.item(i),
          originalScaleFactor = object.borderScaleFactor,
          originalHasRotatingPoint = object.hasRotatingPoint;

        // do not render if object is not visible
        if (!object.visible) continue;

        object.render(ctx);
      }
      this.clipTo && ctx.restore();

      ctx.restore();
      this.setCoords();
    },
    /**
     * Returns string represenation of a group
     * @return {String}
     */
    toString: function () {
      return (
        '#<fabric.CurvedText (' +
        this.complexity() +
        '): { "text": "' +
        this.text +
        '", "fontFamily": "' +
        this.fontFamily +
        '", "radius": "' +
        this.radius +
        '", "spacing": "' +
        this.spacing +
        '", "reverse": "' +
        this.reverse +
        '" }>'
      );
    },
    /**
     * Returns svg representation of an instance
     * @param {Function} [reviver] Method for further parsing of svg representation.
     * @return {String} svg representation of an instance
     */
    toSVG: function (reviver) {
      var markup = ['<g ', 'transform="', this.getSvgTransform(), '">'];
      if (this.letters) {
        for (var i = 0, len = this.letters.size(); i < len; i++) {
          markup.push(this.letters.item(i).toSVG(reviver));
        }
      }
      markup.push('</g>');
      return reviver ? reviver(markup.join('')) : markup.join('');
    },
  });

  fabric.CurvedText.fromObject = function (object, callback) {
    return fabric.Object._fromObject('CurvedText', object, callback, 'text');
  };
})(typeof exports !== 'undefined' ? exports : this);
