import { FC } from 'react';
import Box from '../../ui/Box';
import IconCity from '../../Icons/IconCity';
import IconTerminal from '../../Icons/IconTerminal';
import { PlaceItemProps } from '../../../types';

export const PlaceItem: FC<PlaceItemProps> = ({ place, handleClickItem, noResult, textPattern }) => {
  const highlightTerm = (text: string, matchPattern: RegExp) => {
    if (noResult) {
      return text;
    }

    const match = text.match(matchPattern);
    const finalText = match ? text.replace(matchPattern, (word: string) => `<strong>${word}</strong>`) : text;

    return <p dangerouslySetInnerHTML={{ __html: finalText }} />;
  };

  return (
    <Box
      onClick={() => handleClickItem(place)}
      as="a"
      className={`
        cursor-pointer flex items-center text-base leading-6 font-normal gap-2
        bg-white transition-colors
        ${noResult ? 'text-gray-600' : 'text-gray-900'}
        ${!place.useGroupByCity ? 'py-3 px-4 pl-8' : 'py-3 px-4'}
        hover:bg-blue-50 hover:opacity-100
        active:bg-blue-100
        tt-suggestion
      `}
      title={place.name}
      data-testid="place-item-suggestion"
    >
      {place.useGroupByCity ? <IconCity /> : <IconTerminal />}
      {highlightTerm(place.name, textPattern)}
    </Box>
  );
};
