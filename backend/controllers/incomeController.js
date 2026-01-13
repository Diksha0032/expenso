const xlsx = require('xlsx');
const Income = require('../models/Income')

exports.addIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, source, amount, date } = req.body;

    if (!source || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" })
    }

    const newIncome = new Income({
      userId, icon, source, amount, date: new Date(date)
    })

    await newIncome.save();
    res.status(200).json(newIncome);
  } catch (e) {
    res.status(500).json({ message: "Server Error" })
  }
}

exports.getAllIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const income = await Income.find({ userId }).sort({ date: -1 });
    res.json(income);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    await Income.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Income deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Server Error" })
  }
}

exports.downloadIncomeExcel = async (req, res) => {
  const userId = req.user.id;

  try {
    const income = await Income.find({ userId }).sort({ date: -1 });

    const data = income.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date ? new Date(item.date).toISOString().split('T')[0] : "NA",
    }))

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data, { raw: true });

    const wscols = [
      { wch: 20 },
      { wch: 15 },
      { wch: 15 }
    ];
    ws['!cols'] = wscols;

    xlsx.utils.book_append_sheet(wb, ws, "Income");

    const fileName = `income_details_${Date.now()}.xlsx`;

    xlsx.writeFile(wb, fileName);
    res.download(fileName, (err) => {
      if (err) console.error("Download Error:", err);

      if (fs.existsSync(fileName)) {
        fs.unlinkSync(fileName);
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" })
  }
}