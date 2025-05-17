

export async function generateDeepSeekText(prompt: string): Promise<string> {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${process.env.DEEPSEEK_API_KEY}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    "model": "deepseek/deepseek-r1:free",
    "messages": [
      {
        "role": "user",
        "content":prompt
      }
    ]
  })
});

  const data = await res.json();
    console.log(data);
    return data.choices[0].message.content;
}
