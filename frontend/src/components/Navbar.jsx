import React, { useEffect, useState } from "react";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem
} from "./ui/menubar";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink
} from "./ui/navigation-menu";
import ThemeToggle from "./ThemeToggle";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${scrolled
          ? "backdrop-blur-xl bg-background/60 shadow-lg border-b border-white/10"
          : "bg-transparent"}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* ========= LOGO ========= */}
        <Link to="/" className="font-bold text-xl tracking-tight">
          ZeroXP
        </Link>

        {/* ========= MENÚ PRINCIPAL ========= */}
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link className="px-4 py-2 text-sm hover:text-primary" to="/">
                  Buscar empleos
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                {/* ⬅️ CORREGIDO: /empresa */}
                <Link className="px-4 py-2 text-sm hover:text-primary" to="/empresa">
                  Empresas
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* ========= SECCIÓN DERECHA ========= */}
        <div className="flex items-center space-x-4">

          {/* Theme toggle */}
          <ThemeToggle />

          {/* Usuario */}
          <Menubar className="bg-transparent border-none shadow-none">
            <MenubarMenu>
              <MenubarTrigger className="px-3 py-2 rounded-md hover:bg-accent/50 cursor-pointer">
                Mi Cuenta
              </MenubarTrigger>

              <MenubarContent className="min-w-[180px]">

                <MenubarItem onClick={() => navigate("/profile")}>
                  Perfil
                </MenubarItem>

                <MenubarItem onClick={() => navigate("/my-applications")}>
                  Mis Postulaciones
                </MenubarItem>

                <MenubarItem onClick={() => navigate("/empresa")}>
                  Dashboard Empresa
                </MenubarItem>

              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>
    </header>
  );
}
