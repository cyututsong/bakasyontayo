import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'


// READ - GET all products
export async function GET() {
    try {

        const supabase = await createClient()

        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) throw error

        return NextResponse.json(data, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}



// CREATE -  ADD NEW PRODUCTS

export async function POST(request) {
    try {
        const supabase = await createClient()
        const body = await request.json()
        const { name, price, description, stock } = body

        const { data, error } = await supabase
            .from('products')
            .insert([{ name, price, description, stock }])
            .select()


        if (error) throw error

        return NextResponse.json(data[0], { status: 201 })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

//UPDATE - Modify a product
export async function PUT(request) {

    try {
        const supabase = await createClient()
        const body = await request.json()
        const { id, name, price, description, stock } = body

        const { data, error } = await supabase
            .from('products')
            .update({ name, price, description, stock })
            .eq('id', id)
            .select()

        if (error) throw error

        return NextResponse.json(data[0], { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}


export async function DELETE(request) {
    try {
        const supabase = createClient()
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', id)

        if (error) throw error
        return NextResponse.json({ message: 'Product Deleted' }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

