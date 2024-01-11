'use client';

import { FC, useEffect, useLayoutEffect, useState } from 'react';
import Link from 'next/link';
import { CurrentUser } from '@/lib/types';
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import axios from 'axios';

interface NavBarProps {
  status: {
    currentUser: CurrentUser;
  } | null;
}

const NavBar: FC<NavBarProps> = ({ status }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const { data } = await axios.get('/api/users/currentuser');

      setCurrentUser(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);
  // useLayoutEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     const { data } = await axios.get('/api/users/currentuser');
  //     setCurrentUser(data);
  //     setIsLoading(false);
  //   };
  //   fetchData();
  // }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const userStatus = currentUser || status;
  // const userStatus = status;

  const link = [
    !userStatus?.currentUser?.email && {
      label: 'Sign In',
      href: '/auth/signin',
      id: 0,
    },
    !userStatus?.currentUser?.email && {
      label: 'Sign Up',
      href: '/auth/signup',
      id: 1,
    },
    userStatus?.currentUser?.email && {
      label: 'Sign Out',
      href: '/auth/signout',
      id: 2,
    },
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
