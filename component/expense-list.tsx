import { ExpenseType } from "@/types";
import { FC } from "react";
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  IndexRange,
  InfiniteLoader,
  List,
  ListRowRenderer,
} from "react-virtualized";
import "react-virtualized/styles.css";
import ExpenseCard from "./expenseCard";

interface Props {
  expenses: ExpenseType[];
}

const ExpenseList: FC<Props> = ({ expenses }) => {
  const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 270, // Default height before measuring
  });

  function isRowLoaded({ index }: { index: number }) {
    return !!expenses[index];
  }
  const loadMoreRows = async ({ startIndex, stopIndex }: IndexRange) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, 1000);
    });

    return expenses.slice(startIndex, stopIndex);
  };

  const rowRenderer: ListRowRenderer = ({ key, index, style, parent }) => {
    const item = expenses[index];

    if (!item) {
      return (
        <div key={key} style={style}>
          Loading...
        </div>
      );
    }

    return (
      <CellMeasurer
        key={key}
        cache={cache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        {({ measure, registerChild }) => (
          <div onLoad={measure} key={key} style={style} ref={registerChild}>
            <ExpenseCard expense={item} />
          </div>
        )}
      </CellMeasurer>
    );
  };

  return (
    <InfiniteLoader
      isRowLoaded={isRowLoaded}
      loadMoreRows={loadMoreRows}
      rowCount={expenses.length}
    >
      {({ onRowsRendered, registerChild }) => (
        <AutoSizer>
          {({ width, height }) => (
            <List
              height={height - 70}
              onRowsRendered={onRowsRendered}
              ref={registerChild}
              rowCount={expenses.length}
              rowHeight={cache.rowHeight}
              rowRenderer={rowRenderer}
              width={width}
              deferredMeasurementCache={cache}
              overscanRowCount={6}
            />
          )}
        </AutoSizer>
      )}
    </InfiniteLoader>
  );
};

export default ExpenseList;
