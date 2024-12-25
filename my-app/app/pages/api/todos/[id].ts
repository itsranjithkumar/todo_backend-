import connectDB from "../../../utils/db";
import Todo from "../../../models/todo";

export default async function handler(req, res) {
  await connectDB();

  const { id } = req.query;

  if (req.method === "PUT") {
    try {
      const { title, completed } = req.body;
      const todo = await Todo.findByIdAndUpdate(id, { title, completed }, { new: true });
      if (!todo) return res.status(404).json({ message: "Todo not found" });
      res.status(200).json(todo);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else if (req.method === "DELETE") {
    try {
      const todo = await Todo.findByIdAndDelete(id);
      if (!todo) return res.status(404).json({ message: "Todo not found" });
      res.status(200).json({ message: "Todo deleted" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.setHeader("Allow", ["PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
