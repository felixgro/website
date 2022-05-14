import { cloneElement, ReactElement } from "react"
import { useRouter } from "next/router"
import NextLink, { LinkProps } from "next/link"

type ActiveLinkProps = LinkProps & {
   children: ReactElement
   activeClassName?: string
}

const Link = ({
   children,
   activeClassName,
   ...rest
}: ActiveLinkProps) => {
   const { asPath } = useRouter()
   const className = asPath === rest.href ? activeClassName ?? '' : ""

   return <NextLink {...rest}>{cloneElement(children, { className, 'aria-current': asPath === rest.href ? "page" : "" })}</NextLink>
}

export default Link;