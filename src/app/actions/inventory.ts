'use server';

import { supabase } from '@/lib/supabase';
import { InventoryItem, AiActionLog } from '@/types/inventory';

export async function getInventoryItems(): Promise<InventoryItem[]> {
    const { data, error } = await supabase
        .from('inventory_items')
        .select(`
            *,
            categories (
                name
            )
        `)
        .order('item_name', { ascending: true });

    if (error) {
        console.error('Error fetching inventory items:', error);
        return [];
    }

    // Transform the data to include category_name
    const items: InventoryItem[] = (data || []).map((item: any) => ({
        id: item.id,
        item_name: item.item_name,
        category_id: item.category_id,
        stock_quantity: item.stock_quantity,
        unit: item.unit,
        status: item.status,
        ai_auto_order: item.ai_auto_order,
        last_updated: item.last_updated,
        created_at: item.created_at,
        category_name: item.categories?.name || 'N/A'
    }));

    return items;
}

export async function getInventoryStats() {
    // Fetch all inventory items for calculations
    const items = await getInventoryItems();

    // Fetch auto orders count
    const { count: autoOrdersCount } = await supabase
        .from('auto_orders')
        .select('*', { count: 'exact', head: true });

    const lowStockCount = items.filter(i => i.status === 'Low' || i.status === 'Out of Stock').length;

    // Mock total value calculation - you can enhance this with actual pricing data
    const totalValue = items.reduce((sum, item) => {
        // Approximate value calculation (you can add a price column to your DB)
        const estimatedPrice = item.stock_quantity * 10; // Simple multiplier
        return sum + estimatedPrice;
    }, 0);

    return {
        totalValue: Math.round(totalValue),
        lowStockCount,
        autoOrdersCount: autoOrdersCount || 0,
        wasteReduction: 18.5 // This could be calculated from historical data
    };
}

export async function toggleAutoOrder(itemId: string) {
    // First get the current state
    const { data: currentItem, error: fetchError } = await supabase
        .from('inventory_items')
        .select('ai_auto_order')
        .eq('id', itemId)
        .single();

    if (fetchError || !currentItem) {
        console.error('Error fetching item:', fetchError);
        return { success: false };
    }

    // Toggle the state
    const newState = !currentItem.ai_auto_order;

    const { error: updateError } = await supabase
        .from('inventory_items')
        .update({ ai_auto_order: newState })
        .eq('id', itemId);

    if (updateError) {
        console.error('Error updating auto order:', updateError);
        return { success: false };
    }

    return { success: true, newState };
}

export async function getAiActionLogs(): Promise<AiActionLog[]> {
    const { data, error } = await supabase
        .from('ai_action_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

    if (error) {
        console.error('Error fetching AI action logs:', error);
        return [];
    }

    return data || [];
}
