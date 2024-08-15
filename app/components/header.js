"use client"

import React from 'react'
import { signIn } from 'next-auth/react'
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Avatar} from "@nextui-org/react";
import ThemeSwitcher from './themeSwitcher';
import { deleteSession } from '../libs/session';
import Link from 'next/link';

export default function Header(props) {


    return (
      <Navbar className='bg-transparent backdrop-saturate-100 fixed' maxWidth={'full'}>
        <NavbarBrand>
          <Link href={"/"} className="font-bold text-inherit dark:text-white">Art Dungeon</Link>
        </NavbarBrand>
          {props.session ? 
              <div className='flex items-center gap-4'>
                <Avatar isBordered src={props.session?.user.image} color='primary'/>
                <p>{props.session?.user.username}</p>
                <Link href={"/add"}>Add Art !</Link>
                <Button color='danger' radius='full' variant='flat' onClick={() => deleteSession()}>Sign Out</Button>
              </div>
            :
              <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                  <Link href={"/login"}>Login</Link> 
                </NavbarItem>
                <NavbarItem>
                  <Button as={Link} href={"/signup"} color="primary" variant="flat">
                    Sign Up
                  </Button>
                </NavbarItem>
              </NavbarContent>

          }
          <ThemeSwitcher/>
      </Navbar>
    )

  }

