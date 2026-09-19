import React from 'react';
import SofaRepairPageTemplate from '../../../components/SofaRepairPageTemplate';
import { sofaRepairLocations } from '../../../data/sofaRepairConfig';

/**
 * Location page: /sofa-repair-jogeshwari
 * Keyword: sofa repair jogeshwari, sofa repair in jogeshwari
 */
const SofaRepairJogeshwari: React.FC = () => {
  const location = sofaRepairLocations.find((l) => l.id === 'jogeshwari')!;
  return <SofaRepairPageTemplate pageType="location" location={location} />;
};

export default SofaRepairJogeshwari;
