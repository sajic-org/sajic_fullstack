"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface SemesterDropdownProps {
    semesters: number[]
    value: number
    onValueChange: (value: number) => void
}

export function SemesterDropdown({semesters, value, onValueChange}: SemesterDropdownProps) {

  const radio_itens = semesters.map(semester => {
    return <DropdownMenuRadioItem key={semester} value={semester.toString()}>{semester}º semestre</DropdownMenuRadioItem>
  })
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{value != 0 ? `${value}º` :  "Selecione seu semestre"}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Semestre</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={value.toString()} 
            onValueChange={(val) => onValueChange(Number(val))}>
          {radio_itens}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}