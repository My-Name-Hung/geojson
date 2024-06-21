import React,{useState} from 'react'

// import components in NEXT-UI
import {  Navbar,   NavbarBrand,   NavbarContent,   NavbarItem,   NavbarMenuToggle,  NavbarMenu,  NavbarMenuItem,Link, Button} from "@nextui-org/react";
import { useUser,  UserButton, SignOutButton  } from "@clerk/clerk-react";
import logo from '../../assets/logoNew2.png'



function NavBar() {
  //Setup Menu open-close with width screen
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems= [
    'Home',
    'Travel',
    'Login'
  ];

  // SET UP USER
  const { isSignedIn, user, isLoaded } = useUser();
  if (!isLoaded) {
    return (
    <Navbar isBordered onMenuOpenChange={setIsMenuOpen}>

      <NavbarContent>
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className='sm:hidden' />
          <NavbarBrand>
          {/* LOGO */}
          <img src={logo} className='w-16 '/>
          <p className="font-bold text-inherit hover:text-primary-700 cursor-default">Du lịch Cần Giờ</p>
          </NavbarBrand>
      </NavbarContent>

      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        <NavbarItem >
          <Link className="no-underline hover:decoration-sky-500 before:content-[''] before:absolute before:w-0 before:h-[2px] before:bottom-[-2px] before:bg-sky-500 before:left-0 after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-[-2px] after:bg-sky-500 after:right-0 after:transition-[width] after:duration-[0.8s] after:ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:before:bg-sky-500 hover:before:w-full hover:before:transition-[width] hover:before:duration-[0.5s] hover:before:ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:after:bg-transparent hover:after:w-full hover:after:duration-[0s] cursor-pointer" color='foreground' href='/'>
            Trang chủ
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="no-underline hover:decoration-sky-500 before:content-[''] before:absolute before:w-0 before:h-[2px] before:bottom-[-2px] before:bg-sky-500 before:left-0 after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-[-2px] after:bg-sky-500 after:right-0 after:transition-[width] after:duration-[0.8s] after:ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:before:bg-sky-500 hover:before:w-full hover:before:transition-[width] hover:before:duration-[0.5s] hover:before:ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:after:bg-transparent hover:after:w-full hover:after:duration-[0s]" color='foreground' href='/Travel'>
            Bản đồ
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify='end'>
        <NavbarItem className='hidden lg:flex'>
          <Link href='/Login'>
            Đăng nhập
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color='primary' href='/SignUp' variant='flat'>
            Đăng ký
          </Button>
        </NavbarItem>
      </NavbarContent>
      {/* SET UP NAVBAR MENU + ITEMS */}
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`} className="text-center">
            <Link color={index === 0 ? "primary" : index === menuItems.length-1 ? "danger" : "foreground"} className=" no-underline hover:decoration-sky-500 before:content-[''] before:absolute before:w-0 before:h-[2px] before:bottom-[-2px] before:bg-sky-500 before:left-0 after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-[-2px] after:bg-sky-500 after:right-0 after:transition-[width] after:duration-[0.8s] after:ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:before:bg-sky-500 hover:before:w-full hover:before:transition-[width] hover:before:duration-[0.5s] hover:before:ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:after:bg-transparent hover:after:w-full hover:after:duration-[0s]" href={`${item}`} size='lg'> 
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>

    </Navbar>);
  }
  if (isSignedIn) {
    const menuItems= [
      'Home',
      'Travel',
      'Cuisine',
      'Biology'
    ];
    return <Navbar isBordered onMenuOpenChange={setIsMenuOpen}>
    <NavbarContent>
      <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className='sm:hidden' />
        <NavbarBrand>
        {/* LOGO */}
        <img src={logo} className='w-16 '/>
        <p className="font-bold text-inherit hover:text-primary-700 cursor-default">Du lịch Cần Giờ</p>
        </NavbarBrand>
    </NavbarContent>

    <NavbarContent className='hidden sm:flex gap-4' justify='center'>
      <NavbarItem >
        <Link className="no-underline hover:decoration-sky-500 before:content-[''] before:absolute before:w-0 before:h-[2px] before:bottom-[-2px] before:bg-sky-500 before:left-0 after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-[-2px] after:bg-sky-500 after:right-0 after:transition-[width] after:duration-[0.8s] after:ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:before:bg-sky-500 hover:before:w-full hover:before:transition-[width] hover:before:duration-[0.5s] hover:before:ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:after:bg-transparent hover:after:w-full hover:after:duration-[0s] cursor-pointer" color='foreground' href='/'>
          Trang chủ
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link className="no-underline hover:decoration-sky-500 before:content-[''] before:absolute before:w-0 before:h-[2px] before:bottom-[-2px] before:bg-sky-500 before:left-0 after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-[-2px] after:bg-sky-500 after:right-0 after:transition-[width] after:duration-[0.8s] after:ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:before:bg-sky-500 hover:before:w-full hover:before:transition-[width] hover:before:duration-[0.5s] hover:before:ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:after:bg-transparent hover:after:w-full hover:after:duration-[0s]" color='foreground' href='/Travel'>
          Bản đồ
        </Link>
      </NavbarItem>

    </NavbarContent>
    {/* USERBUTTON */}
    <NavbarContent justify='end'>
      <UserButton />
    </NavbarContent>
    {/* SET UP NAVBAR MENU + ITEMS */}
    <NavbarMenu>
      {menuItems.map((item, index) => (
        <NavbarMenuItem key={`${item}-${index}`} className="text-center">
          <Link color={index === 0 ? "primary" : index === menuItems.length-1 ? "foreground" : "foreground"} className=" no-underline hover:decoration-sky-500 before:content-[''] before:absolute before:w-0 before:h-[2px] before:bottom-[-2px] before:bg-sky-500 before:left-0 after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-[-2px] after:bg-sky-500 after:right-0 after:transition-[width] after:duration-[0.8s] after:ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:before:bg-sky-500 hover:before:w-full hover:before:transition-[width] hover:before:duration-[0.5s] hover:before:ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:after:bg-transparent hover:after:w-full hover:after:duration-[0s]" href={`${item}`} size='lg'> 
            {item} 
          </Link>
        </NavbarMenuItem>
      ))}
      <SignOutButton />
    </NavbarMenu>
  </Navbar>;
  }
  return (
    <Navbar isBordered onMenuOpenChange={setIsMenuOpen}>

      <NavbarContent>
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className='sm:hidden' />
          <NavbarBrand>
          {/* LOGO */}
          <img src={logo} className='w-16 '/>
          <p className="font-bold text-inherit hover:text-primary-700 cursor-default">Du lịch Cần Giờ</p>
          </NavbarBrand>
      </NavbarContent>

      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        <NavbarItem >
          <Link className="no-underline hover:decoration-sky-500 before:content-[''] before:absolute before:w-0 before:h-[2px] before:bottom-[-2px] before:bg-sky-500 before:left-0 after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-[-2px] after:bg-sky-500 after:right-0 after:transition-[width] after:duration-[0.8s] after:ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:before:bg-sky-500 hover:before:w-full hover:before:transition-[width] hover:before:duration-[0.5s] hover:before:ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:after:bg-transparent hover:after:w-full hover:after:duration-[0s] cursor-pointer" color='foreground' href='/'>
            Trang chủ
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="no-underline hover:decoration-sky-500 before:content-[''] before:absolute before:w-0 before:h-[2px] before:bottom-[-2px] before:bg-sky-500 before:left-0 after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-[-2px] after:bg-sky-500 after:right-0 after:transition-[width] after:duration-[0.8s] after:ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:before:bg-sky-500 hover:before:w-full hover:before:transition-[width] hover:before:duration-[0.5s] hover:before:ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:after:bg-transparent hover:after:w-full hover:after:duration-[0s]" color='foreground' href='/Travel'>
            Bản đồ
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify='end'>
        <NavbarItem className='hidden lg:flex'>
          <Link href='/Login'>
            Đăng nhập
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color='primary' href='/SignUp' variant='flat'>
            Đăng ký
          </Button>
        </NavbarItem>
      </NavbarContent>
      {/* SET UP NAVBAR MENU + ITEMS */}
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`} class="text-center">
            <Link color={index === 0 ? "primary" : index === menuItems.length-1 ? "danger" : "foreground"} className=" no-underline hover:decoration-sky-500 before:content-[''] before:absolute before:w-0 before:h-[2px] before:bottom-[-2px] before:bg-sky-500 before:left-0 after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-[-2px] after:bg-sky-500 after:right-0 after:transition-[width] after:duration-[0.8s] after:ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:before:bg-sky-500 hover:before:w-full hover:before:transition-[width] hover:before:duration-[0.5s] hover:before:ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:after:bg-transparent hover:after:w-full hover:after:duration-[0s]" href={`${item}`} size='lg'> 
              {item} 
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

export default NavBar