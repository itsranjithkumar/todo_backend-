import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../utils/db';
import Todo from '../../models/todo';
import { console } from 'inspector';

// Handler for GET requests
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    console.log(searchParams);
    const todos = await Todo.find();
    return NextResponse.json(todos, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { 
        message: 'Error fetching todos', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}

// Handler for POST requests
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { title } = body;

    if (!title) {
      return NextResponse.json({ message: 'Title is required' }, { status: 400 });
    }

    const todo = await Todo.create({ title });
    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { 
        message: 'Error creating todo', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 400 }
    );
  }
}
