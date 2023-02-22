import { useState, useEffect, useContext } from 'react';
import { DealsContext } from '../../context/DealsContext';

// styles
import styles from './DealsStage.module.css';

// libraries
import { formatNumber } from 'accounting';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// components
import DividerIcon from '../../components/icons/DividerIcon';

export default function DealsStage({ stageName }) {
  const { filteredDeals } = useContext(DealsContext);

  const [dealsNumber, setDealsNumber] = useState(0);
  const [dealsValue, setDealsValue] = useState(0);

  const updatedDeals = filteredDeals
    .filter((deal) => deal.stage === stageName)
    .sort((deal1, deal2) => deal2.amount - deal1.amount);

  useEffect(() => {
    if (updatedDeals) {
      const numberOfDeals = updatedDeals.length;
      setDealsNumber(numberOfDeals);
    }

    if (updatedDeals) {
      const dealsTotalValue = updatedDeals.reduce(
        (acc, deal) => acc + deal.amount,
        0
      );
      setDealsValue(formatNumber(dealsTotalValue));
    }
  }, [updatedDeals]);

  const [deals, setDeals] = useState(updatedDeals);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(deals);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setDeals(items);
  };

  const displayDeals = deals.map((deal, index) => {
    return (
      <Draggable
        key={deal.id}
        draggableId={deal.id}
        index={index}
      >
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={
              deal.stage === 'Won'
                ? styles.cardGood
                : deal.stage === 'Lost'
                ? styles.cardDeclined
                : deal.status === 'In Progress' &&
                  (deal.stage !== 'Won' || deal.stage !== 'Lost')
                ? styles.cardInProgress
                : deal.status === 'Good' &&
                  (deal.stage !== 'Won' || deal.stage !== 'Lost')
                ? styles.cardGood
                : deal.status === 'Stalled' &&
                  (deal.stage !== 'Won' || deal.stage !== 'Lost')
                ? styles.cardDeclined
                : ''
            }
          >
            <div className={styles.cardTop}>
              <div className={styles.dealName}>{deal.name}</div>
              <div className={styles.dealClient}>{deal.client}</div>
              <DividerIcon />
            </div>
            <div className={styles.cardBottom}>
              <div className={styles.dealValue}>
                ${formatNumber(deal.amount)}
              </div>

              {deal.stage === 'Won' && (
                <div className={styles.success}>{'Success'}</div>
              )}

              {deal.stage === 'Lost' && (
                <div className={styles.declined}>{'Declined'}</div>
              )}

              {deal.status === 'Good' &&
                deal.stage !== 'Won' &&
                deal.stage !== 'Lost' && (
                  <div className={styles.success}>{deal.status}</div>
                )}

              {deal.status === 'In Progress' &&
                deal.stage !== 'Won' &&
                deal.stage !== 'Lost' && (
                  <div className={styles.inProgress}>{deal.status}</div>
                )}

              {deal.status === 'Stalled' &&
                deal.stage !== 'Won' &&
                deal.stage !== 'Lost' && (
                  <div className={styles.declined}>{deal.status}</div>
                )}
            </div>
          </div>
        )}
      </Draggable>
    );
  });

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId='list'>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={styles.container}
          >
            <div className={styles.summary}>
              <div className={styles.stageInfo}>
                <div className={styles.stageName}>{stageName}</div>
                <div className={styles.quantity}>{dealsNumber}</div>
              </div>
              <div className={styles.total}>
                Total deals <span>${dealsValue}</span>
              </div>
            </div>
            {displayDeals}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
