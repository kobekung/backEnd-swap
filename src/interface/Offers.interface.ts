import { OFFER_STATUS_ENUM } from "src/enums/offer_status.enum"

export interface IOffer{
    id: number,
    from_user_id: number,
    to_user_id: number,
    product_id: number,
    status: OFFER_STATUS_ENUM
}