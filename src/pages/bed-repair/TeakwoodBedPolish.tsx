import React from 'react';
import BedRepairPageTemplate from '../../components/BedRepairPageTemplate';
import { bedWoodTypes } from '../../data/bedRepairConfig';

/**
 * Wood type page: /teakwood-bed-polish
 * Keyword: teakwood bed polish mumbai
 */
const TeakwoodBedPolish: React.FC = () => {
  const woodType = bedWoodTypes.find((w) => w.id === 'teakwood')!;
  return <BedRepairPageTemplate pageType="wood-type" woodType={woodType} />;
};

export default TeakwoodBedPolish;
