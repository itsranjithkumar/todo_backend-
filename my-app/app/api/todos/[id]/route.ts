// app/api/todos/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../utils/db';
import Todo from '../../../models/todo';


export async function PUT(
    request: NextRequest,
    context: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id } = context.params;
    const body = await request.json();
    const { title, completed } = body;

    // Validate input
    if (!title && completed === undefined) {
      return NextResponse.json(
        { message: 'No update fields provided' }, 
        { status: 400 }
      );
    }

    // Prepare update object
    const updateData: { title?: string, completed?: boolean } = {};
    if (title) updateData.title = title;
    if (completed !== undefined) updateData.completed = completed;

    // Perform update
    const todo = await Todo.findByIdAndUpdate(
      id, 
      updateData, 
      { new: true, runValidators: true }
    );

    if (!todo) {
      return NextResponse.json(
        { message: 'Todo not found' }, 
        { status: 404 }
      );
    }

    return NextResponse.json(todo, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { 
        message: 'Error updating todo', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }, 
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest, 
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id } = params;

    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      return NextResponse.json(
        { message: 'Todo not found' }, 
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Todo deleted successfully' }, 
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { 
        message: 'Error deleting todo', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }, 
      { status: 500 }
    );
  }
}