import React from 'react';
import Link from 'next/link';
import siteConfig from '@iso/config/site.config';
import { IoIosFlash, IoMdCube } from 'react-icons/io';

export default function LogoNext({ collapsed }) {
  return (
    <div className="isoLogoWrapper">
      {collapsed ? (
        <div>
          <h3>
            <Link href="/dashboard">
              <a>
                <IoMdCube size={27} />
              </a>
            </Link>
          </h3>
        </div>
      ) : (
        <h3>
          <Link href="/dashboard">
            <a>I K B</a>
          </Link>
        </h3>
      )}
    </div>
  );
}
