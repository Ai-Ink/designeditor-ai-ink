import {IStaticText} from '@/canvascore/types';
import {groupBy} from 'lodash';
import {IFontFamily} from '@/interfaces/editor';

export const getTextProperties = (
  object: Required<IStaticText>,
  fonts: IFontFamily[],
) => {
  console.trace();
  const color = object.fill;
  const family = object.fontFamily;
  console.log('Font to be searched: ' + object);
  console.log('Fonts List that I have: ', fonts);
  const selectedFont = fonts.find(
    (sampleFont) => sampleFont.postScriptName === object.postscriptName,
  );
  console.log('Selected Font: ', selectedFont);
  const groupedFonts = groupBy(fonts, 'family');
  const selectedFamily = groupedFonts[selectedFont!.family];
  const hasBold = selectedFamily.find((font) =>
    font.postScriptName.includes('-Bold'),
  );
  const hasItalic = selectedFamily.find((font) =>
    font.postScriptName.includes('-Italic'),
  );
  const styleOptions = {
    hasBold: !!hasBold,
    hasItalic: !!hasItalic,
    options: selectedFamily,
  };
  return {
    color,
    family: selectedFamily[0].family,
    bold: family.includes('Bold'),
    italic: family.includes('Italic'),
    underline: object.underline,
    styleOptions,
  };
};
