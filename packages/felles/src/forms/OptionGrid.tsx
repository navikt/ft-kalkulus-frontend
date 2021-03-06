import React, { FunctionComponent } from 'react';

import { range } from '../utils/arrayUtils';
import FlexContainer from '../shared-components/FlexContainer';
import FlexColumn from '../shared-components/FlexColumn';
import FlexRow from '../shared-components/FlexRow';
import EditedIcon from '../shared-components/EditedIcon';
import styles from './optionGrid.less';

interface OptionGridProps {
  columns?: number;
  options: React.ElementType[];
  spaceBetween?: boolean;
  isEdited?: boolean;
  direction?: string;
  rows?: number;
}

export const OptionGrid: FunctionComponent<OptionGridProps> = ({
  columns, rows, options, spaceBetween, isEdited, direction,
}) => {
  if (direction === 'vertical') {
    const numRows = rows || options.length;
    return (
      <FlexContainer>
        <FlexColumn className={styles.fullBreddeIE}>
          {range(numRows)
            .map((rowIndex) => (
              <FlexRow key={`row${rowIndex}`} spaceBetween={spaceBetween}>
                {options.filter((_option, optionIndex) => optionIndex % numRows === rowIndex)}
                {isEdited && <EditedIcon className="radioEdited" />}
              </FlexRow>
            ))}
        </FlexColumn>
      </FlexContainer>
    );
  }
  const numColumns = columns || options.length;
  return (
    <FlexContainer>
      <FlexRow spaceBetween={spaceBetween}>
        {range(numColumns)
          .map((columnIndex) => (
            <FlexColumn key={`column${columnIndex}`}>
              {options.filter((_option, optionIndex) => optionIndex % numColumns === columnIndex)}
            </FlexColumn>
          ))}
        {isEdited && <EditedIcon className="radioEdited" />}
      </FlexRow>
    </FlexContainer>
  );
};

OptionGrid.defaultProps = {
  columns: 0,
  rows: 0,
  spaceBetween: false,
  isEdited: false,
  direction: 'horizontal',
};

export default OptionGrid;
