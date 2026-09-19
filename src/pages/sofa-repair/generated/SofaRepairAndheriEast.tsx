import React from 'react';
import SofaRepairPageTemplate from '../../../components/SofaRepairPageTemplate';
import { sofaRepairLocations } from '../../../data/sofaRepairConfig';

/**
 * Location page: /sofa-repair-andheri-east
 * Keyword: sofa repair andheri east, sofa repair in andheri east
 */
const SofaRepairAndheriEast: React.FC = () => {
  const location = sofaRepairLocations.find((l) => l.id === 'andheri-east')!;
  return <SofaRepairPageTemplate pageType="location" location={location} />;
};

export default SofaRepairAndheriEast;
