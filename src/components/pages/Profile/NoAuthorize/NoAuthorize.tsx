import { useState } from 'react';
import Login from '../../../Login';

const NoAuthorize = () => {
  const [reg, setReg] = useState(true);
  console.log('reg', reg);
  return (
    <div>
      Авторизация
      <button>reg</button>
    </div>
  );
};

export default NoAuthorize;
