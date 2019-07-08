import { useMemo, useState } from 'react';
import shortid from 'shortid';

export const useGeneratedId = (id) => {
  const [generatedId] = useState(shortid.generate());

  const outputId = useMemo(() => {
    return id !== undefined ? id : generatedId;
  }, [generatedId, id]);

  return outputId;
};

export default useGeneratedId;
