"use client"

import { profileLinks }                       from "@/constants"
import { ArrowSortDownIcon, ArrowSortUpIcon } from "@/icons"
import Link                                   from "next/link"
import { usePathname }                        from "next/navigation"
import { useState }                           from "react"

export const ProfilePanel = ({ userId, className }: { userId: string, className?: string }) => {
  const pathname = usePathname();

  const [sortBy, setSortBy] = useState<string>("new");

  const handleChangeSort = () => {
    setSortBy(sortBy === 'new' ? 'old' : 'new');
  }

  return (
    <nav className={`w-full flex justify-between py-2 px-3 max-[409px]:bg-[#171818] rounded-xl ${className}`}>
      <div className="flex w-full max-w-xs max-[409px]:max-w-[200px] justify-between">
        {profileLinks.map((link => {
          const isActive = pathname === (link.route) && link.route.length > 1;

          if (link.route === '/profile') link.route = `${link.route}/${userId}`

          if (link.route === '/profile/liked') link.route = `/profile/${userId}/liked`

          if (link.route === '/profile/saved') link.route = `/profile/${userId}/saved`

          return (
            <Link key={link.label} className={`my-[6px] profile-link rounded-md flex items-center w-28 max-[409px]:!w-20 justify-center ${isActive && "link-text profile-link-active"}`} href={link.route}>{link.icon}<p className="max-[409px]:hidden ml-1">{link.label}</p></Link>
          )
        }))}
      </div>
      <button onClick={handleChangeSort}>
        {sortBy === 'new' ? (
          <div className="flex">
            <ArrowSortDownIcon className="w-6 h-6 fill-color-666" />
            <p className="block text-color-666 ml-3 max-sm:hidden">From new to old</p>
          </div>
        ) : (
          <div className="flex">
            <ArrowSortUpIcon className="w-6 h-6 fill-color-666" />
            <p className="text-color-666 ml-3 max-sm:hidden">From old to new</p>
          </div>
        )}
      </button>
    </nav>
  )
}