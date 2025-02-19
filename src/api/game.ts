/**
 *
 * @export
 * @interface ChatInputDto
 */
export interface ChatInputDto {
  /**
   *
   * @type {number}
   * @memberof ChatInputDto
   */
  level?: number
  /**
   *
   * @type {Array<ChatMessageDto>}
   * @memberof ChatInputDto
   */
  messages?: Array<ChatMessageDto>
}
/**
 *
 * @export
 * @interface ChatMessageDto
 */
export interface ChatMessageDto {
  /**
   *
   * @type {string}
   * @memberof ChatMessageDto
   */
  role?: string
  /**
   *
   * @type {string}
   * @memberof ChatMessageDto
   */
  content?: string
}
/**
 *
 * @export
 * @interface ChatOutputDto
 */
export interface ChatOutputDto {
  /**
   *
   * @type {string}
   * @memberof ChatOutputDto
   */
  response?: string
}
/**
 *
 * @export
 * @interface PinInputDto
 */
export interface PinInputDto {
  /**
   *
   * @type {number}
   * @memberof PinInputDto
   */
  level?: number
  /**
   *
   * @type {string}
   * @memberof PinInputDto
   */
  code?: string
}
/**
 *
 * @export
 * @interface PinOutputDto
 */
export interface PinOutputDto {
  /**
   *
   * @type {boolean}
   * @memberof PinOutputDto
   */
  success?: boolean
}
/**
 *
 * @export
 * @interface StartInputDto
 */
export interface StartInputDto {
  /**
   *
   * @type {number}
   * @memberof StartInputDto
   */
  difficulty?: number
}
/**
 *
 * @export
 * @interface StartOutputDto
 */
export interface StartOutputDto {
  /**
   *
   * @type {string}
   * @memberof StartOutputDto
   */
  hint: string
}

/**
 *
 * @export
 * @interface SummaryDto
 */
export interface SummaryDto {
  /**
   *
   * @type {number[]}
   * @memberof SummaryDto
   */
  attempts: number[]

  /**
   *
   * @type {number[]}
   * @memberof SummaryDto
   */
  successes: number[]
}

const URL_BASE = import.meta.env.VITE_API_URL

export async function startGame(body: StartInputDto): Promise<StartOutputDto> {
  const request = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }
  const response = await fetch(`${URL_BASE}/api/Start`, request)

  if (response.ok) {
    const data = await response.json()
    return data as StartOutputDto
  } else {
    throw response
  }
}

export async function tryPin(body: PinInputDto): Promise<PinOutputDto> {
  const request = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }
  const response = await fetch(`${URL_BASE}/api/Pin`, request)

  if (response.ok) {
    const data = await response.json()
    return data as PinOutputDto
  } else {
    throw response
  }
}

export async function completeChat(body: ChatInputDto): Promise<ChatOutputDto> {
  const request = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }
  const response = await fetch(`${URL_BASE}/api/Chat`, request)

  if (response.ok) {
    const data = await response.json()
    return data as ChatOutputDto
  } else {
    throw response
  }
}

export async function getSummary(): Promise<SummaryDto> {
  const request = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }
  const response = await fetch(`${URL_BASE}/api/Summary`, request)

  if (response.ok) {
    const data = await response.json()
    return data as SummaryDto
  } else {
    throw response
  }
}
