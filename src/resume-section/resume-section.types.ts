export interface ISection {
  id?: string
  name: string
  entries: IEntry[]
}

export interface IEntry {
  id?: string
  title: string
  description: string
  startDate: Date
  endDate: Date
}



