import React from 'react';
import SofaRepairPageTemplate from '../../../components/SofaRepairPageTemplate';
import { sofaRepairLocations } from '../../../data/sofaRepairConfig';

/**
 * Location page: /sofa-repair-sion
 * Keyword: sofa repair sion, sofa repair in sion
 */
const SofaRepairSion: React.FC = () => {
  const location = sofaRepairLocations.find((l) => l.id === 'sion')!;
  return <SofaRepairPageTemplate pageType="location" location={location} />;
};

export default SofaRepairSion;
