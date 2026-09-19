import React from 'react';
import BedRepairPageTemplate from '../../components/BedRepairPageTemplate';
import { bedWoodTypes } from '../../data/bedRepairConfig';

/**
 * Wood type page: /mdf-bed-repair
 * Keyword: mdf bed repair mumbai
 */
const MdfBedRepair: React.FC = () => {
  const woodType = bedWoodTypes.find((w) => w.id === 'mdf')!;
  return <BedRepairPageTemplate pageType="wood-type" woodType={woodType} />;
};

export default MdfBedRepair;
