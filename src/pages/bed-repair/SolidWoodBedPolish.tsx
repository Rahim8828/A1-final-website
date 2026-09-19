import React from 'react';
import BedRepairPageTemplate from '../../components/BedRepairPageTemplate';
import { bedWoodTypes } from '../../data/bedRepairConfig';

/**
 * Wood type page: /solid-wood-bed-polish
 * Keyword: solid wood bed polish mumbai
 */
const SolidWoodBedPolish: React.FC = () => {
  const woodType = bedWoodTypes.find((w) => w.id === 'solid-wood')!;
  return <BedRepairPageTemplate pageType="wood-type" woodType={woodType} />;
};

export default SolidWoodBedPolish;
