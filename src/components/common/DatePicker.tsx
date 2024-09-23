import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { useState } from "react" // Add this import

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
  className?: string
  value: Date | undefined
  onChange: (date: Date | undefined) => void
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>
}

const DatePicker: React.FC<DatePickerProps> = ({
  className,
  value,
  onChange,
  buttonProps,
}) => {
  const [open, setOpen] = useState(false) // Add this line
  const date = value

  // Add this function
  const handleDateSelect = (selectedDate: Date | undefined) => {
    onChange(selectedDate)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            className,
            "w-[280px] pl-3 text-left justify-start font-normal",
            !date && "text-muted-foreground",
          )}
          {...buttonProps}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Select Date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect} // Update this line
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export default DatePicker
