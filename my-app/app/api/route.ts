// app/api/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    console.log(searchParams);  
return NextResponse.json({ message: 'Hello World' }, { status: 200 });
}