import React from 'react';
import BedRepairPageTemplate from '../../components/BedRepairPageTemplate';
import { bedWoodTypes } from '../../data/bedRepairConfig';

/**
 * Wood type page: /walnut-bed-polish
 * Keyword: walnut bed polish mumbai
 */
const WalnutBedPolish: React.FC = () => {
  const woodType = bedWoodTypes.find((w) => w.id === 'walnut')!;
  return <BedRepairPageTemplate pageType="wood-type" woodType={woodType} />;
};

export default WalnutBedPolish;
