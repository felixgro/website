import { FC, useMemo } from "react";
import style from './Button.module.scss';

type Role = "primary" | "secondary" | "tertiary" | "danger";

type Props = {
   role?: Role;
   type?: "button" | "submit" | "reset";
}


const Button: FC<Props> = ({ children, role, type }) => {
   const className = useMemo(() => {
      switch (role) {
         case "secondary": return style.secondary;
         case "tertiary": return style.tertiary;
         case "danger": return style.danger;
         default: return style.primary;
      }
   }, [role]);

   return (
      <button type={type} className={`${style.button} ${className}`}>
         {children}
      </button>
   )
}

export default Button;