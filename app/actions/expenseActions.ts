'use server'

import { revalidatePath } from 'next/cache'

export async function addExpense(formData: FormData) {
    // Extract data from FormData
    const amount = formData.get('amount');
    const category = formData.get('category');
    const payment_mode = formData.get('payment_mode');
    const description = formData.get('description');
    const account = formData.get('account');
    const date = formData.get('date');

    // Validate data
    if (!amount || !category || !payment_mode || !account || !date) {
        return { success: false, error: 'Missing required fields' };
    }

    // Here you would typically save the data to your database
    // For this example, we'll just log it
    console.log('Adding expense:', {
        amount,
        category,
        payment_mode,
        description,
        account,
        date
    });

    // Simulate a delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Revalidate the expenses page to show the new data
    revalidatePath('/expenses');

    return { success: true };
}

