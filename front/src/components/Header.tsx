import React, {useState } from 'react'
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { Button } from 'antd';
type AppProps = {
  showModal: () => void;
}
const Header = ({showModal}: AppProps) => {
  const [size] = useState <SizeType>('large');
 
  return (
    <div>
        <header>
            <ul>
                <li>
                  <Button onClick={showModal} type="primary" size={size}>
                      CONNEXION
                  </Button>
                </li>
            </ul>
        </header>
    </div>
  )
}

export default Header;
