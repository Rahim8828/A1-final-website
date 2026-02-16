import React from 'react';
import BedRepairPageTemplate from '../../../components/BedRepairPageTemplate';
import { bedRepairLocations } from '../../../data/bedRepairConfig';

/**
 * Location page: /bed-repair-lokhandwala
 * Keyword: bed repair lokhandwala, bed repair in lokhandwala
 */
const BedRepairLokhandwala: React.FC = () => {
  const location = bedRepairLocations.find((l) => l.id === 'lokhandwala')!;
  return <BedRepairPageTemplate pageType="location" location={location} />;
};

export default BedRepairLokhandwala;
