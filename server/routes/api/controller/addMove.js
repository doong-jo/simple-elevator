import Move from '../../../models/Move';

const pushMoveHistory = async (line_number, start, dest) => {
  const snapshot = new Move({ line_number, start, dest });
  return snapshot.save();
};

export async function addMove(req, res) {
  const { line_number, start, dest } = req.body;
  const result = await pushMoveHistory(+line_number, +start, +dest);
  res.send(result);
}
