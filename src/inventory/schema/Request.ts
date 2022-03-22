import * as t from 'io-ts'
import { date, datetime, nullable } from '../../custom-types'
import { Event } from './Header'

const MESSAGE = 'REQUEST'

export const Header = t.intersection([
    t.type({
        UUID: t.string,
        Type: t.string,
        Transaction: t.literal(MESSAGE),
        StandardVersion: t.string,
        SourceApplication: t.string,
        ProductName: t.string,
        ProductVersion: t.string,
        CompanyId: t.string,
        BranchId: t.string,
        GeneratedOn: datetime,
        DeliveryType: t.string,
        Event: Event
    }),
    t.partial({
        SubType: nullable(t.string),
        Version: nullable(t.string),
        CompanySharingMode: nullable(t.string),
        BusinessUnitySharingMode: nullable(t.string),
        BranchSharingMode: nullable(t.string)
    })
])

export const HeaderReturn = t.intersection([
    t.type({
        UUID: t.string,
        Type: t.string,
        Transaction: t.literal(MESSAGE),
        StandardVersion: t.string,
        SourceApplication: t.string,
        ProductName: t.string,
        ProductVersion: t.string,
        CompanyId: t.string,
        BranchId: t.string,
        GeneratedOn: datetime,
        DeliveryType: t.string
    }),
    t.partial({
        Event: Event,
        SubType: nullable(t.string),
        Version: nullable(t.string),
        CompanySharingMode: nullable(t.string),
        BusinessUnitySharingMode: nullable(t.string),
        BranchSharingMode: nullable(t.string)
    })
])

const RequestItem = t.intersection([
    t.type({
        Event: Event,
        InternalId: t.string,
        ItemInternalid: t.string,
        TotalPrice: t.string,
        Quantity: t.string,
        UnitOfMeasureInternalId: t.string,
        WarehouseInternalId: t.string,
        DeliveryDateTime: t.union([datetime, date])
    }), 
    t.partial({
        Code: t.string,
        CostCenterInternalId: t.string,
        CostCenterCode: t.string
    })
])

const Request = t.intersection([
    t.type({
        Type: t.union([t.literal('000'), t.literal('001')]),
        InternalId: t.string,
        UserRequesterCode: t.string,
        UserRequesterInternalId: t.string,
        RegisterDateTime: t.union([datetime, date]),
        ListOfRequestItem: t.array(RequestItem)
    }),
    t.partial({
        CompanyId: t.string,
        Code: t.string,
        CompanyInternalId: nullable(t.string),
        BranchId: t.string,
        Number: t.string,
        DeliveryDateTime: t.union([datetime, date]),
        SellerInternalId: t.string
    })
])

export const RequestReturn = t.type({
    Header: HeaderReturn,
    Content: t.type({
        ReturnContent: t.type({
            ListOfInternalId: t.array(t.type({
                Destination: t.string,
                Name: t.string,
                Origin: t.string
            }))
        }),
        ProcessingInformation: t.type({
            Status: t.string,
            ProcessedOn: t.union([datetime, date])
        }),
        ReceivedMessage: t.type({
            UUID: t.string,
            Event: Event,
            SentBy: t.string
        })
    })
})

export const RequestError = t.type({
    Header: HeaderReturn,
    Content: t.type({
        ReturnContent: t.type({
            Error: t.string
        }),
        ProcessingInformation: t.type({
            Status: t.string,
            ProcessedOn: t.union([datetime, date]),
            Details: t.array(t.type({
                Code: t.string,
                Message: t.string,
                DetailedMessage: t.string,
                HelpUrl: t.string
            }))
        }),
        ReceivedMessage: t.type({
            UUID: t.string,
            Event: Event,
            SentBy: t.string
        })
    })
})

export const RequestInfo = t.type({
    Header,
    Content: Request
})
export const ListRequestInfo = t.type({
    Header,
    Content: t.array(Request)
})

export type RequestReturn = t.TypeOf<typeof RequestReturn>
export type RequestError = t.TypeOf<typeof RequestError>
export type RequestInfo = t.TypeOf<typeof RequestInfo>
export type ListRequestInfo = t.TypeOf<typeof ListRequestInfo>