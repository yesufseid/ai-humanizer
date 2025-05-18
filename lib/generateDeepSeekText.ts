"use server"

export async function generateDeepSeekText(prompt: string): Promise<string> {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY
}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    // "model": "deepseek/deepseek-r1:free",
    "model": "deepseek/deepseek-chat:free",
    "messages": [
      {
        "role": "user",
        "content":prompt
      }
    ]
  })
});

  const data = await res.json();
    return data.choices[0].message.content;
}
