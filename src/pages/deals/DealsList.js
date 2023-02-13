import { useFirestore } from '../../hooks/useFirestore';
import { useState } from 'react';

// styles
import styles from './DealsList.module.css';

// libraries
import { formatNumber } from 'accounting';

// components
import TrashcanIcon from '../../components/icons/TrashcanIcon';
import EditIcon from '../../components/icons/EditIcon';
import StagesMenu from '../../components/StagesMenu';
import StatusMenu from '../../components/StatusMenu';

export default function DealsList({ deals }) {
  const { deleteDocument, updateDocument } = useFirestore('deals');

  // Deal card
  const [showDealCard, setShowDealCard] = useState(true);

  // Edit deal
  const [showEditDeal, setShowEditDeal] = useState(false);
  const [dealName, setDealName] = useState('');
  const [clientName, setClientName] = useState('');
  const [dealAmount, setDealAmount] = useState('');
  const [dealStatus, setDealStatus] = useState('');
  const [dealStage, setDealStage] = useState('');
  const [selectedDeal, setSelectedDeal] = useState(null);

  const editDeal = (deal) => {
    setSelectedDeal(deal);
    setShowEditDeal(true);
    setShowDealCard(false);
  };

  // stage drop down menu
  const handleStageChange = (selectedOption) => {
    setDealStage(selectedOption.value);
  };

  // status drop down menu
  const handleStatusChange = (selectedOption) => {
    setDealStatus(selectedOption.value);
  };

  // cancel the editing process
  const handleCancel = () => {
    setShowEditDeal(false);
    setShowDealCard(true);
  };

  // reset all input fields
  const resetInputFields = () => {
    setDealName('');
    setClientName('');
    setDealAmount('');
    setDealStatus('');
    setDealStage('');
  };

  const saveDeal = (deal) => {
    if (dealName !== '') updateDocument(deal.id, { name: dealName });
    if (clientName !== '') updateDocument(deal.id, { client: clientName });
    if (dealAmount !== '')
      updateDocument(deal.id, { amount: Number(dealAmount) });
    if (dealStatus !== '') updateDocument(deal.id, { status: dealStatus });
    if (dealStage !== '') updateDocument(deal.id, { stage: dealStage });

    resetInputFields();

    handleCancel();
  };

  return deals.map((deal) => (
    <div
      key={deal.id}
      className={styles.container}
    >
      {showDealCard && (
        <div className={styles.card}>
          <div className={styles.cardTop}>
            <div className={styles.titles}>
              <div className={styles.dealName}>{deal.name}</div>
              <div className={styles.clientName}>{deal.client}</div>
            </div>
            <div className={styles.icons}>
              <div>
                <TrashcanIcon onClick={() => deleteDocument(deal.id)} />
              </div>
              <div>
                <EditIcon onClick={() => editDeal(deal)} />
              </div>
            </div>
          </div>
          <div className={styles.cardBottom}>
            <div className={styles.blockA}>
              <div className={styles.content}>
                <div className={styles.colOne}>
                  <span className={styles.dealInfo}>Deal Value</span>
                </div>
                <div className={styles.colTwo}>
                  <span className={styles.dealValue}>
                    ${formatNumber(deal.amount)}
                  </span>
                </div>
              </div>
              <div className={styles.content}>
                <div className={styles.colOne}>
                  <span className={styles.dealInfo}>Deal Status</span>
                </div>
                <div className={styles.colTwo}>
                  <div
                    className={
                      (deal.status === 'In Progress'
                        ? styles.inProgress
                        : '') ||
                      (deal.status === 'Very Good' ? styles.veryGood : '') ||
                      (deal.status === 'Stalled' ? styles.stalled : '')
                    }
                  >
                    {deal.status}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.blockB}>
              <div className={styles.content}>
                <div className={styles.colOne}>
                  <span className={styles.dealInfo}>Deal Stage</span>
                </div>
                <div className={styles.colTwo}>
                  <span className={styles.dealStage}>{deal.stage}</span>
                </div>
              </div>
              <div className={styles.content}>
                <div className={styles.colOne}>
                  <span className={styles.dealInfo}>Date Created</span>
                </div>
                <div className={styles.colTwo}>
                  <span className={styles.dealCreatedDate}>{deal.created}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showEditDeal && selectedDeal === deal && (
        <div className={styles.card}>
          <div className={styles.cardTop}>
            <div className={styles.titles}>
              <div className={styles.dealName}>
                <input
                  type='text'
                  onChange={(e) => setDealName(e.target.value)}
                  placeholder={deal.name}
                />
              </div>
              <div className={styles.clientName}>
                <input
                  type='text'
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder={deal.client}
                />
              </div>
            </div>
            <div className={styles.buttonsContainer}>
              <button
                className={styles.cancelBtn}
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className={styles.saveBtn}
                onClick={() => saveDeal(deal)}
              >
                Save
              </button>
            </div>
          </div>
          <div className={styles.cardBottom}>
            <div className={styles.blockA}>
              <div className={styles.content}>
                <div className={styles.colOne}>
                  <span className={styles.dealInfo}>Deal Value</span>
                </div>
                <div className={styles.colTwo}>
                  <span className={styles.dealValue}>
                    <input
                      type='number'
                      onChange={(e) => setDealAmount(e.target.value)}
                      placeholder={deal.amount}
                    />
                  </span>
                </div>
              </div>
              <div className={styles.content}>
                <div className={styles.colOne}>
                  <span className={styles.dealInfo}>Deal Status</span>
                </div>
                <div className={styles.colTwo}>
                  <StatusMenu
                    status={deal.status}
                    onChange={handleStatusChange}
                  />
                </div>
              </div>
            </div>
            <div className={styles.blockB}>
              <div className={styles.content}>
                <div className={styles.colOne}>
                  <span className={styles.dealInfo}>Deal Stage</span>
                </div>
                <div className={styles.colTwo}>
                  <StagesMenu
                    stage={deal.stage}
                    onChange={handleStageChange}
                  />
                </div>
              </div>
              <div className={styles.content}>
                <div className={styles.colOne}>
                  <span className={styles.dealInfo}>Date Created</span>
                </div>
                <div className={styles.colTwo}>
                  <span className={styles.dealCreatedDate}>{deal.created}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  ));
}
