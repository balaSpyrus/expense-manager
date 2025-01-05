import { ExpenseObjType } from "@/types";
import { FC, useEffect, useState } from "react";
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
// import { fetchExpenses } from "@/lib";

interface Props {
  expenses: ExpenseObjType[];
}

const ExpenseList: FC<Props> = ({ expenses: expenseProps }) => {
  const [expenses, setExpenses] = useState<ExpenseObjType[]>([]);
  // const [rowCount] = useState(expenses.length);
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

    let newExpenses: ExpenseObjType[] = [];

    if (startIndex < expenseProps.length) {
      newExpenses = expenseProps.slice(startIndex, stopIndex);
    } else {
      // newExpenses = await fetchExpenses(startIndex, stopIndex);
    }

    setExpenses((prev) => {
      const updatedExpenses = [...prev];
      newExpenses.forEach((expense, idx) => {
        updatedExpenses[startIndex + idx] = expense;
      });
      return updatedExpenses;
    });
  };

  const rowRenderer: ListRowRenderer = ({ key, index, style, parent }) => {
    const item = expenses[index];

    return (
      <CellMeasurer
        key={key}
        cache={cache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        {({ registerChild }) => (
          <div
            key={key}
            style={style}
            ref={registerChild}
            className={!item ? "loading-items" : ""}
          >
            {item ? <ExpenseCard expense={item} /> : <span />}
          </div>
        )}
      </CellMeasurer>
    );
  };

  useEffect(() => {
    setExpenses(expenseProps);
  }, [expenseProps]);

  return (
    <InfiniteLoader
      isRowLoaded={isRowLoaded}
      loadMoreRows={loadMoreRows}
      rowCount={expenseProps.length}
    >
      {({ onRowsRendered, registerChild }) => (
        <AutoSizer>
          {({ width, height }) => (
            <List
              height={height - 85}
              onRowsRendered={onRowsRendered}
              ref={registerChild}
              rowCount={expenseProps.length}
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
