'use client';

import { FC } from 'react';
import Link from 'next/link';
import { CurrentUser } from '@/lib/types';
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';

interface NavBarProps {
  status: {
    currentUser: CurrentUser;
  } | null;
}

const NavBar: FC<NavBarProps> = ({ status }) => {
  console.log('In browser', status);
  const link = [
    !status?.currentUser && { label: 'Sign In', href: '/auth/signin', id: 0 },
    !status?.currentUser && { label: 'Sign Up', href: '/auth/signup', id: 1 },
    status?.currentUser && { label: 'Sign Out', href: '/auth/signout', id: 2 },
  ]
    .filter(Boolean)
    .map((c) => {
      if (typeof c === 'object' && c !== null) {
        return (
          <NavigationMenuItem key={c.id}>
            <Link href={c.href} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {c.label}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        );
      }
    });
  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>{link}</NavigationMenuList>
      </NavigationMenu>
    </>
  );
};

export default NavBar;
