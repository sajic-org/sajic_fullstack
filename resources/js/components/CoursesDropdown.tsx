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

export interface Course{
    name: string
}
export function CoursesDropdown({course, onValueChange, value}: {course: Course[], onValueChange: any, value:any}) {

  const radio_itens = course.map(course => {
    return <DropdownMenuRadioItem key={course.name} value={course.name}>{course.name}</DropdownMenuRadioItem>
  })
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{value || "Selecione seu curso"}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Cursos</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={value} onValueChange={onValueChange}>
          {radio_itens}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}