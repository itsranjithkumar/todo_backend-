import connectDB from "../../utils/db";
import Todo from "../../models/todo";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    try {
      const todos = await Todo.find();
      res.status(200).json(todos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === "POST") {
    try {
      const { title } = req.body;
      const todo = await Todo.create({ title });
      res.status(201).json(todo);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
