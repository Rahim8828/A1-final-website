import React from 'react';
import SofaRepairPageTemplate from '../../../components/SofaRepairPageTemplate';
import { sofaRepairLocations } from '../../../data/sofaRepairConfig';

/**
 * Location page: /sofa-repair-kandivali
 * Keyword: sofa repair kandivali, sofa repair in kandivali
 */
const SofaRepairKandivali: React.FC = () => {
  const location = sofaRepairLocations.find((l) => l.id === 'kandivali')!;
  return <SofaRepairPageTemplate pageType="location" location={location} />;
};

export default SofaRepairKandivali;
