import {IStaticText} from '@/canvascore/types';
import {groupBy} from 'lodash';
import {IFontFamily} from '@/interfaces/editor';

export const getTextProperties = (
  object: Required<IStaticText>,
  fonts: IFontFamily[],
) => {
  const color = object.fill;
  const family = object.fontFamily;
  const selectedFont = fonts.find(
    (sampleFont) => sampleFont.postScriptName === object.postScriptName,
  );
  const groupedFonts = groupBy(fonts, 'fontFamily');
  const selectedFamily = groupedFonts[selectedFont!.fontFamily];
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
    family: selectedFamily[0].fontFamily,
    bold: family.includes('Bold'),
    italic: family.includes('Italic'),
    underline: object.underline,
    styleOptions,
  };
};
