import * as t from 'io-ts'
import { date, datetime, nullable } from '../../custom-types'

const MESSAGE = 'UNITOFMEASURE'

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
        Event: t.union([t.literal('upsert'), t.literal('delete')])
    }),
    t.partial({
        SubType: nullable(t.string),
        Version: nullable(t.string),
        CompanySharingMode: nullable(t.string),
        BusinessUnitySharingMode: nullable(t.string),
        BranchSharingMode: nullable(t.string)
    })
])

const UnitOfMeasure = t.intersection([
    t.type({
        InternalId: t.string,
        Code: t.string,
        ShortName: t.string,
    }),
    t.partial({
        CompanyInternalId: t.string,
        CompanyId: t.string,
        BranchId: t.string,
        Active: t.string,
        Description: t.string
    })
])



export const UnitOfMeasureReturn = t.type({
    Header,
    Content: t.type({
        ReturnContent: t.type({
            ListOfInternalID: t.array(t.type({
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
            Event: t.union([t.literal('upsert'), t.literal('delete')]),
            SentBy: t.string
        })
    })
})

export const UnitOfMeasureError = t.type({
    Header,
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
            Event: t.union([t.literal('upsert'), t.literal('delete')]),
            SentBy: t.string
        })
    })
})

export const UnitOfMeasureInfo = t.type({
    Header,
    Content: UnitOfMeasure
})
export const ListUnitOfMeasureInfo = t.type({
    Header,
    Content: t.array(UnitOfMeasure)
})

export type UnitOfMeasureReturn = t.TypeOf<typeof UnitOfMeasureReturn>
export type UnitOfMeasureError = t.TypeOf<typeof UnitOfMeasureError>
export type UnitOfMeasureInfo = t.TypeOf<typeof UnitOfMeasureInfo>
export type ListUnitOfMeasureInfo = t.TypeOf<typeof ListUnitOfMeasureInfo>