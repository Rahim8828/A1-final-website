import React from 'react';
import BedRepairPageTemplate from '../../../components/BedRepairPageTemplate';
import { bedRepairLocations } from '../../../data/bedRepairConfig';

/**
 * Location page: /bed-repair-juhu
 * Keyword: bed repair juhu, bed repair in juhu
 */
const BedRepairJuhu: React.FC = () => {
  const location = bedRepairLocations.find((l) => l.id === 'juhu')!;
  return <BedRepairPageTemplate pageType="location" location={location} />;
};

export default BedRepairJuhu;
