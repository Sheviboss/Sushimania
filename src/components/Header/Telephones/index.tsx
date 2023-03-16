import { useState, useRef } from 'react';
import './style.scss';
import useOnClickOutside from '../../../hooks/Modal';

const Telephones: React.FC = () => {
  const tel = ['+7 912 010-61-91', '+7 963 027-51-81', '+7 341416-69-76'];
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLHeadingElement>(null);
  useOnClickOutside(ref, () => setActive(false));
  return (
    <div className="tel" ref={ref}>
      <div
        className="tel-toggle"
        onClick={() => {
          setActive(!active);
        }}>
        +7 912 010-61-91
      </div>
      <ul className={active ? 'telephones' : 'telephones-hide'}>
        {tel.map((value, i) => (
          <a>
            <li key={i}>{value} </li>
          </a>
        ))}{' '}
      </ul>
      <button
        onClick={() => {
          setActive(!active);
        }}
        className={active ? 'button-active' : 'button'}></button>
    </div>
  );
};

export default Telephones;
