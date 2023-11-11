interface FormItem {
  label: string
  param?: string
  collapse?: boolean
  type: string
  children?: Array<FormItem>
}

interface DataConfig {
  type: number
  data?: Array<any>
  originUrl?: string
  params?: any
}

interface EventConfig {
  name: ''
}

interface PanelDataValues {
  isOrigin: number
  originUrl?: string
  params?: {
    [key: string]: any
  }
  localData?: Array<any>
  method?: string
}

interface PanelEventValues {
  [key: string]: any
}

interface PanelInfoValues {
  height: number
  width: number
  x?: number
  y?: number
  [key: string]: any
}

interface ComCode {
  css?: string
  js: string
}

export interface ComInfo {
  name: string
  id: string
  panel: {
    infoConfig: {
      formItems: Array<FormItem>
      values: PanelInfoValues
    }
    dataConfig?: {
      values: PanelDataValues
    }
    eventConfig?: {
      formItems?: Array<FormItem>
      values: PanelEventValues
    }
  }
  code: ComCode
  isLocalComponent?: boolean
  localComponentName?: string
  thumbnail?: string
  type: string
}
