import React from 'react';
import { Link } from 'react-router-dom';
import siteConfig from '@iso/config/site.config';
import { IoIosFlash , IoMdCube} from 'react-icons/io';

const Logo = ({ collapsed }) => {
  return (
    <div className="isoLogoWrapper">
      {collapsed ? (
        <div>
          <h3>
            <Link to="/dashboard">
              <IoMdCube size={27} />
            </Link>
          </h3>
        </div>
      ) : (
        <h3>
          <Link to="/dashboard">{siteConfig.siteName}</Link>
        </h3>
      )}
    </div>
  );
};

export default Logo;
