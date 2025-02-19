import { TagIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const salesType = defineType({
    name: 'sale',
    title: 'Sale',
    type: 'document',
    icon: TagIcon,
    fields: [
        defineField({
            name: 'title',
            title: 'Sale Title',
            type: 'string',
        }),
        defineField({
            name: 'description',
            type: 'text',
            title: 'Sale Description',
        }),
        defineField({
            name: 'discountAmount',
            type: 'number',
            title: 'Discount Amount',
            description: 'Discount amount in percentage',
        }),
        defineField({
            name: 'couponCode',
            type: 'string',
            title: 'Coupon Code',
        }),
        defineField({
            name: 'validForm',
            type: 'datetime',
            title: 'Valid From',
        }),
        defineField({
            name: 'validUntil',
            type: 'datetime',
            title: 'Valid Until',
        }),
        defineField({
            name: 'isActive',
            type: 'boolean',
            title: 'Is Active',
            description: 'Toggle to activate or deactivate sale',
            initialValue: true,
        }),
    ],
    preview: {
        select: {
            title: 'title',
            discountAmount: 'discountAmount',
            couponCode: "couponCode",
            isActive: "isActive"
        },
        prepare(select) {
            const { title, discountAmount, couponCode, isActive } = select;
            const status = isActive ? "Active" : "Inactive";
            return {
                title,
                subtitle: `${discountAmount}% off - Code: ${couponCode} - ${status}`,
            }
        }
    }
})
