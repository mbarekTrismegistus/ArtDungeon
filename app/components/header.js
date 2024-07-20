"use client"

import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Link, Avatar} from "@nextui-org/react";
import ThemeSwitcher from './themeSwitcher';

export default function Header() {


    let session = useSession()

    return (
      <Navbar className='bg-transparent backdrop-saturate-100 fixed' maxWidth={'full'}>
        <NavbarBrand>
          <p className="font-bold text-inherit dark:text-white">Art Dungeon</p>
        </NavbarBrand>
          {session.status == "loading" ? 
            "loading"
            :
            session.status == "unauthenticated" ?
              <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                  <Link onClick={() => signIn("google")}>Login</Link> 
                </NavbarItem>
                <NavbarItem>
                  <Button as={Link} color="primary" href="#" variant="flat">
                    Sign Up
                  </Button>
                </NavbarItem>
              </NavbarContent>
            :
            <div className='flex items-center gap-4'>
              <Avatar isBordered src={session.data.user.image}/>
              <Button color='danger' radius='full' variant='flat' onClick={() => signOut()}>Sign Out</Button>
            </div>

          }
          <ThemeSwitcher/>
      </Navbar>
    )

  }

