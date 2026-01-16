import { Category, InventoryItem, AutoOrder, AiActionLog } from '@/types/inventory';

// Mock IDs for consistency
const CAT_PANTRY = 'cat-1';
const CAT_PROTEINS = 'cat-2';
const CAT_BEVERAGE = 'cat-3';
const CAT_SPICES = 'cat-4';

const ITEM_TRUFFLE = 'item-1';
const ITEM_WAGYU = 'item-2';
const ITEM_WINE = 'item-3';
const ITEM_SAFFRON = 'item-4';

export const categories: Category[] = [
    { id: CAT_PANTRY, name: 'Pantry' },
    { id: CAT_PROTEINS, name: 'Proteins' },
    { id: CAT_BEVERAGE, name: 'Beverage' },
    { id: CAT_SPICES, name: 'Spices' },
];

export let inventoryItems: InventoryItem[] = [
    {
        id: ITEM_TRUFFLE,
        item_name: 'Truffle Oil',
        category_id: CAT_PANTRY,
        stock_quantity: 2.5,
        unit: 'L',
        status: 'Healthy',
        ai_auto_order: true,
        category_name: 'Pantry'
    },
    {
        id: ITEM_WAGYU,
        item_name: 'Wagyu Beef',
        category_id: CAT_PROTEINS,
        stock_quantity: 12,
        unit: 'kg',
        status: 'Low',
        ai_auto_order: true,
        category_name: 'Proteins'
    },
    {
        id: ITEM_WINE,
        item_name: 'Red Wine (Merlot)',
        category_id: CAT_BEVERAGE,
        stock_quantity: 0,
        unit: 'cases',
        status: 'Out of Stock',
        ai_auto_order: false,
        category_name: 'Beverage'
    },
    {
        id: ITEM_SAFFRON,
        item_name: 'Saffron',
        category_id: CAT_SPICES,
        stock_quantity: 0.3,
        unit: 'kg',
        status: 'Low',
        ai_auto_order: true,
        category_name: 'Spices'
    },
];

export let autoOrders: AutoOrder[] = [
    {
        id: 'ord-1',
        item_id: ITEM_TRUFFLE,
        ordered_quantity: 1,
        unit: 'L',
        order_status: 'Delivered',
        item_name: 'Truffle Oil'
    },
    {
        id: 'ord-2',
        item_id: ITEM_WAGYU,
        ordered_quantity: 5,
        unit: 'kg',
        order_status: 'Placed',
        item_name: 'Wagyu Beef'
    },
    {
        id: 'ord-3',
        item_id: ITEM_SAFFRON,
        ordered_quantity: 0.5,
        unit: 'kg',
        order_status: 'Placed',
        item_name: 'Saffron'
    },
];

export let aiActionLogs: AiActionLog[] = [
    { id: 'log-1', action_type: 'Auto Order', description: 'Stock auto-ordered: Cheese (5kg)', severity: 'Info' },
    { id: 'log-2', action_type: 'Table Reassigned', description: 'Party of 4 reassigned automatically', severity: 'Info' },
    { id: 'log-3', action_type: 'Complaint Resolved', description: 'Complaint resolved in 32 seconds', severity: 'Info' },
    { id: 'log-4', action_type: 'Staff Update', description: 'Staff shift updated: Sarah added', severity: 'Info' },
    { id: 'log-5', action_type: 'Low Stock Alert', description: 'Low stock alert: Red Wine', severity: 'Critical' },
];

export function updateItemStock(id: string, newQuantity: number) {
    const item = inventoryItems.find(i => i.id === id);
    if (item) {
        item.stock_quantity = newQuantity;
        if (newQuantity <= 0) item.status = 'Out of Stock';
        else if (newQuantity < 5) item.status = 'Low'; // arbitrary threshold for demo
        else item.status = 'Healthy';
    }
}
