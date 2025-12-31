import { Link, usePathname, Href } from "expo-router"; // 1. Import Href
import { forwardRef } from "react";
import { Text, Pressable, View } from "react-native";
import { cn } from "../lib/utils";

interface NavLinkCompatProps {
  href: Href; // 2. Change string to Href<string>
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  style?: any;
}

const NavLink = forwardRef<View, NavLinkCompatProps>(
  ({ className, activeClassName, href, children, ...props }, ref) => {
    const pathname = usePathname();
    
    // 3. Since href can be an object (e.g. { pathname: '/user', params: { id: 1 } })
    // we need to handle the comparison carefully. 
    const dest = typeof href === 'string' ? href : href.pathname;
    const isActive = pathname === dest;

    return (
      <Link href={'/'} asChild {...props}>
        <Pressable
          ref={ref}
          className={cn(className, isActive && activeClassName)}
        >
          {typeof children === "string" ? (
            <Text className={cn(className, isActive && activeClassName)}>
                {children}
            </Text>
          ) : (
            children
          )}
        </Pressable>
      </Link>
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };