export type Category = {
    id: string;
    name: string;
    created_at?: string;
};

export type InventoryItem = {
    id: string;
    item_name: string;
    category_id: string;
    stock_quantity: number;
    unit: string;
    status: 'Healthy' | 'Low' | 'Out of Stock';
    ai_auto_order: boolean;
    last_updated?: string;
    created_at?: string;
    // Joined fields for UI convenience
    category_name?: string;
};

export type AutoOrder = {
    id: string;
    item_id: string;
    ordered_quantity: number;
    unit: string;
    order_status: 'Placed' | 'Delivered' | 'Cancelled';
    created_at?: string;
    // Joined fields
    item_name?: string;
};

export type AiActionLog = {
    id: string;
    action_type: string;
    description: string;
    severity: 'Info' | 'Warning' | 'Critical';
    created_at?: string;
};
