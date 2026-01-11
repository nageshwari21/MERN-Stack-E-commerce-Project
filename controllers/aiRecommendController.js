import OpenAI from "openai";
import Product from "../models/productModel.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const recommendProducts = async (req, res) => {
  try {
    const { productId } = req.body;

    // Get current product
    const current = await Product.findById(productId);
    if (!current) return res.json([]);

    // Get store products
    const products = await Product.find({ _id: { $ne: current._id } });

    if (products.length === 0) return res.json([]);

    // Build product list for AI
    const list = products
      .map((p, i) => `${i + 1}. ${p.name} - ${p.description}`)
      .join("\n");

    const prompt = `
User is viewing:
${current.name} - ${current.description}

Here are products available in the store:
${list}

Pick the 5 best matching products ONLY from this list.
Return ONLY the numbers (like: 1, 3, 5)
`;

    const ai = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
    });

    const indexes = ai.choices[0].message.content
      .split(",")
      .map(n => parseInt(n.trim()) - 1)
      .filter(n => !isNaN(n));

    const recommended = indexes.map(i => products[i]).filter(Boolean);

    res.json(recommended);
  } catch (err) {
    console.log("AI error:", err);
    res.json([]);
  }
};
